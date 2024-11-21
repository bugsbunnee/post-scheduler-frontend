import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { Badge, Button, HStack, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Skeleton, Spacer, Table, Tag, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { BiInfoCircle } from 'react-icons/bi';

import { paginate } from '../utils/lib';
import { DocumentType } from '../services/documents';

import useDocument from '../hooks/useDocument';
import useDocumentQueryStore from '../store/documents';

import Conditional from './Conditional';
import Error from './Error';
import PageSizeSelect from './PageSizeSelect';
import Pagination from './Pagination';

const DocumentHistory: React.FC = () => {
    const [currentPage, setCurrentpage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { documentQuery, setSelectedDocumentToView: setSelectedDocument } = useDocumentQueryStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, isFetching, error } = useDocument();

    const handleClose = useCallback(() => {
        onClose();
        setSelectedDocument('');
    }, [onClose, setSelectedDocument]);

    const paginated = useMemo(() => {
        const sorted = _.orderBy(data.history, ['version'], 'desc');
        return paginate(sorted, currentPage, pageSize);
    }, [data.history, currentPage, pageSize]);

    useEffect(() => {
        if (documentQuery.selectedDocumentToView) onOpen();
    }, [documentQuery.selectedDocumentToView, onOpen]);

    if (!documentQuery.selectedDocumentToView) return null;
    
    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />

                <ModalContent bg='white' color='black' minW='50%'>
                    <ModalHeader fontSize='medium' p={4}>
                        <HStack className='bg-gray-50 border border-gray-100 p-4'>
                            <BiInfoCircle color='red' />
                            <Text>Showing Version History for</Text>
                            <Text color='red.400'>{data.name}</Text>
                        </HStack>
                    </ModalHeader>
                
                    <ModalBody>
                        <SimpleGrid columns={5} mb={5} gap={3} className='w-full'>
                            <Conditional isVisible={!isFetching}>
                                {data.tags.map((tag) => (
                                    <Tag key={tag} size='sm' borderWidth={1} borderColor='gray.200' color='gray.600' p={2}>
                                        {tag}
                                    </Tag>
                                ))}
                            </Conditional>
                            
                            <Conditional isVisible={isFetching}>
                                {[1, 2, 3, 4, 5].map((key) => (
                                    <Skeleton key={key} className='w-24 h-5 bg-gray-200 animation-pulse' />
                                ))}
                            </Conditional>
                        </SimpleGrid>

                        <Table size='lg' fontSize='small' color='black'>
                            <Thead>
                                <Tr>
                                    <Th fontSize='smaller'>Version</Th>
                                    <Th fontSize='smaller'>Type</Th>
                                    <Th fontSize='smaller'>URL</Th>
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
                                    {paginated.map((data) => (
                                        <Tr key={data._id}>
                                            <Td>
                                                {data.version}
                                            </Td>
                                            <Td> 
                                                <Badge fontSize='smaller' textTransform='uppercase' colorScheme={data.type === DocumentType.PDF ? 'orange' : 'blue'}>
                                                    {data.type}
                                                </Badge>
                                            </Td>
                                            <Td className='max-w-20 text-wrap'>
                                                <Link href={data.url} target='_blank' rel='noopenner noreferrer'>
                                                    <Badge fontSize='xx-small' bg='#D6E4FF' color='black'>
                                                        View
                                                    </Badge>
                                                </Link>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Conditional>
                            </Tbody>
                        </Table>

                        <Error error={error ? error.message : ''} />

                        <HStack mt={6} p={4} className='bg-gray-50 border border-gray-100 rounded-sm'>
                            <PageSizeSelect
                                value={documentQuery.pageSize}
                                onChange={(size) => setPageSize(size)}
                            />

                            <Spacer />
                            
                            <Pagination 
                                itemCount={data.history.length} 
                                pageSize={pageSize} 
                                currentPage={currentPage} 
                                onChangePage={(page) => setCurrentpage(page)} 
                            />
                        </HStack>
                    </ModalBody>
        
                    <ModalFooter>
                        <Button colorScheme='red' rounded={2} fontSize='smaller' textTransform='uppercase' size='sm' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default DocumentHistory;