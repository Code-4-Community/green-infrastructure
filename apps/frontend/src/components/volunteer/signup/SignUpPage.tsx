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
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// CHANGED: Props now include the siteId.
interface Props {
  setShowSignUp: (value: boolean) => void;
  siteID: string | null;
}

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
    fields: [
      { label: 'First Name', width: '250px' },
      { label: 'Last Name', width: '350px' },
    ],
    type: 'double',
    height: '40px',
    width: '810px',
  },
  {
    fields: [{ label: 'Email Address' }],
    type: 'single',
    height: '40px',
    width: '300px',
  },
  {
    fields: [{ label: 'Phone Number' }],
    type: 'single',
    height: '40px',
    width: '300px',
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

// Add this new layout configuration
const formLayout = {
  columns: [
    {
      width: '45%', // First column width
      fields: [
        {
          mapIndex: 0, // Index in personalInfoInputFieldsMap
          fieldIndex: 0, // Index in fields array
          name: 'firstname', // Form field name
          displayWidth: '90%', // Display width within column
        },
        {
          mapIndex: 1,
          fieldIndex: 0,
          name: 'email',
          displayWidth: '100%',
        },
        {
          mapIndex: 2,
          fieldIndex: 0,
          name: 'phone',
          displayWidth: '100%',
        },
        {
          mapIndex: 3,
          fieldIndex: 0,
          name: 'birthyear',
          displayWidth: '60%',
        },
      ],
    },
    {
      width: '45%', // Second column width
      fields: [
        {
          mapIndex: 0,
          fieldIndex: 1,
          name: 'lastname',
          displayWidth: '100%',
        },
        // Group members is conditionally rendered
      ],
    },
  ],
};

function PersonalInfo({ onSubmit, setIsFormValid }: PersonalInfoProps) {
  const [showErrors, setShowErrors] = useState(false);
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
  const [isFormValidInternal, setIsFormValidInternal] = useState(false);

  // Move useEffect outside the Formik callback
  useEffect(() => {
    setIsFormValid(isFormValidInternal);
  }, [isFormValidInternal, setIsFormValid]);

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
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        setFieldValue,
        handleSubmit,
        validateForm,
      }) => {
        // Update the internal state when isValid changes
        if (isValid !== isFormValidInternal) {
          setIsFormValidInternal(isValid);
        }

        const handleNextClick = async () => {
          setFormSubmitAttempted(true);
          const errors = await validateForm();
          if (Object.keys(errors).length === 0) {
            handleSubmit();
          } else {
            setShowErrors(true);
          }
        };

        return (
          <Form>
            <Box className="personal-info-box">
              {/* Error message display */}
              {showErrors &&
                formSubmitAttempted &&
                Object.keys(errors).length > 0 && (
                  <Box p={3} borderRadius="md" mb={4}>
                    <Text sx={{ color: 'red' }}>
                      Please complete all required fields
                    </Text>
                  </Box>
                )}
              {!showErrors && (
                <Box p={3} borderRadius="md" mb={4}>
                  <Text> </Text>{' '}
                </Box>
              )}

              <VStack
                spacing={0}
                marginBottom="20px"
                borderBottom="2px solid #000000"
                paddingBottom="20px"
                alignItems="flex-start" // Left align the entire stack
              >
                {/* Group Representative Checkbox */}
                {personalInfoCheckboxesMap.map((field, i) => (
                  <HStack
                    key={i}
                    width="100%"
                    marginBottom="20px"
                    alignItems="center"
                    justifyContent="flex-start" // Left align
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
                        backgroundColor: '#F5F5F5',
                      }}
                    />
                  </HStack>
                ))}

                {/* Two Column Layout using the formLayout configuration */}
                <HStack
                  width="100%"
                  alignItems="flex-start"
                  spacing="40px" // Space between columns
                  justifyContent="flex-start" // Left align columns
                >
                  {formLayout.columns.map((column, colIdx) => (
                    <VStack
                      key={colIdx}
                      width={column.width}
                      align="flex-start"
                      spacing={8}
                    >
                      {column.fields.map((fieldConfig, idx) => {
                        // Get field info from the map
                        const mapItem =
                          personalInfoInputFieldsMap[fieldConfig.mapIndex];
                        const fieldInfo =
                          mapItem.fields[fieldConfig.fieldIndex];
                        const fieldName = fieldConfig.name;
                        const hasError =
                          showErrors &&
                          formSubmitAttempted &&
                          errors[fieldName as keyof typeof errors];

                        return (
                          <VStack
                            key={idx}
                            width={fieldConfig.displayWidth}
                            align="flex-start"
                          >
                            <HStack spacing={1} alignItems="center">
                              <Text
                                fontSize="18px"
                                fontWeight={600}
                                fontFamily="Montserrat"
                                marginBottom={-10}
                              >
                                {fieldInfo.label}
                              </Text>
                              <Text
                                color="red"
                                fontSize="18px"
                                fontWeight={600}
                                marginBottom={-10}
                              >
                                *
                              </Text>
                            </HStack>
                            <Field
                              as={Input}
                              name={fieldName}
                              variant="filled"
                              height={mapItem.height}
                              backgroundColor="#F5F5F5"
                              width="100%"
                              borderColor={hasError ? 'red.500' : 'transparent'}
                              _hover={{
                                borderColor: hasError
                                  ? 'red.500'
                                  : 'transparent',
                              }}
                              sx={{
                                border: 'none',
                                boxShadow: 'none',
                                outline: hasError ? '2px solid red' : 'none',
                              }}
                            />
                          </VStack>
                        );
                      })}

                      {/* Add Group Members field to the second column conditionally */}
                      {colIdx === 1 && values.groupRepresentative && (
                        <VStack width="100%" align="flex-start">
                          <Text
                            fontSize="18px"
                            fontWeight={600}
                            fontFamily="Montserrat"
                            marginBottom={-10}
                          >
                            Group Members
                            {/* No asterisk for Group Members */}
                          </Text>
                          <Field
                            as={Textarea}
                            name="groupMembers"
                            variant="filled"
                            placeholder="First, last name..."
                            backgroundColor="#F5F5F5"
                            height="150px"
                            width="100%"
                            resize="none"
                            sx={{
                              border: 'none',
                              boxShadow: 'none',
                              outline:
                                showErrors &&
                                formSubmitAttempted &&
                                errors.groupMembers
                                  ? '2px solid red'
                                  : 'none',
                            }}
                          />
                        </VStack>
                      )}
                    </VStack>
                  ))}
                </HStack>
              </VStack>

              <HStack
                className="circle-progress"
                justifyContent="flex-end" // Left align the Next button
                spacing="30px"
                width="100%"
              >
                <Button
                  onClick={handleNextClick}
                  mt={4}
                  colorScheme="blue"
                  width="20%"
                  sx={{
                    borderWidth: '0',
                    backgroundColor: '#58585B',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Next &rarr;
                </Button>
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

      <VStack
        spacing={6}
        marginTop={'20px'}
        marginBottom={'20px'}
        borderBottom="2px solid #000000"
        paddingBottom="20px"
      >
        {termsAndConditionsCheckboxesMap.map((field, i) => (

          <HStack key={i} width="100%" alignItems="center">
            <Text
              textDecoration="underline"
              fontSize="18px"
              fontWeight={600}
              fontFamily="Montserrat"
            >
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


export default function SignUpPage({ setShowSignUp, siteID }: Props) {

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(
    new Array(termsAndConditionsCheckboxesMap.length).fill(false),
  );
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity  
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    birthyear: "",
    groupRepresentative: false,
    groupMembers: "",
  })
  const [step, setStep] = useState(1);

  const handleNext = (values: any) => {
    if (step < 2) setStep(step + 1);
    setFormValues(values);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleSubmit = async () => {
  if (isChecked.every(Boolean) && isFormValid) {
    const userRequestBody = {
      
    };

    try {
      const now = new Date().toISOString();
      const names = []
      if (formValues["groupRepresentative"]) {
        const groupMembers = formValues["groupMembers"].split(",")
        names.push(...groupMembers)
      }

      const applicationRequestBody = {
        firstName: formValues["firstname"],
        lastName: formValues["lastname"],
        phoneNumber: formValues["phone"],
        email: formValues["email"],
        zipCode: "123",
        birthDate: formValues["birthyear"],
        siteId: siteID,
        names: names,
        status: "Pending",
        dateApplied: now,
        isFirstApplication: true,
      };

      const applicationResponse = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/applications`,
        applicationRequestBody,
        {
          headers: {
            'Content-Type': 'application/json'
        }}
      );
      
      navigate('/success');

    } catch (error) {
      console.error("Error:", error);
    }
  }
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
      height="140%"

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

        className="inner-box"

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

          className="header-box"
          height="5%"
          width="90%"

          borderBottom="2px solid #000000"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >

          <Text fontFamily="Montserrat" fontSize="28px" fontWeight={700} paddingBottom="30px">

            Welcome, Volunteer!
          </Text>
        </Box>
        <Box className="input-fields-main" width="70%" mt="10px">
          {step === 1 && (
            <PersonalInfo
              onSubmit={handleNext}
              setIsFormValid={setIsFormValid} // Pass setIsFormValid to PersonalInfo
            />
          )}
          {step === 2 && <TermsAndConditions onCheckboxChange={setIsChecked} />}
        </Box>


        {/* Navigation Buttons */}
        <HStack width="100%" justifyContent="space-between" marginBottom="7%" paddingX="5%">

          {step > 1 ? (
            <Button
              onClick={handleBack}
              fontSize="18px"
              bg="#4A4A4A"
              color="white"
              width="45%"
              height="50px"
            >
              Back
            </Button>
          ) : (

            <Box width="150px" />

          )}
          {step === 2 && (
            <Button
              onClick={handleSubmit}
              fontSize="18px"
              bg="#4A4A4A"
              color="white"
              width="45%"
              height="50px"
              isDisabled={!isChecked.every(Boolean)}
            >
              Submit
            </Button>
          )}
        </HStack>
      </Box>
    </Box>
  );
}
