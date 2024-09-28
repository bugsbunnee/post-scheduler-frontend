import React from 'react';

import { HStack, Image, Skeleton, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { formatDate } from '../utils/lib';

import Conditional from './Conditional';
import Error from './Error';
import ExpandableText from './ExpandableText';
import PlatformIcon from './PlatformIcon';
import PostStatusBadge from './PostStatusBadge';
import PageSizeSelect from './PageSizeSelect';
import Pagination from './Pagination';

import usePosts from '../hooks/usePosts';
import usePostQueryStore from '../store/posts';
import EmptyText from './Empty';

const PostsTable: React.FC = () => {
    const { data, error, isFetching } = usePosts();
    const { setPageNumber } = usePostQueryStore();

    return ( 
       <>
            <TableContainer p={4}>
                <Error error={error ? error.message : ''} />

                <EmptyText isVisible={data.posts.length === 0} label='No posts available to show...' />

                <Conditional isVisible={data.posts.length > 0}>
                    <Table size='lg'>
                        <Thead>
                        <Tr fontSize='small'>
                            <Th>Media</Th>
                            <Th>overview</Th>
                            <Th>Status</Th>
                            <Th>Platform</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            <Conditional isVisible={isFetching}>
                                {[1, 2, 3, 4, 5].map((post) => (
                                    <Tr key={post}>
                                        <Td> 
                                            <Skeleton
                                                boxSize='5rem'
                                                objectFit='cover'
                                                rounded={5}
                                            />
                                        </Td>
                                        <Td>
                                            <Stack>
                                                <Skeleton className='w-full h-4' />
                                                <Skeleton className='w-full h-4' />
                                            </Stack>
                                        </Td>
                                        <Td>
                                            <Skeleton className='w-full h-4' />
                                        </Td>
                                        <Td>
                                            <Skeleton className='w-full h-4' />
                                        </Td>
                                    </Tr>
                                ))}
                            </Conditional>

                            <Conditional isVisible={!isFetching}>
                                {data.posts.map((post) => (
                                    <Tr key={post._id}>
                                        <Td> 
                                            <Image
                                                boxSize='5rem'
                                                objectFit='cover'
                                                rounded={5}
                                                src={post.media}
                                                alt={post.content}
                                            />
                                        </Td>
                                        <Td className='max-w-20 text-wrap'>
                                            <Stack>
                                                <ExpandableText>{post.content}</ExpandableText>
                                                <Text color='gray' fontSize='smaller'>Sechuled for {formatDate(post.scheduleTime, 'MMMM DD, YYYY hh:mm:ss a')}</Text>
                                                {/* <Box className='max-w-fit'>
                                                    <PostEngagement shares={0} likes={0} views={0} />
                                                </Box> */}
                                            </Stack>
                                        </Td>
                                        <Td>
                                            <PostStatusBadge status={post.status} />
                                        </Td>
                                        <Td>
                                            <PlatformIcon platform={post.platform} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Conditional>
                        </Tbody>
                    </Table>
                </Conditional>
            </TableContainer>
            
            <HStack mt={6} p={4} className='bg-gray-100 border-t border-gray-300'>
                <PageSizeSelect />
                <Spacer />
                <Pagination 
                    itemCount={data.pagination.total} 
                    pageSize={data.pagination.limit} 
                    currentPage={data.pagination.currentPage} 
                    onChangePage={(page) => setPageNumber(page)} 
                />
            </HStack>
       </>
    );
}
 
export default PostsTable;