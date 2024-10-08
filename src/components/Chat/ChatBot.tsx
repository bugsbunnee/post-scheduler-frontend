import React, { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import { MdChat } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';

import { ChatBotTabButtons, ChatBotMessageSection } from './';
import { TAB_CATEGORIES } from '../../utils/constants';

import ChatBotHome from './ChatBotHome';

const ChatBot: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(TAB_CATEGORIES.HOME);

    return null;
    
    return ( 
        <div className='fixed bottom-5 right-5 z-50'>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ transform: "translateY(100%)", opacity: 0, scale: 0 }}
                        animate={{ transform: "translateY(0)", opacity: 1, scale: 1 }}
                        exit={{ transform: "translateY(100%)", opacity: 0 }}
                        className='fixed bottom-24 right-5 z-50 overflow-hidden w-96 h-[40rem] shadow-2xl bg-gradient-to-b from-black via-white to-white rounded-3xl'
                    >
                        {activeTab === TAB_CATEGORIES.HOME && <ChatBotHome onChangeTab={setActiveTab} />}
                        {activeTab === TAB_CATEGORIES.MESSAGES && <ChatBotMessageSection />}
                        
                        <ChatBotTabButtons onChangeTab={(tab) => setActiveTab(tab)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className='fixed bottom-5 right-5 z-50 mt-5 w-12 h-12 shadow-md rounded-full bg-[#27303D] flex items-center justify-center'
                initial={{ scale: 0 }}
                whileHover={{ rotate: 360, scale: 1.2 }}
                whileTap={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                onClick={() => setOpen((previous) => !previous)}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                {isOpen ? <BiChevronDown  className='text-2xl' /> : <MdChat className='text-2xl' />}
            </motion.button>
        </div>
    );
};
 
export default ChatBot;