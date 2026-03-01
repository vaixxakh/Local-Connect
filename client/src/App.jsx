import { useState } from "react";
import Login from "./pages/Login";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
    <AppRoutes onLoginClick={() => setIsLoginOpen(true)} />
      {isLoginOpen && (
        <Login isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} />
      )}
      
    </>
  );
}

export default App;