import React from 'react';
import UprateRecordModal from '../modals/records/UpdateRecordModal'

function Record({ record, forBusiness }) {
  const [modalShow, setModalShow] = React.useState(false);

  const formattedTime = new Date(record.creation_time).toLocaleTimeString('uk', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const isIncome = record.kind === 'INCOME';

  return (
    <>
      <UprateRecordModal forBusiness={forBusiness} record={record} show={modalShow} onHide={() => setModalShow(false)} />
      <div
        className={`w-100 d-flex justify-content-between border border-3 ${isIncome ? "border-success" : "border-danger"} rounded`}
        onClick={() => setModalShow(true)}>
        <div className='w-100 d-flex justify-content-between p-2'>
          <div>
            <b className='h5'>{!isIncome ? '-' : ''}{record.amount}</b>
            <span className='mx-2'>{record.currency}</span>
          </div>
          <div>
            <span>{record.description}</span>
            <span className='ms-3'>{formattedTime}</span>
          </div>
        </div>
        <div className={isIncome ? 'bg-success' : 'bg-danger'} style={{ width: '2em', height: '100%' }} />
      </div>
    </>
  );
};

export default Record;
