import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavigationTabs.css";

export default function NavigationTabs(props) {
  return (
    <>
      <Nav defaultActiveKey={props.defaultActiveKey}>
        <LinkContainer
          className="tab-link"
          activeClassName="tab-link-active"
          exact
          to="/overview"
        >
          <Nav.Item>
            <Nav.Link href="/overview">Overview</Nav.Link>
          </Nav.Item>
        </LinkContainer>

        <LinkContainer
          className="tab-link"
          activeClassName="tab-link-active"
          exact
          to="/income"
        >
          <Nav.Item>
            <Nav.Link href="/income">Income</Nav.Link>
          </Nav.Item>
        </LinkContainer>

        <LinkContainer
          className="tab-link"
          activeClassName="tab-link-active"
          exact
          to="/expenses"
        >
          <Nav.Item>
            <Nav.Link href="/expenses">Expenses</Nav.Link>
          </Nav.Item>
        </LinkContainer>

        <LinkContainer
          className="tab-link"
          activeClassName="tab-link-active"
          exact
          to="/balances"
        >
          <Nav.Item>
            <Nav.Link href="/balances">Balances</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      </Nav>
    </>
  );
}
