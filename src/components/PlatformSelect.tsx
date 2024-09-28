import React from 'react';

import { Flex, Select } from '@chakra-ui/react';
import { BiCaretDown } from 'react-icons/bi';
import { Platform } from '../utils/models';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const PlatformSelect: React.FC<Props> = ({ value, onChange }) => {
    const platforms = Object.values(Platform);

    return ( 
        <Flex fontSize='small' gap={4} align='center'>
            <Select 
                icon={<BiCaretDown size={5} color='gray' />}
                variant='outline'
                bg='white'
                color='black'
                borderColor='gray.200'
                fontSize='small'
                placeholder='Select platform' 
                value={value} 
                rounded={2}
                onChange={(e) => onChange(e.target.value)}
                _placeholder={{ color: 'gray.400' }}
            >
                {platforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                ))}
            </Select>
        </Flex>
     );
};
 
export default PlatformSelect;