import React, { PropsWithChildren, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

interface ElevationProps extends PropsWithChildren {
	isElevated: boolean;
    onClearElevation: () => void;
}

const Elevation: React.FC<ElevationProps> = ({ children, isElevated, onClearElevation }) => {
    useEffect(() => {
        if (isElevated) {
            const timeout = setTimeout(onClearElevation, 3_000);
            return () => clearTimeout(timeout);
        }
    }, [isElevated]);

    if (isElevated) return (
        <>
            <Box className='w-dvw h-dvh fixed z-10 top-0 right-0 left-0 bottom-0 bg-black bg-opacity-25 transition-all duration-500 ease-in-out'></Box>
            <Box className='z-50 relative'>{children}</Box>
        </>
    );

    return <Box>{children}</Box>;
};

export default Elevation;
