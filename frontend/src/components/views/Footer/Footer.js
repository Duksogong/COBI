import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
          <Nav.Link href="/home">홈</Nav.Link>
          <Nav.Link href="#pricing">내감상평</Nav.Link>
          <Nav.Link href="/my_bookmark">책갈피</Nav.Link>
          <Nav.Link href="#features">글쓰기</Nav.Link>
          <Nav.Link href="/change_category">설정</Nav.Link>
      </Container>
    </Navbar>
  );
}

export default Footer