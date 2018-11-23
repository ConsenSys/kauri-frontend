// @flow
import React from "react";
import { ActionButtons, ActionButton } from "../../common/ActionButton";
import { ArticleApprovedConfirmationLogoBadge } from "../../common/ActionBadge";
import {
  Container as RequestCreatedContainer,
  ConfirmationSubject as RequestConfirmationSubject,
} from "../RequestCreated/View";

type Props = {
  data?: { getArticle?: ArticleDTO },
  routeChangeAction: string => void,
};

const ConfirmationSubject = styled(RequestConfirmationSubject)`
  font-size: 16px;
  margin-bottom: 50px;
`;

const Container = styled(RequestCreatedContainer)`
  > :first-child {
    margin-bottom: 7px;
  }
`;

const ArticleApprovedActionButtons = styled(ActionButtons)`
  > :first-child {
    margin-right: 0px;
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
          {data && data.getArticle && data.getArticle.subject}
        </ConfirmationSubject>
        <ArticleApprovedActionButtons>
          <ActionButton
            action={() => routeChangeAction(`/public-profile/${userId}`)}
            height={40}
            width={183}
            label={"Back to my articles"}
            type="alt"
          />
        </ArticleApprovedActionButtons>
      </Container>
    );
  }
}

export default ArticleRejected;
