
import { Container, Row, Col } from "react-grid-system";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./App.css";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Configuration from "./components/Configuration/Configuration.jsx";
import Alarm from "./components/Alarm/Alarm.jsx";
import Settings from "./components/Settings/Settings.jsx";
import WordClock from "./components/WordClock/WordClock.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isWideLayout = windowWidth > 995;

  useEffect(() => {
    const handleWindowResize = () => { setWindowWidth(window.innerWidth); };
    window.addEventListener('resize', handleWindowResize);
    return () => { window.removeEventListener('resize', handleWindowResize); };
  });

  if (isWideLayout) {
    return <>
      <WideLayout isWideLayout={isWideLayout} />
      <br />
      <Footer windowWidth={windowWidth}/>
    </>
  }
  return <>
    <NarrowLayout isWideLayout={isWideLayout} />
    <br /><br />
    <Footer windowWidth={windowWidth}/>
  </>
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
          <Route path="/wordclock" element={<WordClock />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
  );
}

