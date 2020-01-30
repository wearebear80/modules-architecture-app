import React, { ChangeEvent, useState } from 'react'
import * as s from './styles'

type InputType =  "button" | "checkbox" | "file"
| "hidden" | "image" | "password"
| "radio" | "reset" | "submit" | "text"

export interface IInputProps {
  label?: string
  name?: string
  type?: InputType
  maxLength?: number
  placeholder?: string
  autoFocus?: boolean
  value?: string
  onChange: (value: string) => void
  onEnter?: () => void
  error?: string | boolean
  defaultError?: string | boolean
}

const Input = ({
  label = '',
  name,
  value,
  onChange,
  type = 'text',
  maxLength = 524288,
  placeholder = '',
  autoFocus,
  error = false,
  defaultError = false,
  onEnter = () => {},
}: IInputProps) => {
  const [focused, setIsFocused] = useState(autoFocus)
  const [touched, setIsTouched] = useState(false)

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      onEnter()
    }
  }

  return <s.InputWrapper>
    {label ? <s.Label>{label}</s.Label> : null}
    <s.Input
      type={type}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autoFocus}
      value={value}
      onChange={e => {
        onChange(e.target.value)
        setIsTouched(true)
      }}
      // @ts-ignore
      onKeyDown={handleKeyDown}
      onBlur={() => setIsTouched(true)}
    />
    {(touched && error) && <s.ErrorHint>{error}</s.ErrorHint>}
    {(!touched && defaultError) && <s.ErrorHint>{defaultError}</s.ErrorHint>}
  </s.InputWrapper>
}

export default Input
