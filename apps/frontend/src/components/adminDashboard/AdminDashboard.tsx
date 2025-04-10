import { Box } from '@mui/material';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
//import generateInstagramIcon from './InstagramIcon';
import { Link } from 'react-router-dom';

const textStyles = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '40px',
};

const boxStyles = {
  bgcolor: '#D7D7D7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '30px',
};

interface AdminDashboardProps {
  setMaintenanceChecklistOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminDashboard({ setMaintenanceChecklistOpen }: AdminDashboardProps) {
  return (
    <div
      className="container"
      style={{ width: '90%', paddingBottom: '7%', paddingTop: '2%' }}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <div>
          <text style={{ ...textStyles, fontWeight: '500' }}>
            Welcome back,{' '}
          </text>
          <text style={{ ...textStyles, fontWeight: '700' }}>Admin</text>
        </div>

        <Box display="flex" flexDirection="row" gap={3}>
          <YouTubeIcon fontSize="large" />
          <FacebookIcon fontSize="large" />
        </Box>
      </Box>
      <div
        className="description"
        style={{ lineHeight: '.7', paddingBottom: '3%', paddingTop: '3%' }}
      ></div>
      <Box
        sx={{
          height: '40%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '2%',
          backgroundColor: '#EDEDED',
        }}
      >
        <div
          className="column1"
          style={{
            width: '120%',
            paddingLeft: '2%',
            paddingTop: '2%',
            paddingBottom: '2%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: '4%',
              width: '100%',
            }}
          >
            <Link
              to="applications"
              style={{
                ...boxStyles,
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
                height: '50%',
              }}
            >
              <Box sx={{ ...boxStyles, height: '100%', width: '100%' }}>
                Applications for Review
              </Box>
            </Link>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '50%',
                gap: '4%',
              }}
            >
              <Link
                to="../"
                style={{
                  ...boxStyles,
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Box sx={{ ...boxStyles, width: '100%', height: '100%' }}>
                  Adoption Map
                </Box>
              </Link>
              <Box sx={{ ...boxStyles, width: '100%', padding: '3%' }}>
                Maintenance Guide
              </Box>
            </Box>
          </Box>
        </div>
        <div
          className="column2"
          style={{ paddingTop: '2%', paddingBottom: '2%', width: '55%' }}
        >
          <Box
            sx={{ ...boxStyles, height: '100%', padding: '8%' }}
            onClick={() => setMaintenanceChecklistOpen(true)}
            style={{ cursor: 'pointer' }}
          >
            Maintenance Visit Checklist
          </Box>
        </div>
        <div
          className="column3"
          style={{
            display: 'flex',
            width: '30%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: '70vh',
            paddingRight: '2%',
            paddingTop: '2%',
            paddingBottom: '2%',
            gap: '4%',
          }}
        >
          <Box sx={{ ...boxStyles, height: '30%', width: '100%' }}>Vid 1</Box>
          <Box sx={{ ...boxStyles, height: '30%', width: '100%' }}>Vid 2</Box>
          <Box sx={{ ...boxStyles, height: '40%', width: '100%' }}>Other</Box>
        </div>
      </Box>
    </div>
  );
}
export default AdminDashboard;
