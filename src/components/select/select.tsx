import { InputHTMLAttributes, FC, forwardRef, useState } from 'react';
import styled from 'styled-components'

type Option = {
  value: string | number;
  text: string;
};
interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  options: Array<Option>;
  title: string;
}

const SelectMenu = styled.div`
  display: block;
`

export const Select: FC<SelectProps> = forwardRef<
  HTMLInputElement,
  SelectProps
>(({ options, title, value, ...props }, ref) => {
  const [valueSelected, setValueSelected] = useState(value);
  return (
    <div>
      <input {...props} value={valueSelected} ref={ref} />
      {valueSelected ? <div>{valueSelected}</div> : <div>{title}</div>}

      <SelectMenu>
        {options.map(({ value: selectValue, text }) => {
          return (
            <button
              key={selectValue}
              onClick={() => {
                setValueSelected(selectValue);
              }}
            >
              {text}
            </button>
          );
        })}
      </div>
    </SelectMenu>
  );
});
