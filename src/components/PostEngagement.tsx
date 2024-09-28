import React from 'react';

import { HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { BiGlasses, BiLike, BiShare } from 'react-icons/bi';

interface Props {
    shares: number;
    likes: number;
    views: number;
}

const PostEngagement: React.FC<Props> = ({ likes, shares, views }) => {
    return ( 
        <SimpleGrid columns={3} color='black' fontWeight='600' gap={4}>
            <HStack>
                <BiShare />
                <Text fontSize='small'>{shares}</Text>
            </HStack>
            <HStack>
                <BiGlasses  />
                <Text fontSize='small'>{views}</Text>
            </HStack>
            <HStack>
                <BiLike />
                <Text fontSize='small'>{likes}</Text>
            </HStack>
        </SimpleGrid>
     );
}
 
export default PostEngagement;