import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Component, { IInputProps } from './index'

describe('render component Input', () => {
  const onChange = jest.fn()

  const initialState: IInputProps = {
    label: 'Title',
    name: 'login',
    type: 'text',
    maxLength: 20,
    placeholder: 'user name',
    autoFocus: false,
    value: '',
    onChange,
    error: false,
    defaultError: false
  }

  test('check render input element to default state', () => {
    const { container, getByText, getByPlaceholderText } = render(<Component {...initialState} />)
    const input = container.querySelector('input')

    expect(getByText(String(initialState.label))).toBeInTheDocument()
    expect(getByPlaceholderText(String(initialState.placeholder))).toBeInTheDocument()
    expect(input).toHaveAttribute('name', initialState.name)
    expect(input).toHaveAttribute('type', initialState.type)
    expect(input).toHaveAttribute('maxLength', String(initialState.maxLength))
  })

  test('check autofocus', () => {
    const state: IInputProps = { ...initialState, autoFocus: true }
    const { container } = render(<Component {...state} />)
    const input = container.querySelector('input')

    expect(input).toHaveFocus()
  })

  test('check value', () => {
    const state: IInputProps = { ...initialState, value: 'Hello, World!' }
    const { container } = render(<Component {...state} />)
    const input = container.querySelector('input')

    expect(input).toHaveValue(state.value)
  })

  test('mock onChange func', () => {
    const { container } = render(<Component {...initialState} />)
    const input = container.querySelector('input')

    fireEvent.change(input, { target: { value: 'Hello, World!' } })
    expect(onChange.mock.calls.length).toBe(1)
  })

  test('show error message', () => {
    const state: IInputProps = { ...initialState, error: 'Ошибка, поле обязательное!' }
    const { container, getByText } = render(<Component {...state} />)
    const input = container.querySelector('input')
    
    fireEvent.blur(input)
    expect(getByText(String(state.error))).toBeInTheDocument()
  })

  test('show default error message', () => {
    const state: IInputProps = { ...initialState, defaultError: 'Какое-то сообщение об ошибке' }
    const { getByText } = render(<Component {...state} />)
    
    expect(getByText(String(state.defaultError))).toBeInTheDocument()
  })
})
