import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/uk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

moment.locale("uk");

function UpdateBusinessModal(props) {
  // eslint-disable-next-line
  const [show, setShow] = useState(true);
  const [notDelete, setNotDelete] = useState(true);

  const [businessName, setBusinessName] = useState(props.business.name);
  const [ownerName, setOwnerName] = useState(props.business.owner_name);
  const [taxpayerAccountCard, setTaxpayerAccountCard] = useState(
    props.business.taxpayer_account_card
  );
  const [businessAddress, setBusinessAddress] = useState(
    props.business.address
  );

  function createRecord() {
    const requestBody = {
      pk_business: props.business.pk_business,
      name: businessName,
      owner_name: ownerName,
      taxpayer_account_card: taxpayerAccountCard,
      address: businessAddress,
    };
    axios.patch("/business-services/update", requestBody);
  }

  function DeleteRecord() {
    console.log(`Delete record ${props.business.pk_business}`);
    setNotDelete(false);
  }

  return (
    <Modal
      show={props.show && show && notDelete}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Змінити бізнес
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={createRecord}>
          <Form.Group className="mb-3">
            <Form.Label>Назва бізнесу</Form.Label>
            <Form.Control
              required
              value={businessName}
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
              value={taxpayerAccountCard}
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
              value={ownerName}
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
              value={businessAddress}
              type="text"
              placeholder="Адреса"
              onChange={(event) => {
                setBusinessAddress(event.target.value);
              }}
            />
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button className="w-100" variant="primary" type="submit">
              Внести зміни
            </Button>
            <Button
              className="ms-3 text-nowrap"
              variant="danger"
              type="button"
              onClick={() => DeleteRecord()}
            >
              Видалити
              <FontAwesomeIcon className="ms-2" icon={faTrashCan} />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateBusinessModal;
