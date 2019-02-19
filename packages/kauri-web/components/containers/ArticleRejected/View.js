// @flow
import React from "react";
import styled from "styled-components";
import SecondaryButton from "../../../../kauri-components/components/Button/SecondaryButton";
import { ArticleApprovedConfirmationLogoBadge } from "../../common/ActionBadge";
import { menuHeaderHeight } from "../Navbar/View";

type Props = {
  data?: { getArticle?: ArticleDTO },
  routeChangeAction: string => void,
};

const ConfirmationSubject = styled.h2`
  color: #ffffff;
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 50px;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${menuHeaderHeight}px);
  background-color: ${props => props.theme.primaryTextColor};
  > :first-child {
    margin-bottom: 30px;
    margin-bottom: 7px;
  }
`;

class ArticleRejected extends React.Component<Props> {
  render() {
    const { data, routeChangeAction, userId } = this.props;
    return (
      <Container>
        <ArticleApprovedConfirmationLogoBadge
          chosenCategory={data && data.getArticle && data.getArticle.category}
          confirmationMessage={"Article Rejected"}
        />
        <ConfirmationSubject>
          {(data && data.getArticle && data.getArticle.subject) ||
            "The author has been notified by email with your note."}
        </ConfirmationSubject>
        <SecondaryButton
          onClick={() => routeChangeAction(`/public-profile/${userId}`)}
        >
          Back to my articles
        </SecondaryButton>
      </Container>
    );
  }
}

export default ArticleRejected;
