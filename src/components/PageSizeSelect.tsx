import React from 'react';

import { Flex, Select, Text } from '@chakra-ui/react';
import { BiCaretDown } from 'react-icons/bi';

interface Props {
    value: number;
    onChange: (pageSize: number) => void;
}

const PageSizeSelect: React.FC<Props> = ({ value, onChange }) => {
    return ( 
        <Flex color='gray.600' fontSize='small' fontWeight='600' gap={4} align='center'>
            <Text>Show</Text>
            <Select 
                size='sm'
                icon={<BiCaretDown size={5} color='gray' />}
                variant='outline'
                bg='white'
                className='max-w-20'
                borderColor='gray.300'
                placeholder='Select option' 
                value={value} 
                rounded={2}
                onChange={(e) => onChange(parseInt(e.target.value))}
            >
                {[10, 30, 50, 80].map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </Select>
            <Text>entries</Text>
        </Flex>
     );
};
 
export default PageSizeSelect;