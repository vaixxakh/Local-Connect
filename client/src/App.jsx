import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthModal from "./components/AuthModal";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import { useNavigate } from "react-router-dom";


function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [authRole, setAuthRole] = useState("finder");

  const openAuth = (tab = "login", role = "finder") => {
    setAuthTab(typeof tab === "string" ? tab : "login");
    setAuthRole(typeof role === "string" ? role : "finder");
    setIsAuthOpen(true);
  };

  const closeAuth = () => setIsAuthOpen(false);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "provider") {
      navigate("/provider-dashboard");
    }
  }, []);

  return (
    <>
      {role !== "provider" ? (
        
          <AppRoutes onLoginClick={openAuth} />
       
      ) : (
        <AppRoutes onLoginClick={openAuth} />
      )}

      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} initialTab={authTab} initialRole={authRole} />

      <Toaster
        position="bottom-center"
        containerStyle={{ bottom: "80px" }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#725c5c38",
            color: "#043117",
            borderRadius: "10px",
            padding: "12px 16px",
          },
        }}
      />
    </>
  );
}
export default App;