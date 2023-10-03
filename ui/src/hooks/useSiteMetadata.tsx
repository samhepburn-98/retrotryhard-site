import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
    const data: Queries.SiteQuery = useStaticQuery(graphql`
    query Site {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

    return ({
        title: data?.site?.siteMetadata?.title ?? "",
        description: data?.site?.siteMetadata?.description ?? "",
        siteUrl: data?.site?.siteMetadata?.siteUrl ?? ""
    });
};

export default useSiteMetadata;
