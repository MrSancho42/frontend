import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faPenToSquare } from "@fortawesome/free-solid-svg-icons";


function Business(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const { business, onClick } = props;
  return (
    <Card key={business.pk_business}>
      <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 className='w-100' onClick={() => onClick()}>
          {business.name}
        </h4>
        <FontAwesomeIcon
          style={{ cursor: 'pointer' }}
          className='fa-lg cursor-pointer' icon={faPenToSquare} onClick={(event) => setModalShow(true)} />
      </Card.Header>
      <Card.Body onClick={() => onClick()}>
        <Card.Text className='h5'>
          <b>Власник:</b> {business.owner_name}<br />
          <b>НОКПП:</b> {business.taxpayer_account_card}<br />
          <b>Адресса:</b> {business.address}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Business;
