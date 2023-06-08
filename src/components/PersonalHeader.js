import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';


function PersonalHeader() {
  return (
    <div className="d-flex h-100">
    <Navbar expand="md" className="vertical-navbar align-items-start px-0 pt-5" style={{ width: '200px' }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav w-100">
        <Nav className="flex-column w-100">
              <Nav.Link href="main" className="rounded-button">Головна</Nav.Link>
              <Nav.Link href="records" className="rounded-button">Записи</Nav.Link>
              <Nav.Link href="budgets" className="rounded-button">Бюджети</Nav.Link>
              <Nav.Link href="groups" className="rounded-button">Групи</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      <Container className="mt-5 mx-5 flex-grow-1">
        <Outlet />
      </Container>
    </div>
  );
}

export default PersonalHeader;