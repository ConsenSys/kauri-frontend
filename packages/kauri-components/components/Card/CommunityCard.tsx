import * as React from "react";
import TextTruncate from "react-text-truncate";
import styled from "../../lib/styled-components";
import { Label, BodyCard, H4, Title2 } from "../Typography";
import BaseCard from "../Card/BaseCard";
import theme from "../../lib/theme-config";

const DEFAULT_CARD_HEIGHT = 310;
const DEFAULT_CARD_WIDTH = theme.DEFAULT_CARD_WIDTH;

const Container = styled<{ cardHeight: number | null }, "section">("section")`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
  min-width: 262px;
  > a {
    display: flex;
    margin-bottom: auto;
    min-height: 70%;
  }
`;

const Image = styled.img`
  width: 70px;
  border-radius: 4px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border-radius: 4px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  > :not(:last-child) {
    margin-right: ${props => props.theme.space[1]}px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  height: 100%;
  overflow: hidden;
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
`;

interface IContentStyledComponentProps {
  imageURL: string | null;
}

const Count = styled<IContentStyledComponentProps, "div">("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${props =>
    typeof props.imageURL === "string" ? props.theme.space[2] + "px" : ""};
  padding-top: 0px;
  padding-bottom: 0px;
  > * {
    text-transform: uppercase;
  }
`;

const Divider = styled.div`
  height: 2px;
  background-color: ${props => props.theme.colors.divider};
  margin-top: auto;
  margin-bottom: ${props => props.theme.space[1]}px;
`;

interface ICardContentProps {
  description: string;
  name: string;
  logo: string | null;
}

const CardContent: React.SFC<ICardContentProps> = ({
  description,
  name,
  logo,
}) => (
  <React.Fragment>
    <Content>
      {logo ? (
        <ImageContainer>
          <Image src={logo} />
        </ImageContainer>
      ) : null}
      <Title2>
        <TextTruncate
          line={typeof logo === "string" ? 2 : 3}
          truncateText="…"
          text={name}
        />
      </Title2>
      <BodyCard>
        <TextTruncate
          line={typeof logo === "string" ? 3 : 5}
          truncateText="…"
          text={description}
        />
      </BodyCard>
    </Content>
  </React.Fragment>
);

const LabelContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: ${props => props.theme.space[2]}px;
`;

interface IProps {
  articleCount: string;
  cardHeight: number;
  collectionCount: string;
  description: string;
  imageURL: string | null;
  linkComponent: (
    childrenProps: React.ReactElement<any>
  ) => React.ReactElement<any>;
  logo: string | null;
  name: string;
}

const CommunityCard: React.SFC<IProps> = props => {
  const {
    linkComponent,
    cardHeight = DEFAULT_CARD_HEIGHT,
    articleCount,
    collectionCount,
    logo,
    description,
    name,
    imageURL,
  } = props;

  return (
    <BaseCard
      imageURL={null}
      cardWidth={DEFAULT_CARD_WIDTH}
      cardHeight={cardHeight}
    >
      <Container cardHeight={cardHeight}>
        <LabelContainer>
          <Label textAlign="center">{"Community"}</Label>
        </LabelContainer>
        {linkComponent ? (
          linkComponent(
            <CardContent description={description} name={name} logo={logo} />
          )
        ) : (
          <CardContent description={description} name={name} logo={logo} />
        )}
        {(Boolean(Number(articleCount)) ||
          Boolean(Number(collectionCount))) && <Divider />}
        <Footer>
          {!!Number(articleCount) && (
            <Count imageURL={imageURL}>
              <H4>{articleCount}</H4>
              <Label>{`Article${Number(articleCount) > 1 ? "s" : ""}`}</Label>
            </Count>
          )}
          {!!Number(collectionCount) && (
            <Count imageURL={imageURL}>
              <H4>{collectionCount}</H4>
              <Label>{`Collection${
                Number(collectionCount) > 1 ? "s" : ""
              }`}</Label>
            </Count>
          )}
        </Footer>
      </Container>
    </BaseCard>
  );
};

export default CommunityCard;
