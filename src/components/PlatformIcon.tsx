import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

import { HStack, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Platform } from '../utils/models';
  
  interface Props {
    platform: Platform;
  }
  
  const PlatformIcon = ({ platform }: Props) => {
    const iconMap: { [key: string]: { Icon: IconType, color: string; } } = {
      twitter: {Icon: FaTwitter, color: 'blue.100' },
      instagram: {Icon: FaInstagram, color: 'red.200' },
      facebook: {Icon: FaFacebook, color: 'blue.400' },
    };
  
    return (
      <HStack marginY={1}>
          <Icon
            as={iconMap[platform].Icon}
            color={iconMap[platform].color}
          />
      </HStack>
    );
  };
  
  export default PlatformIcon;