import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import c4cLogo from '../images/logos/c4cLogo.png';
import profileLogo from '../images/logos/profileLogo.png';
import cityOfBostonLogo from '../images/logos/cityOfBostonLogo.png';
import SignupPopup from '../components/volunteer/signup/SignupPopup';
import { Link } from 'react-router-dom';

function Navbar() {
  const [selected, setSelected] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [logInHovered, setLogInHovered] = useState(false);
  const [signUpHovered, setSignUpHovered] = useState(false);

  const openSignupPopup = () => {
    setShowSignupPopup(true);
  };

  const handleClick = () => {
    if (!selected) {
      setSelected(true);
    }
  };

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
  };

  return (
    <div
      onClick={handleClick}
      onBlur={() => setSelected(false)}
      onMouseOut={() => {
        setSelected(false);
      }}
    >
      <AppBar
        position="sticky"
        style={{ height: '109px', backgroundColor: 'rgba(255, 255, 255, 1)' }}
      >
        <Container maxWidth="xl" style={{ color: 'grey' }}>
          <Toolbar
            style={{
              paddingTop: '25px',
              paddingBottom: '25px',
              display: 'flex',
            }}
          >
            <img
              src={cityOfBostonLogo}
              style={{ marginTop: '12px', paddingRight: '15px' }}
            />
            <div
              style={{
                borderLeft: '1px solid rgba(0, 0, 0, 1)',
                height: '55px',
                paddingRight: '15px',
              }}
            />
            <img src={c4cLogo} />
            <div style={{ marginRight: 0, marginLeft: 'auto' }}>
              <button
                onMouseEnter={() => setSignUpHovered(true)}
                onMouseLeave={() => setSignUpHovered(false)}
                style={{
                  font: 'Montserrat',
                  color: signUpHovered ? 'red' : 'black',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginRight: '40px',
                  cursor: 'pointer',
                }}
                onClick={openSignupPopup}
              >
                SIGN UP
              </button>
              <Link to="/login" style={{ textDecoration: 'none' }}>
              <button
                onMouseEnter={() => setLogInHovered(true)}
                onMouseLeave={() => setLogInHovered(false)}
                style={{
                  font: 'Montserrat',
                  color: logInHovered ? 'red' : 'black',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginRight: '50px',
                  cursor: 'pointer',
                }}
              >
                LOG IN
              </button>
              </Link>
              <img src={profileLogo} style={{ cursor: 'pointer' }} onClick={toggleSidePanel} />
            </div>
            </Toolbar>
        </Container>
        {showSignupPopup && <SignupPopup setShowSignupPopup={setShowSignupPopup} />}
      </AppBar>
      {showSidePanel && (
        <div
          style={{
            position: 'fixed',
            top: '109px',
            right: 0,
            height: 'calc(100vh - 109px)',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 1000,
          }}
        >
          <div>
            <span style={{ display: 'block', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Hamsini Malli</span>
            <span style={{ display: 'block', textAlign: 'center' }}>Volunteer since April 2024</span>
          </div>
          <div style={{ margin: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ marginRight: '0.5rem' }}>🌳</span>
              <div style={{ textAlign: 'center' }}>
  <span style={{ display: 'block', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>10</span>
  <span style={{ textAlign: 'center' }}>Green Infrastructure Adopted</span>
</div>
            </div>

          </div>
          <div>
            <button style={{ marginRight: '0.5rem' }}>Settings</button>
            <button>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
