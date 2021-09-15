import React from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function BalancesTable() {
  const balances = useSelector((state) => state.user.balances);

  return (
    <>
      <>
        <Container>
          <Row className="justify-content-md-center align-items-center text-center">
            <Col md="auto"></Col>
            <Col xs lg="5">
              {balances.length > 0 && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Account Name</th>
                      <th>Account Type</th>
                      <th>Current Balance</th>
                      <th>Available Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balances.map((b) => {
                      return (
                        <tr key={b.account_id}>
                          <td>
                            {b.name.replace(/\b\w/g, (c) => c.toUpperCase())}
                          </td>
                          <td>
                            {b.type.replace(/\b\w/g, (c) => c.toUpperCase())}
                          </td>
                          <td>
                            {b.balances.current &&
                              `$${b.balances.current
                                ?.toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                          </td>
                          <td>
                            {b.balances.available &&
                              `$${b.balances.available
                                ?.toFixed(2)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Col>
            <Col md="auto"></Col>
          </Row>
        </Container>
      </>
    </>
  );
}
