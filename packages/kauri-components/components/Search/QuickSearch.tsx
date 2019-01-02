import { H3 } from '../Typography';
import styled from '../../lib/styled-components';
import { TagList } from '../Tags';
import Tabs from '../Tabs';
import PrimaryButton from '../Button/PrimaryButton';

interface IResult {
    description: string;
    id: string;
    name: string;
    score: number;
    tags?: string[] | null;
    type: string;
}

interface IProps {
    results: IResult[];
}

const ResultComp = styled.div`
    padding: ${props => props.theme.space[1]}px ${props => props.theme.space[1]}px 0;
    width: 100%;

    & .highlighter {
        background: ${props => props.theme.colors.primary};
        color: white;
        padding: 0px 2px;
        border-radius: 2px;
    }
`;

const SearchComp = styled.div`
    margin: ${props => props.theme.space[2]}px;
    background: white;
    max-width: 400px;
    padding-bottom: ${props => props.theme.space[1]}px;
    border-radius: 4px;
`;

const ResultsComp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Result = (props: { key: string; result: IResult }) => <ResultComp>
    <H3><div dangerouslySetInnerHTML={{__html: props.result.name}} /></H3>
    <div dangerouslySetInnerHTML={{__html: props.result.description}} />
    {props.result.tags && <TagList color="textPrimary" tags={props.result.tags} maxTags={3} />}
</ResultComp>;

const SearchResults = (props: { type: string; results: IResult[]}) => <ResultsComp>
    {props.results.map(i => <Result key={i.id} result={i} />)}
    <PrimaryButton text={`View all ${props.type}`} />
</ResultsComp>;

const Search = (props: IProps) => <SearchComp>
    <Tabs
        dark={false}
        tabs={['Articles','Collections', 'Communities','Users']}
        panels={[
            <SearchResults type="ARTICLES" key="ARTICLES" results={props.results.filter(i => i.type === 'ARTICLE')} />,
            <SearchResults type="COLLECTIONS" key="COLLECTIONS" results={props.results.filter(i => i.type === 'COLLECTION')} />,
            <SearchResults type="COMMUNITIES" key="COMMUNITIES" results={props.results.filter(i => i.type === 'COMMUNITY')} />,
            <SearchResults type="USERS" key="USERS" results={props.results.filter(i => i.type === 'USER')} />
        ]}
    />
</SearchComp>;

export default Search;