import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Easy Budget Pro</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link href="#link-bank-account">Link a Bank Account</Nav.Link>
          <Nav.Link href="#log-in">Log in with Google</Nav.Link>
          <Nav.Link href="#log-out">Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
