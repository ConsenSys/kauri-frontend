/* tslint:disable */
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
    onChange: (tags: string[]) => void;
    fetchMatches: (string?: string) => void;
}

interface IState {
    maxTags: number;
    tags: string[];
}

class TagSelector extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            maxTags: props.maxTags,
            tags: [],
        }
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
    }

    public componentDidMount() {
        this.props.fetchMatches();
    }

    public addTag(tag: ITag) {
        const prevTags = this.state.tags;
        const tags = prevTags.concat([tag.tag]);
        this.setState({ tags })
        this.props.onChange(tags);
    }

    public removeTag(tag: string) {
        const prevTags = this.state.tags;
        const tags = prevTags.filter(i => i !== tag);
        this.setState({ tags })
        this.props.onChange(tags);
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
                {this.state.tags.map(i => <Tag key={i} color="white" removeTag={this.removeTag} tag={i}/>)}
                {this.state.tags.length < this.props.maxTags && <TagInput selectedTags={this.state.tags} handleEnterKey={this.handleEnterKey} onChange={this.handleChange} onSelect={this.addTag}
                    availableTags={this.props.availableTags}
                />}
            </Container>
        )
    }
}

export default TagSelector