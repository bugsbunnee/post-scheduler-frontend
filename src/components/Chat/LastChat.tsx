import React from 'react';
import classNames from 'classnames';

import { BiChevronRight } from 'react-icons/bi';
import { MdAccountBox, MdComputer } from 'react-icons/md';
import { getRelativeTimeFromTimestamp, summarize } from '../../utils/lib';

import useChatStream from '../../hooks/useChatStream';

interface Props {
    onClickLastChat: () => void;
    showBorder?: boolean;
}

const LastChat: React.FC<Props> = ({ onClickLastChat, showBorder = true }) => {
    const { isFetching, data } = useChatStream(false);

    return (
        <>
            {isFetching ? (
                <div className="animate-pulse p-4 flex flex-row justify-start items-center gap-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="h-2 max-w-24 bg-slate-200 rounded"></div>
                    </div>
                    <div className="h-2 w-2 bg-slate-200 rounded"></div>
                </div>
            ) : (
                <>
                        <button className="cursor-pointer p-4 pb-0 w-full" onClick={onClickLastChat}>
                            {data.lastChat ? (
                                <div className="pb-3 flex flex-row justify-start items-start gap-4 transition-all duration-300">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex justify-center items-center">
                                        {data.lastChat.role === 'assistant' ? <MdComputer className='text-black' /> : <MdAccountBox className='text-black' />}
                                    </div>
                                    <div className={classNames({
                                        'flex-1 text-left': true,
                                        'border-b border-gray-200 pb-3': showBorder
                                    })}>
                                        <h3 className='text-black text-sm font-semibold'>{summarize(data.lastChat.message)}</h3>
                                        <p className='text-gray-600 leading-6 text-xs'>{data.lastChat.role === 'assistant' ? 'DAN' : 'You'} - {getRelativeTimeFromTimestamp(data.lastChat.created_at)}</p>
                                    </div>
                                    <BiChevronRight className='text-xl text-gray-500' />
                                </div>
                            ): (
                                <div className="pb-3 flex flex-row justify-start items-start gap-4 transition-all duration-300">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex justify-center items-center">
                                        <MdComputer className='text-black' />
                                    </div>
                                    <div className={classNames({
                                        'flex-1 text-left': true,
                                        'border-b border-gray-200 pb-3': showBorder
                                    })}>
                                        <h3 className='text-black text-sm font-semibold'>No recent messages</h3>
                                        <p className='text-gray-600 leading-6 text-xs'>Tap here to start one</p>
                                    </div>
                                    <BiChevronRight className='text-xl text-gray-500' />
                                </div>
                            )}
                        </button>
                </>
            )}
        </>
    )
};

export default LastChat;