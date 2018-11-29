/* tslint:disable */
import * as React from 'react'
import { Input } from '../Input';
import Tag from './Tag'
import styled from "../../lib/styled-components";
import Plus from './Plus';
import Close from './Close';
import { ITag } from './types'

interface IProps {
    tags?: ITag[];
}

interface IState {
    expanded: boolean;
    selected: ITag | null;
}

const Wrapper = styled<{}, "div">("div")`
    background: transparent;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const TopRow = styled.div`
    display: flex;
    align-items: center;
    & > svg {
        margin-right: ${props => props.theme.space[1] / 2}px;
        cursor: pointer;
    }
`;

const Results = styled.div`
    background: white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    padding: ${props => props.theme.space[1]}px;
    position: absolute;
    top: 30px;
    left: 0;
`;

const Result = styled.div`
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeight[2]};
    cursor: pointer;
    text-transform: uppercase;

    & > span {
        color: ${props => props.theme.colors.textPrimary};
    }
    &:hover {
        text-decoration: underline;
    }
`;

class TagInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            expanded: false,
            selected: null,
        }
        this.toggleFocus = this.toggleFocus.bind(this)
    }

    public toggleFocus() {
        setTimeout(() => this.setState({ expanded: !this.state.expanded }), 100);
    }

    public handleClick (tag: ITag) {
        this.setState({ selected: tag })
    }

    public render() {
        return <Wrapper>
        <div>
            {!this.state.selected && <TopRow>
                {!this.state.expanded && <Plus />}
                <Input toggleFocus={this.toggleFocus} textAlign="left" fontSize={0} fontWeight={600} color="white" placeHolder="ADD TAG" />
                </TopRow>
            }
            {this.state.selected && <TopRow>
                <Close onClick={() => this.setState({ selected: null})} />
                <Tag color="white">{this.state.selected.name}</Tag>
                </TopRow>
            }
        </div>
            {this.props.tags && this.state.expanded && <Results>
                {this.props.tags.map((i, index) => <Result onClick={() => this.handleClick(i)} key={index}>{i.name} <span>({i.count})</span></Result>)}
            </Results>}
        </Wrapper>
    }
}

export default TagInput