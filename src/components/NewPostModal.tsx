import React from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftElement, Stack, Switch, Textarea, useDisclosure } from '@chakra-ui/react'
import { PiPlus } from 'react-icons/pi';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiCalendar } from 'react-icons/bi';

import { PostData, postSchema } from '../utils/schema';
import { createPost } from '../services/posts';
import { formatDate, getCurrentDateString } from '../utils/lib';

import ImageUpload from './ImageUpload';
import PlatformSelect from './PlatformSelect';

import usePostQueryStore from '../store/posts';

const NewPostModal = () => {
    const { setPageSize } = usePostQueryStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { control, register, formState, handleSubmit } = useForm<PostData>({
        resolver: zodResolver(postSchema),
        mode: 'all'
    });

    const btnRef = React.useRef<HTMLButtonElement>(null);
  
    const handleCreatePost = async (data: PostData) => {
        await createPost(data);
        
        toast.success('Post created successfully!');
        
        onClose();

        // do this to trigger refetch
        setPageSize(11);
    };

    return (
      <>
        <Button ref={btnRef} colorScheme='green' onClick={onOpen} fontSize='small' rounded={2} leftIcon={<PiPlus />}>
          Create Post
        </Button>

        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
            <form onSubmit={handleSubmit(handleCreatePost)}>
                <DrawerOverlay />
                <DrawerContent bg='white'>
                    <DrawerCloseButton />
                    <DrawerHeader color='black' fontSize='large'>Create a new post</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={10}>
                            <Controller
                                name='media'
                                control={control}
                                render={({ field }) => (
                                    <FormControl isInvalid={!!formState.errors.media}>
                                        <FormLabel color='black' fontSize='small'>Picture:</FormLabel>
                                        
                                        <ImageUpload url={field.value} onUploadImage={(image) => field.onChange(image)} />

                                        {formState.errors.media && <FormErrorMessage>{formState.errors.media.message}</FormErrorMessage>}
                                    </FormControl>
                                )}
                            />

                            <Controller
                                name='platform'
                                control={control}
                                render={({ field }) => (
                                    <FormControl isInvalid={!!formState.errors.platform}>
                                        <FormLabel color='black' fontSize='small'>Platform:</FormLabel>
                                        
                                        <PlatformSelect value={field.value} onChange={(platform) => field.onChange(platform)} />

                                        {formState.errors.platform && <FormErrorMessage>{formState.errors.platform.message as string}</FormErrorMessage>}
                                    </FormControl>
                                )}
                            />
                            
                            <FormControl isInvalid={!!formState.errors.content}>
                                <FormLabel color='black' fontSize='small'>Content:</FormLabel>
                                
                                <Textarea 
                                    placeholder='What is your post about?' 
                                    borderColor='gray.200'
                                    fontSize='small'
                                    color='black'
                                    rounded={2}
                                    {...register('content')}
                                />

                                {formState.errors.content && <FormErrorMessage>{formState.errors.content.message}</FormErrorMessage>}
                            </FormControl>

                            <Controller
                                name='scheduleTime'
                                control={control}
                                render={({ field }) => (
                                    <FormControl isInvalid={!!formState.errors.scheduleTime}>
                                        <FormLabel color='black' fontSize='small'>Schedule Time:</FormLabel>
                                        
                                        <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                            <InputLeftElement pointerEvents='none'>
                                                <BiCalendar color='gray' />
                                            </InputLeftElement>
                                            <Input
                                                {...register('scheduleTime')}
                                                placeholder='Select schedule date and time' 
                                                type='datetime-local'
                                                color='black'
                                                fontSize='small'
                                                rounded={2}
                                                value={formatDate(field.value, 'YYYY-MM-DDTHH:mm')}
                                                onChange={(event) => field.onChange(dayjs(event.target.value).toISOString())}
                                                min={getCurrentDateString()}
                                                _placeholder={{ fontSize: 'sm' }} 
                                                _hover={{ borderColor: 'blue.100' }} 
                                            />
                                        </InputGroup>

                                        {formState.errors.scheduleTime && <FormErrorMessage>{formState.errors.scheduleTime.message}</FormErrorMessage>}
                                    </FormControl>
                                )}
                            />

                            <FormControl isInvalid={!!formState.errors.useAI}>
                                <HStack align='center'>
                                    <FormLabel color='black' fontSize='small' htmlFor='use-ai' mb='0'>
                                        Generate content with AI
                                    </FormLabel>
                                    <Switch {...register('useAI')} id='use-ai' />
                                </HStack>

                                {formState.errors.useAI && <FormErrorMessage>{formState.errors.useAI.message}</FormErrorMessage>}
                            </FormControl>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                    <Button rounded={2} textTransform='uppercase'  fontSize='small' colorScheme='blue' type='submit' isLoading={formState.isSubmitting}>Create Post</Button>
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

export default NewPostModal;