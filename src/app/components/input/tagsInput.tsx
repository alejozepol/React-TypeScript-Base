import React, { useState, useRef, useEffect } from 'react';
import style from './input.module.scss';

export interface TagInterface {
  id: number;
  name: string;
}

/* eslint-disable-next-line */
export interface TagsInputProps {
  options: TagInterface[];
  label: string;
  tags?: TagInterface[];
  output?: (tags: TagInterface[]) => void;
  className?: string;
  disabled?: boolean;
}

export function TagsInput(props: TagsInputProps) {
  const [add, setAdd] = useState(false);
  const inputRef = useRef(null);
  const [tags, setTags] = useState<TagInterface[]>([]);
  const [suggestions, setSuggestions] = useState<TagInterface[]>([]);

  useEffect(() => {
    props.output(tags);
  }, [tags]);

  useEffect(() => {
    if (props.tags?.length) {
      setTags([...props.tags]);
    }
  }, []);

  const handleInput = (event) => {
   const inclu =  tags.find((item) => item.name === event.target.value.toUpperCase()) || {}
    setSuggestions(
      props.options.filter((item) =>
        item.name.toUpperCase().includes(event.target.value.toUpperCase()) &&
        Object.keys(inclu).length === 0
      )
    );
    //TODO quitar totalmente de las sugerencias los tags ya agregados
  };

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const addTags = (tag: TagInterface) => {
    setAdd(false);
    setTags([...tags, tag]);
    inputRef.current.value = null;
    setSuggestions([]);
  };

  const inputKeyDown = (e) => {
    //TODO  deja seleccionar el mismo item varias veces
    const val = e.target.value;
    const tag =
      suggestions.find(
        (item) => item.name.toLowerCase() === val.toLowerCase()
      ) || ({} as TagInterface);
    if (e.key === 'Enter' && Object.keys(tag).length !== 0) {
      if (tags.find((tag) => tag.name.toLowerCase() === val.toLowerCase())) {
        inputRef.current.value = null;
        setSuggestions([]);
        return;
      }
      addTags(tag);
      inputRef.current.focus();
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className={`${style.TagInput} ${props.className}`}>
      <label className={`${style.Input__label} ${style.TagInput__label}`}>
        {props.label}
      </label>
      <ul className={style.TagInput__tags}>
        {tags.map((tag, i) => (
          <li key={i} className={style.TagInput__tags_item}>
            {tag.name}
            {!props.disabled && (
              <button
                type="button"
                onClick={() => {
                  removeTag(i);
                }}
              >
                +
              </button>
            )}
          </li>
        ))}
        {!props.disabled &&
          (!add ? (
            <button
              className={`material-icons ${style.TagInput__tags__btn}`}
              onClick={() => setAdd(true)}
            >
              add_circle
            </button>
          ) : (
            <li className={style.TagInput__tags_input}>
              <input
                type="text"
                onKeyPress={inputKeyDown}
                placeholder="Buscar"
                onChange={handleInput}
                ref={inputRef}
              />
            </li>
          ))}
      </ul>
      {suggestions.length ? (
        <ul className={style.TagInput__suggestions}>
          {suggestions.map((item) => (
            <li key={item.id} onClick={() => addTags(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}

export default TagsInput;
