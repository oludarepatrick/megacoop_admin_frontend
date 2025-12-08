// import PageLoader from "@/components/PageLoader";
import ROIDetailView from "@/features/ROIComponent/ROIDetailView";
import { useSingleUserInvestment } from "@/hooks/useROI";
import { useParams } from "react-router-dom";

const ROIDetailPage = () => {
    const {userId} = useParams();
    const {data, isLoading  } = useSingleUserInvestment(userId ? parseInt(userId) : 0);
    
    // if (isLoading) return <PageLoader/>

    return (
        <ROIDetailView 
            user={data!} 
            onBack={() => {window.history.back()}}
            isLoading={isLoading}
        />
    );
}
export default ROIDetailPage;