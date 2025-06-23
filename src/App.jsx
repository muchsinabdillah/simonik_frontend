import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import NavbarLayout from "./Components/NavbarLayout";
import Home from "./pages/Home";
import MasterPegawai from "./pages/MasterPegawai";
import MasterDepartment from "./pages/MasterDepartment";
import MasterUnit from "./pages/MasterUnit";
import MasterProfesi from "./pages/MasterProfesi";
import MasterJenisMonitoring from "./pages/MasterJenisMonitoring";
import MasterMonitoringDetail from "./pages/MasterMonitoringDetail";
import MasterUser from "./pages/MasterUser";
import GantiPassword from "./pages/GantiPassword";
import Account from "./pages/Account";
import GrafikBulanan from "./pages/GrafikBulanan";
import MonitoringMenu from "./pages/MonitoringMenu";
import FasilitasHHPage from "./pages/FasilitasHHPage";
import PrivateRoute from "./Components/PrivateRoute";
import FormTrsFasilitasHH from "./pages/FormTrsFasilitasHH";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/simonik/login" element={<Login />} />

        {/* Protected route */}
        <Route element={<PrivateRoute />}>
          <Route path="/simonik" element={<NavbarLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="master/department" element={<MasterDepartment />} />
            <Route path="master/unit" element={<MasterUnit />} />
            <Route path="master/profesi" element={<MasterProfesi />} />
            <Route path="master/pegawai" element={<MasterPegawai />} />
            <Route path="master/monitoring/jenis" element={<MasterJenisMonitoring />} />
            <Route path="master/monitoring/detail" element={<MasterMonitoringDetail />} />
            <Route path="master/user" element={<MasterUser />} />
            <Route path="ganti-password" element={<GantiPassword />} />
            <Route path="laporan/grafik" element={<GrafikBulanan />} />
            <Route path="akun" element={<Account />} />

            {/* Monitoring menu */}
            <Route path="monitoring" element={<MonitoringMenu />} />
            {/* Fasilitas HH + Table Header Monitoring */}
            <Route path="fasilitas-hh" element={<FasilitasHHPage />} />
            <Route path="fasilitas-hh/form-trs-fasilitashh" element={<FormTrsFasilitasHH/>} />

          </Route>
        </Route>

        {/* Redirect fallback */}
        <Route path="*" element={<Navigate to="/simonik/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
