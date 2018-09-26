// @flow
import React from 'react'
import { fontSize, fontWeight, color, background } from 'styled-system'
import styled from 'styled-components'

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  align-self: auto;
  width: 100%;
`

const Input = styled.input`
  display: inline-block;
  border: none;
  background: transparent;
  width: 100%;
  ${fontSize};
  ${fontWeight};
  ${color};
  ${background};

  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  :focus {
    border: none;
    outline: none;
  }
  ::-webkit-input-placeholder {
    ${color};
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.primary};
  }
  :focus::-webkit-input-placeholder {
    text-indent: -999px;
  }
  ::-moz-placeholder {
    ${color};
  }
  :focus::-moz-placeholder {
    text-indent: -999px;
  }
`

const UnderlineSpan = styled.span`
  user-select: none;
  border-top: 3px solid ${props => props.theme.primaryColor};
  position: absolute;
  left: 0;
  bottom: 0;
  max-width: 100%;
  height: 0px;
  color: transparent;
  overflow: hidden;
  ${fontSize};
`

type State = {
  value: string
}

type Props = {
  placeHolder?: string,
  fontSize?: number,
  handleChange: (value: string) => void,
}

export default class extends React.Component<Props, State> {
  state = {
    value: '',
  }

  handleChange = (value) => {
    this.setState({ value })
  }

  render () {
    const { color = '#fff', placeHolder, fontSize, handleChange = this.handleChange, onChange, onBlur = (({ target: { value } }) => handleChange(value)), name } = this.props
    const value = this.props.value || this.state.value

    return (
      <InputWrapper>
        <Input onBlur={onBlur} color={color} fontWeight={500} placeholder={placeHolder} onChange={onChange} fontSize={fontSize} value={value} name={name} />
        <UnderlineSpan fontSize={fontSize}>
          {value.replace(/ /g, '\u00a0')}
        </UnderlineSpan>
      </InputWrapper>
    )
  }
}
