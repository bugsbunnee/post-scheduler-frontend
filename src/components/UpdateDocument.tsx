import React, { useCallback } from 'react';
import toast from 'react-hot-toast';

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, Stack } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UpdatedDocumentData, updateDocumentSchema } from '../utils/schema';
import { DocumentType, updateDocument } from '../services/documents';

import ImageUpload from './ImageUpload';
import useDocumentQueryStore from '../store/documents';

const UpdateDocumentModal: React.FC = () => {
    const { documentQuery, setSelectedDocumentToUpdate } = useDocumentQueryStore();
    const { control, formState, reset, handleSubmit, setValue } = useForm<UpdatedDocumentData>({
        resolver: zodResolver(updateDocumentSchema),
        mode: 'all'
    });

    const handleClose = useCallback(() => {
        setSelectedDocumentToUpdate('');
        reset();
    }, [setSelectedDocumentToUpdate, reset]);

    const handleUpdateDocument = async (data: UpdatedDocumentData) => {
        await updateDocument(documentQuery.selectedDocumentToUpdate, data)
        
        toast.success('Document updated successfully!');
        
        handleClose();
    };

    return (
      <>
        <Drawer isOpen={!!documentQuery.selectedDocumentToUpdate} placement='right' onClose={handleClose}>
            <form onSubmit={handleSubmit(handleUpdateDocument)}>
                <DrawerOverlay />
                <DrawerContent bg='white'>
                    <DrawerCloseButton />
                    <DrawerHeader color='black' fontSize='large'>Update a document</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={10}>
                            <Controller
                                name='url'
                                control={control}
                                render={({ field }) => (
                                    <FormControl isInvalid={!!formState.errors.url}>
                                        <FormLabel color='black' fontSize='small'>Document:</FormLabel>
                                        
                                        <ImageUpload 
                                            onUploadImage={(info) => {
                                                field.onChange(info.secure_url);
                                                setValue('type', info.format ? info.format : DocumentType.TXT);
                                            }}
                                        />

                                        {formState.errors.url && <FormErrorMessage>{formState.errors.url.message}</FormErrorMessage>}
                                        {formState.errors.type && <FormErrorMessage>{formState.errors.type.message}</FormErrorMessage>}
                                    </FormControl>
                                )}
                            />
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button rounded={2} textTransform='uppercase'  fontSize='small' colorScheme='blue' type='submit' isLoading={formState.isSubmitting}>
                            Update Document
                        </Button>

                        <Button ml={3} rounded={2} textTransform='uppercase'  fontSize='small' colorScheme='red' onClick={handleClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
      </>
    )
};

export default UpdateDocumentModal;