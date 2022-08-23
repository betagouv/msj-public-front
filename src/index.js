import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import AcceptInvitation from "./pages/AcceptInvitation";
import Appointments from "./pages/Appointments";
import Agents from "./pages/Agents";
import Account from "./pages/Account";
import Appointment from "./pages/Appointment";
import reportWebVitals from "./reportWebVitals";

import "@gouvfr/dsfr/dist/dsfr/dsfr.css";
import "@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.css";
import "@gouvfr/dsfr/dist/utility/icons/icons-user/icons-user.css";
import "@gouvfr/dsfr/dist/utility/icons/icons-business/icons-business.css";

import "font-awesome/css/font-awesome.min.css";
import "./App.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <div className="static-wrapper">
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="sign_in" element={<Login />} exact />
            <Route
              path="accept_invitation"
              element={<AcceptInvitation />}
              exact
            />
            <Route path="appointments" element={<Appointments />} exact />
            <Route
              path="appointments/:appointmentId"
              element={<Appointment />}
            />
            <Route path="agent" element={<Agents />} exact />
            <Route path="convict" element={<Account />} exact />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>404 page non trouvée</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
