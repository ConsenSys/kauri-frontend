/* tslint:disable */
import * as React from 'react'
import { Input } from '../Input';
import styled from "../../lib/styled-components";
import Plus from './Plus';
import { ITag } from './types'

interface IProps {
    availableTags?: ITag[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect?: (tag: ITag) => void;
    handleEnterKey: (val: string) => void;
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
    top: ${props => props.theme.space[3]}px;
    left: 0;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.2);
    z-index: 1000;
`;

const Result = styled.div`
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeight[2]};
    cursor: pointer;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSizes[0]}px;
    padding: 2px;

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
        this.enterFocus = this.enterFocus.bind(this)
        this.handleKey = this.handleKey.bind(this)
    }

    public enterFocus() {
        this.setState({ expanded: true });
    }

    public exitFocus() {
        this.setState({ expanded: false });
        (document.activeElement as HTMLElement).blur()
    }

    public handleClick (tag: ITag) {
        if(this.props.onSelect) {
            this.props.onSelect(tag);
            this.setState({ expanded: false });
            (document.activeElement as HTMLElement).blur()
        }
    }

    public handleKey (e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            this.props.handleEnterKey(e.currentTarget.value);
            this.exitFocus()
        }
    }

    public render() {
        return <Wrapper>
        <div>
            <TopRow>
                <Plus />
                <Input onKeyUp={this.handleKey} onChange={this.props.onChange} enterFocus={this.enterFocus} textAlign="left" fontSize={0} fontWeight={600} color="white" placeHolder="ADD TAG" />
            </TopRow>
        </div>
            {this.props.availableTags && this.state.expanded && <Results>
                {this.props.availableTags.map((i, index) => <Result onClick={this.handleClick.bind(this, i)} key={index}>{i.name} <span>({i.count})</span></Result>)}
            </Results>}
        </Wrapper>
    }
}

export default TagInput