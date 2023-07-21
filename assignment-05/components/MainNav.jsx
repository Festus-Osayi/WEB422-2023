import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchHistoryState } from "../store";

const MainNav = () => {
  const router = useRouter();
  /** defining a state */
  const [value, setValue] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useSearchHistoryState()

  /** handle the query string */
  const submitForm = function (e) {
    e.preventDefault();
    setSearchHistory([...searchHistory, `title=true&q=${value}`]);
    router.push(`/artwork?title=true&q=${value}`);
    document.querySelector("#field").value = "";
    
  };

  return (
    <Navbar
      expanded={isExpanded}
      expand="lg"
      className="fixed-top navbar-dark bg-primary"
    >
      <Container>
        <Navbar.Brand>Festus Osayi</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Home page */}
            <Link href="/" legacyBehavior passHref>
              <Nav.Link
                active={router.pathname === "/"}
                onClick={() => setIsExpanded(false)}
              >
                Home
              </Nav.Link>
            </Link>

            {/* Search */}
            <Link href="/search" legacyBehavior passHref>
              <Nav.Link
                active={router.pathname === "/search"}
                onClick={() => setIsExpanded(false)}
              >
                Advanced Search
              </Nav.Link>
            </Link>
          </Nav>
          {/* Form */}
          &nbsp;
          <Form className="d-flex gap-2" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setValue(e.target.value)}
              id="field"
            />
            <Button type="submit" variant="success">
              Search
            </Button>
          </Form>
          &nbsp;
          <Nav>
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              <Link href="/favourite" passHref legacyBehavior>
                <NavDropdown.Item
                  active={router.pathname === "/favourite"}
                  onClick={() => setIsExpanded(false)}
                >
                  Favourites
                </NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item onClick={()=>setIsExpanded(false)} active={router.pathname === "/history"}>
                  Search History
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
