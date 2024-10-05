import { useQuery } from "@tanstack/react-query";
import { getDocumentDetails } from "../services/documents";
import useDocumentQueryStore from "../store/documents";

const useDocument = () => {
    const { documentQuery } = useDocumentQueryStore();

    return useQuery({
        queryKey: ['documents', documentQuery.selectedDocument],
        queryFn: () => getDocumentDetails(documentQuery.selectedDocument),
        initialData: {
            _id: '',
            name: '',
            createdAt: '',
            documentNumber: '',
            lastInsertedVersion: '',
            tags: [],
            history: []
        }
    })
};

export default useDocument;