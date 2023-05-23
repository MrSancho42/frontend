import React from 'react';
import BlockHeader from '../components/BlockHeader';
import AddBillModal from '../modals/bills/AddBillModal';
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


function BusinessEmployeers() {
  const [modalShow, setModalShow] = React.useState(false);
  const employeers = [
    {
      pk_employeers: 1,
      name: 'Ковальчук Тарас',
      job: 'Бариста'
    },
    {
      pk_employeers: 2,
      name: 'Миколайчук Оксана',
      job: 'Бариста'
    },
    {
      pk_employeers: 3,
      name: 'Яровий Євген',
      job: 'Водій'
    }
  ]

  return (
    <>
      <BlockHeader title="Працівники" buttonText="Додати працівника" onButtonClick={() => setModalShow(true)} />
      <AddBillModal show={modalShow} onHide={() => setModalShow(false)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 1fr', gridGap: '20px' }}>
        {employeers.map((employee) => (
          <Card key={employee.pk_employeers} className='rounded-2 border-3 bg-light bg-gradient'>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span>{employee.name}</span>
              </div>
              <FontAwesomeIcon className='fa-lg' icon={faPenToSquare} />
            </Card.Header>
            <Card.Body>
              <div>
                <span>{employee.job}</span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BusinessEmployeers;
