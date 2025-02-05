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

interface Props {
  setShowSignUp: (value: boolean) => void;
}

function PersonalInfo() {
  const [isGroupRepresentative, setIsGroupRepresentative] = useState(false);

  return (
    <Box className="personal-info-box">
      <VStack spacing={5} marginBottom={'20px'} borderBottom="2px solid #000000" paddingBottom="20px">
        
        {/* Checkbox for Group Representative */}
        <HStack width="100%" alignItems="center">
          <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">
            Signing up as a group representative?
          </Text>
          <Checkbox
            checked={isGroupRepresentative}
            onChange={() => setIsGroupRepresentative(!isGroupRepresentative)}
            sx={{
              color: '#808080',
              '&.Mui-checked': { color: '#808080' },
              '& .MuiSvgIcon-root': { fontSize: 23 },
              padding: '2px',
              marginLeft: '10px',
            }}
          />
        </HStack>

        <HStack width="100%" spacing={10} align="start">
          
          {/* Left Column: First Name, Email, Phone, Birth Year */}
          <VStack width="50%" align="start" spacing={5}>
            <VStack width="100%" align="start">
              <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">First Name</Text>
              <Input variant="filled" height="40px" width="100%" />
            </VStack>
            
            <VStack width="100%" align="start">
              <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">Email Address</Text>
              <Input variant="filled" height="40px" width="100%" />
            </VStack>

            <VStack width="100%" align="start">
              <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">Phone Number</Text>
              <Input variant="filled" height="40px" width="100%" />
            </VStack>

            <VStack width="100px" align="start">
              <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">Birth Year</Text>
              <Input variant="filled" height="40px" width="100%" />
            </VStack>
          </VStack>

          {/* Right Column: Last Name and Group Members */}
          <VStack width="50%" align="start" spacing={5}>
            <VStack width="100%" align="start">
              <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">Last Name</Text>
              <Input variant="filled" height="40px" width="100%" />
            </VStack>

            {/* Conditionally render Group Members below Last Name if checked */}
            {isGroupRepresentative && (
              <VStack width="100%" align="start">
                <Text fontSize="18px" fontWeight={600} fontFamily="Montserrat">Group Members</Text>
                <Input
                  as="textarea" 
                  variant="filled"
                  height="230px"
                  width="100%"
                  placeholder="First, Last Name..."
                  resize="none" 
                  sx={{ paddingTop: '10px' }} // Ensures text starts at the top
                />
              </VStack>
            )}
          </VStack>

        </HStack>

      </VStack>
    </Box>
  );
}

function TermsAndConditions() {
  return (
    <Box className="terms-and-conditions-box">
      <VStack spacing={6} marginTop={'20px'} marginBottom={'20px'} borderBottom="2px solid #000000" paddingBottom="20px">
        {[
          'I have reviewed the General Safety Guidelines',
          'I have read and agree to the Terms of Use and Privacy Policy',
          'I have read and agree to the Release of Liability',
        ].map((label, i) => (
          <HStack key={i} width="100%" alignItems="center">
            <Text textDecoration="underline" fontSize="18px" fontWeight={600} fontFamily="Montserrat">
              {label}
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
    </Box>
  );
}

export default function SignUpPage({ setShowSignUp }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const closeSignUp = () => {
    setShowSignUp(false);
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    navigate('/success');
  };

  return (
    <Box className="outermost-box" position="absolute" top="10%" left="10%" display="flex" alignItems="center" justifyContent="center" bg="#D9D9D9" width="80%" height="140%" zIndex={'200'}>
      <IconButton aria-label="close" size="small" position="absolute" top="10px" right="10px" onClick={closeSignUp}>
        <CloseIcon />
      </IconButton>
      <Box className="inner-box" bg="#FFFDFD" height="90%" width="90%" display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" paddingTop={'30px'}>
        <Box className="header-box" height="5%" width="90%" borderBottom="2px solid #000000" display="flex" justifyContent="center" alignItems="center">
          <Text fontFamily="Montserrat" fontSize="28px" fontWeight={700} paddingBottom={'30px'}>
            Welcome, Volunteer!
          </Text>
        </Box>
        <Box className="input-fields-main" width="90%" mt="10px">
          {step === 1 && <PersonalInfo />}
          {step === 2 && <TermsAndConditions />}
        </Box>

        {/* Buttons for navigation */}
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
            >
              Next →
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              fontSize="18px" 
              bg="#E74C3C" 
              color="white" 
              _hover={{ bg: "#C0392B" }} 
              width="150px"
              alignSelf="flex-end"
            >
              Submit
            </Button>
          )}
        </HStack>
      </Box>
    </Box>
  );
}
