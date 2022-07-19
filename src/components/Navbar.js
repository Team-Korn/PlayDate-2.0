import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../Auth';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PetsIcon from '@mui/icons-material/Pets';
import MessageIcon from '@material-ui/icons/Message';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

const NavBar = () => {
  return (
    <Navbar expand="md" style={{ backgroundColor: '#FFB049' }}>
      <Navbar.Brand
        as={Link}
        to={'/home'}
        style={{ color: '#00a8cc', fontSize: '180%', fontWeight: '300px' }}
        className="col-2 text-center justify-content-lg-center justify-content-sm-center"
      >
        PlayDate🐾
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto row justify-content-around">
          <Nav.Link
            as={Link}
            to={'/chat'}
            className="col-4 d-flex justify-content-end mr-2 align-items-center"
            style={{ color: '#00a8cc', paddingRight: '3em' }}
          >
            <MessageIcon />
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={'/user'}
            className="col-4 d-flex  mr-2 align-items-center"
            style={{ color: '#00a8cc' }}
          >
            <PersonIcon />
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={'/'}
            onClick={logout}
            className="col-4 d-flex justify-content-end align-items-center"
            style={{ color: '#00a8cc', paddingRight: '3em' }}
          >
            <ExitToAppIcon />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    // <StyledNavbar collapseOnSelect expand="md">
    //   <StyledNavHeader>
    //     <StyledLeftHeader>
    //       <Navbar.Brand>
    //         <StyledLogoLink to="/home">Playdate 🐾 </StyledLogoLink>
    //       </Navbar.Brand>
    //     </StyledLeftHeader>
    //     <StyledRightHeader>
    //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //       <Navbar.Collapse id="responsive-navbar-nav">
    //         <Nav className="me-auto"></Nav>
    //         <Nav>
    //           <StyledLinksWrapper>
    //             <Nav.Item>
    //               <Nav.Link eventKey={2}>
    //                 <StyledLink to="/chat">Messages </StyledLink>
    //               </Nav.Link>
    //             </Nav.Item>
    //             <Nav.Item>
    //               <Nav.Link eventKey={3}>
    //                 <StyledLink to="/login" onClick={logout}>
    //                   Logout
    //                 </StyledLink>
    //               </Nav.Link>
    //             </Nav.Item>
    //             <Nav.Item>
    //               <Nav.Link eventKey={4}>
    //                 <StyledLink to="/user" onClick={logout}>
    //                   Edit Profile
    //                 </StyledLink>
    //               </Nav.Link>
    //             </Nav.Item>
    //           </StyledLinksWrapper>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </StyledRightHeader>
    //   </StyledNavHeader>
    // </StyledNavbar>
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
