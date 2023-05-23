import React from 'react';

import BlockHeader from '../components/BlockHeader';
import AddBillModal from '../modals/AddBillModal';
import BillsList from '../views/BillsList';
import BusinessRecordsList from '../views/BusinessRecordsList';
import AddRecordModal from '../modals/AddRecordModal';


function BusinessMain() {
  const [addBillModalShow, setAddBillModalShow] = React.useState(false);
  const [addRecordModalShow, setAddRecordModalShow] = React.useState(false);

  return (
    <>
      <BlockHeader title="Рахунки бізнесу" buttonText="Новий рахунок" onButtonClick={() => setAddBillModalShow(true)} />
      <AddBillModal show={addBillModalShow} onHide={() => setAddBillModalShow(false)} />
      <BillsList listForBusiness={true} />
      <br />
      <br />
      <BlockHeader title="Записи" buttonText="Новий запис" onButtonClick={() => setAddRecordModalShow(true)} />
      <AddRecordModal forBusiness={true} show={addRecordModalShow} onHide={() => setAddRecordModalShow(false)} />
      <BusinessRecordsList />
    </>
  );
};

export default BusinessMain;
