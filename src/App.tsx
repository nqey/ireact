import React from 'react';
import {Container, Header, Main, Footer, Aside, Row, Col} from 'src/basic';
import './app.css';

const App: React.FC = () => {
  return (
    <Container>
      <Aside width="200px">Aside</Aside>
      <Container direction="vertical">
        <Header>Header</Header>
        <Main>
          <Row gutter={10}>
            <Col xs={8} sm={6} md={4} lg={6} xl={1}>
              <div className="grid-content bg-purple">col-1</div>
            </Col>
            <Col xs={8} sm={6} md={4} lg={6} xl={1}>
              <div className="grid-content bg-purple">col-2</div>
            </Col>
            <Col xs={8} sm={6} md={4} lg={6} xl={1}>
              <div className="grid-content bg-purple">col-3</div>
            </Col>
            <Col xs={8} sm={6} md={4} lg={6} xl={1}>
              <div className="grid-content bg-purple">col-4</div>
            </Col>
          </Row>
        </Main>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  );
}

export default App;
