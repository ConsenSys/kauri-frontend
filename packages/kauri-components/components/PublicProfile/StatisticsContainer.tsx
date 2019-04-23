import * as React from "react";
import styled from "styled-components";
import StatisticCount from "./StatisticCount";

const StatisticsContainer = styled.section`
  display: flex;
  flex-direction: row;
  > :not(:first-child) {
    margin-left: ${props => props.theme.space[4]}px;
  }
`;

interface IStatistic {
  count: number;
  name: string;
}

interface IProps {
  pageType?: "CreateCollectionPage" | "CreateCommunityPage" | "CollectionPage";
  statistics: IStatistic[];
}

const Container: React.SFC<IProps> = props => {
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
