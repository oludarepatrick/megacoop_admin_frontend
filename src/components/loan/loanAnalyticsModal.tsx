import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  // BarChart,
  // Bar,
  // LineChart,
  // Line,
  PieChart,
  Pie,
  Cell,
  // XAxis,
  // YAxis,
  // CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts"


interface LoanAnalyticsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  analyticsData: {
    monthlyApprovals: Array<{ month: string; approved: number; pending: number; rejected: number }>
    loansByStatus: Array<{ name: string; value: number; fill: string }>
    disbursalTrend: Array<{ week: string; amount: number }>
  }
}

export function LoanAnalyticsModal({ open, onOpenChange, analyticsData }: LoanAnalyticsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" !max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex items-center ">
          <DialogTitle>Loan Performance Analytics</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-1 w-full p-0">
          {/* Monthly Approvals */}
          {/* <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">Monthly Loan Approvals</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={analyticsData.monthlyApprovals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#22c55e" />
                <Bar dataKey="pending" fill="#f59e0b" />
                <Bar dataKey="rejected" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div> */}

          {/* Loans by Status */}
          <div className="space-y-2">
            {/* <h3 className="text-sm font-semibold text-gray-900">Loans by Status</h3> */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.loansByStatus}
                  cx="35%"
                  cy="50%"
                  labelLine={true}
                  label={(entry) => entry.name}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.loansByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col w-3/4 lg:w-full">
                {analyticsData.loansByStatus.map((status) => (
                  <div key={status.name} className="flex items-start justify-start md:items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: status.fill }}
                    ></div>
                    <span className="text-sm text-gray-700">
                      {status.name}: {status.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disbursal Trend */}
          {/* <div className="lg:col-span-2 space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">Weekly Disbursal Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analyticsData.disbursalTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
