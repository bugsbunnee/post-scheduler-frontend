import http from "./http";
import axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

import { Post } from "../utils/models";
import { PostData } from "../utils/schema";
import { PostQuery } from "../store/posts";

export interface PostResponse {
    posts: Post[]
    pagination: {
        currentPage: number;
        total: number;
        limit: number;
        offset: number;
        pages: number;
    }
}

export interface OverviewResponse {
    overview: {
        totalPosts: number;
        totalLikes: number;
        totalViews: number;
        totalShares: number;
        roundedAverageLikes: number;
        roundedAverageViews: number;
        engagementRate: number;
    }
}

export const getAllPosts = (params: PostQuery) => {
    const config: AxiosRequestConfig = { 
        params: {
            pageNumber: params.pageNumber,
            pageSize: params.pageSize,
            searchText: params.searchText,
            platform: params.platform,
        }
    };

    return http.get<PostResponse>('/posts/me', config).then(response => response.data);
};

export const getDashboardOverview = () => {
    return http.get<OverviewResponse>('/posts/me/metrics').then(response => response.data);
};

export const createPost = async (post: PostData) => {
    try {
        await http.post('/posts', post);
    } catch (error) {
        if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
        else toast.error((error as Error).message);
    }
   
};

export const approvePost = (postId: string) => {
    return http.post(`/posts/${postId}/approve`);
};