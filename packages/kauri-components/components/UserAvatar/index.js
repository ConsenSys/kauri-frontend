// @flow
import React from 'react'
import styled from 'styled-components'
import { H6 } from '../Typography'
import userIdTrim from '../../../kauri-web/lib/userid-trim'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: ${props => !props.fullWidth && '140px'};
  > :first-child {
    margin-right: ${props => props.theme.space[1]}px;
  }
  > :nth-child(2) {
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: ${props => !props.fullWidth && '100px'};
    color: ${props => props.imageURL ? 'white' : props.color ? props.theme.colors[props.color] : props.theme.colors['textPrimary']};
  }
`

const Avatar = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${props => props.theme.colors['textPrimary']};
  > * {
    color: ${props => props.theme.colors[props.color]};
    text-transform: uppercase;
    line-height: 10px;
  }
`

const ProfileImage = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-position: center center;
  background: url(${props => props.avatar}) no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
`

type Props = {
  color?: string,
  avatar?: string,
  username: ?string,
  userId: string,
  imageURL?: string,
  fullWidth?: boolean,
}

export default (props: Props) => (
  <Container color={typeof props.color === 'string' ? props.color : 'textPrimary'} imageURL={props.imageURL} fullWidth={props.fullWidth}>
    <Avatar color={typeof props.color === 'string' ? props.color : 'white'}>
      {typeof props.avatar === 'string' ? (
        <ProfileImage avatar={props.avatar} alt='Logo' />
      ) : (
        <H6>{(typeof props.username === 'string' && props.username.charAt(0)) ||
            typeof props.userId === 'string' ? props.userId.charAt(0) : 'Anonymous'}</H6>
      )}
    </Avatar>
    <H6>
      {(typeof props.username === 'string' ? props.username
        : (typeof props.userId === 'string' ? props.userId.length > 15 ? userIdTrim(props.userId) : props.userId : 'Anonymous'))}
    </H6>
  </Container>
)
