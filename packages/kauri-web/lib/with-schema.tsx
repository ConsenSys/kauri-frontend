import React from "react";
import { Helmet } from "react-helmet";
import slugify from "slugify";

interface IProps {
  hostName: string;
  data: {
    getArticle: {
      attributes: {
        background: string;
      };
      author: {
        name: string;
        username: string;
      };
      content: string;
      datePublished: string;
      id: string;
      title: string;
    };
  };
}

const getValues = (props: any) => {
  const {
    id,
    title,
    content,
    attributes,
    author,
    datePublished,
    dateCreated,
    tags,
  } = props.data.getArticle;

  const hostName = `https://${props.hostName.replace(/api\./g, "")}`;

  const articleContent =
    content[0] === "{" && JSON.parse(content).markdown
      ? JSON.parse(content).markdown
      : content;

  const description = articleContent
    .replace(/\n|\r/g, " ")
    .replace(/\u00a0/g, " ")
    .replace("#", "")
    .substring(0, 120);

  const schema = {
    "@context": "http://schema.org",
    "@type": "Article",
    articleBody: articleContent,
    author: author.name || author.username,
    datePublished: datePublished || dateCreated,
    description,
    genre: "blockchain developer guide",
    headline: title,
    image:
      (attributes && attributes.background) ||
      `${hostName}/static/images/logo.svg`,
    keywords: tags,
    mainEntityOfPage: {
      "@id": "id",
      "@type": "WebPage",
    },
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: `${hostName}/static/images/logo.svg`,
      },
      name: "Kauri",
    },
    url: `${hostName}/article/${id}`,
  };

  const values = {
    attributes,
    description,
    hostName,
    id,
    schema,
    schemaString: JSON.stringify(schema),
    title,
  };
  return values;
};

const withSchema = (WrappedComponent: React.ComponentClass) => {
  class ArticleWithSchema extends React.Component<IProps, {}> {
    render() {
      const {
        id,
        title,
        attributes,
        description,
        hostName,
        schemaString,
      } = getValues(this.props);

      return (
        <>
          <Helmet>
            <script type="application/ld+json">{schemaString}</script>
            <title>{title} - Kauri</title>
            <link
              rel="canonical"
              href={`${hostName}/article/${id}/${slugify(title, {
                lower: true,
              })}`}
            />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content="kauri.io" />
            <meta
              property="og:url"
              content={`${hostName}/article/${id}/${slugify(title, {
                lower: true,
              })}`}
            />
            <meta property="og:description" content={`${description}...`} />
            <meta property="og:type" content="article" />
            <meta
              property="og:image"
              content={
                (attributes &&
                  attributes.background &&
                  attributes.background) ||
                "/static/images/logo.svg"
              }
            />
            <meta name="twitter:card" content="summary" />
            <meta
              name="twitter:site"
              content={`https://${hostName}/article/${id}/${slugify(title, {
                lower: true,
              })}`}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={`${description}...`} />
            <meta name="twitter:creator" content="@kauri_io" />
            <meta
              name="twitter:image"
              content={
                (attributes &&
                  attributes.background &&
                  attributes.background) ||
                "/static/images/logo.svg"
              }
            />
          </Helmet>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }

  return ArticleWithSchema;
};
export default withSchema;
