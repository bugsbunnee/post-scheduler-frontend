import React, { PropsWithChildren } from 'react';

import { Box, Heading, HStack } from '@chakra-ui/react';
import { BiSolidFolder } from 'react-icons/bi';

interface Props extends PropsWithChildren {
    title: string;
}

const Content: React.FC<Props> = ({ children, title }) => {
    return ( 
        <Box className='border border-gray-300 overflow-hidden rounded-md'>
            <HStack align='center' justify='space-between' p={4} className='bg-gray-100 border-b border-gray-300'>
                <Heading fontSize='medium' color='black'>{title}</Heading>
                <BiSolidFolder className='text-blue-600' size={20} />
            </HStack>
            
            <Box bg='white'>
                {children}
            </Box>
        </Box>
     );
}
 
export default Content;