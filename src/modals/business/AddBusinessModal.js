import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { Cookies } from "react-cookie";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/uk";

moment.locale("uk");

const cookies = new Cookies();

function AddBusinessModal(props) {
  // eslint-disable-next-line
  const [show, setShow] = useState(true);

  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [taxpayerAccountCard, setTaxpayerAccountCard] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");

  function createRecord() {
    const requestBody = {
      pk_user: cookies.get("current-user"),
      business: {
        name: businessName,
        owner_name: ownerName,
        taxpayer_account_card: taxpayerAccountCard,
        address: businessAddress,
      },
    };
    axios.post("/business-services/create", requestBody);
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
          Новий бізнес
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createRecord}>
          <Form.Group className="mb-3">
            <Form.Label>Назва бізнесу</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Назва"
              onChange={(event) => {
                setBusinessName(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Реєстраційний номер облікової картки платника податків (РНОКПП)
            </Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="РНОКПП"
              onChange={(event) => {
                setTaxpayerAccountCard(Number(event.target.value));
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Фізична особа-підприємець</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Імʼя власника"
              onChange={(event) => {
                setOwnerName(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Адреса місця реєстрації фізичної особи-підприємця
            </Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Адреса"
              onChange={(event) => {
                setBusinessAddress(event.target.value);
              }}
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Створити
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBusinessModal;
