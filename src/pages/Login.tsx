import React, { useCallback, useState } from 'react';

import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement, Link as ChakraLink, Stack, Text, InputRightElement, IconButton } from '@chakra-ui/react';
import { PiEye, PiEyeClosed, PiPhone } from 'react-icons/pi';
import { BiLock } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { AuthData, authSchema } from '../utils/schema';
import { login } from '../services/auth';

import useAuthStore from '../store/auth';

const Login: React.FC = () => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const { loginUser } = useAuthStore();
    const { register, formState, handleSubmit } = useForm<AuthData>({
        resolver: zodResolver(authSchema),
        mode: 'all'
    });

    const onLogin = async (data: AuthData) => {
        const token = await login(data);
        if (!token) return;

        loginUser(token);

        window.location.href = '/dashboard';
    };

    const handlePasswordToggle = useCallback(() => {
        setPasswordVisible((previous) => !previous);
    }, []);

    return ( 
        <Flex className='p-4 w-dvw h-dvh bg-gray-100' justify='center' align='center'>
            <Box className='bg-white rounded-md border border-gray-300 max-w-96'>
                <form id='login-form' className='p-8' onSubmit={handleSubmit(onLogin)}>
                    <Heading color='black'>Secure Client Login</Heading>

                    <Stack spacing={4}>
                        <FormControl mt={7} isInvalid={!!formState.errors.email}>
                            <FormLabel color='black' fontSize='medium'>Email address:</FormLabel>
                            <InputGroup variant='outline' borderColor='gray.200' size='lg' rounded={2}>
                                <InputLeftElement pointerEvents='none'>
                                    <PiPhone color='gray' />
                                </InputLeftElement>
                                <Input placeholder='Enter Email Address' _placeholder={{ fontSize: 'sm' }} color='black' fontSize='small' {...register('email')} />
                            </InputGroup>

                            {formState.errors.email 
                                ? <FormErrorMessage color='red'>{formState.errors.email.message}</FormErrorMessage> 
                                : <FormHelperText color='gray.400'>We'll never share your email.</FormHelperText>}
                        </FormControl>
                        
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
                    </Stack>

                    <Button bg='blue.600' _hover={{ bg: 'blue.300' }} form='login-form' type='submit' mt={8} p={4} className='w-full' size='4' isLoading={formState.isSubmitting}>
                        Login
                    </Button>
                </form>

                <Box className='border-t border-gray-300 p-7 text-center' mt={4}>
                    <Text className='text-black' fontSize='small' fontWeight='500'>Not a member yet? <ChakraLink as={Link} to='/register' color='blue.600'>Create a new account</ChakraLink></Text>
                </Box>
            </Box>
        </Flex>
    );
};
 
export default Login;