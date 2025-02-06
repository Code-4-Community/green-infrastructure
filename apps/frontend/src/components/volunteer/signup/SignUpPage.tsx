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
  type?: 'single' | 'double';
  height: string;
  width: string;
}

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
  { label: 'I have reviewed the General Safety Guidelines' },
  { label: 'I have read and agree to the Terms of Use and Privacy Policy' },
  { label: 'I have read and agree to the Release of Liability' },
];

function PersonalInfo() {
  const [isGroupRepresentative, setIsGroupRepresentative] = useState(false);

  return (
    <Box className="personal-info-box">
      <VStack spacing={0} marginBottom={'20px'} borderBottom="2px solid #000000" paddingBottom="20px">
        {personalInfoCheckboxesMap.map((field, i) => (
          <HStack key={i} width="100%" marginBottom={'20px'} alignItems="flex-start">
            <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">
              {field.label}
            </Text>
            <Checkbox
              checked={isGroupRepresentative}
              onChange={(e) => setIsGroupRepresentative(e.target.checked)}
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
          <HStack width="100%" justifyContent="left" spacing="20%">
            {personalInfoInputFieldsMap[0].fields.map((field, j) => (
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
                <Input
                  variant="filled"
                  height={personalInfoInputFieldsMap[0].height}
                  placeholder="example"
                  width="100%"
                />
              </VStack>
            ))}
          </HStack>
        </VStack>

        {/* Lower Section */}
        <HStack width="100%" align="start" spacing={4} mt={4}>
          {/* Left Column - Email/Phone/Birth Year */}
          <VStack width="380px" align="flex-start" spacing={0}>
            {personalInfoInputFieldsMap.slice(1).map((group, i) => (
              <VStack key={i} width="100%" align="flex-start">
                <Text
                  fontSize="18px"
                  fontWeight={600}
                  fontFamily="Montserrat"
                  marginTop="30px"
                  marginBottom={-10}
                >
                  {group.fields[0].label}
                </Text>
                <Input
                  variant="filled"
                  height={group.height}
                  placeholder="example"
                  width={group.width}
                />
              </VStack>
            ))}
          </VStack>

          {/* Right Column - Group Members */}
          {isGroupRepresentative && (
            <VStack width="350px" align="flex-start" marginTop="30px" marginLeft="90px">
              <Text
                fontSize="18px"
                fontWeight={600}
                fontFamily="Montserrat"
                marginBottom={-10}
              >
                Group Members
              </Text>
              <Textarea
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
            </VStack>
          )}
        </HStack>
      </VStack>

      <HStack className="circle-progress" justifyContent="center" spacing="30px">
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
      <VStack spacing={102} marginTop={'20px'} marginBottom={'20px'} borderBottom="2px solid #000000" paddingBottom="20px">
        {termsAndConditionsCheckboxesMap.map((field, i) => (
          <HStack key={i} width="100%" marginTop={'20px'} alignItems="flex-start">
            <Text textDecoration="underline" fontSize="18px" fontWeight={600} fontFamily="Montserrat" marginTop={'4px'}>
              {field.label}
            </Text>
            <Checkbox
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
      <HStack className="circle-progress" justifyContent="center" spacing="30px">
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    navigate('/success');
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
          height="5%"
          width="90%"
          borderBottom="2px solid #000000"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontFamily="Montserrat" fontSize="28px" fontWeight={700} paddingBottom={'30px'}>
            Welcome, Volunteer!
          </Text>
        </Box>
        <Box width="90%" mt="10px">
          <PersonalInfo />
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
          </Box>
        )} */}
      </Box>
    </Box>
  );
}