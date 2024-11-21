import React from 'react';
import _ from 'lodash';

import { Box, Flex, SimpleGrid, Skeleton, Stack, Text } from '@chakra-ui/react';
import { BiSolidFileArchive } from 'react-icons/bi';
import { MdComputer, MdQueue, MdTag } from 'react-icons/md';

import Conditional from './Conditional';
import Error from './Error';

import useDocumentsOverview from '../hooks/useDocumentOverview';

const DocumentsOverview: React.FC = () => {
    const { data, isFetching, error } = useDocumentsOverview();

    const columns = 4;

    const rows = [
        {
            Icon: BiSolidFileArchive,
            label: 'Total Documents',
            value: data.totalDocuments,
        },
        {
            Icon: MdComputer,
            label: 'Analysed Documents',
            value: data.analysedDocuments,
        },
        {
            Icon: MdQueue,
            label: 'Pending Documents',
            value: data.notAnalysedDocuments,
        },
        {
            Icon: MdTag,
            label: 'Associated Tags',
            value: data.topTags.length,
        }
    ];

    return ( 
        <>
            <Error error={error ? error.message : ''} />

            <SimpleGrid columns={columns} spacing={10}>
                <Conditional isVisible={isFetching}>
                    {_.range(1, columns + 1).map((key) => (
                        <Box key={key} bg='white' className='border border-gray-200 rounded-lg min-h-44 rounded-md hover:shadow-md hover:border hover:border-blue-200 hover:-translate-y-6 transition-all duration-300 ease' p={5}>
                            <Flex justify='end' align='end'>
                                <Skeleton width={15} height={15} />
                            </Flex>
                        
                            <Stack align='center' justify='center' spacing={5}>
                                <Text fontSize='xxx-large' color='blue' fontWeight='900'><Skeleton>1</Skeleton></Text>
                                <Text color='black' fontWeight='600'><Skeleton>Total documents</Skeleton></Text>
                            </Stack>
                        </Box>
                    ))}
                </Conditional>

                <Conditional isVisible={!isFetching}>
                    {rows.map((row) => (
                        <Box bg='white' key={row.label} className='border border-gray-200 rounded-sm hover:shadow-md hover:border hover:border-blue-200 hover:-translate-y-6 transition-all duration-300 ease' p={5}>
                            <Flex justify='end' align='end'>
                                <row.Icon color='gray' size={15} />
                            </Flex>
                        
                            <Stack align='center' justify='center' spacing={2} mt={4}>
                                <Text fontSize='xxx-large' className='text-blue-700' fontWeight='400'>{row.value}</Text>
                                <Text color='black' className='tracking-wider' textTransform='uppercase' fontSize='small' fontWeight='600'>{row.label}</Text>
                            </Stack>
                        </Box>
                    ))}
                </Conditional>
            </SimpleGrid>
        </>
     );
}
 
export default DocumentsOverview;