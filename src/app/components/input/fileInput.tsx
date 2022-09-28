import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import style from './input.module.scss';

/* eslint-disable-next-line */

export interface InputFileProps {
  accept: string;
  name: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  value?: string | number | readonly string[];
  disabled?: boolean;
  pattern?: string;
  styleLabel?: string;
  styleInput?: string;
  handleFile: (file) => void;
}

export function InputFile(props: InputFileProps) {
  const refInput = useRef(null);

  const [focus, setFocus] = useState(false);
  const [full, setFull] = useState(0);
  const [path, setPath] = useState('');

  useLayoutEffect(() => {
    props.accept && (refInput.current.accept = props.accept);
    props.value && (refInput.current.value = props.value);
    props.pattern && (refInput.current.pattern = props.pattern);
    props.required && (refInput.current.required = props.required);
    props.disabled && (refInput.current.disabled = props.disabled);
  }, [refInput]);

  const handleInputFile = (event) => {
    if (event.target.files.length) {
      props.handleFile(event.target.files[0]);
      setPath(event.target.files[0].name);
    }
  };

  return (
    <div className={style.InputFile}>
      <input
        className={style.InputFile__file}
        ref={refInput}
        type="file"
        onChange={handleInputFile}
      />
      <span className={style.InputFile__label}>seleccionar documento</span>
      <div className={style.InputFile__container}>
        <input
          className={`${style.Input__input} ${focus ? style.inputFocus : ''} ${
            style.InputFile__container_input
          } ${props.styleInput}`}
          type="text"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={path}
          disabled
        />
        <button
          className={`material-icons ${style.InputFile__container_btn}`}
          type="button"
          onClick={() => refInput.current.click()}
        >
          file_upload
        </button>
      </div>
    </div>
  );
}

export default InputFile;
