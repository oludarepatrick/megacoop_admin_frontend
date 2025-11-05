import { CardContent } from "@/components/ui/card";
import {TrendingUp, type LucideIcon } from "lucide-react";
import { createElement } from "react";


type StatProps = {
    title: string;
    amount: number | undefined;
    icon: string | LucideIcon;
    growth: string;
    iconbg: string;
}

const StatCard= ({title, amount, icon, growth, iconbg}:StatProps) => {
    return (
        <>
            <CardContent className="px-0 pb-2">
                <div className="grid grid-cols-[2fr_auto] items-center">
                    <div className="space-y-3">
                        <h3 className="text-muted-foreground font-medium text-[13px]">{title}</h3>
                        {amount === undefined? <span className=" block animate-spin rounded-full h-4 w-4 border-b-2 border-megagreen my-2"></span> : (
                            <p className="text-[22px] font-semibold">
                                {title === 'Total User' ? amount : `₦${amount.toLocaleString()}`}
                                
                            </p>
                        )}
                    </div>
                    <div className={`w-13 h-13 flex items-center justify-center rounded-xl p-2 ${iconbg}`}>
                        {typeof icon === "string" ? (
                            <img src={icon} alt={title} className="w-6 h-auto object-contain" />
                        ) : (
                            // If it's a Lucide icon component, render it dynamically
                            createElement(icon, { className: "w-6 text-megagreen" })
                        )}
                        {/* <img src={icon} alt={title} className="w-7 h-auto object-contain" /> */}
                    </div>
                    

                </div>
                <p className="text-muted-foreground mt-3 px-2 text-xs">
                    <TrendingUp className="text-megagreen w-4 inline mr-2"/>
                    <span className="text-megagreen">{growth} {" "}</span> Up from yesterday
                </p>

            </CardContent>

        </>
    )
}

export default StatCard;