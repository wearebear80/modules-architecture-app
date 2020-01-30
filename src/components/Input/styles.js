import { styled } from 'linaria/react'

export const ErrorHint = styled.span` 
  width: inherit;
  padding: 5px;
  left: -5px;
  font-size: 14px;
  color: #c7254e;
  align-self: flex-start;
`

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  font-family: Open Sans, sans-serif;
  font-weight: bold;
  font-size: 15px;
  color: #212121;
  margin-bottom: 5px;
`

export const Input = styled.input`
  padding: 10px 16px;
  font-size: 14px;
  line-height: 16px;
  border-radius: 4px;
  background: #EEF2F8;
  color: #000000;
  mix-blend-mode: normal;
  &::placeholder {
    font-size: 15px;
    color: #848D9F;
    opacity: 0.7;
  }
`