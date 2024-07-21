
import React, { InputHTMLAttributes, FC, forwardRef, useState, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components'
import { useOutsideClick } from '../../assets/hooks/use-outside-click';

type Option = {
  value: string | number;
  text: string;
  disabled?: boolean;
};
interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  options: Array<Option>;
  title: string;
}


const Header = styled.button`
display: flex;
justify-content: space-between;
align-items: center;
  border: 1px solid aliceblue;
  padding: .6rem;
  border-radius: .3em;
  width: 100%;
  background-color: transparent;
`

type SelectMenuProps = { open: boolean }

const Menu = styled.div<SelectMenuProps>`
  padding: .5em 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: absolute;
  border: .5px solid aliceblue;
  border-radius: .3em;
  max-height: 200px;
  overflow-y: scroll;
  top: 115%;
  visibility: ${({ open }) => open ? 'visible' : 'hidden'};
  box-sizing: border-box;
  background-color: #180b0b;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5em;
  min-width: 170px;
  position: relative;
`

const Option = styled.button<{selected: boolean}>`
  padding: .7em .3em;
  border: none;
  background-color: ${({selected}) => selected ? '#2f2c2c': 'transparent'};
  &:hover {
    background-color: #2f2c2c;
  }
  &:disabled{
    background-color: #363535;
  }

`

const Searchbox = styled.input`
  margin: 0 .5em .5em .5em;
  padding: .5em;
  outline: none;
  border: .3px solid #656363;
  background-color: #302b30;
  border-radius: .2em;

`

const Caret = styled.div<{ up: boolean }>`
width: 0;
height: 0;
border-left: 5px solid transparent;
border-right: 5px solid transparent;
border-top: 6px solid aliceblue;
transition: 0.3s;
transform: ${({ up }) => up ? 'rotate(180deg)' : 'rotate(0deg)'};
`

export const Select: FC<SelectProps> = forwardRef<
  HTMLInputElement,
  SelectProps
>(({ options, title, value, ...props }, ref) => {
  const [valueSelected, setValueSelected] = useState(value);
  const [open, setOpen] = useState(false);
  const [listOptions, setListOptions] = useState(options);
  const [noResults, seNoResults] = useState(false);

  const valueItem = useMemo(() => options.find(o => o.value === valueSelected), [valueSelected]);

  const selectRef = useOutsideClick(() => {
    setOpen(false)
  });


  return (
    <Container {...{ open }} ref={selectRef}>
      <input {...props} type='hidden' value={valueSelected} ref={ref} />
      <Header type='button' onClick={() => {
        setOpen(!open)
      }}>
        {
          valueSelected ?
            <div>{valueItem?.text}</div> :
            <div>{title}</div>
        }
        <Caret up={open} />
      </Header>

      <Menu open={open}>
        <Searchbox onInput={(e) => {
          const results = options.filter(op => op.text.toLocaleLowerCase().includes(e.currentTarget.value.toLocaleLowerCase()));
          setListOptions(results)
          seNoResults(results.length === 0)
        }} />
        {listOptions.map(({ value: selectValue, text, disabled = false }) => {
          return (
            <Option
              type='button'
              key={selectValue}
              onClick={() => {
                setValueSelected(selectValue);
                setOpen(false)
              }}
              selected={selectValue === valueSelected}
              disabled={disabled}
            >
              {text}
            </Option>
          );
        })}
        {noResults && <span>No results</span>}
      </Menu>
    </Container>
  );
});
