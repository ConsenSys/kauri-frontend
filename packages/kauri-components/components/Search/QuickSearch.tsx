import { H3 } from '../Typography';
import styled from '../../lib/styled-components';
import { TagList } from '../Tags';
import Tabs from '../Tabs';
import PrimaryButton from '../Button/PrimaryButton';

export interface IResult {
    description: string;
    name: string;
    score: number;
    tags?: string[] | null;
    resourceIdentifier: {
        type: string;
        id: string;
    }
}

export interface IElementsBreakdown {
    [key:string]: number;
}

interface IProps {
    results: IResult[];
    breakDown: IElementsBreakdown;
    maxResults: number;
}

const ResultComp = styled.div`
    padding: ${props => props.theme.space[1]}px ${props => props.theme.space[2]}px 0;
    max-width: 400px;
    width: 100%;
    cursor: pointer;
    color: ${props => props.theme.colors.textPrimary};

    &:hover {
        background: ${props => props.theme.colors.tertiaryBackgroundColor};
    }

    & .highlighter {
        background: ${props => props.theme.colors.primary};
        color: white;
        padding: 0px 2px;
        border-radius: 2px;
    }

    & div {
        line-height: normal !important;
        height: auto !important;
        white-space: normal;
    }

    & .quickSearchDescription {
        font-size: ${props => props.theme.fontSizes[1]}px;
    }

    > :first-child {
        margin-bottom: ${props => props.theme.space[1]}px;
    }
`;

const SearchComp = styled.div`
    background: white;
    max-width: 400px;
    padding-bottom: ${props => props.theme.space[1]}px;
    border-radius: 4px;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.11);
`;

const ResultsComp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > :last-child {
        margin-top: ${props => props.theme.space[1]}px;
        line-height: normal !important;
    }
`;

const Result = (props: { key: string; result: IResult }) => <ResultComp className="quickSearch">
    <H3><div dangerouslySetInnerHTML={{__html: props.result.name}} /></H3>
    <div className="quickSearchDescription" dangerouslySetInnerHTML={{__html: props.result.description}} />
    {props.result.tags && <TagList color="textPrimary" tags={props.result.tags} maxTags={3} />}
</ResultComp>;

const SearchResults = (props: {maxResults: number; type: string; results: IResult[]}) => <ResultsComp>
    {props.results.slice(0, props.maxResults).map(i => <Result key={i.resourceIdentifier.id} result={i} />)}
    <PrimaryButton text={`View all ${props.type}`} />
</ResultsComp>;


const getTabs = (breakdown: IElementsBreakdown) => Object.keys(breakdown).filter(tab => breakdown[tab] > 0).sort((a,b) => breakdown[b] - breakdown[a]);

const Search = (props: IProps) => <>
    {props.breakDown && props.results && props.results.length > 0 && <SearchComp>
        <Tabs
            padContent={false}
            dark={false}
            tabs={getTabs(props.breakDown).map(tab => `${tab} (${props.breakDown[tab]})`)}
            panels={getTabs(props.breakDown).map(tab => <SearchResults maxResults={props.maxResults} type={tab} key={tab} results={props.results.filter(i => i.resourceIdentifier.type === tab)} />)}
        />
    </SearchComp>}
</>;

export default Search;