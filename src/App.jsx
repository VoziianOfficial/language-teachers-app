import { lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";


const Home = lazy(() => import("../src/pages/Home/Home.jsx"));
const Teachers = lazy(() => import("../src/pages/Teachers/Teachers.jsx"));


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/">
        <Route index path="home" element={<Home />} />
        <Route path="teachers" element={<Teachers />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;
