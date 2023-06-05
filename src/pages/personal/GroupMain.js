import React from 'react';

import BlockHeader from '../../components/BlockHeader';
import AddBillModal from '../../modals/bills/AddBillModal';
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import BillsList from '../../views/BillsList';
import BusinessRecordsList from '../../views/BusinessRecordsList';
import AddRecordModal from '../../modals/records/AddRecordModal';
import GroupRecordsList from '../../views/GroupRecordsList';


function GroupMain() {
  const [addBudgetModalShow, setAddBudgetModalShow] = React.useState(false);
  const [addRecordModalShow, setAddRecordModalShow] = React.useState(false);

  const budgets = [
    {
      name: 'Поїздка 2023',
      amount: 1583,
      limit: 7500,
      currency: 'UAH',
      pk_bill: 1
    }
  ]

  return (
    <>
      <BlockHeader title="Бюджети групи" buttonText="Новий бюджет"/>
      <AddBillModal show={addBudgetModalShow} onHide={() => setAddBudgetModalShow(false)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 1fr', gridGap: '20px' }}>
        {budgets.map((budget) => (
          <Card key={budget.pk_bill} className='rounded-2 border-3 bg-light bg-gradient'>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span>{budget.name}</span>
              </div>
              <FontAwesomeIcon className='fa-lg' icon={faPenToSquare} />
            </Card.Header>
            <Card.Body>
              <Card.Title>Витрачено: {budget.amount} / {budget.limit} {budget.currency}</Card.Title>
              <div className="progress">
                <div
                  className={`progress-bar ${budget.limit > budget.amount ? 'bg-success' : 'bg-danger'}`}
                  style={{ width: `${budget.amount / budget.limit * 100}%` }} role="progressbar"
                ></div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <br />
      <br />
      <BlockHeader title="Записи групи" buttonText="Новий запис"/>
      <AddBillModal show={addBudgetModalShow} onHide={() => setAddBudgetModalShow(false)} />
      {/* <GroupRecordsList/> */}
    </>
  );
};

export default GroupMain;
