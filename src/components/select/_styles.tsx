import styled, { css } from 'styled-components';
import { Theme } from '../../themes';

export const Header = styled.button<{ theme: Theme }>`
  ${({ theme: { text, colors } }) => {
    return css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid ${colors.border};
      padding: .6rem;
      border-radius: .3em;
      width: 100%;
      background-color: transparent;
      color: ${text};
    `
  }}
`

type SelectMenuProps = { open: boolean } & { theme: Theme };
export const Menu = styled.div<SelectMenuProps>`
  ${({ open, theme: { borderTiny, background } }) => (css`
    padding: .5em 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    position: absolute;
    border: ${borderTiny};
    border-radius: .3em;
    max-height: 200px;
    overflow-y: scroll;
    top: 115%;
    visibility: ${open ? 'visible' : 'hidden'};
    box-sizing: border-box;
    background-color: ${background};
  `)}
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5em;
  min-width: 170px;
  position: relative;
`

type OptionProps = { selected: boolean } & { theme: Theme };
export const Option = styled.button<OptionProps>`
  ${({ selected, theme: { colors, text } }) => (css`
    padding: .7em .3em;
    border: none;
    background-color: ${selected ? colors.background : 'transparent'};
    color: ${text};
    &:hover {
      background-color: ${colors.background};
    }
    &:disabled{
      background-color: ${colors.disabled};
    }
  `)}
`

type SearchboxProps = { theme: Theme };
export const Searchbox = styled.input<SearchboxProps>`
  ${({ theme: { text, borderTiny } }) => (css`
    margin: 0 .5em .5em .5em;
    padding: .5em;
    outline: none;
    border: ${borderTiny};
    background-color: transparent;
    border-radius: .2em;
    color: ${text};
  `)}
`

type CaretProps = { up: boolean } & { theme: Theme };
export const Caret = styled.div<CaretProps>`
  ${({ up, theme }) => (css`
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid ${theme.colors.border};
    transition: 0.3s;
    transform:  ${up ? 'rotate(180deg)' : 'rotate(0deg)'};
    color: ${({ theme }) => theme.text};
  `)}
`

