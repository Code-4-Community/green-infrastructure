import { Text } from '@chakra-ui/react';
import {
  Button,
  Box,
  TextField,
  Tooltip,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

interface FormPageProps {
  setIsSubmitted: (value: boolean) => void;
}

const FormPage: React.FC<FormPageProps> = ({ setIsSubmitted }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const UserStatus = {
    APPROVED: 'Approved',
    PENDING: 'Pending',
    DENIED: 'Denied',
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleRePassword = () => {
    setShowRePassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    if (!userId.trim()) {
      setError('User ID required');
      return;
    }
    //console.log('UserID: ', userId);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/users/editUser/${userId}`,
        { status: UserStatus.APPROVED },
      );

      setIsSubmitted(true);

      //console.log('Response:', response.data);
    } catch (e) {
      setError('Failed to approve user. Please try again.');
      console.error('Error: ', e);
    }
  };

  return (
    <>
      <p
        style={{
          fontFamily: 'Montserrat',
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '24x',
          color: '#58585B',
        }}
      >
        Green Infrastructure Boston
      </p>
      <h1
        style={{
          fontFamily: 'Montserrat',
          fontSize: '36px',
          fontWeight: '900',
          lineHeight: '36x',
        }}
      >
        Volunteer Registration
      </h1>
      <form>
        <Box display="flex" alignItems="center" marginTop={5}>
          <Text
            fontFamily="Montserrat"
            fontSize="20px"
            fontWeight="600"
            lineHeight="24px"
            marginBottom={1}
          >
            User ID
          </Text>
          <Tooltip
            placement="top"
            title="You can find your USER ID within the email that was sent to you by an admin."
          >
            <InfoIcon
              fontSize="small"
              sx={{
                color: '#0072C4',
                cursor: 'pointer',
                marginLeft: '5px',
              }}
            />
          </Tooltip>
        </Box>
        <TextField
          color="success"
          variant="outlined"
          fullWidth
          margin="none"
          size="small"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          InputLabelProps={{
            style: { fontFamily: 'Montserrat', fontWeight: 600 },
          }}
          sx={{
            '& .MuiFilledInput-root': { fontFamily: 'Montserrat' },
          }}
        />
        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24x"
          marginBottom={1}
          marginTop={20}
        >
          Email
        </Text>
        <TextField
          color="success"
          variant="outlined"
          fullWidth
          margin="none"
          size="small"
          InputLabelProps={{
            style: { fontFamily: 'Montserrat', fontWeight: 600 },
          }}
          sx={{
            '& .MuiFilledInput-root': { fontFamily: 'Montserrat' },
          }}
        />
        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24x"
          marginBottom={1}
          marginTop={20}
        >
          Password
        </Text>
        <TextField
          type={showPassword ? 'text' : 'password'}
          color="success"
          variant="outlined"
          fullWidth
          margin="none"
          size="small"
          InputLabelProps={{
            style: { fontFamily: 'Montserrat', fontWeight: 600 },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': { fontFamily: 'Montserrat' },
          }}
        />
        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24x"
          marginBottom={1}
          marginTop={20}
        >
          Re-enter Password
        </Text>
        <TextField
          type={showRePassword ? 'text' : 'password'}
          color="success"
          variant="outlined"
          fullWidth
          margin="none"
          size="small"
          InputLabelProps={{
            style: { fontFamily: 'Montserrat', fontWeight: 600 },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleRePassword} edge="end">
                  {showRePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': { fontFamily: 'Montserrat' },
          }}
        />
      </form>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#0072C4',
          color: 'white',
          width: '100%',
          padding: '10px 0',
          fontFamily: 'Montserrat',
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '24x',
          textTransform: 'none',
          marginTop: '40px',
        }}
        onClick={handleSubmit}
      >
        Create Account
      </Button>
    </>
  );
};

export default FormPage;
