import {
  Box,
  Input,
  Text,
  HStack,
  VStack,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

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

const personalInfoCheckboxesMap: CheckboxField[] = [
  {
    label: 'Signing up as a group representative?',
  },
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

function PersonalInfo() {
  return (
    <Box className="personal-info-box">
      <VStack
        spacing={0}
        marginBottom={'20px'}
        borderBottom="2px solid #000000"
        paddingBottom="20px"
      >
        {personalInfoCheckboxesMap.map((field, i) => (
          <HStack
            key={i}
            width="100%"
            height="100%"
            marginBottom={'20px'}
            alignItems="flex-start"
          >
            <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">
              {field.label}
            </Text>
            <Checkbox
              sx={{
                color: '#808080', // Grey color for the checkbox when not checked
                '&.Mui-checked': {
                  color: '#808080', // Grey color for the checkbox when checked
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 23,
                },
                padding: '2px',
                marginLeft: '20px',
              }}
            />
          </HStack>
        ))}
        {personalInfoInputFieldsMap.map((group, i) => (
          <VStack key={i} width="100%" spacing={0} align="flex-start">
            {group.type === 'double' ? (
              <HStack width="100%" justifyContent="left" spacing="20%">
                {group.fields.map((field, j) => (
                  <VStack key={j} width={field.width}>
                    <Text
                      className="label"
                      alignSelf="flex-start"
                      fontSize="18px"
                      fontWeight={600}
                      marginBottom={-10}
                      fontFamily="Montserrat"
                    >
                      {field.label}
                    </Text>
                    <Input
                      variant="filled"
                      height={group.height}
                      placeholder={field.placeholder || 'example'}
                      width="100%"
                    />
                  </VStack>
                ))}
              </HStack>
            ) : (
              <VStack width="100%" align="flex-start">
                <Text
                  className="label"
                  fontSize="18px"
                  fontWeight={600}
                  fontFamily="Montserrat"
                  alignSelf="flex-start"
                  marginBottom={-10}
                  marginTop="30px"
                >
                  {group.fields[0].label}
                </Text>
                <Input
                  variant="filled"
                  height={group.height}
                  placeholder={group.fields[0].placeholder || 'example'}
                  width={group.width}
                />
              </VStack>
            )}
          </VStack>
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
        <CircleOutlinedIcon />
        <CircleOutlinedIcon />
      </HStack>
    </Box>
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
              checked={checkedState[i]}
              onChange={() => handleCheckboxChange(i)}
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
  const [isChecked, setIsChecked] = useState(
    new Array(termsAndConditionsCheckboxesMap.length).fill(false),
  );
  const navigate = useNavigate();

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleSubmit = () => {
    if (isChecked.every(Boolean)) {
      // check all checkboxes checked
      // You can add form validation logic here if needed
      setIsSubmitted(true);
      navigate('/success'); // Step 2
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
          {/*<PersonalInfo /> */}
          {/*<TermsAndConditions onCheckboxChange={setIsChecked} /> */}
        </Box>

        {/* Conditional rendering for the submit button */}
        {/*{!isSubmitted && (
          <Button
            size="large"
            marginBottom="7%"
            fontSize="20px"
            onClick={handleSubmit}
            bottom="10%"
            left="50%"
            transform="translateX(-50%)"
            isDisabled={!isChecked.every(Boolean)}
          >
            Submit
          </Button>
        )}/*}

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
