import * as React from "react";
import * as t from "io-ts";
import { failure } from "io-ts/lib/PathReporter";
import styled from "styled-components";
import StatisticCount from "./StatisticCount";

const StatisticsContainer = styled.section`
  display: flex;
  flex-direction: row;
  > :not(:first-child) {
    margin-left: ${props => props.theme.space[4]}px;
  }
`;

const PageType = t.union([
  t.literal("CreateCollectionPage"),
  t.literal("CreateCommunityPage"),
]);

const Statistic = t.type({
  count: t.number,
  name: t.string,
});

const Statistics = t.array(Statistic);

const RuntimeProps = t.interface({
  pageType: t.union([PageType, t.undefined]),
  statistics: Statistics,
});

type Props = t.TypeOf<typeof RuntimeProps>;

const Container: React.SFC<Props> = props => {
  RuntimeProps.decode(props).getOrElseL(errors => {
    throw new Error(failure(errors).join("\n"));
  });
  const { statistics, pageType } = props;
  return (
    <StatisticsContainer>
      {statistics.map(({ name, count }) => (
        <StatisticCount
          pageType={pageType}
          key={name}
          name={name}
          count={count}
        />
      ))}
    </StatisticsContainer>
  );
};

export default Container;
