import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
    onChangePage: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ itemCount, pageSize, currentPage, onChangePage }) => {
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    return (
        <Flex align="center" gap="2" color='black'>
            <Text fontSize='small'>
                Page {currentPage} of {pageCount}
            </Text>
            <Button
                color="gray"
                variant="soft"
                isDisabled={currentPage === 1}
                _disabled={{ opacity: 0.3 }}
                onClick={() => onChangePage(1)}
            >
                <FaAngleDoubleLeft size={15} />
            </Button>
            <Button
                color="gray"
                variant="soft"
                isDisabled={currentPage === 1}
                _disabled={{ opacity: 0.3 }}
                onClick={() => onChangePage(currentPage - 1)}
            >
                <BiChevronLeft size={15} />
            </Button>
            <Button
                color="gray"
                variant="soft"
                isDisabled={currentPage === pageCount}
                _disabled={{ opacity: 0.3 }}
                onClick={() => onChangePage(currentPage + 1)}
            >
                <BiChevronRight size={15} />
            </Button>
            <Button
                color="gray"
                variant="soft"
                isDisabled={currentPage === pageCount}
                _disabled={{ opacity: 0.3 }}
                onClick={() => onChangePage(pageCount)}
            >
                <FaAngleDoubleRight size={15} />
            </Button>
        </Flex>
    );
};

export default Pagination;
