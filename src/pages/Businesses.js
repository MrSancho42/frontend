import React from 'react';
import Container from 'react-bootstrap/Container';

import BlockHeader from '../components/BlockHeader';
import AddBillModal from '../modals/AddBillModal';
import BusinessesList from '../views/BusinessesList';


function Businesses() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container className="mt-5">
      <BlockHeader title="Бізнеси" buttonText="Новий бізнес" onButtonClick={() => setModalShow(true)} />
      <AddBillModal show={modalShow} onHide={() => setModalShow(false)} />
      <BusinessesList />
    </Container>
  );
};

export default Businesses;
