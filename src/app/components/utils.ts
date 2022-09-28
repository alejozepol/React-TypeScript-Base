import * as XLSX from 'xlsx';
/* eslint-disable-next-line */

export const exportTabletoExcel = (data: [],
  filename: string,
  sheet: string,
  isArray = false
) => {
  const today = new Date(Date.now());
  filename = `${String(filename)}-${today.toLocaleDateString()}-${today.toLocaleTimeString()}`;
  const book = XLSX.utils.book_new();
  let dataToFile = XLSX.utils.json_to_sheet(data);
  if (isArray) {
    dataToFile = XLSX.utils.aoa_to_sheet(data);
  }
  book.Props = {
    Title: filename,
    Author: 'Alejandro Lopez',
    Company: 'Prueba Tecnica'
  }
  book.SheetNames.push(sheet);
  book.Sheets[sheet] = dataToFile
  console.log(book)
  return XLSX.writeFile(book, `${filename}.xlsx`)

}


export const fieldNameId = (array: any[], id: number) => array.find((item) => item.id === id)?.name || '';
