import axios from 'axios';
import { Cookies } from 'react-cookie';
import React, { useState, useEffect } from 'react';

import { Button, Modal, Form, ButtonGroup, ToggleButton } from "react-bootstrap";

import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import 'moment/locale/uk';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


moment.locale('uk');

const cookies = new Cookies();

function BusinessRecordSubKinds(props) {
  if (props.kind === 'INCOME') {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Вид доходу</Form.Label>
        <Form.Select
          value={props.subKind}
          onChange={(event) => props.setSubKind(event.target.value)}
        >
          <option key='CASH' value='CASH'>Готівковий розрахунок</option>
          <option key='NON_CASH' value='NON_CASH'>Безготівковий розрахунок</option>
          <option key='FREE_RECEIVED' value='FREE_RECEIVED'>Безоплатно отриманий дохід</option>
          <option key='GRANTS' value='GRANTS'>Грантові кошти</option>
        </Form.Select>
      </Form.Group>
    );
  }
  return (
    <Form.Group className="mb-3">
      <Form.Label>Вид витрати</Form.Label>
      <Form.Select
        value={props.subKind}
        onChange={(event) => props.setSubKind(event.target.value)}
      >
        <option key='REGULAR_SPENDING' value='REGULAR_SPENDING'>Витрата</option>
        <option key='REFUND' value='REFUND'>Повернення коштів</option>
      </Form.Select>
    </Form.Group>
  );
}

function UprateRecordModal(props) {
  const [notDelete, setNotDelete] = useState(true);

  const [bills, setBills] = useState([]);

  const [selectedBill, setSelectedBill] = useState(props.record.fk_bill);
  const [amount, setAmount] = useState(props.record.amount);
  const [description, setDescription] = useState(props.record.description);
  const [kind, setKind] = useState(props.record.kind);
  const [subKind, setSubKind] = useState(props.record.sub_kind);
  const [currency, setCurrency] = useState(props.record.currency);
  const [selectedDate, setSelectedDate] = useState(moment(Date.parse(props.record.creation_time)));

  const kindOption = [
    { value: 'INCOME', label: 'Дохід', variant: 'outline-success' },
    { value: 'SPENDING', label: 'Витрата', variant: 'outline-danger' },
    // { value: 'transfer', label: 'Переказ', variant: 'outline-danger'},
  ];

  function getBills() {
    const params = {
      params: {
        pk_user: cookies.get('current-user'),
        for_business: props.forBusiness
      }
    };
    axios.get('/bill-services/get-bills', params)
      .then(response => {
        setBills(response.data);
      })
  }

  function UpdateRecord() {
    console.log(selectedDate)
    const requestBody = {
      pk_record: props.record.pk_record,
      fk_bill: selectedBill,
      amount: amount,
      description: description,
      currency: currency,
      kind: kind,
      creation_time: selectedDate.format('YYYY-MM-DDTHH:mm:ss.SSSSSS')
    };

    var resource = "/record-services/update"
    if (props.forBusiness) {
      resource = "/business-record-services/update"
      requestBody.sub_kind = subKind;
    }
    axios.patch(resource, requestBody)
  }

  function DeleteRecord() {
    console.log(`Delete record ${props.record.pk_record}`)
    setNotDelete(false)
  }

  useEffect(() => {
    getBills();
    // eslint-disable-next-line
  }, []);

  useEffect(() => { if (bills.length > 0) setSelectedBill(bills[0].pk_bill) }, [bills]);

  return (
    <Modal
      show={props.show && notDelete}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новий запис
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={UpdateRecord}>
          <ButtonGroup toggle className='w-100 mb-3'>
            {kindOption.map((option) => (
              <ToggleButton
                key={option.value}
                id={`radio-${option.value}`}
                type="radio"
                variant={option.variant}
                name="options"
                value={option.value}
                checked={kind === option.value}
                onChange={(event) => {
                  setKind(event.target.value)
                  if (kind === 'INCOME') setSubKind('NON_CASH')
                  if (kind === 'SPENDING') setSubKind('REGULAR_SPENDING')
                }}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ButtonGroup>

          {
            props.forBusiness
              ? <BusinessRecordSubKinds kind={kind} subKind={subKind} setSubKind={setSubKind} />
              : null
          }

          <Form.Group className="mb-3">
            <Form.Label>Рахунок</Form.Label>
            <Form.Select
              value={selectedBill}
              onChange={(event) => setSelectedBill(event.target.value)}
            >
              {bills.map((bill) => (
                <option key={bill.pk_bill} value={bill.pk_bill}>{bill.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Сума</Form.Label>
            <Form.Control
              value={amount}
              required type="number" placeholder="Сума" min="0" step="0.01" onKeyDown={(event) => {
                if (event.key === '-') event.preventDefault()
              }}
              onChange={(event) => { setAmount(Number(event.target.value)) }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Коментар</Form.Label>
            <Form.Control
              value={description}
              type="text" placeholder="Коментар"
              onChange={(event) => { setDescription(event.target.value) }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Валюта</Form.Label>
            <Form.Select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option key="UAH" value="UAH">UAH</option>
              <option key="USD" value="USD">USD</option>
            </Form.Select>
          </Form.Group>

          <Datetime
            className="mb-3"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat='D MMM Y р.,'
            locale="uk" />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button className='w-100' variant="primary" type="submit">
              Внести зміни
            </Button>
            <Button
              className='ms-3 text-nowrap' variant="danger" type="button"
              onClick={() => DeleteRecord()} >
              Видалити
              <FontAwesomeIcon className='ms-2' icon={faTrashCan} />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UprateRecordModal;
