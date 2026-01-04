import moneyBag from "@/assets/money-bag-icon-purple.svg"
import StatCard from "./StatCard";
import { Card } from "@/components/ui/card";
import { ClipboardClock, Bike } from "lucide-react"
import { useOrderStat } from "@/hooks/useOrder";

const OrdersOverview = () => {
    const { data } = useOrderStat();

    const dataOverview = [
    { 
        id: "1", 
        title: "Delivered", 
        amount: data?.total_delivered_orders,
        icon: Bike,
        growth: "Total Delivered",
        bg: "bg-white",
        iconbg:"bg-[#8280FF]/20",
    },
    { 
        id: "2", 
        title: "Pending", 
        amount: data?.total_pending_orders, 
        icon: ClipboardClock,
        growth: "Total Pending",
        bg: "bg-[#F8C460]",
        Iconcolor: "text-white",
        iconbg:"bg-[#F6F5FF]/20",
    },
    { 
        id: "3", 
        title: "Revenue", 
        amount: data?.total_revenue, 
        icon: moneyBag,
        growth: "Total Revenue",
        bg: "bg-[#F0F0FB]",
        iconbg:"bg-[#8280FF]/20",
    },
    
];

    return (
        <section className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            xl:grid xl:grid-cols-4 xl:overflow-visible xl:snap-none
        ">
            {dataOverview.map((stat) => (
                <Card key={stat.id} className={`w-[254px] xl:w-full p-0 px-3 pt-4 pb-2 snap-start shrink-0 ${stat.bg} shadow-md`}>
                    <StatCard {...stat}>
                    </StatCard>
                </Card>
            ))}

        </section>
    )
}

export default OrdersOverview ;
