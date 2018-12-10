import * as React from 'react'
import TagInput from './TagInput';
import Tag from './Tag';
import { ITag } from './types'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Heading = styled.div`
    color: white;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSizes[0]}px;
    width: 100%;
    font-weight: 500;
    margin-bottom: ${props => props.theme.space[1]}px;
`;

interface IProps {
    maxTags: number;
    availableTags: ITag[];
    tags: string[];
    onChange: (tags: string[]) => void;
    fetchMatches: (val?: string) => void;
}

interface IState {
    maxTags: number;
    currentSelectedTags: string[];
}

class TagSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            currentSelectedTags: props.tags || [],
            maxTags: props.maxTags,
        }
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
        this.removeLastTag = this.removeLastTag.bind(this);
    }

    public componentDidMount() {
        this.props.fetchMatches();
    }

    public addTag(tag: ITag) {
        const prevTags = this.state.currentSelectedTags;
        const currentSelectedTags = prevTags.concat([tag.tag]);
        this.setState({ currentSelectedTags },() => this.props.onChange(currentSelectedTags))
    }

    public removeTag(tag: string) {
        const prevTags = this.state.currentSelectedTags;
        const currentSelectedTags = prevTags.filter(i => i !== tag);
        this.setState({ currentSelectedTags }, () => this.props.onChange(currentSelectedTags))
    }

    public removeLastTag() {
        const tags = this.state.currentSelectedTags;
        tags.pop();
        this.setState({ currentSelectedTags: tags })
    }

    public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.fetchMatches(e.target.value);
    }

    public handleEnterKey(val: string) {
        this.addTag({ tag: val.replace(/\s/g, '-'), count: 1})
    }

    public render () {
        return (
            <Container>
                <Heading>Tags Min 1 Max 5</Heading>
                {Array.isArray(this.state.currentSelectedTags) && this.state.currentSelectedTags.map(i => <Tag key={i} color="white" removeTag={this.removeTag} tag={i}/>)}
                {this.state.currentSelectedTags.length < this.props.maxTags &&
                    <TagInput
                        selectedTags={this.state.currentSelectedTags}
                        handleEnterKey={this.handleEnterKey}
                        onChange={this.handleChange}
                        onSelect={this.addTag}
                        availableTags={this.props.availableTags}
                        removeLastTag={this.removeLastTag}
                    />
                }
            </Container>
        )
    }
}

export default TagSelector