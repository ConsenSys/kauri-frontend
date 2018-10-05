// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import ArticleCard from '../components/Card/ArticleCard'
import moment from 'moment'

storiesOf('ArticleCard', module)
  .add('hey', () => (
    <ArticleCard
      article={{ id: '1234567890' }}
      date={moment(1538734619928).format('D MMM YYYY')}
      title={'Two Line Title Two Line Title Two Line Title Two Line Title'}
      articleId={'1234567890'}
      articleVersion={'1'}
      content={
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Praesent sed cursus purus.
      In facilisis nulla sed efficitur posuere.
      Maecenas vestibulum elementum interdum.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec non eleifend ex, eu interdum justo.
      Duis dolor nibh, ornare eu egestas non, dapibus ornare nisl.
      Nunc nec dui id magna ullamcorper semper.
      Morbi mollis mauris quis orci tristique posuere ac non magna.
      Nam lectus ipsum, molestie sit…
      `
      }
      username={'USERNAME GOES HERE'}
      userId={'HEY'}
      cardHeight={500}
    />
  ))
