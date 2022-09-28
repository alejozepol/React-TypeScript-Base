import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';

import style from './input.module.scss';

/* eslint-disable-next-line */
export interface InputProps {
  name: string;
  placeholder?: string;
  label: string;
  type:
    | 'text'
    | 'checkbox'
    | 'date'
    | 'password'
    | 'time'
    | 'DateTime-local'
    | 'week'
    | 'month'
    | 'email'
    | 'tel'
    | 'URL'
    | 'search'
    | 'range'
    | 'number'
    | 'color'
    | 'radio'
    | 'decimal';
  onChange: any;
  min?: number | string;
  max?: number | string;
  minlength?: number | string;
  maxlength?: number | string;
  required?: boolean;
  styleLabel?: string;
  styleInput?: string;
  value?: string | number | readonly string[];
  inputMode?:
    | 'text'
    | 'email'
    | 'tel'
    | 'search'
    | 'numeric'
    | 'none'
    | 'url'
    | 'decimal';
  pattern?: string;
  checked?: boolean;
  disabled?: boolean;
  step?: string;
}

export function Input(props: InputProps) {
  const refInput = useRef(null);
  const [focus, setFocus] = useState(false);
  const [full, setFull] = useState(0);
  const [max, setMax] =useState(null)
  const [min, setMin] =useState(null)

  useLayoutEffect(() => {
    props.min && (refInput.current.min = min);
    props.max && (refInput.current.max = max);
    props.maxlength && (refInput.current.maxlength = props.maxlength);
    props.minlength && (refInput.current.minlength = props.minlength);
    props.value && (refInput.current.value = props.value);
    props.pattern && (refInput.current.pattern = props.pattern);
    props.inputMode && (refInput.current.inputMode = props.inputMode);
    props.required && (refInput.current.required = props.required);
    props.checked && (refInput.current.checked = props.checked);
    props.disabled && (refInput.current.disabled = props.disabled);
    props.step && (refInput.current.step = props.step);

  }, [refInput, min, max]);

  useEffect(() => setMin(props.min) , [props.min])
  useEffect(() => setMax(props.max) , [props.max])

  useLayoutEffect(() => {
    setFull(refInput?.current?.value.length);
  }, [refInput?.current?.value.length]);
  return (
    <label
      className={`${style.Input} 
        ${props.styleLabel ? props.styleLabel : ''}`}
      htmlFor={props.name}
      key={props.name}
    >
      <input
        ref={refInput}
        className={`${style.Input__input} ${focus ? style.inputFocus : ''} ${
          props.styleInput
        }`}
        id={props.name}
        name={props.name}
        placeholder={focus ? props.placeholder : props.label}
        type={props.type}
        onChange={props.onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <span
        className={`${style.Input__label} ${full > 0 ? style.labelfull : ''}`}
      >
        {`${props.label}:`}
      </span>
    </label>
  );
}

export default Input;
