import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Component, { IButtonProps } from './index'

describe('render component Button', () => {
  const onClick = jest.fn()

  const initialState: IButtonProps = {
    title: 'Test button',
    disabled: false,
    onClick
  }

  test('check title', () => {
    const { getByText } = render(<Component {...initialState} />)

    expect(getByText(String(initialState.title))).toBeInTheDocument()
  })

  test('check mock click button', () => {
    const { getByText } = render(<Component {...initialState} />)

    fireEvent.click(getByText(String(initialState.title)))
    expect(onClick.mock.calls.length).toBe(1)
  })

  test('check disabled button', () => {
    const state = { ...initialState, disabled: true }
    const { getByText } = render(<Component {...state} />)

    expect(getByText(String(initialState.title))).toHaveAttribute('disabled')
  })
})