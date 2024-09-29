import { create } from 'zustand';

export interface DocumentQuery {
    pageNumber: number;
    pageSize: number;
    searchText: string;
    selectedDocument: string;
}

export interface DocumentQueryStore {
  documentQuery: DocumentQuery;
  setSearchText: (searchText: string) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setSelectedDocument: (documentId: string) => void;
}

const useDocumentQueryStore = create<DocumentQueryStore>((set) => ({
    documentQuery: {
        pageNumber: 1,
        pageSize: 10,
        searchText: '',
        selectedDocument: '',
    },
    setSelectedDocument: (documentId) => set((store) => ({ documentQuery: { ...store.documentQuery, selectedDocument: documentId, pageNumber: 1 }})),
    setSearchText: (searchText) => set((store) => ({ documentQuery: { ...store.documentQuery, searchText, pageNumber: 1 } })),
    setPageNumber: (pageNumber) => set((store) => ({ documentQuery: { ...store.documentQuery, pageNumber }})),
    setPageSize: (pageSize) => set((store) => ({ documentQuery: { ...store.documentQuery, pageSize }})),
}));

export default useDocumentQueryStore;