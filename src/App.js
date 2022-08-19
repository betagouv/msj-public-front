import { Routes, Route } from "react-router-dom"

import Header from "./components/Header";

import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />

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
    </>
  );
}

export default App;
