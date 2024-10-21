import { Button, Box, Image, Input, Text, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BostonImage from "../../assets/images/loginPageMedia/boston-pru.png"
import c4cLogo from '../../images/logos/c4cLogo.png';
import cityOfBostonLogo from '../../images/logos/cityOfBostonLogo.png';

// Using className specifications to track hiearchy !
// Using className specifications to track hierarchy!
export default function LoginPage() {
    return (
        <Box
            display="flex"
            width="100vw"
            height="100vh"
            overflow="hidden"
        >
            <Box
                className='user-side'
                bg="#FFFFFF"
                width="50%"
                display='flex'
                flexDirection="column"
                alignItems='center'
                justifyContent='flex-start'
                height="100%"
                overflowY="auto" // Enable vertical scrolling
            >
                {/* Added margin-top only to logos to create spacing from the top */}
                <Box 
                    className='logos'
                    display="flex"
                    alignItems='center'
                    marginTop="4rem" // Keep margin for logo spacing
                >
                    <img
                        src={cityOfBostonLogo}
                        style={{ paddingRight: '15px' }}
                    />
                    <div
                        style={{
                            borderLeft: '1px solid rgba(0, 0, 0, 1)',
                            height: '55px',
                            paddingRight: '15px',
                        }}
                    />
                    <img src={c4cLogo} />
                </Box>
                
                {/* The rest of the content should have no additional margin */}
                <Box
                    className="loginCTA"
                    width='321px'
                    height='auto'
                    marginTop='2rem' // Adjust margin for spacing below logos
                >
                    <Text
                        fontStyle="Montserrat"
                        fontSize="24px"
                        lineHeight="29.26px"
                        fontWeight="600"
                    >Welcome Back Volunteer!</Text>
                    <Text
                        fontStyle="Montserrat"
                        fontSize="14px"
                        lineHeight="17.07px"
                        fontWeight="300"
                    >Continue adopting today!</Text>
                    <Box 
                        className='primaryLoginOption'
                        width='305px'
                    >
                        <Stack spacing='1rem'>
                            <Box>
                                <Text mb={2} fontSize="sm" fontWeight="normal">Email Address</Text>
                                <Input
                                    width="100%"
                                    height="33px"
                                    bg="#D9D9D9"
                                    borderRadius="10px"
                                    borderColor="#D9D9D9"
                                    _hover={{ borderColor: 'gray.300' }}
                                    _focus={{ borderColor: 'gray.500', boxShadow: '0 0 0 1px gray.500' }}
                                />
                            </Box>
                            <Box>
                                <Text mb={2} fontSize="sm" fontWeight="normal">Password</Text>
                                <Input
                                    width="100%"
                                    height="33px"
                                    bg="#D9D9D9"
                                    type="password"
                                    borderRadius="10px"
                                    borderColor="#D9D9D9"
                                    _hover={{ borderColor: 'gray.300' }}
                                    _focus={{ borderColor: 'gray.500', boxShadow: '0 0 0 1px gray.500' }}
                                />
                            </Box>
                            <Button
                                as={Link}
                                to="/volunteer"
                                bg="#D9D9D9"
                                borderRadius="10px"
                                borderColor="#D9D9D9"
                                fontWeight="300"
                                fontSize="14px"
                                fontStyle="Montserrat"
                                lineHeight="17.07px"
                                marginTop="2rem"
                                display="block"
                                width="100%"
                                textAlign="center"
                                _hover={{ textDecoration: 'none' }}
                                textDecoration="none"
                                color="current"
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box
                className='media-side'
                width="50%"
                height="100%"
            >
                <Image
                    src={BostonImage}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                />
            </Box>
        </Box>
    );
}