import { useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PDFViewer from "./Pages/PDFViewer/PDFViewer"
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/Login";
import Status from "./Pages/Status/Status";
import ProtectedRoute from "./Auth/protectedRoute";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import A11y from "./Components/A11y/A11y";

function App() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [colorInverted, setColorInverted] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [grayscale, setGrayscale] = useState(false);
  const [customCursor, setCustomCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(true);
  const handleMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => {
    if (cursorRef.current) {
      const cursorStyle = cursorRef.current.style;
      cursorStyle.top = mousePosition.y + "px";
      cursorStyle.left = mousePosition.x + "px";
      setTimeout(() => {
        cursorStyle.display = "block";
      }, 1);
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.style.display = "none";
    }
  };

  const handleOutsideClick = () => {
    setIsOpenModal(true);
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
          cursor: `${customCursor ? "none" : "auto"}`,
          "--cursor-pointer": `${customCursor ? "none" : "pointer"}`,
          "--cursor-not-allowed": `${customCursor ? "none" : "not-allowed"}`,
          "--cursor-default": `${customCursor ? "none" : "default"}`,
          "--cursor-text": `${customCursor ? "none" : "text"}`,
        } as any
      }
      onMouseEnter={customCursor ? handleMouseEnter : undefined}
      onMouseLeave={customCursor ? handleMouseLeave : undefined}
      onMouseMove={customCursor ? handleMouseMove : undefined}
      onClick={handleOutsideClick}
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
            <Route path="/pdf-viewer/:pdfId" element={<PDFViewer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetar-senha" element={<ResetPassword />} />
            <Route
              path="/status"
              element={<ProtectedRoute Component={Status} path="/status" />}
            />
          </Routes>
        </main>
        <A11y
          setColorInverted={setColorInverted}
          colorInverted={colorInverted}
          setFontSize={setFontSize}
          setGrayscale={setGrayscale}
          grayscale={grayscale}
          setCustomCursor={setCustomCursor}
          mousePosition={mousePosition}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
