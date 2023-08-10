import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/Login";
import Status from "./Pages/Status/Status";
import ProtectedRoute from "./Auth/protectedRoute";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetar-senha" element={<ResetPassword />} />
            <Route
              path="/status"
              element={<ProtectedRoute Component={Status} path="/status" />}
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
