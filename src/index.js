import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonalHeader from "./components/PersonalHeader";
import BusinessHeader from "./components/BusinessHeader";
import Intro from "./pages/Intro";
import 'bootstrap/dist/css/bootstrap.min.css'
import Registration from "./pages/Registration"
import Login from "./pages/Login";
import axios from 'axios';
import PersonalMain from './pages/PersonalMain';
import Businesses from './pages/Businesses'
import BusinessMain from './pages/BusinessMain';
import BusinessRecords from './pages/BusinessRecords';
import PersonalRecords from './pages/PersonalRecords';
import PersonalBudgets from './pages/PersonalBudgets';
import BusinessEmployeers from './pages/BusinessEmployeers';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Intro />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="business">
        <Route path="list" element={<Businesses />} />
        <Route element={<BusinessHeader />} >
          <Route path="main" element={<BusinessMain />} />
          <Route path="records" element={<BusinessRecords />} />
          <Route path="employeers" element={<BusinessEmployeers />} />
        </Route>
      </Route>
      <Route path="personal" element={<PersonalHeader />}>
        <Route path="main" element={<PersonalMain />} />
        <Route path="records" element={<PersonalRecords />} />
        <Route path="budgets" element={<PersonalBudgets />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
);
