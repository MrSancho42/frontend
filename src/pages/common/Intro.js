import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import LinkButton from "../../components/LinkButton";


function Intro() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container className="border border-2 p-4 rounded-3" style={{ width: '600px' }}>
        <Row className="d-flex justify-content-center mb-4">
          <h3>Вітаємо Вас у системі обліку фінансів </h3>
          <div>Якщо Ви вперше вирішили скористатися нашою системою, просимо зареєструватися </div>
          <div>Якщо Ви вже маєте обліковий запис то увійдіть за його допомогою</div>
        </Row>
        <Row>
          <Col>
            <LinkButton to="/login" variant="primary">Увійти</LinkButton>
          </Col>
          <Col>
            <LinkButton to="/registration" variant="secondary">Зареєструватися</LinkButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Intro;
