import React from 'react';
import toast from 'react-hot-toast';

import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { BiCheckCircle } from 'react-icons/bi';

import { approvePost } from '../services/posts';

interface Props {
    postId: string;
};

const ApprovePost: React.FC<Props> = ({ postId }) => {
    const mutation = useMutation({
        mutationFn: () => approvePost(postId)
    });

    if (mutation.isSuccess) return null;

    return (
        <Button 
            fontSize='x-small'
            textTransform='uppercase'
            size='sm'
            rounded={2}
            colorScheme='green'
            leftIcon={<BiCheckCircle />}
            onClick={() => mutation.mutate(undefined, { onSuccess: () => toast.success('Approved successfully!')})}
            isLoading={mutation.isPending}
        >
            Approve
        </Button>
      );
};
 
export default ApprovePost;