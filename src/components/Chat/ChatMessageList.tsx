import { BiChevronLeft, BiDotsHorizontal, BiPaperPlane } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { Image, Spinner } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import classNames from 'classnames';
import logo from '../../assets/logo.png';

import useChatStream from '../../hooks/useChatStream';
import Error from '../Error';

import { getRelativeTimeFromTimestamp } from '../../utils/lib';
import { ENQUIRY_TAGS, INITIAL_CHAT_DETAILS } from '../../utils/constants';
import { Message, sendChatMessage } from '../../services/chat';

interface Props {
    onGoBack: () => void;
}

const ChatMessageList: React.FC<Props> = ({ onGoBack }) => {
    const [errorText, setErrorText] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);
    const messageListRef = useRef<HTMLDivElement>(null);

    const { isPending, isSuccess, error, mutate } = useMutation({ mutationFn: sendChatMessage });
    const { data, isFetching } = useChatStream(isSuccess);

    const errorMessage = error?.message || errorText;

    const handleSubmitQuery = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!inputRef.current) return;

        if (inputRef.current.value.length < 10) {
            setErrorText('Please enter at least 10 characters');
        } else {
            mutate({ message: inputRef.current.value });
            inputRef.current.value = '';
        }
        
    }, [mutate]);

    const renderBotTyping = useCallback(() => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex flex-row items-center gap-4 px-4 max-w-fit mb-3'
            >
                <Image src={logo} alt='RusselSmith' className='w-9 h-9 object-contain'/>
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-600">
                    <BiDotsHorizontal />
                </div>
            </motion.div>
        )
    }, []);

    const renderBotMessage = useCallback((message: Message) => {
        return (
            <motion.div
                key={message.id}
                initial={{ transform: "translateX(-100%)" }}
                animate={{ transform: "translateX(0)" }}
                className='flex flex-row items-end gap-4 px-4 max-w-80 mb-3'
            >
                <Image src={logo} alt='RusselSmith' className='w-9 h-9 object-contain'/>
                <div className='flex-1'>
                    <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-600">
                        {message.content[0].text.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-2 text-left">Bot - {getRelativeTimeFromTimestamp(message.created_at)}</div>
                </div>
            </motion.div>
        )
    }, []);
    
    const renderUserEnquiryCategory = useCallback(() => {
        if (data.list.length > 0 || isPending || isFetching) return null;

        return (
            <motion.div
                initial={{ transform: "translateX(100%)" }}
                animate={{ transform: "translateX(0)" }}
                className='flex flex-col justify-end items-end gap-2 px-4 my-10'
            >
                <div className="grid grid-cols-2 gap-4 items-center">
                    {ENQUIRY_TAGS.map((tag) => (
                        <button 
                            className="p-3 rounded-lg text-xs text-gray-600 max-w-fit bg-gray-100" 
                            key={tag}
                            onClick={() => mutate({ message: tag })}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </motion.div>
        )
    }, [mutate, data.list, isFetching, isPending]);

    const renderUserMessage = useCallback((message: Message) => {
        return (
            <motion.div
                key={message.id}
                initial={{ transform: "translateX(100%)" }}
                animate={{ transform: "translateX(0)" }}
                className='flex flex-col justify-end items-end gap-2 px-4 mb-3'
            >
                <div className="bg-orange-100 rounded-lg p-3 text-sm text-gray-600 max-w-fit">
                    {message.content[0].text.value}
                </div>
                <div className="text-xs text-gray-600 text-right">You - {getRelativeTimeFromTimestamp(message.created_at)}</div>
            </motion.div>
        )
    }, []);

    const renderSearchBar = useCallback(() => {
        return (
            <div className="p-4 w-full fixed bottom-20">
                <Error error={errorMessage} />

                <form 
                    onSubmit={handleSubmitQuery} 
                    className={classNames({
                        "bg-white bg-gray-100 w-full flex justify-center items-center rounded-full overflow-hidden p-2": true,
                        "border border-gray-200": !errorMessage,
                        "border border-red-200": !!errorMessage
                    })}
                >
                    <input 
                        type="text" 
                        className='flex-1 bg-transparent focus:outline-none focus text-black px-4 text-sm placeholder-gray-400'
                        ref={inputRef}
                        onChange={(event) => errorMessage && event.target.value.length >= 10 ? setErrorText('') : undefined}
                        placeholder='Enter a message'
                    />
                    <button className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white" type='submit'>
                        {isPending ? <Spinner /> : <BiPaperPlane />}
                    </button>
                </form>
            </div>
        );
    }, [errorMessage, isPending, handleSubmitQuery]);

    useEffect(() => {
        if (!isFetching && data.list.length > 0) {
            const lastChild = messageListRef.current?.lastElementChild;
            if (lastChild) lastChild.scrollIntoView({ behavior: 'smooth' });
        }
    }, [data, isFetching]);

    return ( 
        <div className='relative flex-col flex overflow-hidden rounded-3xl h-full'>
            <div className='h-20 w-full bg-black flex justify-center items-center p-4'>
                <div className="w-full flex justify-center items-center rounded-full overflow-hidden">
                    <button onClick={() => onGoBack()}>
                        <BiChevronLeft className='text-2xl' />
                    </button>
                    <div className="flex flex-1 items-center gap-2 justify-center">
                        <Image src={logo} alt='RusselSmith' className='w-16 h-16 object-contain'/>
                        {/* <p className="my-0 font-semibold text-center">DAN</p> */}
                    </div>
                </div>
            </div>

            <div ref={messageListRef} className="max-h-[35rem] h-full overflow-y-scroll bg-white p-3 pb-36">
                <div className="my-5 border border-gray-200 rounded-lg p-4 text-gray-600 flex flex-row items-center gap-4 ">
                    <div className='text-sm text-left'>We are here to assist you. You can also send us an email - info@russelsmithgroup.com</div>
                    <BsInfoCircle className='text-2xl'/>
                </div>

                {renderBotMessage(INITIAL_CHAT_DETAILS as Message)}

                {renderUserEnquiryCategory()}
                
                {data.list.map((message) => message.role === 'assistant' ? renderBotMessage(message) : renderUserMessage(message))}
                
                {isFetching && renderBotTyping()}
            </div>

            {renderSearchBar()}
        </div>
     );
};
 
export default ChatMessageList;