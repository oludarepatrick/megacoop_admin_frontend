import { Card, CardContent } from "@/components/ui/card"
import { Users, Banknote, TrendingUp, EllipsisVertical, BanknoteArrowUp, TriangleAlert } from "lucide-react"
import { motion } from "framer-motion"
import { LoaderIcon } from "../PageLoader"

interface LoanStatisticsCardsProps {
  statistics: {
    totalApplicants: number
    totalLoans: number
    totalDisbursed: number
    totalDefaulted: number
    interestEarned: number
  },
  isLoading?: boolean
}

export function LoanStatisticsCards({ statistics, isLoading }: LoanStatisticsCardsProps) {
  const formatCurrency = (value: number) => {
    return value?.toLocaleString("en-NG", { style: "currency", currency: "NGN" })
    // return `₦${(value / 1000000).toFixed(1)}M`
  }

  const cards = [
    {
      title: "Total Loan Applicant",
      value: statistics?.totalApplicants.toLocaleString(),
      icon: Users,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Loan",
      value: formatCurrency(statistics?.totalLoans),
      icon: Banknote,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Disburse",
      value: formatCurrency(statistics?.totalDisbursed),
      icon: BanknoteArrowUp,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Total Default",
      value: formatCurrency(statistics?.totalDefaulted),
      icon: TriangleAlert,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Interest Earn",
      value: formatCurrency(statistics?.interestEarned),
      icon: TrendingUp,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      badge: "+129%",
    },
  ]

  return (
    
    // <div className="flex overflow-x-auto overflow-y-hidden border gap-4 scrollbar-hide w-full h-full ">
      <div className="w-full h-full gap-4 flex overflow-y-hidden overflow-x-auto xl:overflow-visible xl:grid xl:grid-cols-5 scrollbar-hide">

      {cards.map((card, index) => (
            <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-stretch justify-between flex-shrink-3"
                        // className="flex-shrink-0 lg:flex-shrink"
                    >
              <Card
                  //   className="flex-shrink-0  min-w-[280px] md:min-w-0 border border-gray-200"
                  className=" md:min-w-[120px] max-w-[240px] rounded-2xl shadow-sm w-[240px] "
              >
            <CardContent className="px-2 space-y-3">
              <div className="flex items-center justify-between">
                <div className={`${card.bgColor} rounded-full p-3 w-fit`}>
                  <card.icon className={`${card.iconColor} w-5 h-5`} />
                </div>
                <EllipsisVertical className="text-gray-400 w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs md:text-sm text-gray-600 font-medium">{card.title}</p>
                  {card.badge && <span className="text-xs font-semibold text-green-600">{card.badge}</span>}
                </div>
                {/* <p className="text-lg md:text-xl font-bold text-gray-900">{card.value}</p> */}
                {isLoading ? (
                  <LoaderIcon />
                ) : (
                  <p className="text-lg md:text-md font-bold">{card.value}</p>
                )}
              </div>
            </CardContent>
                  </Card>
            </motion.div>
        ))}
      {/* </div> */}
    </div>
  )
}
