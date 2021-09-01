import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PlaidLinkButton from "../Plaid/PlaidLinkButton";

export default function NavigationBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">Easy Budget Pro</Navbar.Brand>
        </LinkContainer>
        <Nav className="justify-content-end">
          <PlaidLinkButton />
          {/* <Nav.Link href="/auth/google">Log in with Google</Nav.Link>
          <Nav.Link href="#log-out">Log Out</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
