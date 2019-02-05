import React from "react";
import styled from "styled-components";
import {
  H5,
  Title1,
} from "../../../../../kauri-components/components/Typography";
import { StyledTag } from "../../../../../kauri-components/components/Tags/TagList";
import { IDiff } from "../types";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InReviewArticleHeader = styled.div`
  background: ${props => props.theme.colors.bgPrimary};
  padding: ${props => props.theme.space[3]}px ${props => props.theme.padding};
  display: flex;
  flex-direction: row;
  align-items: space-between;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

interface IProps {
  titleDiff: IDiff[];
  tagsDiff: IDiff[];
}

const Diff = styled<IDiff, "span">("span")`
  color: ${props =>
    props.added
      ? props.theme.colors.primary
      : props.removed
      ? "#800000"
      : "white"};
  text-decoration: ${props => (props.removed ? "line-through" : "none")};
`;

const HeaderDiff = ({ titleDiff, tagsDiff }: IProps) => (
  <InReviewArticleHeader>
    <InfoContainer>
      <Title1 color="white">
        {titleDiff.map((i: IDiff, key: number) => (
          <Diff key={key} {...i}>
            {i.value}
          </Diff>
        ))}
      </Title1>
      <TagContainer>
        {tagsDiff.map((i: IDiff) =>
          (i.value as string[]).map((tag: string) => (
            <StyledTag
              color={i.added ? "primary" : i.removed ? "red" : "white"}
              key={tag}
            >
              {tag}
            </StyledTag>
          ))
        )}
      </TagContainer>
    </InfoContainer>
    <H5 color="white">Pending Review</H5>
  </InReviewArticleHeader>
);

export default HeaderDiff;
