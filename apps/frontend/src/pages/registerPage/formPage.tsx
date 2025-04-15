import { Text } from '@chakra-ui/react';
import {
  Button,
  Box,
  TextField,
  Tooltip,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { UserModel, NewUserInput } from '../../types/UserModel';
import { SignUpDto } from '../../types/SignUpModel';
import axios from 'axios';




interface FormPageProps {
  setIsSubmitted: (value: boolean) => void;
}

const FormPage: React.FC<FormPageProps> = ({ setIsSubmitted }) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'error' | 'info' | 'success' | 'warning'; // 👈 enforce correct type
  }>({
    open: false,
    message: '',
    severity: 'info',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleRePassword = () => {
    setShowRePassword((prev) => !prev);
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    userId: Yup.string().required('User ID is required'),
    email: Yup.string()
      .email('Enter a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    rePassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      userId: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {

        const matchingResponse = await axios.get<UserModel>(`${import.meta.env.VITE_API_BASE_URL}/users/${values.userId}`);
        const user: UserModel = matchingResponse.data;
        if (user.email !== values.email) {
          console.log('User ID and email do not match');
          setSnackbar({ open: true, message: 'User ID and email do not match', severity: 'error' });
          return;
        }
        
        if (values.password !== values.rePassword) {
          setSnackbar({ open: true, message: 'Passwords do not match. Please try again.', severity: 'error' });
          return;
        }

        const inputUser: SignUpDto = { email: values.email, password: values.password };

        await axios.post<NewUserInput>(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, inputUser);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const msg = error.response?.data.message || '';
          if (msg.includes("Password did not conform with policy: ")) {
            setSnackbar({ open: true, message: msg.split(': ')[1], severity: 'error' });
          } else {
            console.error('Unhandled Axios error:', error);
          }
        } else {
          console.error('Unhandled error:', error);
        }
      }
    },
  });

  // Check if the form is valid and all fields have been touched
  const isFormValid = formik.isValid && Object.keys(formik.touched).length === 4;

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
      <form onSubmit={formik.handleSubmit}>
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
          value={formik.values.userId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userId && Boolean(formik.errors.userId)}
          color="success"
          variant="outlined"
          fullWidth
          margin="none"
          size="small"
          InputLabelProps={{
            style: { fontFamily: 'Montserrat', fontWeight: 600 },
          }}
          sx={{ '& .MuiFilledInput-root': { fontFamily: 'Montserrat' } }}
        />
        {formik.touched.userId && formik.errors.userId && (
          <FormHelperText
            error
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '2px',
              marginTop: '4px',
            }}
          >
            {formik.errors.userId}
          </FormHelperText>
        )}

        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24px"
          marginBottom={1}
          marginTop={2}
        >
          Email
        </Text>
        <TextField
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          color="success"
          variant="outlined"
          fullWidth
          margin="none"
          size="small"
          InputLabelProps={{
            style: { fontFamily: 'Montserrat', fontWeight: 600 },
          }}
          sx={{ '& .MuiFilledInput-root': { fontFamily: 'Montserrat' } }}
        />
        {formik.touched.email && formik.errors.email && (
          <FormHelperText
            error
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '2px',
              marginTop: '4px',
            }}
          >
            {formik.errors.email}
          </FormHelperText>
        )}

        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24px"
          marginBottom={1}
          marginTop={2}
        >
          Password
        </Text>
        <TextField
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
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
          sx={{ '& .MuiFilledInput-root': { fontFamily: 'Montserrat' } }}
        />
        {formik.touched.password && formik.errors.password && (
          <FormHelperText
            error
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '2px',
              marginTop: '4px',
            }}
          >
            {formik.errors.password}
          </FormHelperText>
        )}

        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24px"
          marginBottom={1}
          marginTop={2}
        >
          Re-enter Password
        </Text>
        <TextField
          name="rePassword"
          type={showRePassword ? 'text' : 'password'}
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
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
          sx={{ '& .MuiFilledInput-root': { fontFamily: 'Montserrat' } }}
        />
        {formik.touched.rePassword && formik.errors.rePassword && (
          <FormHelperText
            error
            sx={{
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '2px',
              marginTop: '4px',
            }}
          >
            {formik.errors.rePassword}
          </FormHelperText>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={!isFormValid}
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
            '&.Mui-disabled': {
              backgroundColor: '#cccccc',
              color: '#666666',
            },
          }}
        >
          Create Account
        </Button>
      </form>
      <Snackbar
      open={snackbar.open}
      autoHideDuration={5000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
    >
      <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        {snackbar.message}
      </Alert>
    </Snackbar>      
    </>
  );
};

export default FormPage;
