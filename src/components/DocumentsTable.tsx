import React, { useMemo } from 'react';

import { Badge, Button, HStack, Skeleton, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { formatDate, paginate } from '../utils/lib';

import Conditional from './Conditional';
import DocumentHistory from './DocumentHistory';
import EmptyText from './Empty';
import Error from './Error';
import PageSizeSelect from './PageSizeSelect';
import Pagination from './Pagination';

import useDocuments from '../hooks/useDocuments';
import useDocumentQueryStore from '../store/documents';
import { BiDotsHorizontal } from 'react-icons/bi';

const DocumentsTable: React.FC = () => {
    const { documentQuery, setPageNumber, setPageSize, setSelectedDocument } = useDocumentQueryStore();
    const { data, error, isFetching } = useDocuments();

    const paginatedDocuments = useMemo(() => {
        let filteredDocuments = data;

        if (documentQuery.searchText) {
            filteredDocuments = filteredDocuments.filter((document) => document.name.toLowerCase().indexOf(documentQuery.searchText.toLowerCase()) !== -1);
        }

        return paginate(filteredDocuments, documentQuery.pageNumber, documentQuery.pageSize);
    }, [data, documentQuery]);

    return ( 
       <>
            <DocumentHistory />

            <TableContainer p={4}>
                <Error error={error ? error.message : ''} />

                <EmptyText isVisible={data.length === 0} label='No documents uploaded yet...' />

                <Table size='lg' fontSize='small' color='black'>
                    <Thead>
                    <Tr>
                        <Th fontSize='smaller'>Date Added</Th>
                        <Th fontSize='smaller'>Document Name</Th>
                        <Th fontSize='smaller'>Document Number</Th>
                        <Th fontSize='smaller'>Status</Th>
                        <Th fontSize='smaller'>More</Th>
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
                            {paginatedDocuments.map((data) => (
                                <Tr key={data._id}>
                                    <Td className='max-w-20 text-wrap'>
                                        {formatDate(data.createdAt, 'DD MMM, YYYY')}
                                    </Td>
                                    <Td> 
                                        {data.name}
                                    </Td>
                                    <Td className='max-w-20 text-wrap'>
                                        {data.documentNumber}
                                    </Td>
                                    <Td className='max-w-20 text-wrap'>
                                        <Badge fontSize='smaller' colorScheme='green'>
                                            Analysed
                                        </Badge>
                                    </Td>
                                    <Td className='text-wrap'>
                                        <Button bg='#D6E4FF' color='black' size='sm' fontWeight='400' fontSize='smaller' rounded={2} onClick={() => setSelectedDocument(data._id)}>
                                            <BiDotsHorizontal />
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Conditional>
                    </Tbody>
                </Table>
            </TableContainer>
            
            <HStack mt={6} p={4} className='bg-gray-100 border-t border-gray-200'>
                <PageSizeSelect
                    value={documentQuery.pageSize}
                    onChange={(size) => setPageSize(size)}
                />

                <Spacer />
                
                <Pagination 
                    itemCount={data.length} 
                    pageSize={documentQuery.pageSize} 
                    currentPage={documentQuery.pageNumber} 
                    onChangePage={(page) => setPageNumber(page)} 
                />
            </HStack>
       </>
    );
}
 
export default DocumentsTable;