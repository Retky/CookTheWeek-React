import React, { useEffect, useState } from 'react';
import {
  Navbar, Nav, Form, FormControl, Button,
} from 'react-bootstrap';
import '../styles/Header.css';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        document.getElementById('header').style.top = '0';
      } else {
        document.getElementById('header').style.top = '-100px';
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <Navbar bg="light" expand="lg" id="header" className="fixed-top">
      <Navbar.Brand href="#home">Recipe App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="primary">Login</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
