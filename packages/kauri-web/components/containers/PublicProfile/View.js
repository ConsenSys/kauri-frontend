import styled from 'styled-components';
import ScrollToTopOnMount from '../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs';
import StatisticsContainer from '../../../../kauri-components/components/PublicProfile/StatisticsContainer.bs';

const PublicProfileHeader = styled.div`
    height: 190px;
    background-color: #1e2428;
    display: flex;
    align-items: center;
    color: white;
    padding: 2.5em calc((100vw - 1280px) / 2);
    justify-content: space-between;
`;

const ArticlesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    flex-wrap: wrap;
    padding: 0px calc((100vw - 1280px) / 2);
    padding-bottom: 0;
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

const PublicProfile = props => <div>
    <PublicProfileHeader>
        <Initial>{(props.UserQuery.getUser.name || props.UserQuery.getUser.id).substring(0,1)}</Initial>
        <Address>{props.UserQuery.getUser.id}</Address>
        <Stats>
            <StatisticsContainer statistics={[{ 'name': 'Articles', 'count': 3 }]}/>
        </Stats>
    </PublicProfileHeader>
    <ArticlesContainer>Test</ArticlesContainer>
</div>;

export default PublicProfile;