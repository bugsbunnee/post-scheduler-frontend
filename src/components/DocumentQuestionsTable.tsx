import React, { useMemo } from 'react';

import { Badge, Divider, Flex, HStack, Skeleton, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { paginate } from '../utils/lib';

import Conditional from './Conditional';
import EmptyText from './Empty';
import Error from './Error';
import ExpandableText from './ExpandableText';
import NewDocumentQuestionModal from './NewDocumentQuestionModal';
import PageSizeSelect from './PageSizeSelect';
import Pagination from './Pagination';

import useDocument from '../hooks/useDocument';
import useDocumentQueryStore from '../store/documents';

const DocumentQuestionsTable: React.FC = () => {
    const { documentQuery, setPageNumber, setPageSize } = useDocumentQueryStore();
    const { data, error, isFetching } = useDocument(documentQuery.selectedDocument);

    const paginatedEnquiries = useMemo(() => {
        let filteredEnquiries = data.enquiries;

        if (documentQuery.searchText) {
            filteredEnquiries = filteredEnquiries.filter((enquiry) => enquiry.question.toLowerCase().indexOf(documentQuery.searchText.toLowerCase()) !== -1);
        }

        return paginate(filteredEnquiries, documentQuery.pageNumber, documentQuery.pageSize);
    }, [data, documentQuery]);

    return ( 
       <>
            <TableContainer p={4}>
                <Flex justify='end' align='center' mb={4}>
                    <NewDocumentQuestionModal />
                </Flex>

                <Divider my={5} />

                <Error error={error ? error.message : ''} />

                <EmptyText isVisible={data.enquiries.length === 0} label='No questions asked yet...' />

                <Conditional isVisible={data.enquiries.length > 0}>
                    <Table size='lg'>
                        <Thead>
                        <Tr fontSize='small'>
                            <Th>FileName</Th>
                            <Th>Question</Th>
                            <Th>Response</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            <Conditional isVisible={isFetching}>
                                {[1, 2, 3, 4, 5].map((post) => (
                                    <Tr key={post}>
                                        <Td>
                                            <Skeleton className='w-full h-4' />
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
                                {paginatedEnquiries.map((enquiry) => (
                                    <Tr key={enquiry._id}>
                                        <Td> 
                                            <Badge fontSize='small' colorScheme='blue'>
                                                {data.fileName}
                                            </Badge>
                                        </Td>
                                        <Td className='max-w-20 text-wrap'>
                                            <ExpandableText>{enquiry.question}</ExpandableText>
                                        </Td>
                                        <Td className='max-w-20 text-wrap'>
                                            <ExpandableText>{enquiry.response}</ExpandableText>
                                        </Td>
                                    </Tr>
                                ))}
                            </Conditional>
                        </Tbody>
                    </Table>
                </Conditional>
            </TableContainer>
            
            <HStack mt={6} p={4} className='bg-gray-100 border-t border-gray-300'>
                <PageSizeSelect
                    value={documentQuery.pageSize}
                    onChange={(size) => setPageSize(size)}
                />

                <Spacer />
                
                <Pagination 
                    itemCount={data.enquiries.length} 
                    pageSize={documentQuery.pageSize} 
                    currentPage={documentQuery.pageNumber} 
                    onChangePage={(page) => setPageNumber(page)} 
                />
            </HStack>
       </>
    );
}
 
export default DocumentQuestionsTable;