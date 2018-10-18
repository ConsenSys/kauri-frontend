// @flow
import React from 'react'
import styled, { css } from 'styled-components'

const singleCommentCss = css`
  position: absolute;
  top: ${props => props.offsetTop}px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50px;
  > :first-child {
    margin-right: 10px;
    margin-top: 2px;
  }
  width: 256px;
  ${props => props.offsetTop && singleCommentCss};
`

const CategoryIcon = styled.img`
  height: 17px;
  width: 17px;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
`

const DeleteComment = styled.button`
  cursor: pointer;
  margin-top: 2px;
  font-weight: 700;
  font-size: 12px;
  color: ${props => props.theme.primaryColor};
  width: 45px;
  background: transparent;
  border: none;
  text-align: left;
  padding-left: 0px;
`

type Props = {
  comment: string | CommentDTO,
  category: string,
  offsetTop?: number,
  onMouseEnter?: any,
  onMouseLeave?: any,
  username?: ?string,
  personalUsername: ?string,
  deleteArticleComment: any,
  comment_id: number,
}

const UsernameDetails = styled.div`
  > :first-child {
    margin-right: 10px;
  }
`

export default class Comment extends React.Component<Props, { offsetTop: ?number, clash: boolean }> {
  render () {
    const {
      comment,
      category,
      onMouseEnter,
      onMouseLeave,
      username,
      personalUsername,
      deleteArticleComment,
      comment_id,
    } = this.props
    return (
      <Container
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-comment-offset-key={this.props.comment.anchor_key}
        offsetTop={this.props.offsetTop}
      >
        <Details>
          <UsernameDetails>
            <CategoryIcon
              src={`/static/images/${username === personalUsername ? 'kauri' : category}/avatar.png`}
              alt='logo'
            />
            <strong>{username === personalUsername ? 'YOU' : username}</strong>
          </UsernameDetails>
          <span>{comment.comment || comment}</span>
        </Details>
        <DeleteComment onClick={() => deleteArticleComment(comment.comment_id || comment_id)}>DELETE</DeleteComment>
      </Container>
    )
  }
}

// TODO:
/*
  1 - GET highlighted BLOCK DOM NODE
  2 - node.offsetTop
  3 - Container = position: relative
  4 - Comment = position: absolute
  5 - AVI default to Kauri icon
  6 - Editor change state for highlighting comment block
*/
