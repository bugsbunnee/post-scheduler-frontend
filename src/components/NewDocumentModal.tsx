import React from 'react';
import toast from 'react-hot-toast';

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, Stack, useDisclosure } from '@chakra-ui/react'
import { PiPlus } from 'react-icons/pi';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiFile } from 'react-icons/bi';

import { documentSchema, DocumentData } from '../utils/schema';
import { uploadDocument } from '../services/documents';

import ImageUpload from './ImageUpload';

const NewDocumentModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { control, formState, register, handleSubmit, setValue } = useForm<DocumentData>({
        resolver: zodResolver(documentSchema),
        mode: 'all'
    });

    const btnRef = React.useRef<HTMLButtonElement>(null);
  
    const handleUploadDocument = async (data: DocumentData) => {
        await uploadDocument(data)
        
        toast.success('Document created successfully!');
        
        onClose();
    };

    return (
      <>
        <Button ref={btnRef} colorScheme='green' onClick={onOpen} fontSize='small' rounded={2} leftIcon={<PiPlus />}>
          Upload Document
        </Button>

        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
            <form onSubmit={handleSubmit(handleUploadDocument)}>
                <DrawerOverlay />
                <DrawerContent bg='white'>
                    <DrawerCloseButton />
                    <DrawerHeader color='black' fontSize='large'>Upload a new document</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={10}>
                            <Controller
                                name='url'
                                control={control}
                                render={({ field }) => (
                                    <FormControl isInvalid={!!formState.errors.url}>
                                        <FormLabel color='black' fontSize='small'>Document:</FormLabel>
                                        
                                        <ImageUpload 
                                            url='' 
                                            onUploadImage={(info) => {
                                                field.onChange(info.secure_url);
                                                setValue('fileType', info.format as 'pdf');
                                            }}
                                        />

                                        {formState.errors.url && <FormErrorMessage>{formState.errors.url.message}</FormErrorMessage>}
                                        {formState.errors.fileType && <FormErrorMessage>{formState.errors.fileType.message}</FormErrorMessage>}
                                    </FormControl>
                                )}
                            />

                            <FormControl mt={7} isInvalid={!!formState.errors.fileName}>
                                <FormLabel color='black' fontSize='medium'>File Name:</FormLabel>
                                <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                    <InputLeftElement pointerEvents='none'>
                                        <BiFile color='gray' />
                                    </InputLeftElement>
                                    <Input placeholder='What would you like to save this file as?' _placeholder={{ fontSize: 'sm' }} color='black' fontSize='small' {...register('fileName')} />
                                </InputGroup>

                                {formState.errors.fileName && <FormErrorMessage colorScheme='red'>{formState.errors.fileName.message}</FormErrorMessage> }
                            </FormControl>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                    <Button rounded={2} textTransform='uppercase'  fontSize='small' colorScheme='blue' type='submit' isLoading={formState.isSubmitting}>Upload Document</Button>
                    <Button ml={3} rounded={2} textTransform='uppercase'  fontSize='small' colorScheme='red' onClick={onClose}>
                        Cancel
                    </Button>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
      </>
    )
};

export default NewDocumentModal;