// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { routeChangeAction } from '../../../lib/Module'
import { Link } from '../../../routes'
import { Label } from '../../../../kauri-components/components/Typography'

type Props = {
  data: {
    search: {
      content: Array<?ArticleDTO>,
    },
  },
  routeChangeAction: string => void,
}


const ArticleItem = styled.div`
  &:hover {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s;
  }
`;

class Related extends Component<Props> {
  render () {
    const { search } = this.props.data
    const pageTitle = 'Discover Related'
    const articles = search.content.filter(i => i.resourceIdentifier.type === "ARTICLE");
    console.log(articles);

    if (articles.length < 1) return null;

    return (
      <>
        <Label>Related Articles</Label>
        {
          articles.map(i => <Link route={`/article/${i.resourceIdentifier.id}`}>
            <ArticleItem>{i.name}</ArticleItem>
          </Link>)}
      </>
    )
  }
}

export default Related
