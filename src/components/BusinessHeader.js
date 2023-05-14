import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function BusinessHeader() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="list">Керування бізнесами</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="main">Головна</Nav.Link>
            <Nav.Link href="#home">Рахунки</Nav.Link>
            <Nav.Link href="#link">Бюджети</Nav.Link>
            <Nav.Link href="#link">Витрати</Nav.Link>
            <Nav.Link href="#link">Працівники</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BusinessHeader;