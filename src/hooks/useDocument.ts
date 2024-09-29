import { useQuery } from "@tanstack/react-query";
import { getDocumentDetails } from "../services/documents";

const useDocument = (documentId: string) => {
    return useQuery({
        queryKey: ['documents', documentId],
        queryFn: () => getDocumentDetails(documentId),
        initialData: { _id: '', fileName: '', content: '', enquiries: []}
    })
};

export default useDocument;