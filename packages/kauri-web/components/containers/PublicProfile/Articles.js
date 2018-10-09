//@flow

import moment from 'moment';
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard.bs';
import Empty from './Empty';
import { Link } from '../../../routes';
import userIdTrim from '../../../lib/userid-trim';
import ContentContainer from './PublicProfileContentContainer';
import type { ArticlesProps } from './types';

const Articles = ({ articles, type, routeChangeAction } : ArticlesProps) =>
    articles.content.length > 0 ?
    <ContentContainer>
        {articles.content.map(article => 
                <ArticleCard
                    changeRoute={routeChangeAction}
                    key={article.id}
                    date={moment(article.dateCreated).format('D MMM YYYY')}
                    title={article.title}
                    content={article.content}
                    userId={type !== 'toBeApproved' && article.owner ? article.owner.id : article.author.id}
                    username={type !== 'toBeApproved' && article.owner ? article.owner.username : article.author.username}
                    articleId={article.id}
                    articleVersion={article.version}
                    cardHeight={500}
                    imageURL={article.attributes && article.attributes.background}
                    linkComponent={(childrenProps, route) => (
                    <Link toSlug={route.includes('article') && article.title} useAnchorTag route={route}>
                        {childrenProps}
                    </Link>
                    )}
            />)}</ContentContainer> : <Empty />;

export default Articles;