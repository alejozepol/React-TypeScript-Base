import React from "react";
import { Data } from "./welcome";
import Style from "./app.module.scss";
import TableInfo from "./components/table-info";

export interface ResultProps {
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  dataResult: Data[];
}


const Result = ({dataResult, setData}:ResultProps) => {

  return (<section>
    <TableInfo
      data={dataResult}
      title='sda'
    />

  </section>)
}

export default Result;
