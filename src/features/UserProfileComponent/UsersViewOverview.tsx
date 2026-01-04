import StatCard from "@/features/OrdersComponent/StatCard";
import { Card } from "@/components/ui/card";
import userIcon from "@/assets/user-icon.svg"
import { useUsersSummary } from "@/hooks/useUser";


const UsersViewOverview = () => {
    const { data } = useUsersSummary();

    const dataOverview = [
    { 
        id: "1", 
        title: "Total Users", 
        amount: data?.active_users,
        icon: userIcon,
        growth: "Total users",
        bg: "bg-white",
        iconbg:"bg-[#8280FF]/20",
    },
    { 
        id: "2", 
        title: "New Users", 
        amount: data?.new_users_last_month, 
        icon: userIcon,
        growth: "New users",
        bg: "bg-[#F0F0FB]",
        Iconcolor: "text-white",
        iconbg:"bg-[#8280FF]/20",
    },
    { 
        id: "3", 
        title: "Active User", 
        amount: data?.active_users, 
        icon: userIcon,
        growth: "Active User",
        bg: "bg-[#CFEEF2]",
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

export default UsersViewOverview ;
