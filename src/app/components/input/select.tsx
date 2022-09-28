import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import style from './input.module.scss';

export interface OptionsSelectFormInterface {
  id: string | number;
  name: string;
  selected?: boolean;
  disabled?: boolean;
  view?: boolean;
}

/* eslint-disable-next-line */
export interface SelectFormProps {
  name: string;
  placeholder?: string;
  label: string;
  onChange: any;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  size?: number;
  styleLabel?: string;
  styleSelect?: string;
  value?: string | number | readonly string[];
  options: OptionsSelectFormInterface[];
}

export const SelectForm = (props: SelectFormProps) => {
  const ref = useRef(null);
  const [focus, setFocus] = useState(false);
  const [full, setFull] = useState(0);

  useLayoutEffect(() => {
    props.required && (ref.current.required = props.required);
    props.disabled && (ref.current.disabled = props.disabled);
    props.multiple && (ref.current.multiple = props.multiple);
    props.size && (ref.current.size = props.size);
  }, [ref]);

  useLayoutEffect(() => {
    setFull(ref?.current?.value.length);
  }, [ref?.current?.value.length]);

  return (
    <label
      className={`${style.Input}
      ${props.styleLabel ? props.styleLabel : ''}`}
      htmlFor={props.name}
      key={props.name}
    >
      <select
        id={props.name}
        name={props.name}
        placeholder={focus ? props.placeholder : props.label}
        ref={ref}
        className={`${style.Input__input} ${focus ? style.inputFocus : ''} ${
          props.styleSelect
        }`}
        value={props.value}
        onChange={props.onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <option value="">
          {props.placeholder ? props.placeholder : 'Seleccionar'}
        </option>
        {props.options.map((item, index) => (
          <option
            key={index}
            value={item.id}
            disabled={item.disabled}
            selected={item.selected}
          >
            {item.name?.toUpperCase()}
          </option>
        ))}
      </select>
      <span
        className={`${style.Input__label} ${full > 0 ? style.labelfull : ''}`}
      >
        {`${props.label}:`}
      </span>
    </label>
  );
};
