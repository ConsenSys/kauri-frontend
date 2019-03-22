import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import TextTruncate from "react-text-truncate";
import styled from "../../lib/styled-components";
import { Label, BodyCard, H1, H4 } from "../Typography";
import BaseCard from "../Card/BaseCard";
import { TagList } from "../Tags";

const DEFAULT_CARD_HEIGHT = 310;
const DEFAULT_CARD_WIDTH = 290;

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
  width: 46px;
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
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > h1 {
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
  padding-top: ${props =>
    typeof props.imageURL === "string" ? props.theme.space[1] + "px" : ""};
  > * {
    text-transform: uppercase;
  }
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${props => props.theme.colors.divider};
  margin-top: auto;
  margin-bottom: ${props => props.theme.space[1]}px;
`;

const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
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
      <Label textTransform={"uppercase"} />
      {logo ? (
        <ImageContainer>
          <Image src={logo} />
        </ImageContainer>
      ) : null}
      <H1>{name}</H1>
      <BodyCard>
        <TextTruncate
          line={typeof logo === "string" ? 3 : 6}
          truncateText="…"
          text={description}
        />
      </BodyCard>
    </Content>
  </React.Fragment>
);

const RuntimeProps = t.interface({
  articleCount: t.string,
  cardHeight: t.number,
  collectionCount: t.string,
  description: t.string,
  imageURL: t.union([t.null, t.string]),
  linkComponent: t.union([t.undefined, t.null, t.any]),
  logo: t.union([t.null, t.string]),
  name: t.string,
  tags: t.union([t.array(t.union([t.null, t.string])), t.null]),
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Component: React.SFC<Props> = props => {
  const {
    linkComponent,
    cardHeight = DEFAULT_CARD_HEIGHT,
    articleCount,
    collectionCount,
    logo,
    description,
    name,
    tags,
    imageURL,
  } = RuntimeProps.decode(props).getOrElseL(errors => {
    throw new Error(failure(errors).join("\n"));
  });

  return (
    <BaseCard
      imageURL={null}
      cardWidth={DEFAULT_CARD_WIDTH}
      cardHeight={cardHeight}
    >
      <Container cardHeight={cardHeight}>
        {linkComponent ? (
          linkComponent(
            <CardContent description={description} name={name} logo={logo} />
          )
        ) : (
          <CardContent description={description} name={name} logo={logo} />
        )}
        {Array.isArray(tags) && tags.length > 0 && (
          <TagList
            align="center"
            maxTags={3}
            color="textPrimary"
            tags={tags}
            maxChars={40}
          />
        )}
        <Divider />
        <Footer>
          <CountContainer>
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
          </CountContainer>
        </Footer>
      </Container>
    </BaseCard>
  );
};

export default Component;
