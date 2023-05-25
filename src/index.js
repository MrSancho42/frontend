import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

import PersonalHeader from "./components/PersonalHeader";
import BusinessHeader from "./components/BusinessHeader";
import Intro from "./pages/common/Intro";
import Registration from "./pages/common/Registration"
import Login from "./pages/common/Login";
import PersonalMain from './pages/personal/PersonalMain';
import Businesses from './pages/business/Businesses'
import BusinessMain from './pages/business/BusinessMain';
import BusinessRecords from './pages/business/BusinessRecords';
import PersonalRecords from './pages/personal/PersonalRecords';
import PersonalBudgets from './pages/personal/PersonalBudgets';
import BusinessEmployeers from './pages/business/BusinessEmployeers';
import AccountingBook from './pages/business/AccountingBook';

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
          <Route path="accounting-book" element={<AccountingBook />} />
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
