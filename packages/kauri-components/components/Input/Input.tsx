import * as React from 'react'
import styled from "../../lib/styled-components";

interface IInputProps {
    textAlign: string;
    fontSize: number;
    fontWeight: number;
    color: string;
}

interface IInputState {
    value: string;
    focused: boolean;
}

const InputComp = styled<IInputProps, "input">("input")`
    text-align: ${props => props.textAlign};
    font-size: ${props => props.theme.fontSizes[props.fontSize]}px;
    font-weight: ${props => props.fontWeight};
    color: ${props => props.theme.colors[props.color]};
    background: transparent;
    width: 100%;
    outline: none;
    border: none;

    ::-webkit-input-placeholder {
        color: ${props => props.theme.colors[props.color]};
      }
      :focus::-webkit-input-placeholder {
        text-indent: -999px;
      }
`;

interface IUnderline {
    fontSize: number;
}
const Underline = styled<IUnderline, "span">("span")`
  user-select: none;
  border-top: 2px solid ${props => props.theme.primaryColor};
  position: absolute;
  left: 0;
  bottom: 0;
  max-width: 100%;
  height: 0px;
  color: transparent;
  overflow: hidden;
  font-size: ${props => props.theme.fontSizes[props.fontSize]}px;
  margin-left: 2px;
`
interface IWrapperProps {
    textAlign?: string;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    placeHolder?: string;
    value?: string;
    hideUnderline?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    toggleFocus?: () => void;
}
const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-self: auto;
  width: 100%;
  margin-bottom: ${props => props.theme.space[1]}px;
`

class Input extends React.Component<IWrapperProps, IInputState> {
    constructor(props: IWrapperProps) {
        super(props);
        this.state = {
            focused: false,
            value: props.value || '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.toggleFocus = this.toggleFocus.bind(this)
    }

    public toggleFocus() {
        this.setState({ focused: !this.state.focused })
        if (this.props.toggleFocus) {
            this.props.toggleFocus();
        }
    }

    public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value : e.target.value})
        if (this.props.handleChange) {
            this.props.handleChange(e);
        } else if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    public render () {
        const { 
            fontSize = 3,
            fontWeight = 400,
            color = 'white',
            textAlign = 'left',
            placeHolder,
            hideUnderline,
        } = this.props;

        const underlineValue = this.state.value || (this.state.focused ? '' : placeHolder);

        return <Wrapper>
            <InputComp
                value={this.state.value || ''}
                onChange={this.handleChange}
                placeholder={placeHolder}
                fontSize={fontSize}
                fontWeight={fontWeight}
                color={color}
                textAlign={textAlign}
                onBlur={this.toggleFocus}
                onFocus={this.toggleFocus}
            />
        {!hideUnderline && <Underline fontSize={fontSize}>{underlineValue && underlineValue.replace(/ /g, '\u00a0') }</Underline>}
        </Wrapper>
    }
}

export default Input