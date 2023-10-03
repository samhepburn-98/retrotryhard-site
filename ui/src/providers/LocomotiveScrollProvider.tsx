import * as React from "react";
import { createContext, DependencyList, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import LocomotiveScroll, { InstanceOptions } from "locomotive-scroll";
import { useDebounce } from "use-debounce";
import useResizeObserver from "use-resize-observer";

export interface LocomotiveScrollContextValue {
    scroll: LocomotiveScroll | null;
    isReady: boolean;
}

export const LocomotiveScrollContext = createContext<LocomotiveScrollContextValue>({
    scroll: null,
    isReady: false,
});

export interface LocomotiveScrollProviderProps {
    options: InstanceOptions;
    containerRef: MutableRefObject<HTMLDivElement | null>;
    watch: DependencyList | undefined;
    onUpdate?: (scroll: LocomotiveScroll) => void;
    location?: string;
    onLocationChange?: (scroll: LocomotiveScroll) => void;
    children?: ReactNode;
}

export function LocomotiveScrollProvider({
                                             children,
                                             options,
                                             containerRef,
                                             watch,
                                             onUpdate,
                                             location,
                                             onLocationChange,
                                         }: LocomotiveScrollProviderProps) {
    const { height: containerHeight } = useResizeObserver<HTMLDivElement>({ ref: containerRef });
    const [isReady, setIsReady] = useState(false);
    const LocomotiveScrollRef = useRef<LocomotiveScroll | null>(null);
    const [height] = useDebounce(containerHeight, 100);

    if (!watch) {
        console.warn(
            "react-locomotive-scroll: you did not add any props to watch. Scroll may have weird behaviours if the instance is not updated when the route changes"
        );
    }

    useEffect(() => {
        (async () => {
            try {
                const LocomotiveScroll = (await import("locomotive-scroll")).default;

                const dataScrollContainer = document.querySelector("[data-scroll-container]");

                if (!dataScrollContainer) {
                    console.warn(
                        `react-locomotive-scroll: [data-scroll-container] dataset was not found. You likely forgot to add it which will prevent Locomotive Scroll to work.`
                    );
                }

                LocomotiveScrollRef.current = new LocomotiveScroll({
                    el: dataScrollContainer as HTMLElement ?? undefined,
                    ...options,
                });
                setIsReady(true); // Re-render the context
            } catch (error) {
                throw Error(`react-locomotive-scroll: ${error}`);
            }
        })();

        return () => {
            LocomotiveScrollRef.current?.destroy();
            setIsReady(false);
        };
    }, []);

    useEffect(
        () => {
            if (!LocomotiveScrollRef.current) {
                return;
            }

            LocomotiveScrollRef.current.update();

            if (onUpdate) {
                onUpdate(LocomotiveScrollRef.current);
            }
        },
        watch ? [...watch, height] : [height]
    );

    useEffect(() => {
        if (!LocomotiveScrollRef.current || !location) {
            return;
        }

        LocomotiveScrollRef.current.update();

        if (onLocationChange) {
            onLocationChange(LocomotiveScrollRef.current);
        }
    }, [location]);

    return (
        <LocomotiveScrollContext.Provider value={{ scroll: LocomotiveScrollRef.current, isReady }}>
            {children}
        </LocomotiveScrollContext.Provider>
    );
}

LocomotiveScrollContext.displayName = "LocomotiveScrollContext";
LocomotiveScrollProvider.displayName = "LocomotiveScrollProvider";
