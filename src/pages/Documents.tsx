import React, { useState }  from 'react';

import { Box, Button, Flex, Grid, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { BiGlasses, BiPlusCircle } from 'react-icons/bi';
import { ACTIVE_SECTIONS } from '../utils/constants';

import Content from '../components/Content';
import Elevation from '../components/Elevated';
import Error from '../components/Error';
import EmptyText from '../components/Empty';
import NewDocumentModal from '../components/NewDocumentModal';
import DocumentQuestionsTable from '../components/DocumentQuestionsTable';
import Select from '../components/Select';
import SearchInput from '../components/SearchInput';

import useDocuments from '../hooks/useDocuments';
import useDocumentQueryStore from '../store/documents';

const Documents: React.FC = () => {
    const [activeSection, setActiveSection] = useState('');

    const { documentQuery, setSelectedDocument, setSearchText } = useDocumentQueryStore();
    const { isFetching, data, error } = useDocuments();

    return ( 
        <>
            <HStack justify='space-between' align='center'>
                <Stack>
                    <Heading color='black'>Uploaded Documents</Heading>
                    <Text color='gray'>View documents you have uploaded</Text>
                </Stack>

                <Flex justify='end' align='center' my={10} gap={5}>
                    <SearchInput 
                        placeholder='Search Document Questions' 
                        onChangeText={(text) => setSearchText(text)} 
                    />

                    <Elevation 
                        isElevated={activeSection === ACTIVE_SECTIONS.VIEW_QUESTIONS}
                        onClearElevation={() => setActiveSection('')}
                    >
                        <Select 
                            isLoading={isFetching}
                            placeholder='Select Document'
                            options={data.map((option) => ({ id: option._id, name: option.fileName }))} 
                            value={documentQuery.selectedDocument} 
                            onChange={(documentId) => setSelectedDocument(documentId)} 
                        />
                    </Elevation>

                    <Elevation 
                        isElevated={activeSection === ACTIVE_SECTIONS.NEW_DOCUMENT}
                        onClearElevation={() => setActiveSection('')}
                    >
                        <NewDocumentModal />
                    </Elevation>
                </Flex>
            </HStack>


            <Grid  
                gap={20}
                templateAreas={{ base: `"main"`, lg: `"aside main"` }}
                templateColumns={{ base: '1fr', lg: `12.5rem 1fr` }} 
                mt={10}
            >
                <Box className='w-full'>
                    <Box>
                        <Heading mb={8} textTransform='capitalize' color='black' fontSize='larger'>Shortcuts</Heading>

                        <HStack color='blue' as={Button} variant='ghost' p={0} onClick={() => setActiveSection(ACTIVE_SECTIONS.NEW_DOCUMENT)} spacing={2} mb={4} fontSize='small' fontWeight='600'>
                            <BiPlusCircle />
                            <Text>Upload New Document</Text>
                        </HStack>

                        <HStack as={Button} variant='ghost' onClick={() => setActiveSection(ACTIVE_SECTIONS.VIEW_QUESTIONS)} p={0} color='blue' spacing={2} mb={4} fontSize='small' fontWeight='600'>
                            <BiGlasses />
                            <Text>View Document Questions</Text>
                        </HStack>
                    </Box>
                </Box>

                <Box>
                    <Error error={error ? error.message : ''} />

                    <Box>
                        <Elevation 
                            isElevated={activeSection === ACTIVE_SECTIONS.VIEW_QUESTIONS}
                            onClearElevation={() => setActiveSection('')}
                        >
                            <Content title={documentQuery.selectedDocument ? 'Enquiries on ' + documentQuery.selectedDocument : 'Document Questions'}>
                                {documentQuery.selectedDocument 
                                    ? <DocumentQuestionsTable /> 
                                    : <Box p={4}><EmptyText isVisible label='Select a document to view the questions...' /></Box>}
                                
                            </Content>
                        </Elevation>
                    </Box>
                </Box>
            </Grid>
        </>
     );
}
 
export default Documents;