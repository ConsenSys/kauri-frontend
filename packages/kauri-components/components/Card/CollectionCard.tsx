import * as React from "react";
import styled, { css } from "../../lib/styled-components";
import BaseCard from "./BaseCard";
import R from "ramda";
import TextTruncate from "react-text-truncate";
import { Label, Title2, H4, BodyCard } from "../Typography";
import theme from "../../lib/theme-config";
import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import UserAvatar from "../UserAvatar";
import Image from "../Image";
import {
  toggleReducer,
  IToggleState,
  IToggleAction,
  showDispatch,
  hideDispatch,
  toggleInitialState,
} from "../../../kauri-web/lib/use-toggle";
import Date from '../HoverDateLabel';

const DEFAULT_CARD_HEIGHT = 310;
const DEFAULT_CARD_WIDTH = 290;
const DEFAULT_CARD_PADDING = theme.space[2];

const withImageURLCss = css`
  z-index: 1;
  padding: ${props => props.theme.space[2]}px;
  > *,
  a > * {
    color: white;
  }
`;

const AvatarContainer = styled.div`
  & > div {
    width: 100%;
    justify-content: center;
  }
  margin-bottom: ${props => props.theme.space[2]}px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Mask = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  width: 100%;
  > a:nth-child(1) {
    height: 100%;
  }
  > *:nth-child(2) {
    margin-top: auto;
  }
  ${withImageURLCss};
`;

interface IContentStyledComponentProps {
  imageURL: string | null;
}

const Content = styled<{}, "div">("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 100%;
  width: 100%;
  > a:nth-child(1) {
    height: 100%;
  }
  > *:nth-child(2) {
    margin-top: auto;
  }
`;

const Footer = styled<IContentStyledComponentProps, "div">("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    text-transform: uppercase;
  }
  padding: ${props =>
    typeof props.imageURL === "string" ? props.theme.space[2] + "px" : ""};
  padding-top: ${props =>
    typeof props.imageURL === "string" ? props.theme.space[1] + "px" : ""};
`;

const Divider = styled.div`
  width: 100%;
  margin: ${props => props.theme.space[2]}px 0px;
  margin-bottom: ${props => props.theme.space[1]}px;
  background-color: ${props => props.theme.colors.divider};
  height: 2px;
`;

const nameLineHeight = R.cond([
  [
    ({ cardHeight, imageURL }) =>
      cardHeight <= DEFAULT_CARD_HEIGHT && typeof imageURL !== "string",
    R.always(2),
  ],
  [
    ({ cardHeight, imageURL }) =>
      cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL !== "string",
    R.always(3),
  ],
  [({ imageURL }) => typeof imageURL === "string", R.always(2)],
]);

const contentLineHeight = R.cond([
  [
    ({ cardWidth, imageURL }) =>
      cardWidth > DEFAULT_CARD_WIDTH && typeof imageURL !== "string",
    R.always(7),
  ],
  [
    ({ cardHeight, imageURL }) =>
      cardHeight <= DEFAULT_CARD_HEIGHT && typeof imageURL !== "string",
    R.always(2),
  ],
  [
    ({ cardHeight, imageURL }) =>
      cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL !== "string",
    R.always(7),
  ],
  [
    ({ cardHeight, imageURL }) =>
      cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL === "string",
    R.always(6),
  ],
  [({ imageURL }) => typeof imageURL === "string", R.always(2)],
]);

interface IPublicProfileProps {
  username: string | null;
  userId: string;
  cardWidth: number;
  userAvatar: string | null;
  imageURL: string | null;
}

const RenderPublicProfile: React.SFC<IPublicProfileProps> = ({
  username,
  userId,
  cardWidth = DEFAULT_CARD_WIDTH,
  userAvatar,
  imageURL,
}) => (
  <AvatarContainer>
    <UserAvatar
      fullWidth={cardWidth > DEFAULT_CARD_WIDTH}
      username={username}
      userId={userId}
      cardType="COLLECTION"
      imageURL={imageURL}
      avatar={userAvatar}
    />
  </AvatarContainer>
);

const LabelContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: ${props => props.theme.space[2]}px;
`;

interface IBodyProps {
  name: string | null;
  userId: string;
  cardHeight: number;
  cardWidth: number;
  userAvatar: string | null;
  imageURL: string | null;
  description: string;
}

const RenderBodyContent: React.SFC<IBodyProps> = ({
  name,
  cardHeight,
  cardWidth,
  imageURL,
  description,
}) => (
  <React.Fragment>
    <LabelContainer>
      <Label textAlign="center">{"Collection"}</Label>
    </LabelContainer>
    <Title2 textAlign="center">
      <TextTruncate
        line={nameLineHeight({ cardHeight, imageURL })}
        truncateText="…"
        text={String(name)}
      />
    </Title2>
    <BodyCard textAlign="center">
      <TextTruncate
        line={contentLineHeight({ cardHeight, cardWidth, imageURL })}
        truncateText="…"
        text={description}
      />
    </BodyCard>
  </React.Fragment>
);

interface IActualContentProps {
  cardHeight: number;
  cardWidth: number;
  imageURL: string | null;
  description: string;
  id: string;
  linkComponent: ((
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>);
  name: string | null;
  username: string | null;
  userId: string;
  userAvatar: string | null;
  date: string;
}

const RenderActualContent: React.SFC<IActualContentProps> = ({
  imageURL,
  name,
  description,
  cardHeight,
  cardWidth,
  id,
  linkComponent,
  username,
  userId,
  userAvatar,
  date,
}) => (
  <React.Fragment>
    {linkComponent(
      <RenderBodyContent
        name={name}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        imageURL={imageURL}
        description={description}
        userId={userId}
        userAvatar={userAvatar}
      />,
      `/collection/${id}`
    )}
    {linkComponent(
      <RenderPublicProfile
        cardWidth={cardWidth}
        username={username}
        userId={userId}
        imageURL={imageURL}
        userAvatar={userAvatar}
      />,
      `/public-profile/${userId}`
    )}
    <Date status="PUBLISHED" date={date} />
  </React.Fragment>
);

interface ICardContentProps {
  cardHeight: number;
  cardWidth: number;
  imageURL: string | null;
  description: string;
  id: string;
  linkComponent: ((
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>);
  name: string | null;
  username: string | null;
  userId: string;
  userAvatar: string | null;
  date: string;
}

const RenderCardContent: React.SFC<ICardContentProps> = ({
  imageURL,
  name,
  description,
  cardHeight,
  cardWidth,
  id,
  linkComponent,
  username,
  userId,
  userAvatar,
  date,
}) =>
  typeof imageURL === "string" ? (
    <Mask>
      <RenderActualContent
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        date={date}
        description={description}
        id={id}
        imageURL={imageURL}
        linkComponent={linkComponent}
        name={name}
        userAvatar={userAvatar}
        userId={userId}
        username={username}
      />
    </Mask>
  ) : (
    <React.Fragment>
      <RenderActualContent
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        date={date}
        description={description}
        id={id}
        imageURL={imageURL}
        linkComponent={linkComponent}
        name={name}
        userAvatar={userAvatar}
        userId={userId}
        username={username}
      />
    </React.Fragment>
  );

const calculateCardHeight = R.cond([
  [
    ({ cardHeight, cardWidth, imageURL }) =>
      typeof imageURL !== "string" &&
      cardHeight > DEFAULT_CARD_HEIGHT &&
      cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, cardWidth, imageURL }) =>
      typeof imageURL !== "string" &&
      cardHeight === DEFAULT_CARD_HEIGHT &&
      cardWidth > DEFAULT_CARD_WIDTH,
    R.always(420),
  ],
  [
    ({ cardHeight, imageURL }) =>
      typeof imageURL === "string" && cardHeight > DEFAULT_CARD_HEIGHT,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, imageURL }) =>
      typeof imageURL !== "string" && cardHeight > DEFAULT_CARD_HEIGHT,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, imageURL }) =>
      typeof imageURL !== "string" && cardHeight === DEFAULT_CARD_HEIGHT,
    R.always(DEFAULT_CARD_HEIGHT),
  ],
  [
    ({ cardHeight, imageURL }) =>
      typeof imageURL === "string" && cardHeight === DEFAULT_CARD_HEIGHT,
    R.always(DEFAULT_CARD_HEIGHT),
  ],
]);

const calculateCardWidth = R.cond([
  [
    ({ cardWidth, imageURL }) =>
      typeof imageURL === "string" && cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardWidth }) => cardWidth,
  ],
  [
    ({ cardWidth, imageURL }) =>
      typeof imageURL === "string" && cardWidth === DEFAULT_CARD_WIDTH,
    R.always(DEFAULT_CARD_WIDTH),
  ],
  [
    ({ cardWidth, imageURL }) =>
      typeof imageURL !== "string" && cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardWidth }) => cardWidth - DEFAULT_CARD_PADDING * 2,
  ],
  [
    ({ cardWidth, imageURL }) =>
      typeof imageURL !== "string" && cardWidth === DEFAULT_CARD_WIDTH,
    R.always(DEFAULT_CARD_WIDTH),
  ],
]);

const shiftMarginDueToNoImageURLCss = css`
  margin-top: -15px;
  margin-left: -15px;
`;

const HoverContainer = styled<{ hasImageURL: boolean }, "div">("div")`
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 9001;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${props => props.theme.colors.textPrimary};
  > :first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  ${props => !props.hasImageURL && shiftMarginDueToNoImageURLCss};
`;

interface IHoverActionPayload {
  id: string;
}

interface IHoverProps {
  id: string;
  hasImageURL: boolean;
  hoverAction: (payload: IHoverActionPayload) => void;
  viewAction: (payload: IHoverActionPayload) => void;
  isChosenCollection?: boolean;
}

const handleHovereredClick = (id: string, hoverAction: any) => () =>
  hoverAction({ id });
const handleViewClick = (id: string, viewAction: any) => () =>
  viewAction({ id });

const Hover: React.SFC<IHoverProps> = ({
  hasImageURL,
  hoverAction,
  viewAction,
  id,
}) => (
  <HoverContainer hasImageURL={hasImageURL}>
    <PrimaryButton onClick={handleHovereredClick(id, hoverAction)}>
      Choose Article
    </PrimaryButton>
    <SecondaryButton onClick={handleViewClick(id, viewAction)}>
      View Article
    </SecondaryButton>
  </HoverContainer>
);

interface IContentProps {
  imageURL: string | null;
  name: string;
  description: string;
  cardHeight: number;
  cardWidth: number;
  id: string;
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  username: string | null;
  userId: string;
  userAvatar: string | null;
  date: string;
}

const RenderContent: React.SFC<IContentProps> = ({
  imageURL,
  name,
  description,
  cardHeight,
  cardWidth,
  id,
  linkComponent,
  username,
  userId,
  userAvatar,
  date,
}) => (
  <React.Fragment>
    <Content>
      {imageURL && (
        <Image
          borderTopLeftRadius="4px"
          borderTopRightRadius="4px"
          image={imageURL}
          asBackground={true}
          overlay={imageURL ? { opacity: 0.7 } : undefined}
          height={250}
          width={290}
        />
      )}
      <RenderCardContent
        cardHeight={cardHeight}
        cardWidth={cardWidth}
        date={date}
        description={description}
        id={id}
        imageURL={imageURL}
        linkComponent={linkComponent}
        name={name}
        userAvatar={userAvatar}
        userId={userId}
        username={username}
      />
    </Content>
  </React.Fragment>
);

interface IProps {
  id: string;
  description: string;
  date: string;
  name: string;
  username: string | null;
  userAvatar: string | null;
  userId: string;
  articleCount: string;
  imageURL: string | null;
  cardHeight: number;
  cardWidth?: number;
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  hoverAction?: (payload: IHoverActionPayload) => void;
  viewAction?: (payload: IHoverActionPayload) => void;
  isChosenCollection?: boolean;
}

interface IRenderFooterProps {
  id: string;
  imageURL: string | null;
  articleCount: string;
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
}

const RenderFooter: React.FunctionComponent<IRenderFooterProps> = ({
  id,
  imageURL,
  articleCount,
  linkComponent,
}) =>
  linkComponent(
    <Footer imageURL={imageURL}>
      <H4>{articleCount || "0"}</H4>
      <Label>Articles</Label>
    </Footer>,
    `/collection/${id}`
  );

const CollectionCard: React.FunctionComponent<IProps> = ({
  id,
  description,
  date,
  name,
  username,
  userId,
  userAvatar,
  imageURL,
  cardWidth = DEFAULT_CARD_WIDTH,
  cardHeight = DEFAULT_CARD_HEIGHT,
  linkComponent,
  hoverAction,
  viewAction,
  isChosenCollection,
  articleCount,
}) => {
  const [{ toggledOn }, dispatch] = React.useReducer<
    IToggleState,
    IToggleAction
  >(toggleReducer, toggleInitialState);

  return (
    <BaseCard
      imageURL={imageURL}
      cardWidth={calculateCardWidth({ cardWidth, imageURL })}
      cardHeight={calculateCardHeight({ cardHeight, cardWidth, imageURL })}
      handleMouseEnter={showDispatch(dispatch)}
      handleMouseLeave={hideDispatch(dispatch)}
      isChosenArticle={isChosenCollection}
      toggledOn={toggledOn}
      hoverAction={hoverAction}
    >
      {typeof hoverAction === "function" &&
        typeof viewAction === "function" &&
        toggledOn === true && (
          <Hover
            hasImageURL={Boolean(imageURL)}
            viewAction={viewAction}
            hoverAction={hoverAction}
            id={id}
          />
        )}
      <Container>
        <RenderContent
          cardHeight={cardHeight}
          cardWidth={cardWidth}
          date={date}
          description={description}
          id={id}
          imageURL={imageURL}
          linkComponent={linkComponent}
          name={name}
          userAvatar={userAvatar}
          userId={userId}
          username={username}
        />
        {typeof imageURL !== "string" && <Divider />}
        <RenderFooter
          id={id}
          imageURL={imageURL}
          linkComponent={linkComponent}
          articleCount={articleCount}
        />
      </Container>
    </BaseCard>
  );
};

export default CollectionCard;
