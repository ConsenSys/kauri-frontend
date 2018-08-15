import React from 'react'
import styled, { css } from 'styled-components'
import { Button } from 'antd'

const ActionButtons = styled.div`
  display: flex;
  > :first-child:not(:only-child) {
    margin-right: 20px;
  }
  > :only-child {
    margin-right: 0px;
  }
`

const secondaryActionBadgeCss = css`
  color: ${props => props.theme.secondaryTextColor};
  > * {
    color: ${props => props.theme.secondaryTextColor};
  }
  background-color: #fff;
`

const altActionBadgeCss = css`
  color: #fff;
  > * {
    color: #fff;
  }
  background-color: transparent !important;
`

const disabledBadgeCss = css`
  background-color: ${props => props.theme.disabledBackgroundColor} !important;
  > span {
    color: ${props => props.theme.disabledTextColor} !important;
  }
`

const ActionBadge = styled(Button)`
  display: flex;
  margin-right: 15px;
  align-items: center;
  > * {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #fff;
  }
  > :nth-child(2) {
    margin-left: 8px;
  }
`

const PositiveActionBadge = ActionBadge.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => (props.height && typeof props.height === 'string' ? props.height : props.height + 'px')};
  width: ${props => (props.width && typeof props.width === 'string' ? props.width : props.width + 'px')};
  color: #fff;
  border-radius: 4px;
  background-color: ${props => props.theme.primaryColor};
  border: 1px solid ${props => props.theme.primaryColor} !important;
  transition: none !important;
  * {
    transition: none !important;
  }
  :hover {
    background-color: ${props => props.type === 'primary' && props.theme.hoverTextColor} !important;
    border: ${props => props.type === 'primary' && props.theme.hoverTextColor} !important;
    box-shadow: ${props => props.type !== 'primary' && `0 0 0 2px ${props.theme.primaryColor}`};
  }
  margin-right: ${({ alone }) => alone && '0px'};
  ${props => props.type === 'secondary' && secondaryActionBadgeCss};
  ${props => props.type === 'alt' && altActionBadgeCss};
  ${props => props.disabled && disabledBadgeCss};
`

const PositiveRequestActionBadge = ({
  label,
  action,
  type,
  width = '184px',
  height = '40px',
  preIcon,
  alone,
  disabled,
  children,
  dataTestId,
}) => (
  <PositiveActionBadge
    data-test-id={dataTestId}
    disabled={disabled}
    alone={alone}
    width={width}
    height={height}
    type={type}
    onClick={action}
  >
    {preIcon && <img src={preIcon} height={18} width={18} />}
    {label ? <span>{label}</span> : children}
  </PositiveActionBadge>
)

const ActionButton = PositiveRequestActionBadge

export { ActionButtons, PositiveActionBadge, PositiveRequestActionBadge, ActionButton }
export default ActionButton
