import React from 'react';
import BlockHeader from '../../components/BlockHeader';
import AddBillModal from '../../modals/bills/AddBillModal';
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


function PersonalBudgets() {
  const [modalShow, setModalShow] = React.useState(false);
  const bills = [
    {
      name: 'Продукти харчування',
      amount: 3483,
      limit: 5000,
      currency: 'UAH',
      pk_bill: 1
    },
    {
      name: 'Книги',
      amount: 2483,
      limit: 2000,
      currency: 'UAH',
      pk_bill: 2
    },
    {
      name: 'Квартира',
      amount: 1600,
      limit: 11000,
      currency: 'UAH',
      pk_bill: 3
    }
  ]

  return (
    <>
      <BlockHeader title="Бюджети" buttonText="Новий бюджет" onButtonClick={() => setModalShow(true)} />
      <AddBillModal show={modalShow} onHide={() => setModalShow(false)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 1fr', gridGap: '20px' }}>
        {bills.map((bill) => (
          <Card key={bill.pk_bill} className='rounded-2 border-3 bg-light bg-gradient'>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }} className=' sq-modal'>
              <div>
                <h3>{bill.name}</h3>
              </div>
              <FontAwesomeIcon className='fa-lg' icon={faPenToSquare} />
            </Card.Header>
            <Card.Body className='sq-modal'>
              <Card.Title>Витрачено: {bill.amount} / {bill.limit} {bill.currency}</Card.Title>
              <div className="progress">
                <div
                  className={`progress-bar ${bill.limit > bill.amount ? 'bg-success' : 'bg-danger'}`}
                  style={{ width: `${bill.amount / bill.limit * 100}%` }} role="progressbar"
                ></div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PersonalBudgets;
