import { Box, Input, Text, Stack, HStack, VStack, Button } from '@chakra-ui/react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { grey } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import './SignUpPage.css';
import './InputFields.css';


interface InputField {
    label: string;
    placeholder?: string;
}

interface CheckboxField {
    label: string;
}

interface InputFieldGroup {
    fields: InputField[];
    type?: 'single' | 'double'; // 'single' for single column, 'double' for double column row
    height: string,
    width: string,
}

const checkboxesMap: CheckboxField[] = [
    { label: 'I have reviewed the General Safety Guidelines' },
    { label: 'I have read and agree to the Terms of Use and Privacy Policy' },
    { label: 'I have read and agree to the Release of Liability' },
];

const inputFieldsMap: InputFieldGroup[] = [
    { fields: [{ label: 'First Name' }, { label: 'Last Name' }], type: 'double', height: "40px", width: "373px" },
    { fields: [{ label: 'Email Address' }], type: 'single', height: "40px", width: "810px" },
    { fields: [{ label: 'Phone Number' }], type: 'single', height: "40px", width: "810px" },
    { fields: [{ label: 'Zip Code' }], type: 'single', height: "40px", width: "369px" },
    { fields: [{ label: 'Age' }], type: 'single', height: "40px", width: "107px" },
    { fields: [{ label: 'Which days are you available to volunteer', placeholder: 'Select days' }], type: 'single', height: "40px", width: "454px" },
];

function InputFields({ onInputChange }) {
    return (
        <VStack className="input-fields-container" spacing={4}>
            {inputFieldsMap.map((group, i) => (
                <VStack key={i} className="input-fields-container" spacing={1}>
                    {group.type === 'double' ? (
                        <HStack className="input-group-double">
                            {group.fields.map((field, j) => (
                                <VStack key={j} width={group.width} className="input-field-container">
                                    <Text className='label'>{field.label}</Text>
                                    <Input 
                                        className="input-field" 
                                        variant='filled' 
                                        height={group.height} 
                                        placeholder={field.placeholder || '...'} 
                                        onChange={(e) => onInputChange(field.label, e.target.value)} 
                                    />
                                </VStack>
                            ))}
                        </HStack>
                    ) : (
                        <VStack width={group.width} className="input-field-container">
                            <Text className='label'>{group.fields[0].label}</Text>
                            <Input 
                                className="input-field" 
                                variant='filled' 
                                height={group.height} 
                                placeholder={group.fields[0].placeholder || '...'} 
                                onChange={(e) => onInputChange(group.fields[0].label, e.target.value)} 
                            />
                        </VStack>
                    )}
                </VStack>
            ))}
        </VStack>
    );
}

function CheckboxFields({ onCheckboxChange, checkboxes }) {
    return (
        <VStack>
            {checkboxesMap.map((field, i) => (
                <FormControlLabel
                    key={i}
                    control={
                        <Checkbox
                            checked={checkboxes[field.label]}
                            onChange={(e) => onCheckboxChange(field.label, e.target.checked)}
                            sx={{
                                color: grey[500],
                                '&.Mui-checked': {
                                    color: grey[600],
                                },
                                '& .MuiSvgIcon-root': { 
                                    fontSize: 30,
                                },
                            }}
                        />
                    }
                    label={field.label}
                />
            ))}
        </VStack>
    );
}

function SignUpPage() {
    const [inputValues, setInputValues] = useState({});
    const [checkboxStates, setCheckboxStates] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const allInputsFilled = Object.keys(inputValues).length === inputFieldsMap.reduce((acc, curr) => acc + curr.fields.length, 0) && Object.values(inputValues).every(value => value !== '');
        const allCheckboxesChecked = Object.values(checkboxStates).every(value => value === true);
        setIsFormValid(allInputsFilled && allCheckboxesChecked);
    }, [inputValues, checkboxStates]);

    const handleInputChange = (fieldLabel, value) => {
        setInputValues(prev => ({ ...prev, [fieldLabel]: value }));
    };

    const handleCheckboxChange = (fieldLabel, checked) => {
        setCheckboxStates(prev => ({ ...prev, [fieldLabel]: checked }));
    };

    const handleSubmit = () => {
        alert('Application sent!');
    };

    return (
        <Box className='outermost-box'>
            <Box className='inner-box'>
                <Box className='header-box'>
                    <Text fontFamily='Montserrat' fontSize='30px'>Welcome, Volunteer!</Text>
                </Box>
                <Box className='input-fields-main'>
                    <InputFields onInputChange={handleInputChange} />
                </Box>
                <Box className='check-boxes-main'>
                    <CheckboxFields onCheckboxChange={handleCheckboxChange} checkboxes={checkboxStates} />
                </Box>
                <Button isDisabled={!isFormValid} onClick={handleSubmit}> Submit </Button>
            </Box>
        </Box>
    );
}

export default SignUpPage;
