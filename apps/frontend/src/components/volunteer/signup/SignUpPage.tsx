import {
  Box,
  Input,
  Text,
  HStack,
  VStack,
  Button,
  IconButton,
  FormLabel,
  FormControl,
  FormErrorMessage,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';
import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface InputField {
  label: string;
  width?: string;
  placeholder?: string;
}

interface CheckboxField {
  label: string;
}

interface InputFieldGroup {
  fields: InputField[];
  type?: 'single' | 'double'; // 'single' for single column, 'double' for double column row
  height: string;
  width: string;
}
interface FormField {
  label: string;
  type: string;
}

interface FormFields {
  [key: string]: FormField;
}
const termsAndConditionsCheckboxesMap: CheckboxField[] = [
  {
    label: 'I have reviewed the General Safety Guidelines',
  },
  {
    label: 'I have read and agree to the Terms of Use and Privacy Policy',
  },
  {
    label: 'I have read and agree to the Release of Liability',
  },
];
const validationSchema = Yup.object({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  birthyear: Yup.number()
    .min(1900, 'Invalid birth year')
    .max(new Date().getFullYear(), 'Invalid birth year')
    .required('Birth year is required'),
  groupRepresentative: Yup.boolean(),
});
const formFields: FormFields = {
  firstname: { label: 'First Name', type: 'text' },
  lastname: { label: 'Last Name', type: 'text' },
  email: { label: 'Email', type: 'email' },
  phone: { label: 'Phone Number', type: 'text' },
  birthyear: { label: 'Birth Year', type: 'number' },
  groupRepresentative: {
    label: 'Group representative?',
    type: 'checkbox',
  },
};

function PersonalInfo() {
  return (
    <Box className="personal-info-box">
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          birthyear: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
        }: {
          errors: { [key: string]: string };
          touched: { [key: string]: boolean };
          isValid: boolean;
          dirty: boolean;
        }) => (
          <Form>
            <Center flexDir={'column'}>
              <SimpleGrid
                columns={2}
                spacing={4}
                w={'80%'}
                alignContent={'center'}
                justifyContent={'center'}
              >
                {Object.keys(formFields).map((field) => (
                  <FormControl
                    key={field}
                    isInvalid={!!errors[field] && touched[field]}
                  >
                    <FormLabel htmlFor={field}>
                      {formFields[field].label}
                    </FormLabel>
                    <Field
                      as={Input}
                      id={field}
                      name={field}
                      type={formFields[field].type}
                    />
                    <FormErrorMessage color='red'>
                      {errors[field]}
                    </FormErrorMessage>
                  </FormControl>
                ))}
              </SimpleGrid>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isDisabled={!(isValid && dirty)}
              >
                Submit
              </Button>
            </Center>
          </Form>
        )}
      </Formik>
      <HStack
        className="circle-progress"
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing="30px"
      >
        <CircleIcon />
        <CircleOutlinedIcon />
        <CircleOutlinedIcon />
      </HStack>
    </Box>
  );
}

function TermsAndConditions() {
  return (
    <Box className="terms-and-conditions-box">
      <VStack
        spacing={102}
        marginTop={'20px'}
        marginBottom={'20px'}
        borderBottom="2px solid #000000"
        paddingBottom="20px"
      >
        {termsAndConditionsCheckboxesMap.map((field, i) => (
          <HStack
            key={i}
            width="100%"
            height="100%"
            marginTop={'20px'}
            alignItems="flex-start"
          >
            <Text
              textDecoration="underline"
              fontSize="18px"
              fontWeight={600}
              fontFamily="Montserrat"
              marginTop={'4px'}
            >
              {field.label}
            </Text>
            <Checkbox
              sx={{
                color: '#808080', // Grey color for the checkbox when not checked
                '&.Mui-checked': {
                  color: '#808080', // Grey color for the checkbox when checked
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 32,
                },
                padding: '2px',
                marginLeft: '20px',
              }}
            />
          </HStack>
        ))}
      </VStack>
      <HStack
        className="circle-progress"
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing="30px"
      >
        <CircleIcon />
        <CircleIcon />
        <CircleOutlinedIcon />
      </HStack>
    </Box>
  );
}

interface Props {
  setShowSignUp: (value: boolean) => void;
}

export default function SignUpPage({ setShowSignUp }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false); // Step 1
  const navigate = useNavigate();

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleSubmit = () => {
    // You can add form validation logic here if needed
    setIsSubmitted(true);
    navigate('/success'); // Step 2
  };

  return (
    <Box
      className="outermost-box"
      position="absolute"
      top="10%"
      left="10%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#D9D9D9"
      width="80%"
      height="100%"
      zIndex={'200'}
    >
      <IconButton
        aria-label="close"
        size="small"
        position="absolute"
        top="10px"
        right="10px"
        onClick={closeSignUp}
      >
        <CloseIcon />
      </IconButton>
      <Box
        className="inner-box"
        bg="#FFFDFD"
        height="90%"
        width="90%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        paddingTop={'30px'}
      >
        <Box
          className="header-box"
          height="5%"
          width="90%"
          borderBottom="2px solid #000000"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontFamily="Montserrat"
            fontSize="28px"
            fontWeight={700}
            paddingBottom={'30px'}
          >
            Welcome, Volunteer!
          </Text>
        </Box>
        <Box className="input-fields-main" width="90%" mt="10px">
          {/* Comment these in and out to display the different pop up pages */}
          <PersonalInfo />
          {/* <TermsAndConditions /> */}
        </Box>

        {/* Conditional rendering for the submit button */}
        {/* {!isSubmitted && (
          <Button size="large" marginBottom="7%" fontSize="20px" onClick={handleSubmit}
          bottom="10%"
          left="50%"
          transform="translateX(-50%)">
            Submit
          </Button>
        )} */}

        {/* Success message */}
        {/* {isSubmitted && (
          <Box>
            <Text fontSize="24px" fontWeight={600}>
              Thank you for submitting the form!
            </Text>
             You can add additional content for the success page 
          </Box>
        )} */}
      </Box>
    </Box>
  );
}
