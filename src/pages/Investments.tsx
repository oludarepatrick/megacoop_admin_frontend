import { Button } from "@/components/ui/button"
import InvestmentOverview from "@/features/InvestmentComponent/InvestmentOverview"
import InvestmenStatistic from "@/features/InvestmentComponent/InvestmentStatistic"
import RecentSubscribers from "@/features/InvestmentComponent/RecentSubscribers"
import TrendingInvestment from "@/features/InvestmentComponent/TrendingInvestment"
import { Plus } from "lucide-react"
import  { useSearchParams } from "react-router-dom"
import InvestTransaction from "./InvestTransaction"
import { useState } from "react"
import InvestmentWizard from "@/features/InvestmentComponent/InvestmentWizard"
import SuccessModal from "@/features/InvestmentComponent/SuccessModal"

const Investments = () => {
    const [investmentWizardOpen, setInvestmentWizardOpen ] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [searchParams] = useSearchParams() 
    const currentView = searchParams.get("view") || "investment"

    return (
        <div className="font-jakarta space-y-6">
            <div className="flex gap-6 items-center">
                <h2 className="font-semibold text-[20px]">Investment</h2>
                <Button className="bg-megaorange/80 text-white hover:bg-megaorange/70"
                    onClick={() => setInvestmentWizardOpen(true)}
                >
                    <Plus/> Add new Investment
                </Button>
            </div>
            {currentView === "transaction" ? (
                <InvestTransaction/>
            ) : (
                <>
                    <InvestmentOverview/>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                        <div className="lg:col-span-7">
                            <InvestmenStatistic/>
                        </div>
                        <div className="lg:col-span-5">
                            <TrendingInvestment/>
                        </div>
                    </div>
                    <RecentSubscribers/>
                </>
            )}

            {investmentWizardOpen && (
                <InvestmentWizard 
                    isOpen={investmentWizardOpen}
                    onClose={()=> setInvestmentWizardOpen(false)}
                    onSuccess={() => setSuccessModal(true)}
                />
            )}

            <SuccessModal 
                isOpen={successModal}
                onClose={()=> setSuccessModal(false)}
                title="New Investment has been added successfully"
            />
           
        </div>
    )
}

export default Investments