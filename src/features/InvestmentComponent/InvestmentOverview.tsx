import moneyIcon from "../../assets/money-bag-icon-purple.svg";
import StatCard from "@/components/StatCards";
import { Card } from "@/components/ui/card";
import { useInvestmentData } from "@/hooks/useInvestment";
import { BriefcaseBusiness, Calendar, ChartColumnBig } from "lucide-react";

const InvestmentOverview = () => {
    const { data } = useInvestmentData();

    const dataOverview = [
    { 
        id: "1", 
        title: "Active Investment", 
        amount: data?.total_approved_investors,
        icon: BriefcaseBusiness,
        iconColor: "text-megagreen",
        iconbg:"bg-[#D2F7E3]",
    },
    { 
        id: "2", 
        title: "Total Paid (ROI)", 
        amount: data?.total_paid_roi, 
        icon: moneyIcon,
        iconbg:"bg-[#FFDFF6]",
    },
    { 
        id: "3", 
        title: "Total Raised", 
        amount: data?.total_amount_raised, 
        icon: ChartColumnBig,
        iconColor: "text-megagreen",
        iconbg:"bg-[#E5FFF1]",
    },
    { 
        id: "4", 
        title: "Due ROI", 
        amount: data?.total_paid_roi, 
        icon: Calendar,
        iconColor: "text-megagold",
        iconbg:"bg-[#FFF2E5]",
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

export default InvestmentOverview ;