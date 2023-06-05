import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Group from '../components/Group';


const cookies = new Cookies();

function GroupsList() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  function goToGroups(pk_group) {
    cookies.set('current-group', pk_group)
    navigate('group')
  }

  function getGroups() {
    const params = {
      params: {
        pk_user: cookies.get('current-user')
      }
    };
    axios.get('/group-services/get-groups', params)
      .then(response => {
        setGroups(response.data);
      })
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gridGap: '20px' }}>
      {groups.map((group) => (
        <Group key={group.pk_group} group={group} onClick={() => { goToGroups(group.pk_group) }} />
      ))}
    </div>
  );
};

export default GroupsList;
