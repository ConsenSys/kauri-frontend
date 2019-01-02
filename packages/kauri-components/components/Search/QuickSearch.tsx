import { H3 } from '../Typography';
import styled from '../../lib/styled-components';
import { TagList } from '../Tags';
import Tabs from '../Tabs';

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
`;

const Result = (props: { key: string; result: IResult }) => <ResultComp>
    <H3><div dangerouslySetInnerHTML={{__html: props.result.name}} /></H3>
    <div dangerouslySetInnerHTML={{__html: props.result.description}} />
    {props.result.tags && <TagList color="textPrimary" tags={props.result.tags} maxTags={3} />}
</ResultComp>;

const SearchResults = (props: { results: IResult[]}) => <>
    {props.results.map(i => <Result key={i.id} result={i} />)}
</>;

const Search = (props: IProps) => <SearchComp>
    <Tabs
        dark={false}
        tabs={['Articles','Collections', 'Communities','Users']}
        panels={[
            <SearchResults key="ARTICLE" results={props.results.filter(i => i.type === 'ARTICLE')} />,
            <SearchResults key="COLLECTION" results={props.results.filter(i => i.type === 'COLLECTION')} />,
            <SearchResults key="COMMUNITY" results={props.results.filter(i => i.type === 'COMMUNITY')} />,
            <SearchResults key="USER" results={props.results.filter(i => i.type === 'USER')} />
        ]}
    />
</SearchComp>;

export default Search;