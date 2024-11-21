import { create } from 'zustand';

export interface DocumentQuery {
    pageNumber: number;
    pageSize: number;
    searchText: string;
    selectedDocumentToView: string;
    selectedDocumentToUpdate: string;
}

export interface DocumentQueryStore {
  documentQuery: DocumentQuery;
  setSearchText: (searchText: string) => void;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  setSelectedDocumentToView: (documentId: string) => void;
  setSelectedDocumentToUpdate: (documentId: string) => void;
}

const useDocumentQueryStore = create<DocumentQueryStore>((set) => ({
    documentQuery: {
        pageNumber: 1,
        pageSize: 10,
        searchText: '',
        selectedDocumentToView: '',
        selectedDocumentToUpdate: '',
    },
    setSelectedDocumentToView: (documentId) => set((store) => ({ documentQuery: { ...store.documentQuery, selectedDocumentToView: documentId, pageNumber: 1 }})),
    setSelectedDocumentToUpdate: (documentId) => set((store) => ({ documentQuery: { ...store.documentQuery, selectedDocumentToUpdate: documentId, pageNumber: 1 }})),
    setSearchText: (searchText) => set((store) => ({ documentQuery: { ...store.documentQuery, searchText, pageNumber: 1 } })),
    setPageNumber: (pageNumber) => set((store) => ({ documentQuery: { ...store.documentQuery, pageNumber }})),
    setPageSize: (pageSize) => set((store) => ({ documentQuery: { ...store.documentQuery, pageSize }})),
}));

export default useDocumentQueryStore;