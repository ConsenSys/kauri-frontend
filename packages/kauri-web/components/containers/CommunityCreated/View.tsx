import React from "react";
import styled from "styled-components";
import CommunityCard from "../../../../kauri-components/components/Card/CommunityCard";
import { Link } from "../../../routes";
import Head from "next/head";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import {
  Title2,
  BodyCard,
} from "../../../../kauri-components/components/Typography";
import { getCommunity } from "../../../queries/__generated__/getCommunity";

interface IProps {
  data: getCommunity;
  routeChangeAction: (route: string) => void;
  type: "created" | "updated";
}

const Container = styled.section`
  display: flex;
  height: calc(100vh - 76px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.textPrimary};
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
    color: white;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[3]}px;
    color: white;
  }
  > :nth-child(3) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CommunityCreated: React.FunctionComponent<IProps> = props => {
  const { routeChangeAction, type } = props;
  const copy = type === "updated" ? "updated" : "live";
  const subtitleCopy =
    copy === "live" ? (
      <Row>
        <BodyCard>
          Your community will be live soon, once the transaction is mined!
        </BodyCard>
        <BodyCard>This usually takes less than 10 seconds.</BodyCard>
      </Row>
    ) : (
      <BodyCard>Your community is now updated</BodyCard>
    );

  if (props.data.getCommunity) {
    const {
      approved,
      id,
      description,
      name,
      avatar,
      attributes,
      // tags,
    } = props.data.getCommunity;

    const articleCount =
      approved &&
      approved.reduce((current, next) => {
        if (next && next.__typename === "ArticleDTO") {
          current += 1;
        }
        return current;
      }, 0);

    const collectionCount =
      approved &&
      approved.reduce((current, next) => {
        if (next && next.__typename === "CollectionDTO") {
          current += 1;
        }
        return current;
      }, 0);

    return (
      <Container>
        <Head>
          <title>{`Community ${copy} - Kauri`}</title>
        </Head>
        <Title2>Community</Title2>
        {subtitleCopy}
        <CommunityCard
          cardHeight={310}
          description={String(description)}
          name={String(name)}
          imageURL={attributes && attributes.background}
          logo={avatar}
          articleCount={String(articleCount)}
          collectionCount={String(collectionCount)}
          linkComponent={(childrenProps: React.ReactElement<any>) => (
            <Link
              toSlug={name}
              useAnchorTag={true}
              fullWidth={false}
              href={`/community/${String(id)}`}
            >
              {childrenProps}
            </Link>
          )}
        />
        <PrimaryButton
          onClick={() => routeChangeAction(`/community/${String(id)}`)}
        >
          View Community
        </PrimaryButton>
      </Container>
    );
  }
  return null;
};

export default CommunityCreated;
