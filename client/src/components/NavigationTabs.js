import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavigationTabs(props) {
  console.log(props.defaultActiveKey);
  return (
    <Nav variant="tabs" defaultActiveKey={props.defaultActiveKey}>
      <LinkContainer to="/overview">
        <Nav.Item>
          <Nav.Link href="/overview">Overview</Nav.Link>
        </Nav.Item>
      </LinkContainer>

      <LinkContainer to="/income">
        <Nav.Item>
          <Nav.Link href="/income">Income</Nav.Link>
        </Nav.Item>
      </LinkContainer>

      <LinkContainer to="/expenses">
        <Nav.Item>
          <Nav.Link href="/expenses">Expenses</Nav.Link>
        </Nav.Item>
      </LinkContainer>

      <LinkContainer to="/balances">
        <Nav.Item>
          <Nav.Link href="/balances">Balances</Nav.Link>
        </Nav.Item>
      </LinkContainer>
    </Nav>
  );
}
