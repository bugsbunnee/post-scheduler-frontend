import React, { useCallback, useState } from 'react';

import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement, Link as ChakraLink, Stack, Text, InputRightElement, IconButton } from '@chakra-ui/react';
import { PiEye, PiEyeClosed, PiPhone } from 'react-icons/pi';
import { BiLock, BiSolidUserAccount } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { RegisterData, registerSchema } from '../utils/schema';
import { register as createUser } from '../services/auth';

import useAuthStore from '../store/auth';

const Register: React.FC = () => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const { loginUser } = useAuthStore();
    const { register, formState, handleSubmit } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        mode: 'all'
    });

    const onRegister = async (data: RegisterData) => {
        const token = await createUser(data);
        if (!token) return;

        loginUser(token);

        window.location.href = '/dashboard';
    };

    const handlePasswordToggle = useCallback(() => {
        setPasswordVisible((previous) => !previous);
    }, []);

    return ( 
        <Flex className='p-4 w-dvw h-dvh bg-gray-100' justify='center' align='center'>
            <Box className='bg-white rounded-md border border-gray-300 max-w-lg w-full'>
                <form id='login-form' className='p-8' onSubmit={handleSubmit(onRegister)}>
                    <Heading color='black'>Create a New Account</Heading>

                    <Stack spacing={4}>
                        <Flex gap={4}>
                            <FormControl mt={7} isInvalid={!!formState.errors.firstName}>
                                <FormLabel color='black' fontSize='medium'>First Name:</FormLabel>
                                <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                    <InputLeftElement pointerEvents='none'>
                                        <BiSolidUserAccount color='gray' />
                                    </InputLeftElement>
                                    <Input placeholder='Enter First Name' _placeholder={{ fontSize: 'sm' }} color='black' fontSize='small' {...register('firstName')} />
                                </InputGroup>

                                {formState.errors.firstName && <FormErrorMessage colorScheme='red'>{formState.errors.firstName.message}</FormErrorMessage> }
                            </FormControl>
                        
                            <FormControl mt={7} isInvalid={!!formState.errors.lastName}>
                                <FormLabel color='black' fontSize='medium'>Last Name:</FormLabel>
                                <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                    <InputLeftElement pointerEvents='none'>
                                        <BiSolidUserAccount color='gray' />
                                    </InputLeftElement>
                                    <Input placeholder='Enter Last Name' _placeholder={{ fontSize: 'sm' }} color='black' fontSize='small' {...register('lastName')} />
                                </InputGroup>

                                {formState.errors.lastName && <FormErrorMessage colorScheme='red'>{formState.errors.lastName.message}</FormErrorMessage> }
                            </FormControl>
                        </Flex>

                        <FormControl mt={7} isInvalid={!!formState.errors.email}>
                            <FormLabel color='black' fontSize='medium'>Email address:</FormLabel>
                            <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                <InputLeftElement pointerEvents='none'>
                                    <PiPhone color='gray' />
                                </InputLeftElement>
                                <Input placeholder='Enter Email Address' _placeholder={{ fontSize: 'sm' }} color='black' fontSize='small' {...register('email')} />
                            </InputGroup>

                            {formState.errors.email 
                                ? <FormErrorMessage colorScheme='red'>{formState.errors.email.message}</FormErrorMessage> 
                                : <FormHelperText color='gray.400'>We'll never share your email.</FormHelperText>}
                        </FormControl>
                        
                        <Flex gap={4}>
                            <FormControl isInvalid={!!formState.errors.password}>
                                <FormLabel color='black' fontSize='medium'>Password:</FormLabel>
                                <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                    <InputLeftElement pointerEvents='none'>
                                        <BiLock color='gray' />
                                    </InputLeftElement>
                                    <Input 
                                        {...register('password')}
                                        placeholder='Enter Password' 
                                        color='black' 
                                        fontSize='small'  
                                        type={isPasswordVisible ? 'text' : 'password'} 
                                        _placeholder={{ fontSize: 'sm' }} 
                                        _hover={{ borderColor: 'blue.100' }} 
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <IconButton 
                                            colorScheme='gray'
                                            aria-label='Password Display' 
                                            onClick={handlePasswordToggle}
                                            size='md'
                                            icon={isPasswordVisible ? <PiEyeClosed color='gray' /> : <PiEye color='gray' />}
                                        />
                                    </InputRightElement>
                                </InputGroup>

                                {formState.errors.password && <FormErrorMessage>{formState.errors.password.message}</FormErrorMessage>}
                            </FormControl>
                            
                            <FormControl isInvalid={!!formState.errors.confirm}>
                                <FormLabel color='black' fontSize='medium'>Confirm Password:</FormLabel>
                                <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                    <InputLeftElement pointerEvents='none'>
                                        <BiLock color='gray' />
                                    </InputLeftElement>
                                    <Input 
                                        {...register('confirm')}
                                        placeholder='Enter Password' 
                                        color='black' 
                                        fontSize='small'  
                                        type={isPasswordVisible ? 'text' : 'password'} 
                                        _placeholder={{ fontSize: 'sm' }} 
                                        _hover={{ borderColor: 'blue.100' }} 
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <IconButton 
                                            colorScheme='gray'
                                            aria-label='Confirm Password Display' 
                                            onClick={handlePasswordToggle}
                                            size='md'
                                            icon={isPasswordVisible ? <PiEyeClosed color='gray' /> : <PiEye color='gray' />}
                                        />
                                    </InputRightElement>
                                </InputGroup>

                                {formState.errors.confirm && <FormErrorMessage>{formState.errors.confirm.message}</FormErrorMessage>}
                            </FormControl>
                        </Flex>
                    </Stack>

                    <Button bg='blue.600' _hover={{ bg: 'blue.300' }} type='submit' mt={8} p={4} className='w-full' size='4' isLoading={formState.isSubmitting}>
                       Register
                    </Button>

                </form>
                <Box className='border-t border-gray-300 p-7 text-center' mt={4}>
                    <Text className='text-black' fontSize='small' fontWeight='500'>Already a member? <ChakraLink as={Link} to='/' color='blue.600'>Login to your account</ChakraLink></Text>
                </Box>
            </Box>
        </Flex>
    );
};
 
export default Register;