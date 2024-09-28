import React from 'react';
import { Badge } from '@chakra-ui/react'
import { Status } from '../utils/models';

const statusMap: Record<Status, { label: string, color: 'orange' | 'red' | 'violet' | 'green' }> = {
  pending: { label: 'Pending', color: 'orange' },
  approved: { label: 'Approved', color: 'violet' },
  published: { label: 'Published', color: 'green' },
  rejected: { label: 'Rejected', color: 'red' }
};

const PostStatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  )
};

export default PostStatusBadge