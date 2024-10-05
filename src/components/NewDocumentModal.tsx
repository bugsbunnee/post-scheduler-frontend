import React from 'react';
import toast from 'react-hot-toast';

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, Stack, useDisclosure } from '@chakra-ui/react'
import { PiPlus } from 'react-icons/pi';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiFile } from 'react-icons/bi';

import { documentSchema, DocumentData } from '../utils/schema';
import { uploadDocument } from '../services/documents';
import { ENQUIRY_TAGS } from '../utils/constants';
import { MultiSelectOption } from '../utils/models';

import ImageUpload from './ImageUpload';
import MultiSelect from './MultiSelect';

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
        <Button ref={btnRef} bg='#D6E4FF' color='black' onClick={onOpen} fontSize='small' rounded={2} leftIcon={<PiPlus />}>
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
                                                setValue('type', info.format as 'pdf');
                                            }}
                                        />

                                        {formState.errors.url && <FormErrorMessage>{formState.errors.url.message}</FormErrorMessage>}
                                        {formState.errors.type && <FormErrorMessage>{formState.errors.type.message}</FormErrorMessage>}
                                    </FormControl>
                                )}
                            />

                            <FormControl isInvalid={!!formState.errors.name}>
                                <FormLabel color='black' fontSize='medium'>File Name:</FormLabel>
                                <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                    <InputLeftElement pointerEvents='none'>
                                        <BiFile color='gray' />
                                    </InputLeftElement>
                                    <Input placeholder='What would you like to save this file as?' _placeholder={{ fontSize: 'sm' }} color='black' fontSize='small' {...register('name')} />
                                </InputGroup>

                                {formState.errors.name && <FormErrorMessage colorScheme='red'>{formState.errors.name.message}</FormErrorMessage> }
                            </FormControl>
                           
                            <FormControl isInvalid={!!formState.errors.documentNumber}>
                                <FormLabel color='black' fontSize='medium'>Document Number:</FormLabel>
                                <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                    <InputLeftElement pointerEvents='none'>
                                        <BiFile color='gray' />
                                    </InputLeftElement>
                                    <Input placeholder='What would you like to save this file as?' _placeholder={{ fontSize: 'sm' }} color='black' fontSize='small' {...register('documentNumber')} />
                                </InputGroup>

                                {formState.errors.documentNumber && <FormErrorMessage colorScheme='red'>{formState.errors.documentNumber.message}</FormErrorMessage> }
                            </FormControl>

                            <Controller
                                name='tags'
                                control={control}
                                render={({ field }) => {
                                    console.log(field.value)
                                    return (
                                        <FormControl isInvalid={!!formState.errors.tags}>
                                            <FormLabel color='black' fontSize='small'>Tags:</FormLabel>
                                            
                                            <MultiSelect
                                                options={ENQUIRY_TAGS.map((tag) => ({ label: tag, value: tag }))}
                                                value={field.value.map((text) => ({ label: text, value: text }))}
                                                placeholder='Choose an item'
                                                onChange={(options) => field.onChange(options.map((option) => (option as MultiSelectOption).value))}
                                            />
                                           
                                            {formState.errors.tags && <FormErrorMessage>{formState.errors.tags.message}</FormErrorMessage>}
                                        </FormControl>
                                    )
                                }}
                            />
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