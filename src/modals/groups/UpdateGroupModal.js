import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


function UpdateGroupModal(props) {
  const [notDelete, setNotDelete] = useState(true);

  const [name, setName] = useState(props.group.name);

  function ChangeGroup() {
    const requestBody = {
        pk_group: props.group.pk_group,
        name: name,
    };
    console.log(requestBody)
    axios.patch('/group-services/update', requestBody)
  }

  function DeleteGroup() {
    setNotDelete(false)
    window.location.reload();
  }


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
          Редагувати групу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ChangeGroup}>
          <Form.Group className="mb-3">
            <Form.Label>Назва групи</Form.Label>
            <Form.Control
              required type="text" placeholder="Назва групи" value={name}
              onChange={(event) => {setName(event.target.value)}}
            />
          </Form.Group>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button className='w-100' variant="primary" type="submit" >
              Внести зміни
            </Button>
            <Button
              className='ms-3 text-nowrap' variant="danger" type="button"
              onClick={DeleteGroup} >
              Видалити<FontAwesomeIcon className='ms-2' icon={faTrashCan} />
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


export default UpdateGroupModal;