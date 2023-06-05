import React from 'react';
import BlockHeader from '../../components/BlockHeader';
import GroupsList from '../../views/GroupsList';
import AddGroupModal from '../../modals/groups/AddGroupModal';


function Groups() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <BlockHeader title="Групи" buttonText="Нова група" onButtonClick={() => setModalShow(true)} />
      <AddGroupModal show={modalShow} onHide={() => setModalShow(false)} />
      <GroupsList />
    </>
  );
};

export default Groups;
