import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OptionsSelectFormInterface } from '../input';

import './orden-camp.scss';

/* eslint-disable-next-line */
export interface OrdenCampProps {
  setFields: Dispatch<SetStateAction<OptionsSelectFormInterface[]>>;
  fields: OptionsSelectFormInterface[];
  styleContent?: string;
}

export function OrdenCamp(props: OrdenCampProps) {
  const [view, setView] = useState<boolean>(false);
  const viewSelect = () => (view ? setView(false) : setView(true));

  const handleChecked = (index, event) => {
    props.fields.map(item => item.orden = false)
    props.fields[index].orden = event.target.checked
    props.setFields([...props.fields])
  }

  return (
    <section className="OrdenCamp">
      <span
        onClick={() => viewSelect()}
        className={`OrdenCamp__icon material-icons btn-circle btn-action`}
      >
        sort
      </span>
      {view && (
        <div className={`OrdenCamp__content ${props.styleContent}`}>
          {props.fields.map((item, index) => (
            <label key={index} className="OrdenCamp__content-item" htmlFor={item.name}>
              <input
                type="radio"
                id={item.name}
                name="orden"
                checked={item.orden}
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

export default OrdenCamp;
