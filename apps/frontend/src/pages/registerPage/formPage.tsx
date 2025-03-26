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
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormPageProps {
  setIsSubmitted: (value: boolean) => void;
}

const FormPage: React.FC<FormPageProps> = ({ setIsSubmitted }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleRePassword = () => {
    setShowRePassword((prev) => !prev);
  };

  // Validation schema using Yup
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
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form submitted:', values);
      setIsSubmitted(true);
    },
  });

  // Check if all fields are valid
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
        <Box
          display="flex"
          alignItems="center"
          marginTop={5}
        >
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
          name="userId"
          value={formik.values.userId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userId && Boolean(formik.errors.userId)}
          InputLabelProps={{
            style: { fontFamily: 'Montserrat', fontWeight: 600 },
          }}
          sx={{
            '& .MuiFilledInput-root': { fontFamily: 'Montserrat' },
          }}
        />
        {formik.touched.userId && formik.errors.userId && (
          <FormHelperText 
            error 
            sx={{ 
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '2px',
              marginTop: '4px'
            }}
          >
            {formik.errors.userId}
          </FormHelperText>
        )}

        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24x"
          marginBottom={1}
          marginTop={2}
        >
          Email
        </Text>
        <TextField
          color="success"
          variant="outlined"
          fullWidth
          margin="none"
          size="small"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          InputLabelProps={{
            style: { fontFamily: 'Montserrat', fontWeight: 600 },
          }}
          sx={{
            '& .MuiFilledInput-root': { fontFamily: 'Montserrat' },
          }}
        />
        {formik.touched.email && formik.errors.email && (
          <FormHelperText 
            error 
            sx={{ 
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '2px',
              marginTop: '4px'
            }}
          >
            {formik.errors.email}
          </FormHelperText>
        )}

        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24x"
          marginBottom={1}
          marginTop={2}
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
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
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
        {formik.touched.password && formik.errors.password && (
          <FormHelperText 
            error 
            sx={{ 
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '2px',
              marginTop: '4px'
            }}
          >
            {formik.errors.password}
          </FormHelperText>
        )}

        <Text
          fontFamily="Montserrat"
          fontSize="20px"
          fontWeight="600"
          lineHeight="24x"
          marginBottom={1}
          marginTop={2}
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
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
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
        {formik.touched.rePassword && formik.errors.rePassword && (
          <FormHelperText 
            error 
            sx={{ 
              fontFamily: 'Montserrat',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '2px',
              marginTop: '4px'
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
    </>
  );
};

export default FormPage;
