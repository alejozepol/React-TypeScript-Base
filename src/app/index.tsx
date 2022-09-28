import React, { useState } from "react";
import Welcome, { Data } from './welcome';
import Style from "./app.module.scss";
import Result from "./Result";

const App = () => {
  const [dataResult, setData] = useState<Data[]>([]);
  console.log(dataResult, 0)
  return (
    <>
      {
        dataResult.length === 0 ? (
          <Welcome dataResult={dataResult} setData={setData} />
        ) : (
            <Result dataResult={dataResult} setData={setData}  />
        )
      }

    </>
  );
};

export default App;
