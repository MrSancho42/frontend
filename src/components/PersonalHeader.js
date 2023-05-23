import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';


function PersonalHeader() {
  return (
    <>
      <Navbar bg="info" expand="lg">
        <Container>
          <Navbar.Brand>Облік витрат</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="main">Головна</Nav.Link>
              <Nav.Link href="records">Записи</Nav.Link>
              <Nav.Link href="budgets">Бюджети</Nav.Link>
              <Nav.Link >Групи</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Outlet />
      </Container>
    </>
  );
}

export default PersonalHeader;