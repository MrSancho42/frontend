import React from "react";
import UprateRecordModal from "../modals/records/UpdateRecordModal";

function Record({ record, forBusiness }) {
  const [modalShow, setModalShow] = React.useState(false);

  const formattedTime = new Date(record.creation_time).toLocaleTimeString(
    "uk",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const isIncome = record.kind === "INCOME";
  const subKind = {
    CASH: "Готівковий розрахунок",
    NON_CASH: "Безготівковий розрахунок",
    FREE_RECEIVED: "Безоплатно отриманий дохід",
    GRANTS: "Грантові кошти",
    REGULAR_SPENDING: "Витрата",
    REFUND: "Повернення коштів",
  }[record.sub_kind];

  return (
    <>
      <UprateRecordModal
        forBusiness={forBusiness}
        record={record}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div
        className={`w-100 finance-block d-flex justify-content-between border ${
          isIncome ? "green-status" : "red-status"
        } finance-block`}
        onClick={() => setModalShow(true)}
      >
        <div className="w-100 d-flex flex-column p-2">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="text-end m-0">{record.description}</h5>
            <div className="d-flex">
              <b className="h5 m-0">
                {!isIncome ? "-" : ""}
                {record.amount}
              </b>
              <span className="ms-2">{record.currency}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
              <span className="">
                {!forBusiness ? record.category_name : ""}
              </span>
            <div className="d-flex flex-column justify-content-end">
              <span className="text-end" style={{ "font-size": "14px" }}>
                {subKind}
              </span>
            </div>
            <span style={{ width: 50 }} className="text-end">
              {formattedTime}
            </span>
          </div>
        </div>
        {/* <div
          className={isIncome ? "bg-success" : "red-staus"}
          style={{ width: "2em", height: "100%" }}
        /> */}
      </div>
    </>
  );
}

export default Record;
