import { createElement } from "react";
import { CardContent, CardHeader } from "./ui/card";
import { EllipsisVertical, type LucideIcon} from "lucide-react";
import { Button } from "./ui/button";


type StatProps = {
    title: string;
    amount: number | undefined;
    icon: string | LucideIcon;
    iconColor?: string
    iconbg: string;
}

const StatCard= ({title, amount, icon, iconColor, iconbg}:StatProps) => {
    return (
        <>
            <CardHeader className="p-0 grid-cols-[2fr_auto]">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${iconbg}`}>
                    {typeof icon === "string" ? (
                        <img src={icon} alt={title} className="w-6 h-auto object-contain" />
                        ) : (
                        // If it's a Lucide icon component, render it dynamically
                        createElement(icon, { className:`w-6 ${iconColor}` })
                    )}
                </div>
                <EllipsisVertical/>
            </CardHeader>
            <CardContent className="px-0 pb-2">
                <h3 className="text-muted-foreground font-semibold text-[13px]">{title}</h3>
                <div className="flex justify-between items-center gap-2">
                    {/* <p className="text-[22px] font-bold">₦{amount.toLocaleString()}<span className="text-base">.00</span></p> */}
                    {amount === undefined? <span className=" block animate-spin rounded-full h-4 w-4 border-b-2 border-megagreen my-2"></span> : (
                        <p className="text-[20px] font-bold">
                           {title === "Active Investment" || title === "Pending Investment" ? amount : (
                             <>
                                ₦{(amount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                <span className="text-base">
                                    .{String(Number(amount).toFixed(2)).split(".")[1] || "00"}
                                </span>
                             </>
                           )}
                        </p>
                    )}
                    {title=== "Active Investment" && (
                        <Button size="sm" className="bg-megaorange/80 text-white hover:bg-megaorange/70 rounded-2xl text-xs px-4">
                                View
                        </Button>
                        
                    )}
                    
                </div>
            </CardContent>

        </>
    )
}

export default StatCard;