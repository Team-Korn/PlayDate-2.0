import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const StyledLinksWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  color: #8fd0ff;
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
  color: #8fd0ff;
  &:hover {
    color: #white;
  }
`;

const Navbar = () => {
  return (
    <nav>
      <StyledNavbar>
        <StyledNavHeader>
          <StyledLeftHeader>
            <StyledLogoLink to="/">Playdate 🐾</StyledLogoLink>
          </StyledLeftHeader>
          <StyledRightHeader>
            <StyledLinksWrapper>
              <StyledLink to="/chat">
                <h3>Messages</h3>
              </StyledLink>
              <StyledLink to="/login">
                <h3>Login</h3>
              </StyledLink>
            </StyledLinksWrapper>
          </StyledRightHeader>
        </StyledNavHeader>
      </StyledNavbar>
    </nav>
  );
};

export default Navbar;
