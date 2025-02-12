import { Box } from '@mui/material';
import BostonFall from '../../assets/images/loginPageMedia/bostonfall.jpeg';
import cityOfBostonLogoWhite from '../../images/logos/cityOfBostonLogoWhite.png';

const BostonWinterBostonLogo = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BostonFall})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src={cityOfBostonLogoWhite}
        alt="City of Boston Logo"
        sx={{
          width: '400px',
        }}
      />
    </Box>
  );
};

export default BostonWinterBostonLogo;
