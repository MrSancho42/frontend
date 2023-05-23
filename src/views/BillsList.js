import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Bill from '../components/Bill';


const cookies = new Cookies();

function BillsList({ listForBusiness=false }) {
  const [bills, setBills] = useState([]);

  function getBills() {
    const params = {
      params: {
        pk_user: cookies.get('current-user'),
        for_business: listForBusiness
      }
    };
    axios.get('/bill-services/get-bills', params)
      .then(response => {
        setBills(response.data);
      })
  }

  useEffect(() => {
    getBills();
    // const interval = setInterval(() => {
    //   getBills()
    // }, 5000);
    // return () => clearInterval(interval);

    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '20px' }}>
      {bills.map((bill) => (
        <Bill 
          key={bill.pk_bill}
          bill={bill} />
      ))}
    </div>
  );
};

export default BillsList;
