import { getAllPosts } from "../services/posts";
import { useQuery } from "@tanstack/react-query";

import usePostQueryStore from "../store/posts";

const usePosts = () => {
    const postQuery = usePostQueryStore((s) => s.postQuery);

    return useQuery({
        queryKey: ['posts', postQuery],
        queryFn: () => getAllPosts({ 
            pageNumber: postQuery.pageNumber, 
            searchText: postQuery.searchText, 
            pageSize: postQuery.pageSize,
            platform: postQuery.platform,
        }),
        // staleTime: ms('24h'),
        initialData: { posts: [], pagination: { limit: 10, currentPage: 1, offset: 0, pages: 1, total: 0 }}
    })
};

export default usePosts;