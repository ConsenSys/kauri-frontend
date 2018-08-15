// @flow
import React from 'react'
import styled from 'styled-components'
import Approval from '../../Approval'
import { Divider } from 'antd'

import type { ApproveArticlePayload } from '../../../Article/Module'

type Props = {
  data: { searchArticles: { content: Array<?ArticleDTO>, totalElements: ?number } },
  routeChangeAction: string => void,
  approveArticleAction: ApproveArticlePayload => void,
  allArticlesAreRejected: () => void,
}

const Container = styled.section`
  padding-left: 100px;
`

class ArticleRequestSubmissions extends React.Component<Props> {
  componentDidMount () {
    const {
      data: {
        searchArticles: { totalElements },
      },
    } = this.props
    if (totalElements === 0) {
      this.props.allArticlesAreRejected()
    }
  }

  render () {
    const {
      routeChangeAction,
      approveArticleAction,
      data: {
        searchArticles: { content },
      },
    } = this.props
    return (
      <Container>
        {content &&
          content.map(
            (article, index) =>
              index !== content.length - 1 ? (
                [
                  <Approval
                    key={`${article.article_id}-${article.article_version}`}
                    routeChangeAction={routeChangeAction}
                    approveArticleAction={approveArticleAction}
                    {...article}
                  />,
                  <Divider key={article.article_id + 'divider'} />,
                ]
              ) : (
                <Approval
                  key={`${article.article_id}-${article.article_version}`}
                  routeChangeAction={routeChangeAction}
                  approveArticleAction={approveArticleAction}
                  {...article}
                />
              )
          )}
      </Container>
    )
  }
}

export default ArticleRequestSubmissions
