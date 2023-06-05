import React from 'react';
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateGroupModal from '../modals/groups/UpdateGroupModal';


function Group(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const { group, onClick } = props;

  return (
    <Card key={group.pk_group} className='rounded-2 border-3 bg-light bg-gradient' >
      <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div onClick={() => onClick()} style={{cursor: 'pointer'}}>
          <span>{group.name}</span>
        </div>
        <UpdateGroupModal group={group} show={modalShow} onHide={() => setModalShow(false)} />
        <FontAwesomeIcon style={{cursor: 'pointer'}}
        className='fa-lg cursor-pointer' icon={faPenToSquare} onClick={(event) => setModalShow(true)} />
      </Card.Header>
    </Card>
  );
};

export default Group;
