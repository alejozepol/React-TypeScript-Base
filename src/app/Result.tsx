import React, { useEffect, useState } from "react";
import { Data } from "./welcome";
import Style from "./app.module.scss";
import TableInfo from "./components/table-info";
import { OptionsSelectFormInterface } from "./components/input";

export interface ResultProps {
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  dataResult: Data[];
}

const Result = ({ dataResult, setData }: ResultProps) => {
  const [fieldsTable, setFieldsTable] = useState<OptionsSelectFormInterface[]>(
    []
  );

  useEffect(() => {
    const _fieldsFilters: OptionsSelectFormInterface[] = [];

    if (dataResult.length) {
      Object.keys(dataResult[0]).map((key) =>
        _fieldsFilters.push({ id: key, name: key, view: true })
      );
      setFieldsTable(_fieldsFilters);
    }
  }, [dataResult]);

  console.log(dataResult);
  return (
    <section className={Style.resultPage}>
      <TableInfo
        data={dataResult}
        title="Tabla"
        fieldsTable={fieldsTable}
        setFieldsTable={setFieldsTable}
        actionsView={false}
        downloadView={true}
        filterView={true}
        selectFieldsView={true}
        orderFields={true}
      />
      <section className={Style.org}>
      <h1>Organigrama relacion Lider</h1>
      {dataResult
        .filter(
          (item) => item["Nivel Jerárquico"].toLocaleUpperCase() == "MANAGER" && item.Mes=='5-2020'
        )
        .map((item) => (
          <div>
            <h2>{`${item["Nivel Jerárquico"]} ${item.Area} - ${item.Nombre}`}</h2>
            {dataResult
              .filter((subitem) => subitem["ID Lider"] == item.ID && subitem.Mes=='5-2020' )
              .map((subitem) => (
                <div>
                  <h4>{`${subitem["Nivel Jerárquico"]} ${subitem.Area} - ${subitem.Nombre}`}</h4>
                  {dataResult
                    .filter((subitem2) => subitem2["ID Lider"] == item.ID  && subitem2.Mes=='5-2020')
                    .map((subitem2) => (
                      <h6>{`${subitem2["Nivel Jerárquico"]} ${subitem2.Area} - ${subitem2.Nombre}`}</h6>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </section>
    </section>
  );
};

export default Result;
