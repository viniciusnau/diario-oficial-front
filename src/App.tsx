import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import Status from './Pages/Status/Status';
import ProtectedRoute from './Auth/protectedRoute';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import React, { useState } from 'react';

function App() {
  const [colorInverted, setColorInverted] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [grayscale, setGrayscale] = useState(false);

  const handleColorInversion = () => {
    setColorInverted(prevState => !prevState);
  };

  const handleIncreaseFont = () => {
    setFontSize(prevSize => prevSize + 2);
  };

  const handleDecreaseFont = () => {
    setFontSize(prevSize => Math.max(prevSize - 2, 12));
  };

  const handleToggleGrayscale = () => {
    setGrayscale(prevState => !prevState);
  };

  return (
      <div className={`App ${colorInverted ? 'inverted-colors' : ''} ${grayscale ? 'grayscale' : ''}`} style={{ fontSize }}>
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
          <div className="accessibility-controls">
            <button onClick={handleColorInversion}>
              {colorInverted ? 'Restore Colors' : 'Invert Colors'}
            </button>
            <button onClick={handleIncreaseFont}>Increase Font</button>
            <button onClick={handleDecreaseFont}>Decrease Font</button>
            <button onClick={handleToggleGrayscale}>
              {grayscale ? 'Restore Color' : 'Grayscale'}
            </button>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
