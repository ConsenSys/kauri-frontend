/* tslint:disable */
import * as React from 'react'
import { Input } from '../Input';
import styled from "../../lib/styled-components";
import Plus from './Plus';
import { ITag } from './types'

interface IProps {
    availableTags?: ITag[];
    selectedTags?: string[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect?: (tag: ITag) => void;
    handleEnterKey: (val: string) => void;
    removeLastTag: () => void;
}

interface IState {
    selected: ITag | null;
    value: string;
    selectedIndex: number;
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
    position: absolute;
    top: ${props => props.theme.space[3]}px;
    left: 0;
    box-shadow: 0px 0px 6px rgba(0,0,0,0.2);
    z-index: 1000;
    & > .selected {
        background: ${props => props.theme.colors.divider};
    }
`;

const Result = styled.div`
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeight[2]};
    cursor: pointer;
    text-transform: uppercase;
    font-size: ${props => props.theme.fontSizes[0]}px;
    padding: 5px ${props => props.theme.space[1]}px;

    & > span {
        color: ${props => props.theme.colors.textPrimary};
    }
    &:hover {
        text-decoration: underline;
    }

    &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`;

class TagInput extends React.Component<IProps, IState> {

    private inputRef: any | null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            selected: null,
            value: '',
            selectedIndex: 0,
        }
        this.handleKey = this.handleKey.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.inputRef = null;
    }

    public handleClick (tag: ITag) {
        if(this.props.onSelect) {
            this.props.onSelect(tag);
            this.inputRef.editValue('');
            (document.activeElement as HTMLElement).blur()
        }
        this.setState({ value: '', selectedIndex: 0});
    }
    

    public handleKey (e: React.KeyboardEvent<HTMLInputElement>) {
        this.setState({ value: e.currentTarget.value})
        if (e.keyCode === 13) {
            this.props.handleEnterKey(
                this.props.availableTags && this.props.availableTags.length > 0 && this.props.availableTags[this.state.selectedIndex] ?
                    this.props.availableTags[this.state.selectedIndex].tag :
                    e.currentTarget.value);
            this.inputRef.value = '';
            this.inputRef.editValue('')
            this.setState({ value: '', selectedIndex: 0});
        }
        if (e.keyCode === 8 && e.currentTarget.value === "" && this.state.value === "") {
            this.props.removeLastTag();
        }
        if (e.keyCode === 40) {
            let currentIndex = this.state.selectedIndex;
            const availableLength = this.props.availableTags ? this.props.availableTags.length : 1;
            const newIndex = currentIndex >= availableLength ? 0 : currentIndex += 1;
            this.setState({ selectedIndex: newIndex});
        }
        if (e.keyCode === 38) {
            let currentIndex = this.state.selectedIndex;
            const availableLength = this.props.availableTags ? this.props.availableTags.length : 1;
            const newIndex = currentIndex <= 0 ? availableLength : currentIndex -= 1;
            this.setState({ selectedIndex: newIndex});
        }
    }

    public render() {
        const available = this.props.availableTags && this.props.availableTags.reduce((all, item) => {
            let match;
            if (this.props.selectedTags) {
                match = this.props.selectedTags.find(i => i === item.tag);
            }
            if (!match) {
                all.push(item);
            }
            return all
        }, [] as ITag[])
        return <Wrapper>
        <div>
            <TopRow>
                <Plus />
                <Input
                    onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                    ref={ref => this.inputRef = ref} 
                    onKeyUp={this.handleKey}
                    onChange={this.props.onChange}
                    textAlign="left"
                    fontSize={0}
                    fontWeight={600}
                    color="white"
                    placeHolder="ADD TAG"
                />
            </TopRow>
        </div>
            {  this.state.value.length > 0 && <Results>
                {Array.isArray(available) && available.map((i, index) => <Result className={index === this.state.selectedIndex ? 'selected' : ''} onClick={this.handleClick.bind(this, i)} key={index}>{i.tag} <span>({i.count})</span></Result>)}
                <Result className={!available || this.state.selectedIndex >= available.length ? 'selected' : ''} onClick={this.handleClick.bind(this, { tag: this.state.value})}>New Tag: <span>{this.state.value}</span></Result>
            </Results>}
        </Wrapper>
    }
}

export default TagInput