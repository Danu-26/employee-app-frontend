import { BrowserRouter, Routes, Route } from "react-router-dom";
import DepartmentPage from "./pages/DepartmentPage.jsx";
import EmployeePage from "./pages/EmployeePage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<DepartmentPage />} />
          <Route path="/employees" element={<EmployeePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
