import { Routes, Route, Navigate } from "react-router-dom";
import MFEPage from "./Pages/departments/MFE";
import MFEAdminPage from "./Pages/admin/MFEAdmin";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* The root URL now loads the MFE Page directly */}
        <Route path="/" element={<MFEPage />} />
        
        {/* The main admin route now goes straight to the MFE Admin */}
        <Route path="/admin" element={<MFEAdminPage />} />
        
        {/* Optional: Keep this if you want explicit /dept/MFE to still work, 
            though it's redundant since / is already MFE */}
        <Route path="/dept/MFE" element={<Navigate to="/" replace />} />
        <Route path="/dept/MFE/admin" element={<Navigate to="/admin" replace />} />

        {/* Catch-all: Redirects any unknown URLs back to the MFE home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}