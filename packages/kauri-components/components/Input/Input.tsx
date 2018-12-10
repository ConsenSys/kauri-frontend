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
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    enterFocus?: () => void;
    exitFocus?: () => void;
}
const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-self: auto;
  width: 100%;
`

class Input extends React.Component<IWrapperProps, IInputState> {
    constructor(props: IWrapperProps) {
        super(props);
        this.state = {
            focused: false,
            value: props.value || '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.enterFocus = this.enterFocus.bind(this)
        this.exitFocus = this.exitFocus.bind(this)
        this.handleKey = this.handleKey.bind(this)
        this.editValue = this.editValue.bind(this)
    }

    public enterFocus() {
        this.setState({ focused: true })
        if (this.props.enterFocus) {
            this.props.enterFocus();
        }
    }

    public exitFocus() {
        this.setState({ focused: false })
        if (this.props.exitFocus) {
            this.props.exitFocus();
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

    public handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(e);
        }
    }

    public editValue(value: string) {
        this.setState({ value })
    }


    public render () {
        const { 
            fontSize = 3,
            fontWeight = 400,
            color = 'white',
            textAlign = 'left',
            placeHolder,
            hideUnderline,
            name
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
                onBlur={this.exitFocus}
                onFocus={this.enterFocus}
                onKeyUp={this.handleKey}
                name={name}
            />
        {!hideUnderline && <Underline fontSize={fontSize}>{underlineValue && underlineValue.replace(/ /g, '\u00a0') }</Underline>}
        </Wrapper>
    }
}

export default Input