import React, { useEffect, useState } from 'react';
import './app.module.scss';

export const App = () => {

  const [books, setBooks] = useState<[]>([]);

  useEffect(() => {
    fetch('/api/books')
      .then((_) => _.json())
      .then(setBooks);
  }, []);

  return (
    <>
     <h1>Books</h1>
      <ul>
        {books.map((t) => (
          <li key={t} className={'book'}>{t}</li>
        ))}
      </ul>
    </>
  );
};

export default App;