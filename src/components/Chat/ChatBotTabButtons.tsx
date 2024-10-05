import React from 'react';
import { TABS } from '../../utils/constants';

interface Props {
    onChangeTab: (tab: string) => void;
}

const ChatBotTabButtons: React.FC<Props> = ({ onChangeTab }) => {
    return ( 
        <div className="absolute bottom-0 w-full border-t border-gray-200 bg-white flex-row flex justify-center items-center">
            {TABS.map((tab) => (
                <button 
                    key={tab.key}
                    onClick={() => onChangeTab(tab.key)}
                    className='p-6 text-black flex flex-col justify-center items-center text-center flex-1'
                >
                    <tab.Icon className='text-xl' />
                    <div className="mt-1 text-xs tracking-wide capitalize">{tab.label}</div>
                </button>
            ))}
        </div>
     );
};
 
export default ChatBotTabButtons;