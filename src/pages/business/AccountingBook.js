import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { Cookies } from 'react-cookie';


const cookies = new Cookies();

function AccountingBook() {
  const [book, setBook] = useState('');

  function getBook() {
    if (book !== '') {
      console.log('delete')
      setBook(URL.revokeObjectURL(book));
    }
    console.log(book)
    axios({
        method: 'get',
        url: '/business-services/get-book-report',
        responseType: 'blob',
      })
        .then((response) => {
          console.log('responce')
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

          
          setBook(URL.createObjectURL(pdfBlob));
          console.log(book)
        })
        .catch((error) => {
          console.log('error')
          console.error('Помилка при отриманні PDF:', error);
        });
  }

  return (
    <>
    <Button onClick={() => getBook()} className="w-100">Створити</Button>
    <object data={book} type="application/pdf" width="100%" height="900px">
        <p>Alternative text - include a link <a href={book}>to the PDF!</a></p>
    </object>
    </>
  );
};

export default AccountingBook;
