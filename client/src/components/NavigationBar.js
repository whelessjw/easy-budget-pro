import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">Easy Budget Pro</Navbar.Brand>
        </LinkContainer>
        <Nav className="justify-content-end">
          <Nav.Link href="#link-bank-account">Link a Bank Account</Nav.Link>
          <Nav.Link href="#log-in">Log in with Google</Nav.Link>
          <Nav.Link href="#log-out">Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
