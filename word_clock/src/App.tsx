
import { Container, Row, Col } from "react-grid-system";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./App.css";

import Header from "./components/Header/Header.jsx";
import Configuration from "./components/Configuration/Configuration.jsx";
import Alarm from "./components/Alarm/Alarm.jsx";
import Settings from "./components/Settings/Settings.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isWideLayout = windowWidth > 850;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  if (isWideLayout) {
    return <WideLayout isWideLayout={isWideLayout} />;
  }
  return <NarrowLayout isWideLayout={isWideLayout} />;
}

function WideLayout({ isWideLayout }: { isWideLayout: boolean }) {
  return (
    <>
      <Header isWideLayout={isWideLayout} />
      <Container>
        <Row>
          <Col sm={4}><Configuration /></Col>
          <Col sm={4}><Alarm /></Col>
          <Col sm={4}><Settings /></Col>
        </Row>
      </Container>
    </>
  );
}

function NarrowLayout({ isWideLayout }: { isWideLayout: boolean }) {
  return (
    <Router>
      <Header isWideLayout={isWideLayout} />
        <Routes>  
          <Route path="/" element={<Configuration />} />
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
  );
}

