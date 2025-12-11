import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart";
import { useInvestmentData } from "@/hooks/useInvestment";
import { Cell, LabelList, Pie, PieChart } from "recharts";


const chartConfig = {
    "total-raised" : {label: "Total Raised", color: "#212735"},
    "roi" : {label: "ROI", color: "#10B981"},
} satisfies ChartConfig

type LegendProps ={
    config: ChartConfig;
    className?: string
}

const InvestmenStatistic = () => {
    const {data, isLoading } = useInvestmentData();

    if(isLoading || !data) return <p>Loading analytics...</p>

    const value = data.piechart


    const chartData = [
        { title: "ROI", value: value.total_roi, fill: "#10B981", percent: value.roi_percentage},
        { title: "Total Raised", value: value.amount_raised, fill: "#212735", percent: value.amount_percentage},
    ]

    // const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);
    // const cummulativeData = chartData.map(item => ({
    //     ...item,
    //     percent: ((item.value / totalAmount) * 100).toFixed(0),
    // }));

    const CustomLegend = ({config, className}:LegendProps) => {
        return (
            <div className={`flex flex-col gap-3 ${className}`}>
                {Object.entries(config).map(([key, item]) => (
                    <div key={key} className="flex items-center gap-4 ">
                        <div
                            className="w-4 h-4 rounded-sm"
                            style={{backgroundColor: item.color}}
                        />
                        <span className="text-sm font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <Card className="border-none shadow-none py-0 ">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Analytic Comparing Total raised and ROI</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center px-0">
                <div>
                    <PieChart width={250} height={250}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                        >
                            {chartData.map((entry, index)=> (
                                <Cell key={index} fill={entry.fill} />
                            ))}
                            <LabelList
                                dataKey="percent"
                                className="text-[10px] font-semibold"
                                style={{fill: "#fff"}}
                                stroke="none"
                                formatter={(value: string) => `${value}%`}
                            />
                        </Pie>
                    </PieChart>
                </div>
                <CustomLegend config={chartConfig} className="" />
            </CardContent>
        </Card>
    )
}

export default InvestmenStatistic;