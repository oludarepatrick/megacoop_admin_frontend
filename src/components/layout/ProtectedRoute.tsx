import { useAuthStore } from "@/store/authStore"
import {Navigate} from "react-router-dom"
import PageLoader from "../PageLoader"
import MainLayout from "./MainLayout"


const ProtectedRoute = () =>{
    const { isAuthenticated, isLoading } = useAuthStore()

    if(isLoading){
        return <PageLoader/>
    }

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <MainLayout/>

}

export default ProtectedRoute;