import React from 'react'
import './Header.css'
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/Person'
import { IconButton } from '@material-ui/core'
import LogoutIcon from '@mui/icons-material/Logout';
import ForumIcon from '@material-ui/icons/Forum'
import { Link, useHistory } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const StyledLogoLink = styled(Link)`
  font-size: 2.5vw;
  text-decoration: none;
  font-weight: 300px;
  color: #8fd0ff;
  &:hover {
    color: #white;
  }
`;

function Header() {
  return (
    <div className="header">
      <IconButton>
        <PersonIcon fontSize="large" className="header__icon" />
      </IconButton>

      <StyledLogoLink to="/home" className="header__logo">Playdate 🐾</StyledLogoLink>

      <Link to='/chat'>
        <IconButton>
          <ForumIcon fontSize="large" className="header__icon" />
        </IconButton>
      </Link>

      <Link to='/login'>
        <IconButton>
          <LogoutIcon fontSize="large" className="header__icon" />
        </IconButton>
      </Link>
    </div>
  );

}

export default Header