import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const Error: React.FC = () => {
    const error = useRouteError();

    return ( 
        <>
            <h1>Oops...</h1>
            <p>
                {isRouteErrorResponse(error)
                    ? 'Invalid page'
                    : 'Unexpected error'}
            </p>
        </>
    );
}
 
export default Error;