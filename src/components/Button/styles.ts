import { styled } from 'linaria/react'

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  padding: 9px 15px;
  font-size: 16px;
  line-height: 20px;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  box-sizing: border-box;
  outline: none;

  &.small {
    font-size: 14px;
    font-weight: normal;
  }

  &.deluxe {
    background: #FE246C;
    color: #fff;

    &:active, &.active {
      background-color: #DA2066;
      opacity: 1;
    }
  }

  &.secondary {
    background-color: #fff;
    color: #222222;
    border: 1px solid rgba(74, 117, 181, 0.25);
  }

  &.call-wrapper {
    width: 56px;
    height: 56px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: rgba(132, 141, 159, 0.6);
  }

  &.call-wrapper__minimize {
    width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: #fff;
  }

  &.call-wrapper-end {
    width: 56px;
    height: 56px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: #EB5757;
  }

  &.call-wrapper-end__minimize {
    width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: #EB5757;
  }

  &.fullscreen-button {
    width: 48px;
    height: 48px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background-color: #fff;
    box-shadow: 0px 6px 16px rgba(26, 61, 107, 0.16);
  }

  &.left svg {
    margin-right: 5px;
  }

  &.right svg {
    margin-left: 5px;
  }

  &.active.activeIconRotate {
    svg {
      transform: rotate(180deg);
    }
  }

  &.fullWidth {
    width: 100%;
  }

  &:hover {
    transition: 0.2s;
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus {
    box-shadow: 0 0 0 1px transparent, 0 0 0px 3px #0094e1, 0 0 0px 5px transparent;
  }
`
