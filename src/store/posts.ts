import { create } from 'zustand';

export interface PostQuery {
    pageNumber: number;
    pageSize: number;
    searchText: string;
    platform: string;
}

export interface PostQueryStore {
  postQuery: PostQuery;
  setSearchText: (searchText: string) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setPlatform: (platform: string) => void;
}

const usePostQueryStore = create<PostQueryStore>((set) => ({
    postQuery: {
        pageNumber: 1,
        pageSize: 10,
        searchText: '',
        platform: '',
    },
    setPlatform: (platform) => set((store) => ({ postQuery: { ...store.postQuery, platform, pageNumber: 1 }})),
    setSearchText: (searchText) => set((store) => ({ postQuery: { ...store.postQuery, searchText, pageNumber: 1 } })),
    setPageNumber: (pageNumber) => set((store) => ({ postQuery: { ...store.postQuery, pageNumber }})),
    setPageSize: (pageSize) => set((store) => ({ postQuery: { ...store.postQuery, pageSize }})),
}));

export default usePostQueryStore;