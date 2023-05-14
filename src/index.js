import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonalHeader from "./components/PersonalHeader";
import BusinessHeader from "./components/BusinessHeader";
import Intro from "./pages/Intro";
import 'bootstrap/dist/css/bootstrap.min.css'
import Registration from "./pages/Registration"
import Login from "./pages/Login";
import axios from 'axios';
import BusinessesList from './pages/BusinessesList';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Intro />} />
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="business">
        <Route path="list" element={<BusinessesList />} />
        <Route path="main" element={<BusinessHeader />} >
        </Route>
      </Route>
      <Route path="personal" element={<PersonalHeader />}>
        <Route path="main"/>
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
