import { getDocumentsOverview } from "../services/documents";
import { useQuery } from "@tanstack/react-query";

const useDocumentsOverview = () => {
    return useQuery({
        queryKey: ['documents-overview'],
        queryFn: () => getDocumentsOverview(),
        initialData: {
            analysedDocuments: 0,
            notAnalysedDocuments: 0,
            totalDocuments: 0,
            topTags: []
        }
    })
};

export default useDocumentsOverview;