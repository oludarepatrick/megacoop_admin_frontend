import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleGenerateAccessCode = () => {
        navigate("/access-code");
    };
    return (
        <>
            <h1>Dashboard</h1>
            <Button
                onClick={handleGenerateAccessCode}
                className="mt-4"
            >
                Generate Access Code
            </Button>

        </>
    )
}

export default Dashboard;