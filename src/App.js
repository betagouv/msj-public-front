import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Banner from "./components/Banner/Banner";

import "./App.scss";
// import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import "@gouvfr/dsfr/dist/dsfr/dsfr.css";
import "@gouvfr/dsfr/dist/dsfr/dsfr.module.min.js";
// import 'font-awesome/css/font-awesome.min.css'
import Login from "./pages/Login";
import AcceptInvitation from "./pages/AcceptInvitation";
import Appointments from "./pages/Appointments";
import Agents from "./pages/Agents";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <Router>
        <Banner />
        <div className="static-wrapper">
          <Routes>
            <Route path="/sign_in" element={<Login />} exact />
            <Route
              path="/accept_invitation"
              element={<AcceptInvitation />}
              exact
            />
            <Route path="/appointments" element={<Appointments />} exact />
            <Route path="/agent" element={<Agents />} exact />
            <Route path="/convict" element={<Account />} exact />

            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>404 page non trouvée</p>
                </main>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
