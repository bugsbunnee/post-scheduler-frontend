import React from 'react';
import _ from 'lodash';

import { Box, Flex, SimpleGrid, Skeleton, Stack, Text } from '@chakra-ui/react';
import { BiGlasses, BiLike, BiNews, BiShare } from 'react-icons/bi';

import Conditional from './Conditional';
import Error from './Error';

import useDashboardOverview from '../hooks/useOverview';

const DashboardOverview: React.FC = () => {
    const { data, isFetching, error } = useDashboardOverview();

    const columns = 4;

    return ( 
        <>
            <Error error={error ? error.message : ''} />

            <SimpleGrid columns={columns} spacing={10}>
                <Conditional isVisible={isFetching}>
                    {_.range(1, columns + 1).map((key) => (
                        <Box bg='white' className='border border-gray-300 rounded-sm min-h-52' p={5} key={key}>
                            <Flex justify='end' align='end'>
                                <Skeleton width={15} height={15} />
                            </Flex>
                        
                            <Stack align='center' justify='center' spacing={5}>
                                <Text fontSize='xxx-large' color='blue' fontWeight='900'><Skeleton>1</Skeleton></Text>
                                <Text color='black' fontWeight='600'><Skeleton>Total Posts</Skeleton></Text>
                            </Stack>
                        </Box>
                    ))}
                </Conditional>

                <Conditional isVisible={!isFetching}>
                    <Box bg='white' className='border border-gray-300 rounded-sm min-h-52' p={5}>
                        <Flex justify='end' align='end'>
                            <BiNews color='gray' size={25} />
                        </Flex>
                    
                        <Stack align='center' justify='center' spacing={5} mt={4}>
                            <Text fontSize='xxx-large' color='blue.600' fontWeight='900'>{data.overview.totalPosts}</Text>
                            <Text color='black' fontWeight='600'>Total Posts</Text>
                        </Stack>
                    </Box>

                    <Box bg='white' className='border border-gray-300 rounded-sm min-h-52' p={5}>
                        <Flex justify='end' align='end'>
                            <BiLike color='gray' size={25} />
                        </Flex>
                    
                        <Stack align='center' justify='center' spacing={5} mt={4}>
                            <Text fontSize='xxx-large' color='blue.600' fontWeight='900'>{data.overview.totalLikes}</Text>
                            <Text color='black' fontWeight='600'>Total Likes</Text>
                        </Stack>
                    </Box>
                    
                    <Box bg='white' className='border border-gray-300 rounded-sm min-h-52' p={5}>
                        <Flex justify='end' align='end'>
                            <BiGlasses color='gray' size={25} />
                        </Flex>
                    
                        <Stack align='center' justify='center' spacing={5} mt={4}>
                            <Text fontSize='xxx-large' color='blue.600' fontWeight='900'>{data.overview.totalViews}</Text>
                            <Text color='black' fontWeight='600'>Total Views</Text>
                        </Stack>
                    </Box>
                    
                    <Box bg='white' className='border border-gray-300 rounded-sm min-h-52' p={5}>
                        <Flex justify='end' align='end'>
                            <BiShare color='gray' size={25} />
                        </Flex>
                    
                        <Stack align='center' justify='center' spacing={5} mt={4}>
                            <Text fontSize='xxx-large' color='blue.600' fontWeight='900'>{data.overview.totalShares}</Text>
                            <Text color='black' fontWeight='600'>Total Shares</Text>
                        </Stack>
                    </Box>
                </Conditional>
            </SimpleGrid>
        </>
     );
}
 
export default DashboardOverview;