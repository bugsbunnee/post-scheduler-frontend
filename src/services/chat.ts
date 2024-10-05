import http from "./http"

export interface Message {
    id: string;
    created_at: number;
    role: 'assistant' | 'user';
    content: { text: { value: string; }}[];
}

export interface ChatStreamResponse { 
    status: string;
    list: Message[];
    lastChat: {
        created_at: number;
        id: string;
        role: 'assistant' | 'user';
        message: string;
    } | null;
}

export const initializeChat = () => {
    return http.post<{ _id: string; }>('/chat/initialize');
};

export const sendChatMessage = (data: { message: string;  }) => {
    return http.post('/chat/ask', { message: data.message });
};

export const getChatMessages = () => {
    return http.get<ChatStreamResponse>('/chat').then((response) => response.data);
};

export const saveFeedback = (feedback: { subject: string; message: string; }) => {
    return http.post('/feedback', feedback);
}