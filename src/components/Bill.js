import React from 'react';
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateBillModal from '../modals/UpdateBillModal';



function Bill({ bill }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Card key={bill.pk_bill} className='rounded-2 border-3 bg-light bg-gradient' >
      <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {bill.is_for_business && <FontAwesomeIcon className='fa-lg me-2' icon={faBriefcase} />}
          <span>{bill.name}</span>
        </div>
        <UpdateBillModal bill={bill} show={modalShow} onHide={() => setModalShow(false)} />
        <FontAwesomeIcon style={{cursor: 'pointer'}}
        className='fa-lg cursor-pointer' icon={faPenToSquare} onClick={(event) => setModalShow(true)} />
      </Card.Header>
      <Card.Body>
        <Card.Title>{bill.amount}</Card.Title>
        <Card.Subtitle style={{ marginRight: 0, float: 'right' }}>{bill.currency}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Bill;
