import * as React from "react";
import { PropsWithChildren, useRef } from "react";
import { GatsbyBrowser } from "gatsby";
import { LocomotiveScrollProvider } from "./src/providers/LocomotiveScrollProvider";


const RootWrapper = ({ children }: PropsWithChildren) => {
    const componentRef = useRef(null); // create a ref for the root level element (for scoping)
    return (
        <LocomotiveScrollProvider
            containerRef={componentRef}
            options={{
                smooth: true,
                smartphone: {
                    smooth: true
                },
                tablet: {
                    breakpoint: 768,
                    smooth: true
                }
            }}
            watch={[]}
        >
            <body data-scroll-container="true" id="body">
            {children}
            </body>
        </LocomotiveScrollProvider>
    );
};

// Wraps the whole app
export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => (
    <RootWrapper>
        {element}
    </RootWrapper>
);
