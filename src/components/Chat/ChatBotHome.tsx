import React from 'react';

import Feedback from './Feedback';
import LastChat from './LastChat';

import logo from '../../assets/logo.png';

import { Image } from '@chakra-ui/react';
import { BiChevronRight, BiPaperPlane } from 'react-icons/bi';
import { ENQUIRY_TAGS, TAB_CATEGORIES } from '../../utils/constants';

interface Props {
    onChangeTab: (tab: string) => void;
}

const ChatBotHome: React.FC<Props> = ({ onChangeTab }) => {
    return ( 
        <div className="p-4 h-full overflow-y-scroll pb-32">
            <Image src={logo} alt='RusselSmith' className='w-16 h-16 object-contain'/>

            <h2 className="text-2xl text-white font-bold mt-24 mb-4">Hello there, <br /> How can we be of help?</h2>
            
            <div className='mt-4 w-full shadow-md rounded-md border border-gray-200 bg-white text-black gap-4'>
                <h3 className='px-4 pt-2 text-sm font-semibold text-black'>Recent message</h3>
                <LastChat onClickLastChat={() => onChangeTab(TAB_CATEGORIES.MESSAGES)} showBorder={false} />
            </div>

            <div className='mt-4 p-2 w-full shadow-md rounded-md border border-gray-200 bg-white text-black gap-4'>
                <button 
                    className='p-3 w-full rounded-md bg-gray-200 text-black flex flex-row items-center gap-4'
                    onClick={() => onChangeTab(TAB_CATEGORIES.HELP)}
                >
                    <div className="text-sm font-semibold flex-1 text-left">Send a message</div>
                    <BiPaperPlane />
                </button>
                
                <div className="mt-2">
                    {ENQUIRY_TAGS.slice(0, 4).map((section) => (
                        <button 
                            key={section}
                            className='p-3 w-full rounded-md hover:bg-gray-200 transition-all duration-300 ease-in-out text-black flex flex-row items-center gap-4'
                            onClick={() => onChangeTab(TAB_CATEGORIES.MESSAGES)}
                        >
                            <div className="text-sm flex-1 text-left capitalize">{section}</div>
                            <BiChevronRight />
                        </button>
                    ))}
                </div>
            </div>

            <Feedback />
        </div>
     );
};
 
export default ChatBotHome;