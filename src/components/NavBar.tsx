import React from 'react';

import { Box, Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { BiFile, BiSolidDashboard } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const routes = [
    {
        label: 'Dashboard',
        route: 'dashboard',
        Icon: BiSolidDashboard
    },
    {
        label: 'Documents',
        route: '/dashboard/documents',
        Icon: BiFile
    },
];

const NavBar: React.FC = () => {

    return ( 
        <Box className='w-full bg-gradient-to-b from-blue-900 to-blue-400 h-dvh'>
            {routes.map((route) => (
                <ChakraLink as={Link} key={route.label} color='white' className='hover:no-underline' to={route.route}>
                    <Stack align='center' justify='center' spacing={3} className='h-40 w-full hover:bg-blue-500 transition-all duration-300'>
                        <Flex justify='center' align='center'>
                            {<route.Icon size={40}  />}
                        </Flex>
                        <Text mt={2} textAlign='center'>{route.label}</Text>
                    </Stack>
                </ChakraLink>
            ))}
        </Box>
     );
}
 
export default NavBar;