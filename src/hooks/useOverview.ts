import { getDashboardOverview } from "../services/posts";
import { useQuery } from "@tanstack/react-query";

const useDashboardOverview = () => {
    return useQuery({
        queryKey: ['overview'],
        queryFn: () => getDashboardOverview(),
        initialData: {
            overview: {
                totalPosts: 0,
                totalLikes: 0,
                totalViews: 0,
                totalShares: 0,
                roundedAverageLikes: 0,
                roundedAverageViews: 0,
                engagementRate: 0,
            }
        }
    })
};

export default useDashboardOverview;