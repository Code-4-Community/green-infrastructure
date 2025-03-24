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

import {UserModel, NewUserInput } from '../../types/UserModel';
import {SignUpDto} from '../../types/SignUpModel';

interface FormPageProps {
  setIsSubmitted: (value: boolean) => void;
}




const api = 'http://localhost:3000/';

const FormPage: React.FC<FormPageProps> = ({ setIsSubmitted }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  // States for the form fields
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleRePassword = () => {
    setShowRePassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const matchingUser = await fetch(api + "users/" + userId);
      if (!matchingUser.ok) {
        throw new Error(matchingUser.statusText);
      }
      const user: UserModel = await matchingUser.json();
  
      if (user.email !== email) {
        alert('User ID and email do not match. Please try again.');
        return;
      }
  
      const inputUser: SignUpDto = { email, password };
  
      const response = await fetch(api + 'auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputUser),
      });
  
      if (response.ok) {
        alert('Account created successfully!');
        setIsSubmitted(true);
      } else {
        alert('There was an error. Please try again.');
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred. Please check your inputs and try again.");
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
      <form onSubmit={handleSubmit}>
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
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
          Email
        </Text>
        <TextField
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
                <IconButton type="button" onClick={handleTogglePassword} edge="end">
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
          name="rePassword"
          type={showRePassword ? 'text' : 'password'}
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
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
                <IconButton type="button" onClick={handleToggleRePassword} edge="end">
                  {showRePassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiFilledInput-root': { fontFamily: 'Montserrat' },
          }}
        />
        <Button
          type="submit"
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
            marginTop: '40px'
          }}
        >
          Create Account
        </Button>
      </form>
    </>
  );
};

export default FormPage;
