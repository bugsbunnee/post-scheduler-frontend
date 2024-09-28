import React, { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';

interface Props {
  children: string;
}

const ExpandableText: React.FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 50;

  if (!children) return null;

  if (children.length <= limit) return <Text color='black' fontSize='small' fontWeight='600'>{children}</Text>;

  const summary = expanded ? children : children.substring(0, limit) + '...';

  return (
    <Text color='black' fontSize='small' fontWeight='600'>
      {summary}
      <Button
        size="xs"
        marginLeft={1}
        fontWeight="bold"
        colorScheme="yellow"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </Button>
    </Text>
  );
};

export default ExpandableText;