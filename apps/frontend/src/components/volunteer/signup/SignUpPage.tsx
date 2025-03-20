import {
  Box,
  Input,
  Text,
  HStack,
  VStack,
  Button,
  IconButton,
  Textarea,
} from '@chakra-ui/react';
import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
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
  type?: 'single' | 'double';
  height: string;
  width: string;
}

const termsAndConditionsCheckboxesMap: CheckboxField[] = [
  { label: 'I have reviewed the General Safety Guidelines' },
  { label: 'I have read and agree to the Terms of Use and Privacy Policy' },
  { label: 'I have read and agree to the Release of Liability' },
];

const personalInfoCheckboxesMap: CheckboxField[] = [
  { label: 'Signing up as a group representative?' },
];

const personalInfoInputFieldsMap: InputFieldGroup[] = [
  {
    fields: [{ label: 'First Name', width: '250px'}, { label: 'Last Name', width: '350px' }],
    type: 'double',
    height: '40px',
    width: '810px',
  },
  {
    fields: [{ label: 'Email Address' }],
    type: 'single',
    height: '40px',
    width: '380px',
  },
  {
    fields: [{ label: 'Phone Number' }],
    type: 'single',
    height: '40px',
    width: '380px',
  },
  {
    fields: [{ label: 'Birth Year' }],
    type: 'single',
    height: '40px',
    width: '100px',
  },
];

// Yup validation schema
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

interface PersonalInfoProps {
  onSubmit: (values: any) => void;
  setIsFormValid: (isValid: boolean) => void; // Callback to update form validity
}

function PersonalInfo({ onSubmit, setIsFormValid }: PersonalInfoProps) {
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birthyear: '',
        groupRepresentative: false,
        groupMembers: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, isValid, setFieldValue }) => {
        // Notify parent about form validity
        setIsFormValid(isValid);

        return (
          <Form>
            <Box className="personal-info-box">
              <VStack
                spacing={0}
                marginBottom="20px"
                borderBottom="2px solid #000000"
                paddingBottom="20px"
              >
                {personalInfoCheckboxesMap.map((field, i) => (
                  <HStack
                    key={i}
                    width="100%"
                    marginBottom="20px"
                    alignItems="flex-start"
                  >
                    <Text
                      fontSize="18px"
                      fontWeight={600}
                      fontFamily="Montserrat"
                    >
                      {field.label}
                    </Text>
                    <Checkbox
                      checked={values.groupRepresentative}
                      onChange={(e) =>
                        setFieldValue('groupRepresentative', e.target.checked)
                      }
                      sx={{
                        color: '#808080',
                        '&.Mui-checked': { color: '#808080' },
                        '& .MuiSvgIcon-root': { fontSize: 23 },
                        padding: '2px',
                        marginLeft: '20px',
                      }}
                    />
                  </HStack>
                ))}

                {/* Name Fields */}
                <VStack width="100%" align="flex-start">
                  <HStack
                    width="100%"
                    justifyContent="left"
                    spacing="20%"
                  >
                    {personalInfoInputFieldsMap[0].fields.map((field, j) => {
                      const fieldName =
                        field.label === 'First Name'
                          ? 'firstname'
                          : 'lastname';
                      return (
                        <VStack key={j} width={field.width}>
                          <Text
                            fontSize="18px"
                            fontWeight={600}
                            fontFamily="Montserrat"
                            alignSelf="flex-start"
                            marginBottom={-10}
                          >
                            {field.label}
                          </Text>
                          <Field
                            as={Input}
                            name={fieldName}
                            variant="filled"
                            height={personalInfoInputFieldsMap[0].height}
                            placeholder="example"
                            width="100%"
                          />
                          {errors[fieldName] && touched[fieldName] && (
                            <Text color="red" fontSize="sm">
                              {errors[fieldName]}
                            </Text>
                          )}
                        </VStack>
                      );
                    })}
                  </HStack>
                </VStack>

                {/* Lower Section */}
                <HStack width="100%" align="start" spacing={4} mt={4}>
                  {/* Left Column - Email/Phone/Birth Year */}
                  <VStack width="380px" align="flex-start" spacing={0}>
                    {personalInfoInputFieldsMap.slice(1).map((group, i) => {
                      const label = group.fields[0].label;
                      let fieldName = '';
                      if (label === 'Email Address') fieldName = 'email';
                      else if (label === 'Phone Number') fieldName = 'phone';
                      else if (label === 'Birth Year') fieldName = 'birthyear';
                      return (
                        <VStack key={i} width="100%" align="flex-start">
                          <Text
                            fontSize="18px"
                            fontWeight={600}
                            fontFamily="Montserrat"
                            marginTop="30px"
                            marginBottom={-10}
                          >
                            {label}
                          </Text>
                          <Field
                            as={Input}
                            name={fieldName}
                            variant="filled"
                            height={group.height}
                            placeholder="example"
                            width={group.width}
                          />
                          {errors[fieldName as keyof typeof errors] &&
                            touched[fieldName as keyof typeof touched] && (
                              <Text color="red" fontSize="sm">
                                {errors[fieldName as keyof typeof errors]}
                              </Text>
                          )}
                        </VStack>
                      );
                    })}
                  </VStack>

                  {/* Right Column - Group Members */}
                  {values.groupRepresentative && (
                    <VStack
                      width="350px"
                      align="flex-start"
                      marginTop="30px"
                      marginLeft="90px"
                    >
                      <Text
                        fontSize="18px"
                        fontWeight={600}
                        fontFamily="Montserrat"
                        marginBottom={-10}
                      >
                        Group Members
                      </Text>
                      <Field
                        as={Textarea}
                        name="groupMembers"
                        variant="filled"
                        placeholder="First, last name..."
                        height="230px"
                        width="100%"
                        resize="none"
                        sx={{
                          border: '1px solid #E2E8F0',
                          _focus: {
                            borderColor: '#3182CE',
                            boxShadow: '0 0 0 1px #3182CE',
                          },
                          _hover: {
                            borderColor: '#CBD5E0',
                          },
                        }}
                      />
                      {errors.groupMembers && touched.groupMembers && (
                        <Text color="red" fontSize="sm">
                          {errors.groupMembers}
                        </Text>
                      )}
                    </VStack>
                  )}
                </HStack>
              </VStack>

              <HStack
                className="circle-progress"
                justifyContent="center"
                spacing="30px"
              >
                <CircleIcon />
                <CircleOutlinedIcon />
                <CircleOutlinedIcon />
              </HStack>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

function TermsAndConditions({
  onCheckboxChange,
}: {
  onCheckboxChange: (checked: boolean[]) => void;
}) {
  const [checkedState, setCheckedState] = useState(
    new Array(termsAndConditionsCheckboxesMap.length).fill(false),
  );

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === index ? !item : item,
    );
    setCheckedState(updatedCheckedState);
    onCheckboxChange(updatedCheckedState); // notify parent component
  };
  return (
    <Box className="terms-and-conditions-box">
      <VStack spacing={6} marginTop={'20px'} marginBottom={'20px'} borderBottom="2px solid #000000" paddingBottom="20px">
        {termsAndConditionsCheckboxesMap.map((field, i) => (
          <HStack key={i} width="100%" alignItems="center">
            <Text textDecoration="underline" fontSize="18px" fontWeight={600} fontFamily="Montserrat">
              {field.label}
            </Text>
            <Checkbox
              checked={checkedState[i]}
              onChange={() => handleCheckboxChange(i)}
              sx={{
                color: '#808080',
                '&.Mui-checked': { color: '#808080' },
                '& .MuiSvgIcon-root': { fontSize: 32 },
                padding: '2px',
                marginLeft: '20px',
              }}
            />
          </HStack>
        ))}
      </VStack>
      <HStack
        className="circle-progress"
        justifyContent="center"
        spacing="30px"
      >
        <CircleIcon />
        <CircleIcon />
        <CircleOutlinedIcon />
      </HStack>
    </Box>
  );
}

export default function SignUpPage({ setShowSignUp }: { setShowSignUp: (show: boolean) => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(
    new Array(termsAndConditionsCheckboxesMap.length).fill(false),
  );
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleSubmit = () => {
    if (isChecked.every(Boolean)) {
      setIsSubmitted(true);
      navigate('/success');
    }
  };

  return (
    <Box
      position="absolute"
      top="10%"
      left="10%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="#D9D9D9"
      width="80%"
      height="100%"
      zIndex="200"
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
        bg="#FFFDFD"
        height="90%"
        width="90%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        paddingTop="30px"
      >
        <Box
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
            paddingBottom="30px"
          >
            Welcome, Volunteer!
          </Text>
        </Box>
        <Box className="input-fields-main" width="90%" mt="10px">
          {step === 1 && (
            <PersonalInfo
              onSubmit={handleNext}
              setIsFormValid={setIsFormValid} // Pass setIsFormValid to PersonalInfo
            />
          )}
          {step === 2 && <TermsAndConditions onCheckboxChange={setIsChecked} />}
        </Box>

        <HStack width="100%" justifyContent="space-between" marginBottom="7%" paddingX="5%">
          {step > 1 ? (
            <Button 
              onClick={handleBack} 
              fontSize="18px" 
              bg="#4A4A4A" 
              color="white" 
              _hover={{ bg: "#2E2E2E" }}
              width="150px"  
            >
              ← Back
            </Button>
          ) : (
            <Box width="150px" /> 
          )}

          {step < 2 ? (
            <Button 
              onClick={handleNext} 
              fontSize="18px" 
              bg="#4A4A4A" 
              color="white" 
              _hover={{ bg: "#2E2E2E" }} 
              width="150px"
              alignSelf="flex-end"
              isDisabled={!isFormValid} // Disable if form is invalid
            >
              Next →
            </Button>
          ) : (
            !isSubmitted ? (
              <Button 
                onClick={handleSubmit} 
                fontSize="18px" 
                bg="#E74C3C" 
                color="white" 
                _hover={{ bg: "#C0392B" }} 
                width="150px"
                alignSelf="flex-end"
                isDisabled={!isChecked.every(Boolean)}
              >
                Submit
              </Button>
            ) : (
              <Box>
                <Text fontSize="24px" fontWeight={600}>
                  Thank you for submitting the form!
                </Text>
              </Box>
            )
          )}
        </HStack>
      </Box>
    </Box>
  );
}