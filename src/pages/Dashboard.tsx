import DashboardAnalytics from "@/features/DashboardComponent/DashboardAnalytics";
import DashboardExpenseStatistic from "@/features/DashboardComponent/DashboardExpenseStatistic";
import DashboardOverview from "@/features/DashboardComponent/DashboardOverview";
import DashboardTransation from "@/features/DashboardComponent/DashboardTransaction";

const Dashboard = () => {
    return (
        <div className="font-jakarta space-y-6">
            <h2 className="font-semibold text-[20px]">Dashboard</h2>
            <DashboardOverview/>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                <div className="lg:col-span-8">
                    <DashboardAnalytics/>
                </div>
                <div className="lg:col-span-4">
                    <DashboardExpenseStatistic/>
                </div>
            </div>
            <DashboardTransation/>
           
        </div>
    )
}

export default Dashboard;