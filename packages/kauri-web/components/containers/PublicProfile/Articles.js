import moment from 'moment';
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard.bs';
import Empty from './Empty';
import { Link } from '../../../routes';
import userIdTrim from '../../../lib/userid-trim';
import ContentContainer from './PublicProfileContentContainer'

const Articles = ({ articles, routeChangeAction }) =>
    articles.content.length > 0 ?
    <ContentContainer>{articles.content.map(article => 
                <ArticleCard
                    changeRoute={routeChangeAction}
                    key={article.id}
                    date={moment(article.dateCreated).format('D MMM YYYY')}
                    title={article.title}
                    content={article.content}
                    userId={article.author && article.author.id}
                    username={article.author && (article.author.name || userIdTrim(article.author.id))}
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