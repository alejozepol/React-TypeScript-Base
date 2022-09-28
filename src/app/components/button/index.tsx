import React, { useState, useRef, useLayoutEffect } from 'react';

import style from './button.module.scss';

/* eslint-disable-next-line */
export interface ButtonProps {
  text: string;
  type: 'button' | 'reset' | 'submit';
  color?: 'primary' | 'light';
  icon?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
}

export function Button(props: ButtonProps) {
  const refBtn = useRef(null);
  const [color, setColor] = useState('');
  useLayoutEffect(() => {
    switch (props.color) {
      case 'primary':
        setColor(style.primary);
        break;
      default:
        break;
    }
  }, []);
  return (
    <button
      ref={refBtn}
      type={props.type}
      className={`${style.Button} ${color} ${props.className}`}
      onClick={props.onClick}
    >
      <p className={style.Button__text}>{props.text}</p>
      {props.icon && (
        <span className={`material-icons ${style.Button__icon}`}>
          {props.icon}
        </span>
      )}
    </button>
  );
}

export default Button;
