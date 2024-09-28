import React  from 'react';

import { Box, Button, Flex, Grid, Heading, HStack, Stack, Text, Badge } from '@chakra-ui/react';
import { BiGlasses, BiLogOut, BiPlusCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import Content from '../components/Content';
import DashboardOverview from '../components/DashboardOverview';
import NewPostModal from '../components/NewPostModal';
import PlatformSelect from '../components/PlatformSelect';
import PostsTable from '../components/PostsTable';
import SearchInput from '../components/SearchInput';

import useAuthStore from '../store/auth';
import usePostQueryStore from '../store/posts';

const HomePage: React.FC = () => {
    const { user } = useAuthStore();
    const { postQuery, setPlatform } = usePostQueryStore();

    return ( 
        <>
            <Stack>
                <Heading color='black'>My Dashboard</Heading>
                <Text color='gray'>Welcome, {user?.firstName} {user?.lastName}</Text>
            </Stack>

            <Grid  
                gap={20}
                templateAreas={{ base: `"main"`, lg: `"aside main"` }}
                templateColumns={{ base: '1fr', lg: `12.5rem 1fr` }} 
                mt={10}
            >
                <Box className='w-full sticky top-0 z-50'>
                    <Stack bg='white' className='border border-gray-300 rounded-sm min-h-40' p={5}>
                        <Heading textTransform='capitalize' color='black' fontSize='larger'>{user?.firstName} {user?.lastName}</Heading>
                        <Box mt={2} mb={6}>
                            <Badge textTransform='capitalize' colorScheme='green' mb={2} fontSize='small'>{user?.role}</Badge>
                            <Text color='gray' fontSize='small'>{user?.email}</Text>
                        </Box>
                        <Button as={Link} to='/dashboard/logout' colorScheme='red' rounded={2} fontSize='small' size='sm'>
                            Logout
                        </Button>
                    </Stack>

                    <Box mt={10}>
                        <Heading mb={8} textTransform='capitalize' color='black' fontSize='larger'>Shortcuts</Heading>

                        <HStack color='blue' spacing={2} mb={4} fontSize='small' fontWeight='600'>
                            <BiPlusCircle />
                            <Text>Create New Post</Text>
                        </HStack>

                        <HStack color='blue' spacing={2} mb={4} fontSize='small' fontWeight='600'>
                            <BiGlasses />
                            <Text>View all my posts</Text>
                        </HStack>
                        
                        <HStack as={Link} to='/dashboard/logout' color='blue' spacing={2} mb={4} fontSize='small' fontWeight='600'>
                            <BiLogOut />
                            <Text>Logout</Text>
                        </HStack>
                    </Box>
                </Box>

                <Box>
                    <DashboardOverview />

                    <Flex justify='end' align='center' my={10} gap={5}>
                        <SearchInput />
                        <PlatformSelect value={postQuery.platform} onChange={(platform) => setPlatform(platform)} />
                        <NewPostModal />
                    </Flex>

                    <Box>
                        <Content title='My Posts'>
                            <PostsTable />
                        </Content>
                    </Box>
                </Box>
            </Grid>
        </>
     );
}
 
export default HomePage;