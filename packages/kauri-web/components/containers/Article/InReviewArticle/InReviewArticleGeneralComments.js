// @flow
import React from 'react'
import styled from 'styled-components'
import { Divider } from 'antd'
import moment from 'moment'
import Comment from '../../Request/Comment'

const Container = styled.section`
  margin-top: auto;
  display: flex;
  width: 100%;
  flex-direction: column;
`

export default ({ comments }: { comments: Array<?CommentDTO> }) => (
  <Container>
    <Divider />
    {Array.isArray(comments) &&
      comments.length > 0 &&
      comments.map(
        ({ comment, user_id, date_created, user }, index, comments) =>
          index !== comments.length - 1 ? (
            <div key={date_created}>
              <Comment
                key={date_created}
                type='in review article'
                user_id={user_id}
                comment={comment}
                user={user}
                posted={moment(date_created).fromNow()}
              />
              <Divider />
            </div>
          ) : (
            <Comment
              key={date_created}
              type='in review article'
              user_id={user_id}
              comment={comment}
              user={user}
              posted={moment(date_created).fromNow()}
            />
          )
      )}
  </Container>
)
