import { useQuery } from "@tanstack/react-query";
import { getDocumentDetails } from "../services/documents";
import useDocumentQueryStore from "../store/documents";

const useDocument = () => {
    const { documentQuery } = useDocumentQueryStore();

    return useQuery({
        queryKey: ['documents', documentQuery.selectedDocumentToView],
        queryFn: () => getDocumentDetails(documentQuery.selectedDocumentToView),
        initialData: {
            _id: '',
            name: '',
            createdAt: '',
            isAnalyzed: false,
            documentNumber: '',
            lastInsertedVersion: '',
            tags: [],
            history: []
        }
    })
};

export default useDocument;