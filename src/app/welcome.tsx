import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Style from "./app.module.scss";
import useGoogleSheets from "use-google-sheets";

export interface WelcomeProps {
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  dataResult: Data[];
}

export interface Data {
  Mes: string;
  Nombre: string;
  ID: string;
  "Fecha de ingreso": string;
  "Sueldo  bruto": string;
  "División": string;
  "Area": string;
  "Subarea": string;
  "ID Lider": string;
  "Nivel Jerárquico": string;
  "photourl"?: string;
}

const Welcome = ({ dataResult = [], setData}: WelcomeProps) => {
  const [file, setfile] = useState();
  const [inputSheet, setinputSheet] = useState('1Uc5bNZ3-ju_dPB68Ey-yd4hd-UVSDsUvbiKfPh3TXVM');
  const { data, loading, error } = useGoogleSheets({
    apiKey: 'AIzaSyDmfHQgkdyROMSs9893wsBOx7RCGjmK-Rw',
    sheetId: inputSheet,
  });

  useEffect(() => {
    console.log(dataResult);
  }, [dataResult]);

  const formatToJSON = (arr: string[]) => {
    console.log(arr)
    const result: Data[] = [];
    if (arr.length > 0) {
      for (let i = 1; i < arr.length; i++) {
        result.push({
          Mes: arr[i][0],
          Nombre: arr[i][1],
          ID: arr[i][2],
          "Fecha de ingreso": arr[i][3],
          "Sueldo  bruto": arr[i][4],
          División: arr[i][5],
          Area: arr[i][6],
          Subarea: arr[i][7],
          "ID Lider": arr[i][8],
          "Nivel Jerárquico": arr[i][9]
        })
      }
      console.log(result)
      setData(result);
    }
  }

  const handlFile = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (file) {
      Papa.parse(file, {
        complete: (result) => formatToJSON(result.data as []),
      });
    }
  };

  const handleChange = (event: { target: { files: React.SetStateAction<undefined>[]; }; }) => setfile(event.target.files[0]);

  const handlSheet = (event) => {
    event.preventDefault();
    if (inputSheet && data.length > 0) {
      setData(data[0].data)
    }
  }

  return (
    <section className={Style.page}>
      <div className={Style.container}>
        <h1 className={Style.title}>Bienvenidos</h1>
        <p className={Style.par1}>
          Aqui podras cargar tú archivo en formato .cvs, .xsls o txt. Tambien
          puedes cargar los datos desde un hoja de calculo de google Sheet
        </p>
        <form onSubmit={handlFile} className={Style.formFile}>
          <input
            onChange={handleChange}
            type="file"
            name="file"
            accept=".xlsx, .txt, .cvs"
            required
          />
          <button>Enviar</button>
        </form>
        <form onSubmit={handlSheet} className={Style.formSheet}>
          <input placeholder="id hoja de calculo" required onChange={(e) => setinputSheet(e.target.value)} />
          <button >Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default Welcome;
