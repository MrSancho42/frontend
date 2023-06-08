import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


function UpdateBillModal(props) {
  const [notDelete, setNotDelete] = useState(true);

  const [name, setName] = useState(props.bill.name);
  const [amount, setAmount] = useState(props.bill.amount);
  const [currency, setCurrency] = useState(props.bill.currency);
  const [isForBusiness, setIsForBusiness] = useState(props.bill.is_for_business);

  function ChangeBill() {
    const requestBody = {
        pk_bill: props.bill.pk_bill,
        name: name,
        amount: amount,
        currency: currency,
        is_for_business: isForBusiness
    };
    axios.patch('/bill-services/update', requestBody)
  }

  function DeleteBill() {
    console.log(`Delete bill ${props.bill.pk_bill}`)
    // const requestBody = {};
    // axios.patch('/bill-services/delete', requestBody)
    setNotDelete(false)
    window.location.reload();
  }


  return (
    <Modal
      show={props.show && notDelete}
      onHide={props.onHide}
      size="sg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="sq-modal">
        <Modal.Title id="contained-modal-title-vcenter">
          Редагувати рахунок
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="sq-modal">
        <Form onSubmit={ChangeBill}>
          <Form.Group className="mb-3">
            <Form.Label className="input-title">Назва рахунку</Form.Label>
            <Form.Control
              required type="text" placeholder="Рахунок" value={name} className="input-field"
              onChange={(event) => {setName(event.target.value)}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="input-title">Поточна сума</Form.Label>
            <Form.Control
              required type="number" placeholder="Рахунок" value={amount} className="input-field"
              onChange={(event) => {setAmount(event.target.value)}}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="input-title">Валюта</Form.Label>
            <Form.Select
              value={currency} className="input-field"
              onChange={(event) => {setCurrency(event.target.value)}}
            >
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
            </Form.Select>
          </Form.Group>

          <Form.Check
            type="switch" label="Відображати для бізнесу" checked={isForBusiness} className='mb-3'
            onChange={(event) => {setIsForBusiness(event.target.checked)}}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button className='w-100 accept-button' variant="primary" type="submit">
              Внести зміни
            </Button>
            <Button
              className='ms-3 text-nowrap' variant="danger" type="button"
              onClick={DeleteBill} >
              Видалити<FontAwesomeIcon className='ms-2' icon={faTrashCan} />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default UpdateBillModal;