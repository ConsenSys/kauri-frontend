import * as React from "react";
import * as t from "io-ts";
import styled from "styled-components";
import * as R from "ramda";

const Count = styled.h3`
  color: white;
  font-size: ${props => props.theme.fontSize[7]}px;
  font-weight: ${props => props.theme.fontWeight[2]};
  margin: 0px;
  margin-bottom: ${props => props.theme.space[0]}px;
  opacity: ${props => (typeof props.pageType === "string" ? 0.2 : 1.0)};
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 150px;
`;

const Name = styled.span`
  color: white;
  font-size: ${props => props.theme.fontSize[0]}px;
  font-weight: ${props => props.theme.fontWeight[3]};
  opacity: ${props => (typeof props.pageType === "string" ? 0.2 : 1.0)};
  text-transform: uppercase;
`;

const pluraliseCount = (payload: number) =>
  R.cond([
    [count => count > 1000000, count => `${(count / 1000000).toPrecision(2)}M`],
    [
      count => count > 1000 && count < 1000000,
      count => `${(count / 1000).toPrecision(2)}K`,
    ],
    [count => count < 1000, count => String(count)],
  ])(payload);

const lastStringValue = (name: string) => name.substring(name.length - 1, 1);

const pluraliseName = (payload: { count: number; name: string }) =>
  R.cond([
    [
      ({ count, name }) => count > 1 && lastStringValue(name) === "s",
      name => name,
    ],
    [
      ({ count, name }) => count > 1 && lastStringValue(name) !== "s",
      name => `${name}s`,
    ],
    [
      ({ count, name }) => count === 1 && lastStringValue(name) === "s",
      name => name.substring(0, name.length - 1),
    ],
    [({ name }) => typeof name === "string", name => name],
  ])(payload);

const RuntimeProps = t.interface({
  count: t.number,
  name: t.string,
  pageType: t.union([t.literal("CollectionPage"), t.nullType]),
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Container: React.SFC<Props> = ({ name, count, pageType }) => (
  <SectionContainer>
    <Count pageType={pageType}>{pluraliseCount(count)}</Count>
    <Name pageType={pageType}>{pluraliseName({ name, count })}</Name>
  </SectionContainer>
);

export default Container;
