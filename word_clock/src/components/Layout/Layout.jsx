import { Container, Row, Col } from "react-grid-system";
import "./Layout.css";

import Header from "../Header/Header.jsx";
import Configuration from "../Configuration/Configuration.jsx";
import Alarm from "../Alarm/Alarm.jsx";
import Settings from "../Settings/Settings.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col sm={4}>
            <Configuration />
          </Col>
          <Col sm={4}>
            <Alarm />
          </Col>
          <Col sm={4}>
            <Settings />
          </Col>
        </Row>
      </Container>
    </>
  );
}
