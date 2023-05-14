import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { useState } from 'react';
import { Container, Row, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const cookies = new Cookies();

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toPersonalAccount, setToPersonalAccount] = useState(true);


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setErrorMessage('');

    const params = {
      params: {
        email: email,
        password: password,
      }
    };
    axios.get('/user-services/login', params)
      .then(response => {
        cookies.set('current-user', response.data.pk_user);
        if (toPersonalAccount) {
          navigate('/personal/statistics')
        } else {
          navigate('/business/list')
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          setErrorMessage('Пароль невірний');
        } else if (error.response.status === 404) {
          setErrorMessage('Такого користувача не знайдено');
        } else {
          setErrorMessage('Невідома помилка');
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container
        onSubmit={handleSubmit}
        className="border border-2 p-4 rounded-3" style={{ width: '600px' }}
      >
        <Row className="d-flex justify-content-center">
          <div><h3 className="d-flex justify-content-center">Вхід в систему</h3></div>
        </Row>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Адрес електроної пошти</Form.Label>
            <Form.Control required type="email" placeholder="Електронна пошта" onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <InputGroup>
              <Form.Control
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                onChange={handlePasswordChange}
              />
              <Button
                variant="outline-secondary"
                onClick={toggleShowPassword}
                style={{ width: '46px' }}
              >
                {
                  showPassword ?
                    <FontAwesomeIcon icon={faEyeSlash} /> :
                    <FontAwesomeIcon icon={faEye} />
                }
              </Button>
            </InputGroup>
            {errorMessage && <Form.Text className="text-danger">{errorMessage}</Form.Text>}
          </Form.Group>

          <Button type="submit" onClick={() => setToPersonalAccount(true)} className="w-100 text-nowrap mb-3 btn-success">Увійти в персональний профіль</Button>
          <br />
          <Button type="submit" onClick={() => setToPersonalAccount(false)} className="w-100 text-nowrap btn-dark">Увійти для управління бізнесами</Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
