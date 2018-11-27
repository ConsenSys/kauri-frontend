import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import moment from "moment";
import { Link } from "../../../routes";
import styled from "../../../lib/styled-components";
import Empty from "../PublicProfile/Empty";
import {
  Title2,
  PageDescription,
} from "../../../../kauri-components/components/Typography";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const ArticlesSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  > div {
    margin: ${props => props.theme.space[2]}px;
  }
`;

const Owner = t.interface({
  avatar: t.union([t.null, t.string]),
  id: t.string,
  username: t.union([t.null, t.string]),
});

const Article = t.interface({
  attributes: t.union([
    t.null,
    t.undefined,
    t.interface({ background: t.union([t.string, t.null, t.undefined]) }),
  ]),
  content: t.string,
  datePublished: t.string,
  id: t.string,
  imageURL: t.union([t.undefined, t.string]),
  owner: Owner,
  title: t.string,
  version: t.number,
});

const RuntimeProps = t.interface({
  articles: t.array(Article),
  description: t.union([t.string, t.undefined, t.null]),
  name: t.string,
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Component: React.SFC<Props> = props => {
  const { name, description, articles } = RuntimeProps.decode(props).getOrElseL(
    errors => {
      throw new Error(failure(errors).join("\n"));
    }
  );
  if (articles) {
    const linkComponent = (article: t.TypeOf<typeof Article>) => (
      childrenProps: React.ReactElement<any>,
      route: string
    ) => (
      <Link
        useAnchorTag={true}
        toSlug={route.includes("article") ? String(article.title) : undefined}
        href={route}
      >
        {childrenProps}
      </Link>
    );

    return (
      <Container>
        <Title2>{name}</Title2>
        <PageDescription>{description}</PageDescription>
        <ArticlesSection>
          {articles.map(article => (
            <ArticleCard
              key={article.id}
              id={article.id}
              version={article.version}
              content={article.content}
              date={moment(article.datePublished).format("D MMM YYYY")}
              title={article.title}
              username={article.owner.username}
              userId={article.owner.id}
              userAvatar={article.owner.avatar}
              imageURL={article.imageURL}
              linkComponent={linkComponent(article)}
              resourceType="article"
              cardHeight={420}
            />
          ))}
        </ArticlesSection>
      </Container>
    );
  }
  return <Empty />;
};

export default Component;
