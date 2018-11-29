import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import TextTruncate from "react-text-truncate";
import styled from "../../lib/styled-components";
import { Label, BodyCard, H1 } from "../Typography";
import BaseCard from "../Card/BaseCard";

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
  height: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${props => props.theme.space[2]}px ${props => props.theme.space[2]}px
    0px ${props => props.theme.space[2]}px;
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

const Divider = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${props => props.theme.colors.divider};
  margin-top: auto;
`;

const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
`;

interface ICardContentProps {
  communityDescription: string;
  communityName: string;
  communityLogo: string | null;
}

const CardContent: React.SFC<ICardContentProps> = ({
  communityDescription,
  communityName,
  communityLogo,
}) => (
  <React.Fragment>
    <Content>
      <Label textTransform={"uppercase"}>Community</Label>
      {communityLogo ? (
        <ImageContainer>
          <Image src={communityLogo} />
        </ImageContainer>
      ) : null}
      <H1>{communityName}</H1>
      <BodyCard>
        <TextTruncate
          line={typeof communityLogo === "string" ? 2 : 4}
          truncateText="…"
          text={communityDescription}
        />
      </BodyCard>
    </Content>
  </React.Fragment>
);

const RuntimeProps = t.interface({
  articles: t.string,
  cardHeight: t.number,
  communityDescription: t.string,
  communityLogo: t.union([t.null, t.string]),
  communityName: t.string,
  linkComponent: t.union([t.undefined, t.null, t.any]),
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Component: React.SFC<Props> = props => {
  const {
    linkComponent,
    cardHeight = 290,
    articles,
    communityLogo,
    communityDescription,
    communityName,
  } = RuntimeProps.decode(props).getOrElseL(errors => {
    throw new Error(failure(errors).join("\n"));
  });
  return (
    <BaseCard cardWidth={cardHeight} cardHeight={cardHeight}>
      <Container cardHeight={cardHeight}>
        {linkComponent ? (
          linkComponent(
            <CardContent
              communityDescription={communityDescription}
              communityName={communityName}
              communityLogo={communityLogo}
            />
          )
        ) : (
          <CardContent
            communityDescription={communityDescription}
            communityName={communityName}
            communityLogo={communityLogo}
          />
        )}
        <Divider />
        <Footer>
          <CountContainer>
            <Label>{articles}</Label>
            <Label>Articles</Label>
          </CountContainer>
        </Footer>
      </Container>
    </BaseCard>
  );
};

export default Component;
