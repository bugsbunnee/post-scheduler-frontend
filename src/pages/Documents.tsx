import React, { useState }  from 'react';

import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Grid, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { BiLogOut, BiPlusCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { ACTIVE_SECTIONS } from '../utils/constants';

import Content from '../components/Content';
import DocumentsTable from '../components/DocumentsTable';
import DocumentsOverview from '../components/DocumentsOverview';
import Elevation from '../components/Elevated';
import NewDocumentModal from '../components/NewDocumentModal';
import SearchInput from '../components/SearchInput';

import useDocumentQueryStore from '../store/documents';

const Documents: React.FC = () => {
    const [activeSection, setActiveSection] = useState('');

    const { setSearchText } = useDocumentQueryStore();

    return ( 
        <>
            <HStack w="100%" justify='space-between' align='center'>
                <Stack>
                    <Heading color='black'>My Documents</Heading>

                    <Breadcrumb fontSize='small' color='gray.500'>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem color='blackAlpha.700' isCurrentPage>
                            <BreadcrumbLink href='#'>Documents</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Stack>

                <Flex justify='end' align='center' my={10} gap={5}>
                    <SearchInput 
                        placeholder='Search Document' 
                        onChangeText={(text) => setSearchText(text)} 
                    />

                    <Elevation 
                        isElevated={activeSection === ACTIVE_SECTIONS.NEW_DOCUMENT}
                        onClearElevation={() => setActiveSection('')}
                    >
                        <NewDocumentModal />
                    </Elevation>
                </Flex>
            </HStack>

            <Grid
                gap={10} 
                templateAreas={{ base: `"main"`, lg: `"aside main"` }}
                templateColumns={{ base: '1fr', lg: '12.5rem minmax(0, 1fr)' }}
                mt={10}
            >
                <Box>
                    <Box>
                        <Heading mb={8} textTransform='capitalize' color='black' fontSize='larger'>Shortcuts</Heading>

                        <HStack color='blue' as={Button} variant='ghost' p={0} onClick={() => setActiveSection(ACTIVE_SECTIONS.NEW_DOCUMENT)} spacing={2} mb={4} fontSize='small' fontWeight='600'>
                            <BiPlusCircle />
                            <Text>Upload New Document</Text>
                        </HStack>

                        <HStack as={Link} to='/dashboard/logout' onClick={() => setActiveSection(ACTIVE_SECTIONS.VIEW_QUESTIONS)} p={0} color='blue' spacing={2} mb={4} fontSize='small' fontWeight='600'>
                            <BiLogOut />
                            <Text>Logout</Text>
                        </HStack>
                    </Box>
                </Box>

                <Box className='w-full'>
                    <DocumentsOverview />
                    
                    <Box mt={12}>
                        <Elevation 
                            isElevated={activeSection === ACTIVE_SECTIONS.VIEW_QUESTIONS}
                            onClearElevation={() => setActiveSection('')}
                        >
                            <Content title='All Uploaded Documents'>
                                <DocumentsTable />
                            </Content>
                        </Elevation>
                    </Box>
                </Box>
            </Grid>
        </>
     );
}
 
export default Documents;