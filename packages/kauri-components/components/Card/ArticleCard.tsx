import * as React from "react";
import styled, { css } from "../../lib/styled-components";
import TextTruncate from "react-text-truncate";
import BaseCard from "./BaseCard";
import { H1, BodyCard } from "../Typography";
import theme from "../../lib/theme-config";
import SecondaryButton from "../Button/SecondaryButton";
import UserAvatar from "../UserAvatar";
import {
  toggleReducer,
  IToggleState,
  IToggleAction,
  showDispatch,
  hideDispatch,
  toggleDispatch,
  toggleInitialState,
} from "../../../kauri-web/lib/use-toggle";
import { TagList } from "../Tags";
import Image from "../Image";
import Date from "../HoverDateLabel";

const DEFAULT_CARD_WIDTH = theme.DEFAULT_CARD_WIDTH;

const withImageURLPaddingCss = css`
  padding: ${props => props.theme.space[2]}px;
`;

const Container = styled<{ imageURL: string | null }, "div">("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
  > a {
    height: ${props =>
      props.imageURL ? "calc(100% - 85px)" : "calc(100% - 55px)"};
  }
`;

const Content = styled<{ imageURL: string | null }, "div">("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  > div:first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  > h1 {
    word-break: break-word;
    margin: 0;
    line-height: 22px;
  }
  & .taglist {
    margin-top: 0px;
  }
  ${props => typeof props.imageURL === "string" && withImageURLPaddingCss};
`;

const Footer = styled<{ imageURL: string | null }, "div">("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  ${props => typeof props.imageURL === "string" && withImageURLPaddingCss};
  padding-top: ${props => typeof props.imageURL === "string" && "0px"};
  > a {
    width: 100%;
  }
`;

const withImageURLDividerCss = css`
  width: calc(100% - ${props => props.theme.space[3]}px);
  margin-left: ${props => props.theme.space[2]}px;
`;

const Divider = styled<{ imageURL: string | null }, "div">("div")`
  width: 100%;
  margin-top: auto;
  margin-bottom: ${props => props.theme.space[1]}px;
  background-color: ${props => props.theme.colors.divider};
  height: 2px;
  ${props => typeof props.imageURL === "string" && withImageURLDividerCss};
`;

const MoreOptionsIcon: React.FunctionComponent<{}> = () => (
  <svg
    width="23"
    height="5"
    viewBox="0 0 23 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.6">
      <circle cx="20.5" cy="2.5" r="2.5" fill="#1E2428" />
      <circle cx="11.5" cy="2.5" r="2.5" fill="#1E2428" />
      <circle cx="2.5" cy="2.5" r="2.5" fill="#1E2428" />
    </g>
  </svg>
);

const Header = styled.div`
  display: flex;
  > :first-child {
    margin-right: auto;
  }
`;

const MoreOptions = styled<{ hasImageURL: boolean }, "div">("div")`
  display: flex;
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${props => (props.hasImageURL ? "145" : "10")}px;
  right: 15px;
  z-index: 5;
`;

interface ICardContentProps {
  title: string;
  description: string | null;
  imageURL: string | null;
  date: string;
  status: undefined | "PUBLISHED" | "DRAFT";
  tags?: string[];
}

const RenderCardContent: React.FunctionComponent<ICardContentProps> = ({
  title,
  description,
  imageURL,
  date,
  status,
  tags,
}) => (
  <React.Fragment>
    {typeof imageURL === "string" && (
      <Image
        width={288}
        height={130}
        image={imageURL}
        borderTopLeftRadius="4px"
        borderTopRightRadius="4px"
      />
    )}
    <Content imageURL={imageURL}>
      <Header>
        <Date status={status} date={date} />
      </Header>
      <H1>
        <TextTruncate line={2} truncateText="…" text={title} />
      </H1>
      {!imageURL && (
        <BodyCard>
          <TextTruncate
            line={imageURL ? 2 : 6}
            truncateText="…"
            text={description || ""}
          />
        </BodyCard>
      )}
      {Array.isArray(tags) && tags.length > 0 && (
        <TagList
          className="taglist"
          resourceType="card"
          maxTags={3}
          maxChars={25}
          color="textPrimary"
          tags={tags}
        />
      )}
    </Content>
  </React.Fragment>
);

interface IPublicProfileProps {
  username: string | null;
  userId: string;
  cardWidth: number;
  userAvatar: string | null;
  imageURL: string | null;
}

const RenderPublicProfile: React.FunctionComponent<IPublicProfileProps> = ({
  username,
  userId,
  cardWidth,
  userAvatar,
  imageURL,
}) => (
  <UserAvatar
    imageURL={imageURL}
    cardType="ARTICLE"
    fullWidth={cardWidth > DEFAULT_CARD_WIDTH}
    username={username}
    userId={userId}
    avatar={userAvatar}
  />
);

const shiftMarginDueToNoImageURLCss = css`
  margin-top: -15px;
  margin-left: -15px;
`;

const HoverContainer = styled<{ hasImageURL: boolean }, "div">("div")`
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 2;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${props => props.theme.colors.textPrimary};
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  ${props => !props.hasImageURL && shiftMarginDueToNoImageURLCss};
`;

interface IHoverProps {
  hasImageURL: boolean;
  hoverChildren: React.ReactElement<any>;
  cancelAction: () => void;
}

const Hover: React.FunctionComponent<IHoverProps> = ({
  hasImageURL,
  cancelAction,
  hoverChildren,
}) => (
  <HoverContainer hasImageURL={hasImageURL}>
    {hoverChildren}
    <SecondaryButton onClick={cancelAction}>Cancel</SecondaryButton>
  </HoverContainer>
);

interface IProps {
  id: string;
  version: number;
  description: string | null;
  date: string;
  title: string;
  username: string | null;
  userId: string;
  userAvatar: string | null;
  imageURL: string | null;
  cardHeight: number;
  cardWidth?: number;
  destination?: "review";
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  hoverChildren?:
    | null
    | ((
        payload: {
          hideDispatch: () => void;
          showDispatch: () => void;
          toggleDispatch: () => void;
        }
      ) => React.ReactElement<any>);
  isChosenArticle?: boolean;
  resourceType: "USER" | "COMMUNITY";
  status?: "PUBLISHED" | "DRAFT";
  isLoggedIn: boolean;
  tags?: string[];
  triggerHoverChildrenOnFullCardClick?: boolean;
}

const ArticleCard: React.FunctionComponent<IProps> = ({
  id,
  version,
  date,
  title,
  username,
  userId,
  userAvatar,
  imageURL,
  linkComponent,
  isChosenArticle,
  resourceType,
  status,
  isLoggedIn,
  hoverChildren,
  tags,
  destination,
  description,
  triggerHoverChildrenOnFullCardClick = false,
}) => {
  const [{ toggledOn }, dispatch] = React.useReducer<
    IToggleState,
    IToggleAction
  >(toggleReducer, toggleInitialState);

  return (
    <BaseCard
      imageURL={imageURL}
      cardWidth={288}
      cardHeight={310}
      isChosenArticle={isChosenArticle}
      toggledOn={toggledOn}
    >
      {!!hoverChildren && toggledOn === true && (
        <Hover
          hasImageURL={!!imageURL}
          cancelAction={hideDispatch(dispatch)}
          hoverChildren={hoverChildren({
            hideDispatch: hideDispatch(dispatch),
            showDispatch: showDispatch(dispatch),
            toggleDispatch: toggleDispatch(dispatch),
          })}
        />
      )}
      <Container
        onClick={() =>
          triggerHoverChildrenOnFullCardClick && showDispatch(dispatch)()
        }
        imageURL={imageURL}
      >
        {isLoggedIn && !!hoverChildren && (
          <MoreOptions
            hasImageURL={!!imageURL}
            onClick={toggleDispatch(dispatch)}
          >
            <MoreOptionsIcon />
          </MoreOptions>
        )}
        {linkComponent(
          <RenderCardContent
            title={title}
            description={description}
            imageURL={imageURL}
            date={date}
            status={status}
            tags={tags}
          />,
          destination === "review"
            ? `/article-review/${id}/v${version}`
            : `/article/${id}/v${version}`
        )}
        <Divider imageURL={imageURL} />
        <Footer imageURL={imageURL}>
          {linkComponent(
            <RenderPublicProfile
              imageURL={imageURL}
              username={username}
              userId={userId}
              cardWidth={288}
              userAvatar={userAvatar}
            />,
            resourceType === "COMMUNITY"
              ? `/community/${userId}`
              : `/public-profile/${userId}`
          )}
        </Footer>
      </Container>
    </BaseCard>
  );
};

export default ArticleCard;
