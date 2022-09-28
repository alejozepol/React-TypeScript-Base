import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import FiltersCamp, { ResultFilterInterface } from "../filters-camp";
import { OptionsSelectFormInterface } from "../input";
import OrderCamp from "../order-camp";
import SelectCamp from "../select-camp";
import { exportTabletoExcel } from "../utils";

import "./table-info.scss";

/* eslint-disable-next-line */
export interface TableInfoProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: {}[];
  setData: React.Dispatch<React.SetStateAction<{}[]>>;
  title: string;
  fieldsTable: OptionsSelectFormInterface[];
  filterView: boolean;
  orderFields: boolean;
  selectFieldsView: boolean;
  setFieldsTable: Dispatch<SetStateAction<OptionsSelectFormInterface[]>>;
  newRegisterView: boolean;
  newRegisterOnClick?: any;
  downloadView: boolean;
  downloadsheet?: string;
  actionsView: boolean;
  onClicVisibility?: any;
  onClicEdit?: any;
  onClicDelete?: any;
  messageOffInformation?: string;
}

export function TableInfo({
  actionsView,
  data,
  downloadView,
  fieldsTable,
  filterView,
  newRegisterView,
  selectFieldsView,
  setFieldsTable,
  title,
  downloadsheet,
  messageOffInformation,
  newRegisterOnClick,
  onClicDelete,
  onClicEdit,
  onClicVisibility,
  orderFields,
}: TableInfoProps) {
  const [dataState, setData] = useState([]);
  const [conditions, setConditions] = useState<ResultFilterInterface[]>([]);
  const [ordens, setOrdens] = useState<ResultFilterInterface[]>([]);
  console.log(data);
  useEffect(() => setData(data), [data]);

  useEffect(() => {
    if (conditions.length) {
      const result = data.filter((item) => {
        let condition = conditions.map((filter) => {
          switch (filter.condition) {
            case "Es igual": {
              return (
                String(item[filter.field]).toUpperCase() ==
                filter.text.toUpperCase()
              );
            }
            case "Contiene": {
              return String(item[filter.field])
                .toUpperCase()
                .includes(filter.text.toUpperCase());
            }
            default:
              break;
          }
        });
        condition = [...new Set(condition)];
        if (condition.length === 1 && condition[0]) {
          return true;
        }
        return false;
      });

      setData([...result]);
    } else {
      setData([...data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions]);

  useEffect(() => {
    const activeOrder = fieldsTable.find((item) => item.orden === true);
    if (activeOrder) {
      function compare_lname(a: { [x: string]: { toLowerCase: () => number; }; }, b: { [x: string]: { toLowerCase: () => number; }; }) {
        if (a[activeOrder?.name || ''].toLowerCase() < b[activeOrder?.name || ''].toLowerCase()) {
          return -1;
        }
        if (a[activeOrder?.name || ''].toLowerCase() > b[activeOrder?.name || ''].toLowerCase()) {
          return 1;
        }
        return 0;
      }
      const result = dataState.sort(compare_lname)
      setData([...result]);
    } else {
      setData([...data]);
    }
  }, [fieldsTable]);

  const handleDownload = () => {
    exportTabletoExcel(dataState as [], "Descarga ICE", "a", false);
  };
  return (
    <section className="TableInfo">
      <h2 className="TableInfo__title">{title}</h2>
      <div className="TableInfo__actions">
        {filterView && (
          <FiltersCamp
            fields={fieldsTable}
            results={conditions}
            setResult={setConditions}
            styleContent="TableInfo__actions-filter"
          />
        )}
        {selectFieldsView && (
          <SelectCamp
            fields={fieldsTable}
            setFields={setFieldsTable}
            styleContent="TableInfo__actions-select"
          />
        )}
        {orderFields && (
          <OrderCamp
            fields={fieldsTable}
            setFields={setFieldsTable}
            styleContent="TableInfo__actions-filter"
          />
        )}
        {downloadView && (
          <span
            className="material-icons btn-circle btn-navegation"
            onClick={handleDownload}
          >
            download
          </span>
        )}
        {newRegisterView && (
          <span
            className="material-icons btn-circle btn-navegation"
            onClick={newRegisterOnClick}
          >
            add
          </span>
        )}
      </div>
      {dataState.length ? (
        <div className="TableInfo__tablaContainer">
          <table id="TableInfo" className="TableInfo__tabla">
            <thead>
              <tr>
                <th className="TableInfo__firt">#</th>
                {dataState.length > 0 &&
                  fieldsTable.map(
                    (item, index) =>
                      item.view && <th key={index}>{String(item.name)}</th>
                  )}
                {actionsView && (
                  <th className="TableInfo__row-action">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {dataState.map((item, index) => (
                <tr className="TableInfo__row" key={index}>
                  <td className="TableInfo__firt">{index + 1}</td>
                  {Object.values(item).map(
                    (value, index) =>
                      fieldsTable[index]?.view && (
                        <td key={index}>{String(value)}</td>
                      )
                  )}
                  {actionsView && (
                    <td className="TableInfo__row-action TableInfo__last">
                      <button
                        className="material-icons btn-circle TableInfo__row-action--view"
                        onClick={() => onClicVisibility(index)}
                      >
                        visibility
                      </button>
                      <button
                        className="material-icons btn-circle TableInfo__row-action--edit"
                        onClick={() => onClicEdit(index)}
                      >
                        edit
                      </button>
                      {/*                     <button
                        className="material-icons btn-circle TableInfo__row-action--delete"
                        onClick={() => onClicDelete(index)}
                      >
                        delete
                      </button> */}
                    </td>
                  )}
                </tr>
              ))}
              <tr className="TableInfo__footer">
                {/* //TODO scroll infinito */}
                <td></td>
                {dataState.length > 0 &&
                  Object.keys(dataState[0]).map((key, index) => (
                    <td key={index}></td>
                  ))}
                {actionsView && <th></th>}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <h4>{messageOffInformation}</h4>
      )}
    </section>
  );
}

export default TableInfo;
