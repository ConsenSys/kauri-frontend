import React from 'react'
import styled, { css } from 'styled-components'
import { CreateRequestLogo } from '../containers/CreateRequestForm/CreateRequestHeader'
import theme from '../../lib/theme-config'

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  > :first-child {
    margin-bottom: 11px;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    text-transform: capitalize;
  }
  > :last-child {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    margin-right: 0px;
    text-transform: uppercase;
  }
`

const ActionIcon = styled.div`
  height: ${props => props.height || '20'}px;
  width: ${props => props.width || '20'}px;
  border-radius: 4px;
  background-color: ${props => props.theme.primaryColor};
`

const ActionBadge = styled.div`
  display: flex;
  margin-right: 15px;
  align-items: center;
  cursor: pointer;
  > * {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #fff;
  }
  > :nth-child(2) {
    margin-left: 7.5px;
  }
`

const individualCategoryCss = css`
  width: 100%;
  margin-right: 0;
`

const totalArticlesCss = css`
  height: 100%;
  width: 100%;
  padding-top: 0;
  margin-right: 0;
  align-items: flex-start;
  padding-left: 11px;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 0 2px ${props => props.theme.hoverTextColor};
  }
`

const Container = styled.div`
  display: flex;
  cursor: pointer;
  padding-top: 10px;
  margin-right: 24px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${props => props.height || '76'}px;
  width: ${props => props.width || '76'}px;
  box-shadow: 0 0 0 1px ${props => props.theme[props.category] && props.theme[props.category].borderColor};
  border-radius: 4px;
  background-color: #ffffff;
  ${props => props.individualCategory && individualCategoryCss};
  ${props => props.totalArticles && totalArticlesCss};
  :hover {
    box-shadow: 0 0 0 2px ${props => props.theme.hoverTextColor};
  }
`

const Name = styled.span`
  height: 13px;
  margin-top: ${props => (props.totalArticles ? '0px' : '9px')};
  font-size: 12px;
  font-weight: 700;
  line-height: 13px;
  text-align: center;
  text-transform: uppercase;
`

export const Avatar = styled.img`
  max-height: ${props => props.avatarHeight || '30'}px;
`

const CategoryBadge = props => (
  <CategoryBadge.Container {...props}>
    {props.category && (
      <CategoryBadge.Avatar
        avatarWidth={props.avatarWidth}
        avatarHeight={props.avatarHeight}
        src={`/static/images/${props.category}/avatar.png`}
        alt='logo'
      />
    )}
    <CategoryBadge.Name>{props.category || props.username || 'Unknown Writer'}</CategoryBadge.Name>
  </CategoryBadge.Container>
)

CategoryBadge.Container = Container
CategoryBadge.Name = Name
CategoryBadge.Avatar = Avatar

const Count = styled.h2`
  font-size: 40px;
  font-weight: 300;
  line-height: 53px;
  margin-bottom: 0px;
`

const ViewAll = styled.a`
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
`

const TotalArticleBadge = props =>
  props.data && props.data.searchArticles ? (
    <Container
      onClick={() => props.routeChangeAction(`/topic/${props.category}`)}
      theme={theme}
      category={props.category}
      totalArticles
    >
      <Name>{props.category}</Name>
      <Count>{props.data.searchArticles.totalElements} Articles</Count>
      <ViewAll href={`/topic/${props.category}`}>VIEW ALL</ViewAll>
    </Container>
  ) : (
    <Container totalArticles {...props}>
      <Count>Loading articles...</Count>
    </Container>
  )

const ConfirmationLogoBadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    margin-bottom: 14px;
  }
`

const ArticleApprovedConfirmationLogoContainer = ConfirmationLogoBadgeContainer.extend`
  > : first-child {
    margin-bottom: 52px;
  }
`

const ConfirmationMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
`

const ArticleApprovedConfirmationMessage = ConfirmationMessage.extend`
  font-size: 26px;
  font-weight: normal;
  text-transform: initial;
`

const ConfirmationLogoBadge = ({ chosenCategory, confirmationMessage }) => (
  <ConfirmationLogoBadgeContainer>
    <CreateRequestLogo chosenCategory={chosenCategory} />
    <ConfirmationMessage>{confirmationMessage}</ConfirmationMessage>
  </ConfirmationLogoBadgeContainer>
)

const ArticleApprovedConfirmationLogoBadge = ({ chosenCategory, confirmationMessage }) => (
  <ArticleApprovedConfirmationLogoContainer>
    <CreateRequestLogo avatarHeight={50} height={96} width={96} chosenCategory={chosenCategory} />
    <ArticleApprovedConfirmationMessage>{confirmationMessage}</ArticleApprovedConfirmationMessage>
  </ArticleApprovedConfirmationLogoContainer>
)

const PossibleActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > :first-child {
    margin-bottom: 19px;
  }
  > :nth-child(2) {
    margin-bottom: 6px;
  }
  :not(:last-child) {
    margin-right: 100px;
  }
`

const PossibleAction = styled.h4`
  text-transform: uppercase;
  color: #ffffff;
  font-size: 13px;
  font-weight: bold;
`

const PossibleActionDescription = styled.span`
  width: 150px;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
`

const PossibleActions = styled.div`
  display: flex;
  flex-direction: row;
  margin: 60px 0;
`

const PossibleActionBadge = ({ action, description }) => (
  <PossibleActionContainer>
    <ActionIcon height={30} width={30} />
    <PossibleAction>{action}</PossibleAction>
    <PossibleActionDescription>{description}</PossibleActionDescription>
  </PossibleActionContainer>
)

export {
  Badge,
  ActionBadge,
  ActionIcon,
  CategoryBadge,
  TotalArticleBadge,
  ConfirmationLogoBadge,
  PossibleActionBadge,
  PossibleActions,
  ArticleApprovedConfirmationLogoBadge,
}

export default ActionBadge
