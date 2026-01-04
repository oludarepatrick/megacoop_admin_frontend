import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ReportFilters, ReportType } from "@/types/reports"
import { useState } from "react"


type FilterFieldProps = {
    onFilter: (filter: ReportFilters) => void
    isPending: boolean
}
const FilterField = ({onFilter, isPending} : FilterFieldProps) => {
    const [filter, setFilter] = useState<ReportFilters>({
        type: "loans",
        year: new Date().getFullYear().toString(),
        from: "",
        to: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onFilter(filter);
        console.log(filter);
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-8 gap-y-4 mb-6 [&_div]:space-y-3 [&_div]:text-xs flex-wrap">
            <div>
                <Label className="text-xs">Transaction Type</Label>
                <Select
                    disabled={isPending}
                    value={filter.type}
                    onValueChange={(value: ReportType) => {
                        setFilter(prev => ({...prev, type: value}));
                    }}
                >
                    <SelectTrigger className="w-full px-3 py-2 border border-megagreen rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="loans">Loans</SelectItem>
                        <SelectItem value="investments">Investments</SelectItem>
                        <SelectItem value="orders">Orders</SelectItem>
                        <SelectItem value="wallet-transactions">Funding</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="buy-on-credit">Credit</SelectItem>
                        <SelectItem value="buy-on-credit-payments">Credit Payment</SelectItem>
                        <SelectItem value="roi">ROI</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="year">year</Label>
                <Select
                    disabled={isPending}
                    value ={filter.year}
                    onValueChange={(value: ReportType) => {
                        setFilter(prev => ({...prev, year: value}));
                    }}
                >
                    <SelectTrigger className="w-full px-3 py-2 border border-megagreen rounded-md focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg">
                        <SelectValue placeholder="2025" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                    </SelectContent>
                </Select>
                
            </div>
            <div>
                <Label htmlFor="start-date">from</Label>
                <Input 
                    type="date" 
                    placeholder="mm/dd/yy"
                    value = {filter.from}
                    onChange = {(e) => setFilter(prev => ({...prev, from: e.target.value}))}
                    className="px-3 py-2 border border-megagreen rounded-sm focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg" 
                />
            </div>
            <div>
                <Label htmlFor="end-date">to</Label>
                <Input 
                    type="date" 
                    placeholder="mm/dd/yy"
                    value = {filter.to}
                    onChange = {(e) => setFilter(prev => ({...prev, to: e.target.value}))}
                    className="px-3 py-2 border border-megagreen rounded-sm focus:!outline-none focus:!ring-1 focus:!ring-megagreen focus:!shadow-lg" 
                />    
            </div>
            <div>
                <Label className="invisible">Generate button</Label>
                <Button 
                    type="submit" 
                    className="bg-megagreen hover:bg-megagreen/90 text-white font-semibold py-2 px-4 rounded-sm"
                    disabled={isPending}
                >
                    {isPending ? "Generating..." : "Generate"}
                </Button>
            </div>

        </form>
    )
}

export default FilterField;
