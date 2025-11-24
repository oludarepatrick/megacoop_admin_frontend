import userIcon from "@/assets/user-icon.svg"
import moneyBag from "@/assets/money-bag-icon.svg"
import disburseIcon from "@/assets/naira-out-icon.svg"
import StatCard from "./StatCard";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react"
import { useDashboardStat } from "@/hooks/useDashboard";
// import { useUserWallet } from "@/hooks/useAuth";

const DashboardOverview = () => {
    const { data } = useDashboardStat();

    const dataOverview = [
    { 
        id: "1", 
        title: "Total User", 
        amount: data?.total_users,
        icon: userIcon,
        growth: "+1.29%",
        iconbg:"bg-[#8280FF]/20",
    },
    { 
        id: "2", 
        title: "Total Loan", 
        amount: data?.active_loans, 
        icon: moneyBag,
        growth: "+1.29%",
        iconbg:"bg-[#FEC53D]/20",
    },
    { 
        id: "3", 
        title: "Total Disburse", 
        amount: data?.disbursed_loans, 
        icon: disburseIcon,
        growth: "+1.29%",
        iconbg:"bg-[#4AD991]/20",
    },
    { 
        id: "4", 
        title: "Total Savings", 
        amount: Number(data?.total_savings), 
        icon: TrendingUp,
        growth: "+1.29%",
        iconbg:"bg-[#B6E2CA]/20",
    },
];

    return (
        <section className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            xl:grid xl:grid-cols-4 xl:overflow-visible xl:snap-none
        ">
            {dataOverview.map((stat) => (
                <Card key={stat.id} className="w-[254px] xl:w-full p-0 px-3 pt-4 snap-start shrink-0">
                    <StatCard {...stat} />
                </Card>
            ))}

        </section>
    )
}

export default DashboardOverview ;
