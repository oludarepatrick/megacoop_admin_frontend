import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartConfig } from "@/components/ui/chart";
import { Cell, LabelList, Pie, PieChart } from "recharts";

const chartData = [
    { title: "ROI", value: 30000, fill: "#10B981"},
    { title: "Total Raised", value: 120000, fill: "#212735"},
]

const totalAmount = chartData.reduce((sum, item) => sum + item.value, 0);
const cummulativeData = chartData.map(item => ({
    ...item,
    percent: ((item.value / totalAmount) * 100).toFixed(0),
}));

const chartConfig = {
    "total-raised" : {label: "Total Raised", color: "#212735"},
    "roi" : {label: "ROI", color: "#10B981"},
} satisfies ChartConfig

type LegendProps ={
    config: ChartConfig;
    className?: string
}

const InvestmenStatistic = () => {
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
                            data={cummulativeData}
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