// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import UserAvatar from '../components/UserAvatar'

storiesOf('UserAvatar', module)
  .add('userid, without imageurl', () => <UserAvatar userId={'bfecec47dd8bf5f6264a9830a9d26ef387c38a67'} />)
  .add('with imageurl, with short username', () => (
    <UserAvatar
      avatar={'https://pbs.twimg.com/profile_images/626149701189042177/LWpxKEv3_400x400.png'}
      userId={'bfecec47dd8bf5f6264a9830a9d26ef387c38a67'}
      username={'rej156'}
    />
  ))
  .add('with imageurl, with long username', () => (
    <UserAvatar
      avatar={'https://pbs.twimg.com/profile_images/626149701189042177/LWpxKEv3_400x400.png'}
      userId={'bfecec47dd8bf5f6264a9830a9d26ef387c38a67'}
      username={'LongUsernameGoesHere'}
    />
  ))
  .add('without imageurl, with normal username', () => (
    <UserAvatar userId={'bfecec47dd8bf5f6264a9830a9d26ef387c38a67'} username={'rej156'} />
  ))
  .add('without imageurl, with long username', () => (
    <UserAvatar userId={'bfecec47dd8bf5f6264a9830a9d26ef387c38a67'} username={'LongUsernameGoesHere'} />
  ))
