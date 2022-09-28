import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OptionsSelectFormInterface } from '../input';

import './select-camp.scss';

/* eslint-disable-next-line */
export interface SelectCampProps {
  setFields: Dispatch<SetStateAction<OptionsSelectFormInterface[]>>;
  fields: OptionsSelectFormInterface[];
  styleContent?: string;
}

export function SelectCamp(props: SelectCampProps) {
  const [view, setView] = useState<boolean>(false);
  const viewSelect = () => (view ? setView(false) : setView(true));

  const handleChecked = (index, event) => {
    props.fields[index].view = event.target.checked
    props.setFields([...props.fields])
  }

  return (
    <section className="SelectCamp">
      <span
        onClick={() => viewSelect()}
        className={`SelectCamp__icon material-icons btn-circle btn-action`}
      >
        rule
      </span>
      {view && (
        <div className={`SelectCamp__content ${props.styleContent}`}>
          {props.fields.map((item, index) => (
            <label key={index} className="SelectCamp__content-item" htmlFor={item.name}>
              <input
                type="checkbox"
                id={item.name}
                name={item.name}
                checked={item.view}
                onChange={(e) => handleChecked(index, e)}
              />
              {item.name}
            </label>
          ))}
        </div>
      )}
    </section>
  );
}

export default SelectCamp;
