import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Record from '../components/Record';


const cookies = new Cookies();

function PersonalRecordsList() {
  const [records, setRecords] = useState([]);
  const [groupedRecords, setGroupedRecords] = useState([]);

  function getRecords() {
    const params = {
      params: {
        pk_user: cookies.get('current-user'),
      }
    };
    axios.get('/record-services/get-records', params)
      .then(response => {
        setRecords(response.data);
      })
  }

  useEffect(() => getRecords(), []);

  useEffect(() => {
    const tempGroupedRecords = []
    records.forEach((record) => {
      var date = new Date(record.creation_time)
        .toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' });

      if (!tempGroupedRecords[date]) tempGroupedRecords[date] = [];
      tempGroupedRecords[date].push(record);
    });
    setGroupedRecords(tempGroupedRecords)
  }, [records]);

  return (
    <div className="d-grid gap-4">
      {Object.keys(groupedRecords).map((group) => (
        <div className="d-grid gap-2" key={group}>
          <h4 className="ms-auto" key={group}>{group}</h4>
          {groupedRecords[group].map((groupRecord) => (
            <Record
              key={groupRecord.pk_record} forBusiness={false} record={groupRecord} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PersonalRecordsList;
