import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import logoImg from '../../../src_assets/logo.png';
import searchImg from '../../../src_assets/search.png';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/home">
          <img src={logoImg} alt="Logo" style={{width:'80px'}} />
        </Navbar.Brand>
        <Form className="d-flex">
          {/* <Form.Control
            type="search"
            placeholder=""
            className="me-2"
            aria-label="Search"
          /> */}
          <Button variant="none">
            <img src={searchImg} alt="Logo" style={{width:'30px'}} />
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar