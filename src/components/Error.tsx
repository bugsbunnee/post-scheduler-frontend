import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react';
import Conditional from './Conditional';

interface Props {
    error: string;
}

const Error: React.FC<Props> = ({ error }) => {
    return ( 
        <Conditional isVisible={!!error}>
            <Alert status='error' color='red' my={2} fontSize='small'>
                <AlertIcon />
                {error}
            </Alert>
        </Conditional>
    );
}
 
export default Error;