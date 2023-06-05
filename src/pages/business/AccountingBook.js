import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Cookies } from "react-cookie";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/uk";

moment.locale("uk");

const cookies = new Cookies();

function AccountingBook() {
  const [book, setBook] = useState("");
  const [selectedYear, setSelectedYear] = useState(moment(Date.now()));
  const [selectedMonth, setSelectedMonth] = useState(moment('Sun Jan 01 2023 00:00:00 GMT+0200'));
  const [group, setGroup] = useState("3");


  function getBook() {
    if (book !== "") {
      setBook(URL.revokeObjectURL(book));
    }
    axios.get("/business-services/get-book-report",  {
      params: {
        year: selectedYear,
        month: selectedMonth.format('MMMM'),
        group: group,
        pk_business: cookies.get("current-business")
      },
      responseType: "blob",
    })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        setBook(URL.createObjectURL(pdfBlob));
      })
      .catch((error) => {
        console.log("error");
        console.error("Помилка при отриманні PDF:", error);
      });
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex justify-content-start align-items-center gap-3">
          <div>Рік: </div>
          <Datetime
            dateFormat="YYYY"
            viewMode="years"
            timeFormat={false}
            closeOnSelect
            locale="uk"
            value={selectedYear}
            onChange={setSelectedYear}
          />

          <div className="text-nowrap">Початок перебування на групі ЄП: </div>
          <Datetime
            dateFormat="MMMM"
            viewMode="months"
            timeFormat={false}
            value={selectedMonth}
            closeOnSelect
            onChange={setSelectedMonth}
          />
          <div>ЄП: </div>
          <Form.Select
            className="w-25"
            value={group}
            onChange={(event) => setGroup(event.target.value)}
          >
            <option key="1" value="1">
              I групи
            </option>
            <option key="2" value="2">
              II групи
            </option>
            <option key="3" value="3">
              III групи 5%
            </option>
            <option key="4" value="4">
              III групи 2%
            </option>
          </Form.Select>
        </div>
        <Button onClick={() => getBook()}>Створити</Button>
      </div>
      <object data={book} type="application/pdf" width="100%" height="900px">
        <p>
          Alternative text - include a link <a href={book}>to the PDF!</a>
        </p>
      </object>
    </>
  );
}

export default AccountingBook;
