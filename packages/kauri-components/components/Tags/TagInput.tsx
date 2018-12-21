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
    &:first-child {
        background: #f7f7f7
    }
`;

class TagInput extends React.Component<IProps, IState> {

    private inputRef: any | null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            selected: null,
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
    }

    public handleKey (e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            this.inputRef.value = '';
            this.inputRef.editValue('')
            if (e.currentTarget.value.length > 0) {
                this.props.handleEnterKey(this.props.availableTags && this.props.availableTags.length > 0 ? this.props.availableTags[0].tag : e.currentTarget.value);
            }
        }
        if (e.keyCode === 8 && e.currentTarget.value === "") {
            this.props.removeLastTag();
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
            { Array.isArray(available) && available.length > 0 && <Results>
                {available.map((i, index) => <Result onClick={this.handleClick.bind(this, i)} key={index}>{i.tag} <span>({i.count})</span></Result>)}
            </Results>}
        </Wrapper>
    }
}

export default TagInput