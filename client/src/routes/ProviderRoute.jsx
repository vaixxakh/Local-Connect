import { Navigate } from "react-router-dom";

export default function ProviderRoute({ children }) {

    let user = null;

    try {
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedUser !== "undefined") {
            user = JSON.parse(storedUser);
        }

    } catch {
        user = null;
    }

    if (user?.role !== "provider") {
        return <Navigate to="/" />;
    }

    return children;
}