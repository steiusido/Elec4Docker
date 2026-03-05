import { Routes, Route, Navigate } from "react-router-dom";
import DepartmentSelect from "./Pages/DepartmentSelect";
import DepartmentAdminPage from "./Pages/DepartmentAdminPage";
import LandingAdminPage from "./Pages/LandingAdminPage";
import LandingPage from "./Pages/LandingPage";
import CEPage from "./Pages/departments/CE";
import CPEPage from "./Pages/departments/CPE";
import ECEPage from "./Pages/departments/ECE";
import EEPage from "./Pages/departments/EE";
import IEPage from "./Pages/departments/IE";
import MEPage from "./Pages/departments/ME";
import MEEPage from "./Pages/departments/MEE";
import MFEPage from "./Pages/departments/MFE";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<LandingAdminPage />} />
        <Route path="/departments" element={<DepartmentSelect />} />
        <Route path="/dept/CE" element={<CEPage />} />
        <Route path="/dept/CPE" element={<CPEPage />} />
        <Route path="/dept/ECE" element={<ECEPage />} />
        <Route path="/dept/EE" element={<EEPage />} />
        <Route path="/dept/IE" element={<IEPage />} />
        <Route path="/dept/ME" element={<MEPage />} />
        <Route path="/dept/MEE" element={<MEEPage />} />
        <Route path="/dept/MFE" element={<MFEPage />} />
        <Route path="/dept/:deptCode/admin" element={<DepartmentAdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
