import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/Login";
import Status from "./Pages/Status/Status";
import ProtectedRoute from "./Auth/protectedRoute";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { useState } from "react";

function App() {
  const [colorInverted, setColorInverted] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [grayscale, setGrayscale] = useState(false);

  const handleColorInversion = () => {
    setColorInverted((prevState) => !prevState);
  };

  const handleFontChange = (action: string) => {
    switch (action) {
      case "increase":
        setFontSize((prevSize) => Math.min(prevSize + 0.25, 2));
        break;
      case "decrease":
        setFontSize((prevSize) => Math.max(prevSize - 0.25, 0.75));
        break;
      case "reset":
        setFontSize(1);
        break;
    }
  };

  const handleToggleGrayscale = () => {
    setGrayscale((prevState) => !prevState);
  };

  return (
    <div
      className={`App ${colorInverted ? "invert-colors" : ""} ${
        grayscale ? "grayscale" : ""
      }`}
      style={
        {
          fontSize: `${fontSize}rem`,
          "--font-size": `${fontSize}rem`,
        } as any
      }
    >
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
        <div className="controls">
          <button onClick={handleColorInversion}>
            {colorInverted ? "Restore Colors" : "Invert Colors"}
          </button>
          <button onClick={() => handleFontChange("increase")}>
            Increase Font
          </button>
          <button onClick={() => handleFontChange("reset")}>Reset Font</button>
          <button onClick={() => handleFontChange("decrease")}>
            Decrease Font
          </button>
          <button onClick={handleToggleGrayscale}>
            {grayscale ? "Restore Color" : "Grayscale"}
          </button>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
