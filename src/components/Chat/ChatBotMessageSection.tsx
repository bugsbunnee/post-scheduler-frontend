import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';
import { BiPaperPlane } from 'react-icons/bi';
import { motion } from 'framer-motion';

import { initializeChat } from '../../services/chat';

import ChatMessageList from './ChatMessageList';
import LastChat from './LastChat';


const ChatBotMessageSection = () => {
    const [showMessages, setShowMessages] = useState(false);

    const mutation = useMutation({
        mutationFn: initializeChat,
    });

    const renderGeneralMessages = useCallback(() => {
        return (
            <>
                <div className='h-20 w-full bg-black flex justify-center items-center p-4'>
                    <div className="w-full flex justify-center items-center rounded-full overflow-hidden">
                        <p className="my-0 font-semibold">Messages</p>
                    </div>
                </div>
                <div className="max-h-[34rem] h-full overflow-y-scroll bg-white">
                    <LastChat onClickLastChat={() => setShowMessages(true)} />

                    <div className="flex flex-row justify-center items-center my-3">
                        <motion.button
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }} 
                            whileHover={{ scale: 1.1 }}
                            onClick={() => mutation.mutate(undefined, { onSuccess: () => setShowMessages(true) })}
                            className="cursor-pointer fixed bottom-32 bg-black max-w-fit py-3 px-6 rounded-full text-white w-full flex flex-row justify-start items-center gap-2"
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            {mutation.isPending 
                                ? <Spinner /> 
                                : (
                                    <>
                                        <span className='text-sm font-semibold'>Send a message</span>
                                        <BiPaperPlane />
                                    </>
                                )}
                        </motion.button>
                    </div>
                </div>
            </>
        );
    }, [mutation]);

    if (!showMessages) return renderGeneralMessages();

    return <ChatMessageList onGoBack={() => setShowMessages(false)} />;
};

export default ChatBotMessageSection;