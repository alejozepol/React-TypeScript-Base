import React, { Dispatch, SetStateAction, useState } from 'react';
import { OptionsSelectFormInterface } from '../input';

import './filters-camp.scss';

export interface ResultFilterInterface {
  field?: string;
  condition?: string;
  text?: string;
}

/* eslint-disable-next-line */
export interface FiltersCampProps {
  fields: OptionsSelectFormInterface[];
  results: ResultFilterInterface[];
  setResult: Dispatch<SetStateAction<ResultFilterInterface[]>>;
  styleContent?: string;
}

const options: OptionsSelectFormInterface[] = [
  {
    name: 'Es igual',
    id: '=',
  },
  {
    name: 'Contiene',
    id: '*',
  },
];

export function FiltersCamp(props: FiltersCampProps) {
  const [form, setValues] = useState<ResultFilterInterface>({});
  const [view, setView] = useState<boolean>(false);
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const viewFilters = () => (view ? setView(false) : setView(true));

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setResult([...props.results, form]);
    setValues({ condition: '', field: '', text: '' });
  };

  const handleDelete = (index) => {
    props.results.splice(index, 1);
    props.setResult([...props.results]);
  };

  return (
    <section className="FiltersCamp">
      <span
        onClick={() => viewFilters()}
        className={`FiltersCamp__icon material-icons btn-circle btn-action ${props.results.length > 0 && 'active'}`}
      >
        filter_alt
      </span>
      {view ? (
        <div className={`FiltersCamp__content ${props.styleContent}`}>
          <form onSubmit={handleSubmit} className="FiltersCamp__content_filter">
            <select
              id="field"
              name="field"
              className="FiltersCamp__content-select"
              onChange={handleInput}
              value={form.field}
              required
            >
              <option value="">Campos</option>
              {props.fields.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              id="condition"
              name="condition"
              className="FiltersCamp__content-select"
              value={form.condition}
              onChange={handleInput}
              required
            >
              <option value="">Condiciones</option>
              {options.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              className="FiltersCamp__content-select"
              placeholder="Buscar"
              name="text"
              value={form.text}
              onChange={handleInput}
              required
            />
            <button className="FiltersCamp__content-btn FiltersCamp__content-btn--add material-icons">
              check_circle
            </button>
          </form>
          <div className="FiltersCamp__content_actives">
            {props.results.map((item, index) => (
              <div className="FiltersCamp__content_actives-item">
                <div>{item.field}</div>
                <div>{item.condition}</div>
                <div>{item.text}</div>
                <button
                  onClick={() => handleDelete(index)}
                  className="FiltersCamp__content-btn FiltersCamp__content-btn--delete material-icons"
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </section>
  );
}

export default FiltersCamp;
