import React from 'react';
import {
  Container,
  Header,
  Main,
  Footer,
  Aside,
  Row,
  Col,
  Button,
  Progress,
  Upload,
  Steps,
  Step
} from 'src/basic';
import './index.scss';

function handlePreview() {

}

function handleRemove() {

}

let fileList = [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
const dragDom = (
  <span>
  <i className="sy-icon-upload"></i>
  <div className="sy-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </span>
) 
const Home: React.FC = () => {
  return (
    <Container className="test-home">
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
                <Progress type="circle"></Progress>
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
                  <Steps direction="horizontal" active={1} space={100}>
                    <Step title="步骤 1"></Step>
                    <Step title="步骤 2"></Step>
                    <Step title="步骤 3" description="这是一段很长很长很长的描述性文字"></Step>
                    <Step title="步骤 4" description="这是一段很长很长很长的描述性文字"></Step>
                  </Steps>
            </Col>
            <Col xs={8} sm={6} md={4} lg={6} xl={1}>
              <div className="grid-content bg-purple">
                
              </div>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <div className="grid-content bg-purple">
                <Upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  onPreview={handlePreview}
                  onRemove={handleRemove}
                  fileList={fileList}
                  key="Upload1"
                  drag
                  tiggert={
                    dragDom
                  }
                  tip={
                    <div className="sy-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  }>
                </Upload>
              </div>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="grid-content bg-purple">
                <Upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  onPreview={handlePreview}
                  onRemove={handleRemove}
                  key="Upload2"
                  fileList={fileList}
                  autoUpload={false}
                  listType="picture"
                  tiggert={
                    <Button size="small" type="primary">选取文件</Button>
                  }
                  submit={
                    <Button size="small" type="primary">开始上传</Button>
                  }
                  tip={
                    <div className="sy-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  }>
                </Upload>
              </div>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="grid-content bg-purple">
                <Upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  onPreview={handlePreview}
                  onRemove={handleRemove}
                  fileList={fileList}
                  key="Upload3"
                  listType="picture-card"
                  tiggert={
                    <i className="sy-icon-plus"></i>
                  }>
                </Upload>
              </div>
            </Col>
          </Row>
        </Main>
        <Footer>Footer</Footer>
      </Container>
    </Container>
  );
}

export default Home