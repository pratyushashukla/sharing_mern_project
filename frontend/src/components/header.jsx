import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./searchBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Hostel Management System</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userInfo && (
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            )}
            <Nav className="ml-auto">
              {userInfo && (
                <NavDropdown title="More" id="more">
                  <LinkContainer to="/attendance">
                    <NavDropdown.Item>Take Attendance</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/analysis">
                    <NavDropdown.Item>View Attendance Report</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/addStudent">
                    <NavDropdown.Item>Add Student</NavDropdown.Item>
                  </LinkContainer>                  
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin && (
                    <LinkContainer to="/userList">
                      <NavDropdown.Item>Users List</NavDropdown.Item>
                    </LinkContainer>
                  )}
                   <NavDropdown.Item onClick={()=>logoutHandler()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
