import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import UpdateBusinessModal from "../modals/business/UpdateBusinessModal";

function Business(props) {
  const [modalShow, setModalShow] = useState(false);
  const { business, onClick } = props;
  return (
    <>
      <UpdateBusinessModal
        business={business}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Card key={business.pk_business}>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h4 className="w-100" onClick={() => onClick()}>
            {business.name}
          </h4>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            className="fa-lg cursor-pointer"
            icon={faPenToSquare}
            onClick={() => setModalShow(true)}
          />
        </Card.Header>
        <Card.Body onClick={() => onClick()}>
          <Card.Text className="h5">
            <b>Власник:</b> {business.owner_name}
            <br />
            <b>НОКПП:</b> {business.taxpayer_account_card}
            <br />
            <b>Адреса:</b> {business.address}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Business;
