import dayjs from 'dayjs';
import { MdChat, MdHome } from 'react-icons/md';

export const ACTIVE_SECTIONS = {
    NEW_DOCUMENT: 'new-document',
    NEW_POST: 'new-post',
    VIEW_POSTS: 'view-posts',
    VIEW_QUESTIONS: 'view-questions',
    LOGOUT: 'logout',
};

export const HELP_SECTIONS = [
    {
        title: 'Managing your account',
        body: 'Learn more about managing your account.',
        route: '/'
    },
    {
        title: 'Managing your account 2',
        body: 'Learn more about managing your account.',
        route: '/'
    },
    {
        title: 'Managing your account 3',
        body: 'Learn more about managing your account.',
        route: '/'
    },
    {
        title: 'Managing your account 4',
        body: 'Learn more about managing your account.',
        route: '/'
    },
    {
        title: 'Managing your account 5',
        body: 'Learn more about managing your account.',
        route: '/'
    },
    {
        title: 'Managing your account 6',
        body: 'Learn more about managing your account.',
        route: '/'
    },
    {
        title: 'Managing your account 7',
        body: 'Learn more about managing your account.',
        route: '/'
    },
];

export const ENQUIRY_TAGS = [
    'Health and Safety',
    'Quality Control',
    'Company Policies',
    'People Management',
    'IT',
    'Security',
    'Others'
];

export const TAB_CATEGORIES = {
    HOME: 'home',
    MESSAGES: 'messages',
    HELP: 'help'
};

export const TABS = [
    {
        key: TAB_CATEGORIES.HOME,
        Icon: MdHome,
        label: 'Home'
    },
    {
        key: TAB_CATEGORIES.MESSAGES,
        Icon: MdChat,
        label: 'Messages'
    },
];

export const INITIAL_CHAT_DETAILS = {
    content: [{ text: { value: 'Hi, I\'m Dan, the Chat Assistant. Please select a general topic for your enquiry' }}],
    created_at: dayjs().unix(),
    id: "1",
    role: 'assistant'
};

export const DB_SECTIONS = [
    {
        title: 'How to locate any of our stores',
        body: 'All you need to know about locating any of our stores nationwide',
    },
];

export const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];