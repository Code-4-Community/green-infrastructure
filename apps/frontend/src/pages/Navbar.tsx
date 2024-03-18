import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import c4cLogo from '../images/logos/c4cLogo.png';
import cityOfBostonLogo from '../images/logos/cityOfBostonLogo.png';

function Navbar() {
  return (
    <AppBar
      position="sticky"
      style={{ height: '109px', backgroundColor: 'rgba(255, 255, 255, 1)' }}
    >
      <Container maxWidth="xl" style={{ color: 'grey' }}>
        <Toolbar style={{ paddingTop: '25px', paddingBottom: '25px' }}>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
