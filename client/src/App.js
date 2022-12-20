import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorPage } from "./components/ErrorPage/ErrorPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
