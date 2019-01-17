import * as React from "react";
import { Link } from "../../../routes";
import styled from "../../../lib/styled-components";
import CommunityProfile from "../../../../kauri-components/components/Community/CommunityProfile";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import Empty from "../../containers/PublicProfile/Empty";
import {
  getCommunity,
  getCommunity_getCommunity_approved_ArticleDTO,
} from "../../../queries/__generated__/getCommunity";
import AddToCollectionConnection from "../AddToCollection";

const CommunityHeader = styled.section`
  display: flex;
  height: 255px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.textPrimary};
  padding: 0px ${props => props.theme.padding};
`;

const ArticlesSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0px;
  padding: 0px ${props => props.theme.padding};
  > div {
    margin: ${props => props.theme.space[2]}px;
  }
`;

interface IProps {
  avatar: null | string;
  category: string;
  hostName: string;
  id: string;
  isLoggedIn: boolean;
  name: string;
  website: string | null;
  data: getCommunity;
  openModalAction: (payload: { children: React.ReactElement<any> }) => void;
}

function isCommunityArticle(
  arg: any
): arg is getCommunity_getCommunity_approved_ArticleDTO {
  return arg.version !== undefined;
}

const Container: React.SFC<IProps> = ({
  avatar,
  hostName,
  isLoggedIn,
  id,
  name,
  website,
  data,
  openModalAction,
}) => {
  const linkComponent = (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => (
    <Link useAnchorTag={true} href={route}>
      {childrenProps}
    </Link>
  );

  console.log(data.getCommunity);
  return (
    <section>
      <CommunityHeader>
        <CommunityProfile
          id={id}
          avatar={avatar}
          name={name}
          website={website}
          hostName={hostName}
        />
      </CommunityHeader>
      <ArticlesSection>
        {data.getCommunity &&
        Array.isArray(data.getCommunity.approved) &&
        data.getCommunity.approved.length ? (
          data.getCommunity.approved.map(article => {
            if (article && isCommunityArticle(article)) {
              return (
                <ArticleCard
                  key={String(article.id)}
                  id={String(article.id)}
                  version={Number(article.version)}
                  cardHeight={420}
                  imageURL={article.attributes && article.attributes.background}
                  linkComponent={linkComponent}
                  title={String(article.title)}
                  content={String(article.content)}
                  date={article.datePublished}
                  username={name}
                  userAvatar={avatar}
                  userId={id}
                  isLoggedIn={isLoggedIn}
                  resourceType="COMMUNITY"
                  hoverChildren={() => (
                    <PrimaryButton
                      onClick={() =>
                        openModalAction({
                          children: (
                            <AddToCollectionConnection
                              articleId={String(article.id)}
                              version={Number(article.version)}
                            />
                          ),
                        })
                      }
                    >
                      Add To Collection
                    </PrimaryButton>
                  )}
                />
              );
            }
          })
        ) : (
          <Empty />
        )}
      </ArticlesSection>
    </section>
  );
};

export default Container;
