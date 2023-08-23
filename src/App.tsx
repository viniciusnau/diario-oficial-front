import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/Login";
import Status from "./Pages/Status/Status";
import ProtectedRoute from "./Auth/protectedRoute";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import { useEffect, useRef, useState } from "react";
import Button from "./Components/Forms/Button";

function App() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [colorInverted, setColorInverted] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [grayscale, setGrayscale] = useState(false);
  const [customCursor, setCustomCursor] = useState(false);
  // const [isClicked, setClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: any) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

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

  const handleCursorSize = () => {
    setCustomCursor((prevSize) => !prevSize);
    if (cursorRef.current) {
      cursorRef.current.classList.toggle("large-cursor");
    }
  };

  useEffect(() => {
    const cursor = cursorRef.current;

    const onMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "block";
        cursorRef.current.style.top = mousePosition.y + "px";
        cursorRef.current.style.left = mousePosition.x + "px";
        cursorRef.current.style.transformOrigin = "center center";
      }
    };

    const onMouseOut = () => {
      if (cursor) {
        cursor.style.display = "none";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [mousePosition]);

  return (
    <div
      className={`App ${colorInverted ? "invert-colors" : ""} ${
        grayscale ? "grayscale" : ""
      }`}
      style={
        {
          fontSize: `${fontSize}rem`,
          "--font-size": `${fontSize}rem`,
          cursor: `${customCursor ? "none" : "auto"}`,
          "--cursor-pointer": `${customCursor ? "none" : "pointer"}`,
          "--cursor-not-allowed": `${customCursor ? "none" : "not-allowed"}`,
          "--cursor-default": `${customCursor ? "none" : "default"}`,
        } as any
      }
      onMouseMove={handleMouseMove}
    >
      <div
        ref={cursorRef}
        className={`${customCursor ? "cursor" : ""}`}
        style={{
          top: customCursor ? mousePosition.y + "px" : "auto",
          left: customCursor ? mousePosition.x + "px" : "auto",
        }}
      />
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
          <Button onClick={handleColorInversion}>
            {colorInverted ? "Restore Colors" : "Invert Colors"}
          </Button>
          <Button onClick={() => handleFontChange("increase")}>
            Increase Font
          </Button>
          <Button onClick={() => handleFontChange("reset")}>Reset Font</Button>
          <Button onClick={() => handleFontChange("decrease")}>
            Decrease Font
          </Button>
          <Button onClick={handleToggleGrayscale}>
            {grayscale ? "Restore Color" : "Grayscale"}
          </Button>
          <Button onClick={handleCursorSize}>Toggle cursor size</Button>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
