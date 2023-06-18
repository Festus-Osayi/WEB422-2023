import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

const MainNav = () => {
  return (
    /**
     * Navigation Bar
     */
    <Navbar className="fixed-top" bg="light" expand="lg">
      <br />
      <br />
      <Container>
        <Navbar.Brand>Festus Osayi</Navbar.Brand>
        <Navbar.Brand>New York Citibike Trips </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/*Home Page*/}
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Full List</Nav.Link>
            </Link>

            {/* About */}
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link>About</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
