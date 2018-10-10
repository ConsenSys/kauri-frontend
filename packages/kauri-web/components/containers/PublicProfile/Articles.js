// @flow
import React from 'react'
import moment from 'moment';
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard';
import Empty from './Empty';
import { Link } from '../../../routes';
import ContentContainer from './PublicProfileContentContainer';

import type { ArticlesProps } from './types';

const Articles = ({ articles, type, routeChangeAction }: ArticlesProps) =>
  articles.content.length > 0
    ? <ContentContainer>
      {articles.content.map(article =>
        <ArticleCard
          key={`${article.id}-${article.version}`}
          changeRoute={routeChangeAction}
          date={moment(article.dateCreated).format('D MMM YYYY')}
          title={article.title}
          content={article.content}
          userId={type !== 'toBeApproved' && article.owner ? article.owner.id : article.author.id}
          username={type !== 'toBeApproved' && article.owner ? article.owner.username : article.author.username}
          id={article.id}
          version={article.version}
          cardHeight={500}
          imageURL={article.attributes && article.attributes.background}
          linkComponent={(childrenProps, route) => (
            <Link toSlug={route.includes('article') && article.title} useAnchorTag href={route}>
              {childrenProps}
            </Link>
          )}
        />)}</ContentContainer> : <Empty />;

export default Articles;
