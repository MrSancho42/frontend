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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новий рахунок
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Назва рахунку</Form.Label>
            <Form.Control
              required type="text" placeholder="Рахунок"
              onChange={(event) => {setName(event.target.value)}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Початкова сума</Form.Label>
            <Form.Control
              required type="number" placeholder="Рахунок"
              onChange={(event) => {setAmount(event.target.value)}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Валюта</Form.Label>
            <Form.Select
              value={currency}
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createBill}>Створити</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default AddBillModal;