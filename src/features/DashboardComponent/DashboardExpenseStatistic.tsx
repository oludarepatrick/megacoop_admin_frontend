import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {Cell, LabelList, Pie, PieChart } from "recharts";

// const chartData = [
//   { title: "Total Loan", amount: 245000, fill: "#FFBB38" },
//   { title: "Total Earn", amount: 293000, fill: "#343C6A" },
//   { title: "Total Saved", amount: 325000, fill: "#052014" },
//   { title: "Total Disbursed", amount: 323000, fill: "#14AE5C" },
// ];

const chartData = [
  { title: "Total Loan", amount: 245000, fill: "#FFBB38", offset: 5 },
  { title: "Total Earn", amount: 293000, fill: "#343C6A", offset: -5 },
  { title: "Total Saved", amount: 325000, fill: "#052014", offset: 5 },
  { title: "Total Disbursed", amount: 323000, fill: "#14AE5C", offset: -5 },
];


const totalAmount = chartData.reduce((sum, item) => sum + item.amount, 0);

// ✅ compute each slice's percentage dynamically
const processedData = chartData.map((item) => ({
  ...item,
  percent: ((item.amount / totalAmount) * 100).toFixed(0), // round to whole number
}));

const chartConfig = {
  "Total Loan": { label: "Total Loan", color: "#FFBB38" },
  "Total Earn": { label: "Total Earn", color: "#323C6A" },
  "Total Saved": { label: "Total Saved", color: "#052014" },
  "Total Disbursed": { label: "Total Disbursed", color: "#14AE5C" },
} satisfies ChartConfig;

const DashboardExpenseStatistic = () => {
  return (
    <Card className="px-4 py-4">
        <CardHeader className="flex justify-between px-2">
            <CardTitle className="text-xl font-semibold">Expense Statistics</CardTitle>
        </CardHeader>
        <CardContent>
            <ChartContainer
                config={chartConfig}
                className="[&_.recharts-text]:fill-background mx-auto aspect-11/12 min-h-[300px] max-h-[450px] w-full"
            >
            <PieChart>
                <ChartTooltip
                    content={<ChartTooltipContent nameKey="title" hideLabel />}
                />
                <Pie
                    data={processedData}
                    dataKey="amount"
                    className=""
                    outerRadius={80}                    
                >
                    {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} 
                    transform={`translate(${Math.cos((index * 2 * Math.PI) / chartData.length) * entry.offset}, 
                    ${Math.sin((index * 2 * Math.PI) / chartData.length) * entry.offset})`}
                    />
                    ))}
                    
                    <LabelList
                        dataKey="percent"
                        className="text-[10px] font-semibold"
                        style={{ fill: "#fff"}}
                        stroke="none"
                        formatter={(value: string) => `${value}%`}
                    />
                </Pie>

                <ChartLegend
                    content={<ChartLegendContent nameKey="title" />}
                    className="flex-col items-start"
                />
            </PieChart>
            </ChartContainer>
        </CardContent>
    </Card>
  );
};

export default DashboardExpenseStatistic;