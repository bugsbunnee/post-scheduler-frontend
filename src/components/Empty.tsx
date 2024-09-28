import React from 'react';
import Conditional from './Conditional';

import { Alert, AlertIcon } from '@chakra-ui/react';

interface Props {
    isVisible: boolean;
    label: string;
}

const EmptyText: React.FC<Props> = ({ isVisible, label }) => {
    return ( 
        <Conditional isVisible={isVisible}>
            <Alert status='info' color='black' my={2} fontSize='small'>
                <AlertIcon />
                {label}
            </Alert>
        </Conditional>
    );
}
 
export default EmptyText;