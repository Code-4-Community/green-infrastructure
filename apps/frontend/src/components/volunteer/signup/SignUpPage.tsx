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

interface PersonalInfoProps {
  formData: Record<string, string>;
  setShowSecondPage: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PersonalInfo({ formData, setShowSecondPage, handleChange}: PersonalInfoProps) {
  return (
    <Box
          className="personal-info-box"
        >
      <VStack spacing={0} marginBottom={'20px'} borderBottom="2px solid #000000" paddingBottom="20px">
        {personalInfoCheckboxesMap.map((field, i) => (
          <HStack key={i} width="100%" height="100%" marginBottom={'20px'} alignItems="flex-start">
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
                      name={field.label}
                      variant="filled"
                      height={group.height}
                      placeholder={field.placeholder || 'example'}
                      width="100%"
                      value={formData[field.label] || ""} // Updated: Bind state
                      onChange={handleChange}
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
                  name={group.fields[0].label}
                  variant="filled"
                  height={group.height}
                  placeholder={group.fields[0].placeholder || 'example'}
                  width={group.width}
                  value={formData[group.fields[0].label] || ""}
                  onChange={handleChange}
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
        <IconButton aria-label='secondPage' onClick={() => setShowSecondPage(true)}>
          <CircleOutlinedIcon />
        </IconButton>
        <CircleOutlinedIcon />
      </HStack>
    </Box>
  )
}

interface TermsAndConditionsProps {
  setShowSecondPage: (value: boolean) => void;
}

function TermsAndConditions({ setShowSecondPage }: TermsAndConditionsProps) {
  return (
    <Box
          className="terms-and-conditions-box"
        >
      <VStack spacing={102} marginTop={'20px'} marginBottom={'20px'}  borderBottom="2px solid #000000" paddingBottom="20px">
        {termsAndConditionsCheckboxesMap.map((field, i) => (
          <HStack key={i} width="100%" height="100%" marginTop={'20px'} alignItems="flex-start">
            <Text textDecoration="underline" fontSize="18px" fontWeight={600} fontFamily="Montserrat" marginTop={'4px'} >
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
        <IconButton aria-label='secondPage' onClick={() => setShowSecondPage(false)}>
          <CircleIcon />
        </IconButton>
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
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  type CreateApplicationInput = {
    appId: number;
    userId: number;
    siteId: number;
    names: [string];
    status: string;
    dateApplied: string;
    isFirstApplication: string;
  };
  
  type CreateApplicationResponse = {
    success: boolean;
    message?: string;
    data?: any; // Adjust this based on the actual API response structure
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSecondPage, setShowSecondPage] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    createApplication()
    navigate('/success');
  };

  const createApplication = async () => {

    const payload = {
      "appId": 15,
      "userId": 12,
      "siteId": 3,
      "names": [formData["First Name"] + " " + formData["Last Name"]],
      "status": "Pending",
      "dateApplied": Date.now().toString(),
      "isFirstApplication": "true"
    };

    try {
      const response = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to submit application");
      alert("Application submitted successfully!");
    } catch (error) {
      alert("Error");
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
          {!showSecondPage && <PersonalInfo formData={formData} setShowSecondPage={setShowSecondPage} handleChange={handleChange} />}
          {showSecondPage && <TermsAndConditions setShowSecondPage={setShowSecondPage}/>}
        </Box>

        {/* Conditional rendering for the submit button */}
        {!isSubmitted && (
          <Button size="large" marginBottom="7%" fontSize="20px" onClick={handleSubmit}
          bottom="10%"
          left="50%"
          transform="translateX(-50%)">
            Submit
          </Button>
        )}

        {/* Success message */}
        {isSubmitted && (
          <Box>
            <Text fontSize="24px" fontWeight={600}>
              Thank you for submitting the form!
            </Text>
          </Box>
        )}
        
      </Box>
    </Box>
  );
}