import { useQuery } from "@tanstack/react-query";
import { getAllDocuments } from "../services/documents";

const useDocuments = () => {
    return useQuery({
        queryKey: ['documents'],
        queryFn: () => getAllDocuments(),
        initialData: []
    })
};

export default useDocuments;