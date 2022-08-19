import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";

import "./App.css";
import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/sign_in" element={<Login />} exact />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>404 page non trouvée</p>
              </main>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
