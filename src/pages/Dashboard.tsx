import React from 'react';
import NavBar from '../components/NavBar';

import { Avatar, Box, Flex, Grid, GridItem, Heading, Show, Stack, Text } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';

import useAuthStore from '../store/auth';

const Dashboard: React.FC = () => {
    const authStore = useAuthStore();
    if (!authStore.user) return <Navigate to='/login' />;

    const fullName = `${authStore.user.firstName} ${authStore.user.lastName}`;

    return ( 
        <Grid
            className='w-dvw h-dvh'
            overflow="hidden"
            templateAreas={{
                base: `"main"`,
                lg: `"aside main"`,
            }}
            templateColumns={{
                base: '1fr',
                lg: `10rem 1fr`,
            }}
        >
            <Show above="lg">
                <GridItem area="aside">
                    <NavBar />
                </GridItem>
            </Show>

            <GridItem area="main" className='bg-gray-200 h-dvh' overflowY='scroll'>
                <Flex bg='white' height='4rem' className='w-full px-8 border-b border-gray-300' align='center' justify='end'>
                    <Flex align='center' gap={3}>
                        <Avatar name={fullName} size='sm' />
                        <Stack spacing={0}>
                            <Heading fontSize='small' color='black' textTransform='capitalize'>
                                {fullName}
                            </Heading>

                            <Text color='gray' fontSize='small'>
                                {authStore.user.email}
                            </Text>
                        </Stack>
                    </Flex>
                </Flex>

                <Box p={20} >
                    <Outlet />
                </Box>

                <footer className='bg-white p-6 border-t border-gray-300 text-gray-500 text-sm font-bold'>
                    @ Copyright RusselSmith Group
                </footer>
            </GridItem>
        </Grid>
    );
};
 
export default Dashboard;