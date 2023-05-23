import React from 'react';

import BlockHeader from '../../components/BlockHeader';
import BusinessRecordsList from '../../views/BusinessRecordsList';
import AddRecordModal from '../../modals/records/AddRecordModal';


function BusinessRecords() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <BlockHeader title="Записи" buttonText="Новий запис" onButtonClick={() => setModalShow(true)} />
      <AddRecordModal forBusiness={true} show={modalShow} onHide={() => setModalShow(false)} />
      <BusinessRecordsList />
    </>
  );
};

export default BusinessRecords;
