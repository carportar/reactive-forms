
import React, { InputHTMLAttributes, FC, forwardRef, useState, useMemo, useEffect } from 'react';
import { useOutsideClick } from '../../assets/hooks/use-outside-click';
import { Caret, Container, Header, Menu, Searchbox, Option } from './_styles';

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  options: Array<{
    value: string | number;
    text: string;
    disabled?: boolean;
  }>;
  title: string;
}

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
