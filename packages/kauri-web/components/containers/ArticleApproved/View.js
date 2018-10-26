// @flow
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard'
import { Link } from '../../../routes'
import { ActionButtons, PositiveRequestActionBadge } from '../../common/ActionButton'
import { ArticleApprovedConfirmationLogoBadge } from '../../common/ActionBadge'
import {
  Container as RequestCreatedContainer,
  ConfirmationSubject as RequestConfirmationSubject,
} from '../RequestCreated/View'
import { Helmet } from 'react-helmet'
import R from 'ramda'

type Props = {
  data: { getArticle: ArticleDTO },
  routeChangeAction: string => void,
  type: 'published' | 'approved' | 'drafted' | 'updated',
}

const ConfirmationSubject = RequestConfirmationSubject.extend`
  font-size: 16px;
  margin-bottom: 80px;
`

const Container = RequestCreatedContainer.extend`
  > :first-child {
    margin-bottom: 7px;
  }
`

const ArticleApprovedActionButtons = ActionButtons.extend`
  margin-top: 20px;
  > :first-child {
    margin-right: 0px;
  }
`

class ArticleApproved extends React.Component<Props> {
  render () {
    const { data, routeChangeAction, type } = this.props
    const article = data.getArticle
    const subjectCopy = R.cond([
      [R.equals('updated'), R.always('draft has been updated')],
      [R.equals('drafted'), R.always('draft has been saved')],
      [R.equals('published'), R.always('is now live')],
      [R.equals('approved'), R.always('now needs publishing from author before going live')],
    ])(type)

    const capitalize = R.replace(/^./, R.toUpper)

    return (
      <Container>
        <Helmet>
          <title>{`Kauri - Article ${capitalize(type)}`}</title>
        </Helmet>
        <ArticleApprovedConfirmationLogoBadge confirmationMessage={type} />
        <ConfirmationSubject>{`The article ${subjectCopy}`}</ConfirmationSubject>
        <ArticleCard
          key={article.id}
          id={article.id}
          version={article.version}
          date={moment(article.datePublished || article.dateCreated).format('D MMM YYYY')}
          title={article.title}
          content={article.content}
          username={(article.owner && article.owner.username) || (article.author && article.author.username)}
          userId={(article.owner && article.owner.id) || (article.author && article.author.id)}
          userAvatar={(article.owner && article.owner.avatar) || (article.author && article.author.avatar)}
          imageURL={article.attributes && article.attributes.background}
          cardHeight={420}
          linkComponent={(childrenProps, route) => (
            <Link toSlug={route.includes('article') && article.title} useAnchorTag href={route}>
              {childrenProps}
            </Link>
          )}
          changeRoute={routeChangeAction}
        />
        <ArticleApprovedActionButtons>
          <PositiveRequestActionBadge
            action={() => routeChangeAction(`/public-profile/${this.props.user.id}`)}
            height={40}
            width={183}
            label='My Articles'
            type='primary'
          />
        </ArticleApprovedActionButtons>
      </Container>
    )
  }
}

export default ArticleApproved
