import React from 'react';
import BlockHeader from '../../components/BlockHeader';
import BillsList from '../../views/BillsList';
import AddBillModal from '../../modals/bills/AddBillModal';


function PersonalMain() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <BlockHeader title="Рахунки" buttonText="Новий рахунок" onButtonClick={() => setModalShow(true)} />
      <AddBillModal show={modalShow} onHide={() => setModalShow(false)} />
      <BillsList list_for_business={false} />
    </>
  );
};

export default PersonalMain;
