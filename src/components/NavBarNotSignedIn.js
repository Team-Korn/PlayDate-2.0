import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  height: 75px;
  width: 100%;
  padding: 24px 50px;
  border-bottom: solid #cdc5c4 1px;
  color: #292819;
  opacity: 1;
  background-color: #fbad31;
  }
`;

const StyledNavHeader = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
  color: #8fd0ff;
  &:hover {
    color: #white;
  }
`;

const NavbarNotSignedIn = () => {
  return (
    <Navbar expand="md" style={{ backgroundColor: '#FFB049' }}>
      <Navbar.Brand
        as={Link}
        to={'/home'}
        className=" brand-not-login  text-center justify-content-md-center justify-content-sm-center"
      >
        PlayDate🐾
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavbarNotSignedIn;
