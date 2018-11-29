// @flow
import React from 'react'
import styled from "../../lib/styled-components";

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  align-self: auto;
  width: 100%;
`

const InputComp = styled.input`
  display: inline-block;
  border: none;
  background: transparent;
  width: 100%;
  text-align: ${props => props.textAlign};
  font-size: ${props => props.theme.fontSizes[props.fontSize]}px;
  font-weight: ${props => props.fontWeight};
  color: ${props => props.theme.colors[props.color]};
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  :focus {
    border: none;
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: ${props => props.theme.colors[props.color]};
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.primary};
  }
  :focus::-webkit-input-placeholder {
    text-indent: -999px;
  }
  ::-moz-placeholder {
    color: ${props => props.theme.colors[props.color]};
  }
  :focus::-moz-placeholder {
    text-indent: -999px;
  }
`

const UnderlineSpan = styled.span`
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
`

type State = {
  value: string,
}

type Props = {
  placeHolder?: string,
  fontSize?: number,
  handleChange?: (value: string) => void,
  value?: string,
  color?: string,
  fontWeight?: number,
  onChange?: () => void,
  onBlur?: () => void,
  name?: string,
  hideUnderline?: boolean,
  textAlign?: string,
  className?: string,
}

class Input extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  handleChange = (value: string) => {
    this.setState({ value })
  }

  render () {
    const {
      className,
      color = 'white',
      placeHolder,
      fontSize = 1,
      fontWeight = 500,
      handleChange = this.handleChange,
      onChange,
      onBlur = ({ target: { value } }) => handleChange(value),
      name,
      hideUnderline = false,
      textAlign = 'left',
    } = this.props
    const value = this.props.value;

    return (
      <InputWrapper className={className}>
        <InputComp
          onBlur={onBlur}
          color={color}
          fontWeight={fontWeight}
          placeholder={placeHolder}
          onChange={onChange || handleChange}
          fontSize={fontSize}
          value={value}
          name={name}
          textAlign={textAlign}
        />
        {!hideUnderline && <UnderlineSpan fontSize={fontSize}>{value && value.replace(/ /g, '\u00a0')}</UnderlineSpan>}
      </InputWrapper>
    )
  }
}

export default Input
