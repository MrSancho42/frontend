import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const cookies = new Cookies();

function BusinessesList() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);

  function goToBusiness(pk_business) {
    cookies.set('current-business', pk_business)
    navigate('/business/main')
  }

  function getBusinesses() {
    const params = {
      params: {
        pk_user: cookies.get('current-user')
      }
    };
    axios.get('/business-services/get-businesses', params)
      .then(response => {
        setBusinesses(response.data);
      })
      .catch(error => {
        console.log('Невідома помилка');
      });
  }

  useEffect(() => {
    getBusinesses()
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '20px' }}>
      {businesses.map((business) => (
        <Card key={business.pk_business} onClick={() => { goToBusiness(business.pk_business) }} className='rounded-2 border-3 bg-light bg-gradient'>
          <Card.Body>
            <Card.Title>{business.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default BusinessesList;
