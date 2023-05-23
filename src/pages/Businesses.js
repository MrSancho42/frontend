import React from 'react';
import Container from 'react-bootstrap/Container';

import BlockHeader from '../components/BlockHeader';
import BusinessesList from '../views/BusinessesList';


function Businesses() {
  // eslint-disable-next-line
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container className="mt-5">
      <BlockHeader title="Бізнеси" buttonText="Новий бізнес" onButtonClick={() => setModalShow(true)} />
      <BusinessesList />
    </Container>
  );
};

export default Businesses;
