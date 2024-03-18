import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import c4cLogo from '../images/logos/c4cLogo.png';
import profileLogo from '../images/logos/profileLogo.png';
import cityOfBostonLogo from '../images/logos/cityOfBostonLogo.png';

function Navbar() {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (!selected) {
      setSelected(true);
    }
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
              <a
                style={{
                  font: 'Montserrat',
                  color: selected ? 'red' : 'black',
                  marginRight: '40px',
                }}
              >
                SIGN UP
              </a>
              <a
                style={{
                  font: 'Montserrat',
                  color: 'black',
                  marginRight: '50px',
                }}
              >
                LOG IN
              </a>
              <img src={profileLogo} />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navbar;
