import React, { useState } from "react";
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const MainNav = () => {
  const router = useRouter();
  const[value, setValue] = useState()


  function handleSubmit(e){
    e.preventDefault()
    router.push(
      `/artwork?title=true&q=${value}`
    );

  }
  return (
    <Navbar expand="lg" className="fixed-top navbar-dark bg-primary">
      <Container>
        <Navbar.Brand>Festus Osayi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Home page */}
            <Link href="/" legacyBehavior passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>

            {/* Search */}
            <Link href="/search" legacyBehavior passHref>
              <Nav.Link>Advanced Search</Nav.Link>
            </Link>
          </Nav>
          <br />
          <br />
          {/* Form */}
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) =>
                setValue(e.target.value)
                
              }
            />
            <Button type="submit" variant="success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
