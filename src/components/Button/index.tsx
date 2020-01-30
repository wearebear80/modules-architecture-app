import React, { ReactChild } from 'react'
import * as s from './styles'
import classNames from 'classnames'

export type styleButtonType = 'deluxe' | 'emphasize' | 'primary' | 'secondary' | 'ghost'
  | 'call-wrapper' | 'call-wrapper-end' | 'call-wrapper__minimize' | 'call-wrapper-end__minimize' | 'fullscreen-button'
export type sizeButtonType = 'small' | 'normal'
export type iconPositionType = 'left' | 'right' | 'no-position'

export interface IButtonProps {
  style?: styleButtonType,
  size?: sizeButtonType,
  title?: string
  iconPosition?: iconPositionType
  color?: string
  fullWidth?: boolean,
  textColor?: string
  disabled?: boolean
  active?: boolean
  activeIconRotate?: boolean
  onClick?: () => void
}

const Button = ({
  style = 'deluxe',
  size = 'normal',
  title = '',
  iconPosition = 'no-position',
  fullWidth = false,
  onClick = () => { },
  disabled = false,
  active = false,
  activeIconRotate = false
}: IButtonProps) => {
  return (
    <s.Button
      className={classNames(style, size, iconPosition, { fullWidth, active, activeIconRotate })}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </s.Button>
  )
}

export default Button
