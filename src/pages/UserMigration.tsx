import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { BuyOnCreditForm } from "@/features/UserMigrationComponent/BuyOnCreditForm"
import { LoanForm } from "@/features/UserMigrationComponent/LoanForm"
import { NhfSavingsForm } from "@/features/UserMigrationComponent/NHFSavingsForm"
import { TargetSavingsForm } from "@/features/UserMigrationComponent/TargetSavingsForm"
import { WalletBalanceForm } from "@/features/UserMigrationComponent/WalletBalanceForm"
import { CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, 
    // useSearchParams 
} from "react-router-dom"

// UserMigrationPage.tsx

const ALL_SECTIONS = [
    { id: "wallet",  label: "Wallet Balance"  },
    { id: "nhf",     label: "NHF Savings"     },
    { id: "savings", label: "Target Savings"  },
    { id: "loan",    label: "Loan Record"     },
    { id: "credit",  label: "Buy on Credit"   },
]

const UserMigration = () => {
    const location  = useLocation()
    const navigate = useNavigate()
    const { userId, fullName, email } = (location.state) ?? {}
    
    // const [searchParams, setSearchParams] = useSearchParams();
    // const tabFromUrl = searchParams.get("view") ?? ""
    
    const [selectedSections, setSelectedSections] = useState<string[]>([])
    const [migrationStarted, setMigrationStarted] = useState(false)
    const [activeTab, setActiveTab] = useState<string>("")
    const [completedSections, setCompletedSections] = useState<string[]>([])

    useEffect(() => {
        if (!userId) {
            navigate("/kyc")
            return 
        }
    }, []);


    // const handleTabChange = (tab: string) => {
    //     setActiveTab(tab)
    //     setSearchParams({view: tab}, {replace: true})
    // }


    const markComplete = (section: string) => {
        setCompletedSections(prev =>
            prev.includes(section) ? prev : [...prev, section]
        )
    }

    const handleToggleSection = (id: string) => {
        setSelectedSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    const handleProceed = () => {
        if (selectedSections.length === 0) return
        const firstTab = selectedSections[0]
        setActiveTab(firstTab)
        setMigrationStarted(true)
        // setSearchParams({ view: firstTab }, { replace: true })
    }


    // ── Step 1 UI — section selector ──────────────────────────────
    if (!migrationStarted) {
        return (
            <div className="font-jakarta max-w-xl mx-auto space-y-6">
                <div>
                    <h2 className="font-semibold text-lg">Select records to migrate</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Choose only the records that exist for <span className="font-bold">{fullName}</span>. 
                    </p>
                </div>

                <div className="space-y-3">
                    {ALL_SECTIONS.map(section => (
                        <label
                            key={section.id}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedSections.includes(section.id)
                                    ? "border-megagreen bg-megagreen/5"
                                    : "border-gray-200 hover:border-megagreen/40"
                            }`}
                        >
                            <Checkbox
                                checked={selectedSections.includes(section.id)}
                                onCheckedChange={() => handleToggleSection(section.id)}
                            />
                            <span className="text-sm font-medium">{section.label}</span>
                        </label>
                    ))}
                </div>

                <Button
                    onClick={handleProceed}
                    disabled={selectedSections.length === 0}
                    className="w-full bg-megagreen hover:bg-megagreen/90"
                >
                    Proceed to Migration ({selectedSections.length} section{selectedSections.length !== 1 ? "s" : ""} selected)
                </Button>
            </div>
        )
    }

    // ── Step 2 UI — migration tabs (only selected sections) ───────
    const doneSections   = completedSections.length
    const totalSections  = selectedSections.length
    const allDone        = doneSections === totalSections

    return (
        <div className="font-jakarta space-y-6">
            {/* Banner */}
            <div className="flex items-center gap-3 p-4 bg-megagreen/5 border border-megagreen/20 rounded-xl">
                <div className="flex-1">
                    <p className="font-semibold">Migrating: {fullName}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                </div>
                <span className="text-xs text-megagreen font-medium">
                    {doneSections} / {totalSections} done
                </span>
            </div>

            {/* All done state */}
            {allDone && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle2 className="text-megagreen h-5 w-5 shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-green-800">Migration complete</p>
                        <p className="text-xs text-green-600">
                            All {totalSections} selected records have been migrated successfully.
                        </p>
                    </div>
                </div>
            )}

            {/* Only render tabs for selected sections */}
            <div className="flex gap-2 flex-wrap">
                {ALL_SECTIONS.filter(s => selectedSections.includes(s.id)).map(section => (
                    <button
                        key={section.id}
                        onClick={() => setActiveTab(section.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 border transition-all ${
                            activeTab === section.id
                                ? "bg-megagreen text-white border-megagreen"
                                : completedSections.includes(section.id)
                                ? "border-megagreen text-megagreen"
                                : "border-gray-200 text-gray-600 hover:border-megagreen/40"
                        }`}
                    >
                        {completedSections.includes(section.id) && (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                        {section.label}
                    </button>
                ))}
            </div>

            {/* Active form */}
            <div className=" sm:max-w-xl mx-auto border  rounded-xl p-6">
                {activeTab === "wallet"  && <WalletBalanceForm  userId={userId} onSuccess={() => { markComplete("wallet");  
                    // goToNext("wallet")  
                }} />}
                {activeTab === "nhf" && <NhfSavingsForm userId={userId} onSuccess={() => { markComplete("nhf")  }} />}
                {activeTab === "savings" && <TargetSavingsForm  userId={userId} onSuccess={() => { markComplete("savings") }} />}
                {activeTab === "loan" && <LoanForm userId={userId} onSuccess={() => { markComplete("loan") }} />}
                {activeTab === "credit"  && <BuyOnCreditForm userId={userId} onSuccess={() => { markComplete("credit") }} />}
            </div>
        </div>
    )
}

export default UserMigration;