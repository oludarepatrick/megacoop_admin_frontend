import moneyIcon from "../../assets/money-bag-icon-purple.svg";
import StatCard from "@/components/StatCards";
import { Card } from "@/components/ui/card";
import { BriefcaseBusiness, Calendar, ChartColumnBig, ClipboardClock } from "lucide-react";

const InvestmentOverview = () => {
    // const { data } = useUserWallet();

    const dataOverview = [
    { 
        id: "1", 
        title: "Active Investment", 
        amount: 10,
        icon: BriefcaseBusiness,
        iconColor: "text-megagreen",
        iconbg:"bg-[#D2F7E3]",
    },
    { 
        id: "2", 
        title: "Total Paid (ROI)", 
        amount: 350000.00, 
        icon: moneyIcon,
        iconbg:"bg-[#FFDFF6]",
    },
    { 
        id: "3", 
        title: "Total Raised", 
        amount: 320000.00, 
        icon: ChartColumnBig,
        iconColor: "text-megagreen",
        iconbg:"bg-[#E5FFF1]",
    },
    { 
        id: "4", 
        title: "Due ROI", 
        amount: 320000.00, 
        icon: Calendar,
        iconColor: "text-megagold",
        iconbg:"bg-[#FFF2E5]",
    },
    { 
        id: "5", 
        title: "Pending Investment", 
        amount: 1, 
        icon: ClipboardClock,
        iconColor: "text-white",
        iconbg:"bg-[#F8C161]",
    },
];

    return (
        <section className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            xl:grid xl:grid-cols-5 xl:overflow-visible xl:snap-none
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