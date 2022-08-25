
import Banner from "./components/Banner/Banner";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
     <Banner />
     <Outlet />
    </>
  );
}

export default App;
