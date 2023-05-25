import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


function Business(props) {
  const { business, onClick } = props;
  return (
    <Card key={business.pk_business} onClick={() => onClick()} className='rounded-2 border-3 bg-light bg-gradient'>
      <Card.Body>
        <Card.Title>{business.name}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Business;
