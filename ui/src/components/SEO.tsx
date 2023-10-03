import React, { ReactNode } from "react";

import useSiteMetadata from "../hooks/useSiteMetadata";

interface SEOProps {
    title?: string;
    description?: string;
    children?: ReactNode;
}

const SEO = ({ title, description, children }: SEOProps) => {
    const { title: defaultTitle, description: defaultDescription } = useSiteMetadata();

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
    };

    return (
        <>
            <title>{seo.title}</title>
            <meta content={seo.description} name="description"/>
            <html lang="en-gb"/>
            {children}
        </>
    );
};

export default SEO;
