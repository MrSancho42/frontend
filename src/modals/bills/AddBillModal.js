import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, } from "react-bootstrap";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function AddBillModal(props) {
  const [show, setShow] = useState(true);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('UAH');
  const [isForBusiness, setIsForBusiness] = useState(false);

  function createBill() {
    const requestBody = {
      pk_user: cookies.get('current-user'),
      bill: {
        name: name,
        amount: amount,
        currency: currency,
        is_for_business: isForBusiness
      }
    };
    console.log(requestBody)
    axios.post('/bill-services/create', requestBody)
      .then(response => {
        if (response.status === 201) {
          setShow(false);
          window.location.reload();
        }
      })
      .catch(error => {
        console.log('Невідома помилка')
      });
  }

  return (
    <Modal
      show={props.show && show}
      onHide={props.onHide}
      size="sg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="sq-modal">
        <Modal.Title id="contained-modal-title-vcenter">
          Новий рахунок
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="sq-modal">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Назва рахунку</Form.Label>
            <Form.Control
              required type="text" placeholder="Рахунок" className="input-field"
              onChange={(event) => {setName(event.target.value)}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Початкова сума</Form.Label>
            <Form.Control
              required type="number" placeholder="Рахунок" className="input-field"
              onChange={(event) => {setAmount(event.target.value)}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Валюта</Form.Label>
            <Form.Select
              value={currency} className="input-field"
              onChange={(event) => {setCurrency(event.target.value)}}
            >
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
            </Form.Select>
          </Form.Group>

          <Form.Check
            type="switch" label="Відображати для бізнесу"
            onChange={(event) => {setIsForBusiness(event.target.checked)}}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <Button className='w-100 accept-button' variant="primary"  onClick={createBill}>Створити</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default AddBillModal;