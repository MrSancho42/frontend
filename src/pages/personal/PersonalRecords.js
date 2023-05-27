import React from 'react';
import BlockHeader from '../../components/BlockHeader';
import PersonalRecordsList from '../../views/PersonalRecordsList';
import AddRecordModal from '../../modals/records/AddRecordModal';


function PersonalRecords() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <BlockHeader title="Записи" buttonText="Новий запис" onButtonClick={() => setModalShow(true)} />
      <AddRecordModal forBusiness={false} show={modalShow} onHide={() => setModalShow(false)} />
      <PersonalRecordsList/>
    </>
  );
};

export default PersonalRecords;
