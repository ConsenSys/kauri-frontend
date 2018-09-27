import styled from 'styled-components';
import ScrollToTopOnMount from '../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs';
import StatisticsContainer from '../../../../kauri-components/components/PublicProfile/StatisticsContainer.bs';
import Tabs from '../../common/Tabs';
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard.bs';
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard.bs';
import { Link } from '../../../routes';
import moment from 'moment';
import userIdTrim from '../../../lib/userid-trim';

const PublicProfileHeader = styled.div`
    height: 190px;
    background-color: #1e2428;
    display: flex;
    align-items: center;
    color: white;
    padding: 2.5em calc((100vw - 1280px) / 2);
    justify-content: space-between;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    flex-wrap: wrap;
    padding: 0px calc((100vw - 1280px) / 2);
    padding-bottom: 0;
    padding-top: ${props => props.theme.space[4]}px;
`;


const Initial = styled.div`
    background: #0ba986;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    font-size: ${props => props.theme.fontSizes[5]}px;
    font-weight: 700;
`;

const Address = styled.div`
    font-size: ${props => props.theme.fontSizes[3]}px;
    font-weight: 700;
    color:white;
    margin: ${props => props.theme.space[3]}px;
    flex: 1;
`;

const Stats = styled.div`
    margin-right: 136px;
    h3, span {
        color: white;
        opacity: 1;
    }
`;

const PublicProfile = ({ UserQuery, ArticlesQuery, CollectionQuery, routeChangeAction }) => <div>
    <PublicProfileHeader>
        <Initial>{(UserQuery.getUser.name || UserQuery.getUser.id).substring(0,1)}</Initial>
        <Address>{UserQuery.getUser.id}</Address>
        <Stats>
            {ArticlesQuery && ArticlesQuery.searchArticles.content &&
                <StatisticsContainer
                    statistics={[{
                        name: 'Articles',
                        count: ArticlesQuery.searchArticles.content.length
                    }, {
                        name: 'Collections',
                        count: CollectionQuery.searchCollections.content.length
                    }]}/>}
        </Stats>

    </PublicProfileHeader>
    <Tabs
        tabs={["Articles", "Collections"]}
        panels={[
            <ContentContainer>
                {ArticlesQuery.searchArticles.content.length === 0 && <div>U-oh, no articles here!</div>}
                {ArticlesQuery.searchArticles.content.map(article => 
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
                />)}
            </ContentContainer>,
            <ContentContainer>
                {CollectionQuery.searchCollections.content.length === 0 && <div>U-oh, no collections here!</div>}
                {CollectionQuery.searchCollections.content.map(collection => {
                    const articleCount = collection.sections && collection.sections.reduce(
                        (current, next) => {
                            current += next.resources && next.resources.length
                            return current
                        }, 0);
                    return (
                        <CollectionCard
                            changeRoute={routeChangeAction}
                            key={collection.id}
                            collectionName={collection.name}
                            username={collection.owner && (collection.owner.name || userIdTrim(collection.owner.id))}
                            userId={collection.owner && collection.owner.id}
                            articles={articleCount}
                            lastUpdated={moment(collection.dateCreated).fromNow()}
                            collectionId={collection.id}
                            imageURL={collection.background && collection.background.replace('dev2', 'beta')}
                            profileImage={collection.profileImage}
                            cardHeight={500}
                            collectionDescription={collection.description}
                            linkComponent={(childrenProps, route) => (
                            <Link toSlug={route.includes('collection') && collection.name} useAnchorTag route={route}>
                                {childrenProps}
                            </Link>
                            )}
                        />
                    );
                })}
            </ContentContainer>,
        ]}
    />
</div>;

export default PublicProfile;