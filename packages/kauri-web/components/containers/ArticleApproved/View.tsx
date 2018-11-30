import React from "react";
import { Helmet } from "react-helmet";
import R from "ramda";
import moment from "moment";
import styled from "../../../lib/styled-components";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import { Link } from "../../../routes";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import {
  Title1,
  BodyCard,
} from "../../../../kauri-components/components/Typography";
import {
  Article,
  Article_owner_PublicUserDTO,
} from "../../../queries/__generated__/Article";

import { ShareButtons } from "../../../../kauri-components/components/Tooltip/ShareButtons";

interface IProps {
  data: {
    getArticle: Article;
  };
  hostName: string;
  routeChangeAction: (route: string) => void;
  type: "published" | "approved" | "drafted" | "updated";
  user: { id: string };
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 76px);
  background-color: ${props => props.theme.primaryTextColor};
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

const ArticleApprovedActionButtons = styled.div`
  display: flex;
  > :first-child:not(:only-child) {
    margin-right: 10px;
  }
  > :only-child {
    margin-right: 0px;
  }
  margin-top: 20px;
  > :first-child {
    margin-right: 0px;
  }
`;

class ArticleApproved extends React.Component<IProps> {
  render() {
    const { data, routeChangeAction, type, hostName } = this.props;
    const subjectCopy = R.cond([
      [
        R.equals("updated"),
        R.always(
          "draft has been updated. You can view all drafts on your profile page."
        ),
      ],
      [
        R.equals("drafted"),
        R.always(
          "has been saved as a draft. You can view all drafts on your profile page."
        ),
      ],
      [R.equals("published"), R.always("is now live")],
      [
        R.equals("approved"),
        R.always("now needs publishing from author before going live"),
      ],
    ])(type);

    const capitalize = (stringToCapitalize: string) =>
      stringToCapitalize.length > 0 &&
      stringToCapitalize[0].toUpperCase() + R.tail(stringToCapitalize);

    if (this.props.data.getArticle) {
      const article = data.getArticle;

      return (
        <Container>
          <Helmet>
            <title>{`Kauri - Article ${capitalize(type)}`}</title>
          </Helmet>
          <Title1 color="white">{capitalize(type)}</Title1>
          <BodyCard color="white">{`The article ${subjectCopy}`}</BodyCard>
          <ArticleCard
            key={String(article.id)}
            resourceType={"article"}
            id={String(article.id)}
            version={Number(article.version)}
            date={moment(article.datePublished || article.dateCreated).format(
              "D MMM YYYY"
            )}
            title={String(article.title)}
            content={String(article.content)}
            username={
              (article.owner &&
                (article.owner as Article_owner_PublicUserDTO).username) ||
              (article.author && article.author.username)
            }
            userId={R.defaultTo("")(
              R.path<string>(["owner", "id"])(article) ||
                R.path<string>(["author", "id"])(article)
            )}
            userAvatar={
              (article.owner &&
                (article.owner as Article_owner_PublicUserDTO).avatar) ||
              (article.author && article.author.avatar)
            }
            imageURL={article.attributes && article.attributes.background}
            cardHeight={420}
            linkComponent={(childrenProps, route) => (
              <Link
                toSlug={route.includes("article") && article.title}
                useAnchorTag={true}
                href={route}
              >
                {childrenProps}
              </Link>
            )}
            changeRoute={routeChangeAction}
          />
          <ArticleApprovedActionButtons>
            <ShareButtons
              horizontal={true}
              title={String(article.title)}
              url={String(
                `https://${hostName.replace("api.", "")}/article/${
                  article.id
                }?utm_campaign=published`
              )}
            />
            <PrimaryButton
              onClick={() =>
                routeChangeAction(
                  `/public-profile/${this.props.user && this.props.user.id}`
                )
              }
            >
              My Articles
            </PrimaryButton>
          </ArticleApprovedActionButtons>
        </Container>
      );
    }
  }
}

export default ArticleApproved;
