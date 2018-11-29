/* tslint:disable */
import * as React from 'react'
import TagInput from './TagInput';
import { ITag } from './types'

interface IProps {
    maxTags: number;
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
    }

    public addTag(tag: ITag) {
        const prevTags = this.state.tags;
        const tags = prevTags.concat([tag]);
        this.setState({ tags })
    }

    public removeTag(tag: ITag) {
        const prevTags = this.state.tags;
        const tags = prevTags.filter(i => i.id === tag.id);
        this.setState({ tags })
    }

    public render () {
        console.log(this.state.tags);
        return (
            <div>
                {this.state.tags.length < 5 && <TagInput
                    tags={[{name: 'Ethereum', count: 3000, id: '0'}, {name: 'Metamask', count: 450, id: '1'}, {name: 'MakerDao', count: 2500, id: '2'}, {name: 'Kauri', count: 7842, id: '3'}]}
                />}
            </div>
        )
    }
}

export default TagSelector