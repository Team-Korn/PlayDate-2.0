import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from '../Auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const StyledNavbar = styled(Navbar)`
  display: flex;
  flex-direction: column;
  height: 75px;
  width: 100%;
  padding: 24px 50px;
  border-bottom: solid #cdc5c4 1px;
  color: #FFB740;
  opacity: 1;
  background-color: #FFB049;
  }
`;

const StyledNavHeader = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledLinksWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  color: #00a8cc;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;
const StyledLeftHeader = styled.div`
  display: flex;
  width: 33%;
  justify-content: flex-start;
`;

const StyledRightHeader = styled(StyledLeftHeader)`
  justify-content: flex-end;
`;

const StyledLogoLink = styled(Link)`
  font-size: 2.5vw;
  text-decoration: none;
  font-weight: 300px;
  color: #00a8cc;
  &:hover {
    color: #white;
  }
`;

const NavBar = () => {
  return (
    <StyledNavbar collapseOnSelect expand="md">
      <StyledNavHeader>
        <StyledLeftHeader>
          <Navbar.Brand>
            <StyledLogoLink to="/home">Playdate 🐾 </StyledLogoLink>
          </Navbar.Brand>
        </StyledLeftHeader>
        <StyledRightHeader>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <StyledLinksWrapper>
                <Nav.Item>
                  <Nav.Link eventKey={2}>
                    <StyledLink to="/chat">Messages </StyledLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={3}>
                    <StyledLink to="/login" onClick={logout}>
                      Logout
                    </StyledLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={4}>
                    <StyledLink to="/user" onClick={logout}>
                      Edit Profile
                    </StyledLink>
                  </Nav.Link>
                </Nav.Item>
              </StyledLinksWrapper>
            </Nav>
          </Navbar.Collapse>
        </StyledRightHeader>
      </StyledNavHeader>
    </StyledNavbar>
  );

  //  <nav>
  //      <StyledNavbar>
  //        <StyledNavHeader>
  //          <StyledLeftHeader>
  //    <StyledLogoLink to="/home">Playdate 🐾</StyledLogoLink>
  //          </StyledLeftHeader>
  //          <StyledRightHeader>
  //            <StyledLinksWrapper>
  //              <StyledLink to="/chat">
  //                <h3>Messages</h3>
  //              </StyledLink>
  //              <StyledLink to="/login" onClick={logout}>
  //                <h3>Logout</h3>
  //              </StyledLink>
  //            </StyledLinksWrapper>
  //          </StyledRightHeader>
  //        </StyledNavHeader>
  //      </StyledNavbar>
  //    </nav>
};

export default NavBar;
