import React from 'react';
import styled from '../../lib/styled-components';

interface IInputProps {
    open: boolean;
    value: string;
}
const Input = styled<IInputProps, "input">("input")`
    display: flex;
    align-items: center;
    outline: none;
    padding: 0 ${props => props.theme.space[1]}px;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    color: ${props => props.open ? props.theme.colors.white : 'transparent'};
`;

interface IContainerProps {
    open: boolean;
}

const Container = styled<IContainerProps, "div">("div")`
    border: 2px solid ${props => props.open ? props.theme.colors.primary : 'transparent'};
    height: 40px;
    border-radius: 4px;
    width: ${props => props.open ? '400px' : '40px'};
    position: relative;
    background: transparent;
    transition: all 0.3s;
`;

const SVG = () => <Icon className="icon">
    <svg width="100%" height="100%" viewBox="0 0 512 512">
        <path d="M318.75,280.5h-20.4l-7.649-7.65c25.5-28.05,40.8-66.3,40.8-107.1C331.5,73.95,257.55,0,165.75,0S0,73.95,0,165.75    S73.95,331.5,165.75,331.5c40.8,0,79.05-15.3,107.1-40.8l7.65,7.649v20.4L408,446.25L446.25,408L318.75,280.5z M165.75,280.5    C102,280.5,51,229.5,51,165.75S102,51,165.75,51S280.5,102,280.5,165.75S229.5,280.5,165.75,280.5z" fill="#FFFFFF"/>
    </svg>
</Icon>;


const Icon = styled.div`
    height: 24px;
    width: 24px;
    position: absolute;
    top: 6px;
    right: 6px;
`;

interface IState {
    text: string;
}

interface IProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    open: boolean;
}

class QuickSearchInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            text: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(e)
        this.setState({ text: e.target.value})
    }

    public render () {
        return(
            <Container open={this.props.open}>
                <Input open={this.props.open} value={this.state.text} onChange={this.handleChange} />
                <SVG />
            </Container>
        );
    }
}

export default QuickSearchInput;