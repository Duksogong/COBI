import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import logoImg from '../../../src_assets/logo.png';
import searchImg from '../../../src_assets/search.png';

function NavBar() {

  const navigate = useNavigate()

  const [searchText, setSearchText] = useState("");
  const [searchMod, setSearchMod] = useState(false);

  const onSearchTextHandler = (event) => {
    setSearchText(event.currentTarget.value)
  }

  const onClickHandler = (event) => {
    event.preventDefault();

    if(!searchMod) {
      setSearchMod(!searchMod);
    } else {
      if(!searchText) {
        setSearchMod(!searchMod);
      } else {
        navigate(`/search/${searchText}`);
      }
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid style={{ display:'flex', flexDirection:'row'}}>
        <Navbar.Brand href="/home">
          <img src={logoImg} alt="Logo" style={{width:'80px'}} />
        </Navbar.Brand>
        <div>
          {searchMod ? (
            <InputGroup style={{ alignItems:'center' }}>
              <Form.Control
                  type="search"
                  placeholder=""
                  className="me-2"
                  aria-label="Search"
                  style={{width:"10rem", height: "2.5rem", borderRadius:'10px'}}
                  onChange={onSearchTextHandler}
                />
                <Button variant="none" type="submit" style={{ padding:'5px' }} onClick={onClickHandler}>
                  <img src={searchImg} alt="Logo" style={{ width: '30px' }} />
                </Button>
            </InputGroup>
          ):(
            <Button variant="none" style={{ padding:'5px' }} onClick={onClickHandler}>
              <img src={searchImg} alt="Logo" style={{ width: '30px' }} />
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar