import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, } from "react-bootstrap";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function AddGroupModal(props) {
  const [show, setShow] = useState(true);

  const [name, setName] = useState('');

  function createBill() {
    const requestBody = {
      pk_user: cookies.get('current-user'),
      group: {
        name: name
      }
    };
    console.log(requestBody)
    axios.post('/group-services/create', requestBody)
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
          Нова група
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Назва групи</Form.Label>
            <Form.Control
              required type="text" placeholder="Назва групи"
              onChange={(event) => {setName(event.target.value)}}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={createBill}>Створити</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default AddGroupModal;