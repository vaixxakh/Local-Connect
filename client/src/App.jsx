import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthModal from "./components/AuthModal";
import { Toaster } from "react-hot-toast";

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const openAuth = () => setIsAuthOpen(true);
const closeAuth = () => setIsAuthOpen(false);

  return (
    <>
    <AppRoutes onLoginClick={openAuth} />
    <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
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