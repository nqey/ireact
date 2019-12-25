import React from 'react';
import {Container, Header, Main, Footer, Aside, Row, Col, Button, Progress} from 'src/basic';
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
              <div className="grid-content bg-purple">
                <Button circle loading onClick={():void => alert(1)}>默认按钮</Button>
                <Button type="primary" onClick={():void => alert(1)}>主要按钮</Button>
                <Button type="success">成功按钮</Button>
                <Button type="info">信息按钮</Button>
                <Button type="warning">警告按钮</Button>
                <Button type="danger">危险按钮</Button>
              </div>
            </Col>
            <Col xs={
              {
                span:5,
                push:2
              }
            } sm={6} md={4} lg={6} xl={1}>
              <div className="grid-content bg-purple">
                <Progress type="dashboard" percentage={50}></Progress>
                <Progress type="circle" percentage={0}></Progress>
                <Progress type="circle" percentage={25}></Progress>
                <Progress type="circle" percentage={100} status="success"></Progress>
                <Progress type="circle" percentage={70} status="warning"></Progress>
                <Progress type="circle" percentage={50} status="exception"></Progress>
                <Progress percentage={50} color="#f56c6c"></Progress>
                <Progress percentage={20} color="#e6a23c"></Progress>
                <Progress percentage={80} color="#5cb87a"></Progress>
              </div>
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