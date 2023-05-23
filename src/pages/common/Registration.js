import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Container, Row, Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Registration() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError('');

    if (password !== confirmPassword) {
      setPasswordError('Паролі не співпадають');
    } else {
      setPasswordError('');

      const requestBody = {
        email: email,
        password: password,
        name: name,
      };
      axios.post('/user-services/create', requestBody)
        .then(response => {
          if (response.status === 201) {
            navigate('/login')
          }
        })
        .catch(error => {
          setEmailError('Ця пошта вже використовується');
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container
        onSubmit={handleSubmit}
        className="border border-2 p-4 rounded-3" style={{ width: '600px' }}
      >
        <Row className="d-flex justify-content-center">
          <div><h3 className="d-flex justify-content-center">Реєстрація</h3></div>
        </Row>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Ваше імʼя</Form.Label>
            <Form.Control required type="text" placeholder="Імʼя" onChange={handleNameChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Адрес електроної пошти</Form.Label>
            <Form.Control required type="email" placeholder="Електронна пошта" onChange={handleEmailChange} />
            <Form.Text className="text-muted">
              Електронна пошта допомагає ідентифікувати користувача
            </Form.Text>
            <br />
            {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <InputGroup>
              <Form.Control
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
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
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Підтвердження паролю</Form.Label>
            <InputGroup>
              <Form.Control
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="Повторіть свій пароль"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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
            {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
          </Form.Group>

          <Button type="submit" className="w-100 text-nowrap">Зареєструватися</Button>
        </Form>
      </Container>
    </div>
  );
}

export default Registration;
