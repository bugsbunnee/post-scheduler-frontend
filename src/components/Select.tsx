import React from 'react';

import { Flex, Select as ChakraSelect, Spinner } from '@chakra-ui/react';
import { BiCaretDown } from 'react-icons/bi';

interface Props {
    isLoading: boolean;
    options: { id: string; name: string }[]
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const Select: React.FC<Props> = ({ isLoading, options, placeholder, value, onChange }) => {
    return ( 
        <Flex fontSize='small' gap={4} align='center'>
            <ChakraSelect 
                icon={isLoading ? <Spinner /> : <BiCaretDown size={5} color='gray' />}
                variant='outline'
                bg='white'
                color='black'
                borderColor='gray.200'
                fontSize='small'
                placeholder={placeholder} 
                value={value} 
                rounded={2}
                onChange={(e) => onChange(e.target.value)}
                _placeholder={{ color: 'gray.400' }}
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </ChakraSelect>
        </Flex>
    );
};
 
export default Select;