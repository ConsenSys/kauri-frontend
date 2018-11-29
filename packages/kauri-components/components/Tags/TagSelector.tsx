/* tslint:disable */
import * as React from 'react'
import TagInput from './TagInput';
import Tag from './Tag';
import { ITag } from './types'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

interface IProps {
    maxTags: number;
    availableTags: ITag[];
    updateTags: (tags: ITag[]) => void;
}

interface IState {
    maxTags: number;
    tags: ITag[];
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
    }

    public addTag(tag: ITag) {
        const prevTags = this.state.tags;
        const tags = prevTags.concat([tag]);
        this.setState({ tags })
        this.props.updateTags(tags);
    }

    public removeTag(tag: ITag) {
        const prevTags = this.state.tags;
        const tags = prevTags.filter(i => i.id !== tag.id);
        this.setState({ tags })
        this.props.updateTags(tags);
    }

    public render () {
        return (
            <Container>
                {this.state.tags.map(i => <Tag key={i.id} color="white" removeTag={this.removeTag} tag={i}/>)}
                {this.state.tags.length < this.props.maxTags && <TagInput onChange={console.log} onSelect={this.addTag}
                    tags={this.props.availableTags}
                />}
            </Container>
        )
    }
}

export default TagSelector