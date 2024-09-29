import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Conditional from './Conditional';
import Error from './Error';

import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Stack, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { PiQuestion } from 'react-icons/pi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { documentQuestionSchema, DocumentQuestionData } from '../utils/schema';
import { askQuestion, DocumentEnquiry } from '../services/documents';

import useDocumentQueryStore from '../store/documents';


const NewDocumentQuestionModal = () => {
    const [enquiries, setEnquiries] = useState<DocumentEnquiry[]>([]);
    const [error, setError] = useState('');

    const { documentQuery: { selectedDocument }} = useDocumentQueryStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { formState, register, reset, handleSubmit } = useForm<DocumentQuestionData>({
        resolver: zodResolver(documentQuestionSchema),
        mode: 'all'
    });

    const btnRef = React.useRef<HTMLButtonElement>(null);
  
    const handleUploadDocument = async ({ question }: DocumentQuestionData) => {
        try {
            const { data } = await askQuestion(question, selectedDocument);
            setEnquiries((prev) => [...prev, data]);
            
            toast.success('Response fetched successfully!');
            reset();
        } catch (exception) {
            if (axios.isAxiosError(exception)) setError(exception.response?.data.message);
            else setError((exception as Error).message);
        }
    };

    const handleCloseModal = () => {
        onClose();

        setError('');
        setEnquiries([]);
    };

    return (
      <>
        <Button ref={btnRef} colorScheme='blue' onClick={onOpen} fontSize='small' rounded={2} leftIcon={<PiQuestion />}>
          Ask Question
        </Button>

        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
            <form onSubmit={handleSubmit(handleUploadDocument)}>
                <DrawerOverlay />
                <DrawerContent bg='white'>
                    <DrawerCloseButton />
                    <DrawerHeader color='black' fontSize='large'>Ask a Question</DrawerHeader>
                    <DrawerBody>
                        <Error error={error} />

                        <Stack spacing={10}>
                            <FormControl isInvalid={!!formState.errors.question}>
                                <FormLabel color='black' fontSize='small'>Question:</FormLabel>
                                
                                <Textarea
                                    placeholder='What is your question about the document?' 
                                    borderColor='gray.200'
                                    fontSize='small'
                                    color='black'
                                    rounded={2}
                                    {...register('question')}
                                />

                                {formState.errors.question && <FormErrorMessage>{formState.errors.question.message}</FormErrorMessage>}
                            </FormControl>

                        </Stack>

                        <Conditional isVisible={enquiries.length > 0}>
                            <Stack spacing={3}>
                                {enquiries.map((enquiry) => (
                                    <Box key={enquiry.question}>
                                        <Box mt={4} bg='blue.100' className='border border-blue-300' rounded={2} p={4}>
                                            <Text color='black' fontSize='small'>{enquiry.question}</Text>
                                        </Box>
                                        <Box mt={4} bg='green.100' className='border border-green-300' rounded={2} p={4}>
                                            <Text color='black' fontSize='small'>{enquiry.response}</Text>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Conditional>
                    </DrawerBody>
                    <DrawerFooter>
                    <Button rounded={2} textTransform='uppercase'  fontSize='small' colorScheme='blue' type='submit' isLoading={formState.isSubmitting}>Ask Question</Button>
                    <Button ml={3} rounded={2} textTransform='uppercase'  fontSize='small' colorScheme='red' onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
      </>
    )
};

export default NewDocumentQuestionModal;