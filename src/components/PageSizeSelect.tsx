import React from 'react';
import usePostQueryStore from '../store/posts';

import { Flex, Select, Text } from '@chakra-ui/react';
import { BiCaretDown } from 'react-icons/bi';

const PageSizeSelect: React.FC = () => {
    const { postQuery, setPageSize } = usePostQueryStore();

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
                value={postQuery.pageSize} 
                rounded={2}
                onChange={(e) => setPageSize(parseInt(e.target.value))}
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