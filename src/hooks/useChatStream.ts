import { useEffect } from "react";
import { getChatMessages } from "../services/chat";
import { useQuery } from "@tanstack/react-query";

const QUERY_COMPLETE_STATES = ['completed', 'failed'];

const useChatStream = (refetchStream: boolean) => {
    const query = useQuery({
        queryKey: ['chat', refetchStream],
        queryFn: () => getChatMessages(),
        initialData: { status: 'completed', list: [], lastChat: null }
    });

    useEffect(() => {
        if (!QUERY_COMPLETE_STATES.includes(query.data.status)) query.refetch();
    }, [query]);

    return query;
};
 
export default useChatStream;