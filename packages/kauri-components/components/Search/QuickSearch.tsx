import { H3 } from '../Typography';
import styled from '../../lib/styled-components';
import { TagList } from '../Tags';

interface IResult {
    description: string;
    id: string;
    name: string;
    score: number;
    tags: string[];
    type: string;
}

interface IProps {
    results: IResult[];
}

const Result = styled.div`
    padding: ${props => props.theme.space[1]}px ${props => props.theme.space[1]}px 0;

    & > * > .highlighter {
        background: ${props => props.theme.colors.primary};
        color: white;
        padding: 0px 2px;
        border-radius: 2px;
    }
`;

const SearchComp = styled.div`
    margin: ${props => props.theme.space[2]}px;
    padding: ${props => props.theme.space[2]}px;
    background: white;
    max-width: 400px;
`;

const SearchResult = (props: { key: string; result: IResult }) => <Result>
    <H3 dangerouslySetInnerHTML={{__html: props.result.name}} />
    <div dangerouslySetInnerHTML={{__html: props.result.description}} />
    <TagList color="textPrimary" tags={props.result.tags} maxTags={3} />
</Result>

const Search = (props: IProps) => <SearchComp>
    {props.results.map((i) => <SearchResult key={i.id} result={i} />)}
</SearchComp>;

export default Search;