import { Navigate } from "react-router-dom";

export default function ProviderRoute({ children }) {
    
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role !== "provider") {
        return <Navigate to="/" />;
    }
    return children;
}