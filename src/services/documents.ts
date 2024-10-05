import http from "./http";
import axios from "axios";
import toast from "react-hot-toast";

import { DocumentData } from "../utils/schema";

export interface DocumentEnquiry { 
    _id: string; 
    question: string; 
    response: string 
};

export interface Document {
    _id: string;
    name: string;
    createdAt: Date | string;
    documentNumber: string;
    lastInsertedVersion: string;
    tags: string[];
    history: { _id: string; version: number; content: string; url: string; }[]
}

export interface DocumentResponse {
    totalDocuments: number;
    topTags: { _id: string; count: number; }[];
}

export const getAllDocuments = () => {
    return http.get<Document[]>('/documents').then(response => response.data);
};

export const getDocumentsOverview = () => {
    return http.get<DocumentResponse>('/documents/dashboard').then(response => response.data);
};

export const getDocumentDetails = (documentId: string) => {
    return http.get<Document>(`/documents/${documentId}`).then(response => response.data);
};

export const uploadDocument = async (document: DocumentData) => {
    try {
        await http.post('/documents/upload', document);
    } catch (error) {
        if (axios.isAxiosError(error)) toast.error(error.response?.data.message);
        else toast.error((error as Error).message);
    }
   
};

export const askQuestion = async (question: string, documentId: string) => {
    return http.post<DocumentEnquiry>('/documents/' + documentId + '/enquire',  { question });
};
