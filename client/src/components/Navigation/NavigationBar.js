import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LogIn from "../Google/LogIn";
import LogOut from "../Google/LogOut";
import { useSelector } from "react-redux";

export default function NavigationBar() {
  const user = useSelector((state) => state.user);

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">
            <h1>Easy Budget Pro</h1>
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="justify-content-end">
          {!user && <LogIn />}
          {user && <LogOut />}
          {/* <Nav.Link href="/auth/google">Log in with Google</Nav.Link>
          <Nav.Link href="#log-out">Log Out</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}
