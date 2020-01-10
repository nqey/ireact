import React, { useState } from 'react';
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
  Upload
} from 'src/basic';
import 'src/assets/h5editor.scss';
import axios from 'axios'

let results = [];

const H5editor: React.FC = () => {
  const initValue:Array<any> = []
  const [images, setImages] = useState(initValue)

  const imagesArray = images.map(img => {
    return (
      <img src={img.url} alt="comment-img"  style={{width: '100%'}}/>
    )
  })

  const handelStart = (file:any, files:Array<any>) => {
    setImages(files)
  }

  const handelBeforeUpload = async (file:any, files:Array<any>) => {
    const res = await axios.post(`${window.location.origin}/thirdparty/signature`)
    const data = res.data
    const key = data.dir + "${filename}";
    const addParams = {
      key: key,
      policy: data.policy,
      OSSAccessKeyId: 'T1scMS8gKgxqAgJb',
      success_action_status: "200",
      signature: data.signature
    };
    return addParams
  }

  const handelClick = () => {
    const urls = images.map(img => {
      return `http://juma-tgm.oss-cn-shenzhen.aliyuncs.com/jumaOss/${img.name}`
    })
    let data = {
      images: urls
    };
    axios.post('http://localhost:3001/capture',data)
    .then(res=>{
        console.log('res=>',res);  
        window.open('http://localhost:3001/download')
    })
  }

  const handelRemove = (file:any, files:Array<any>) => {
    setImages(files)
  }

  return (
      <Container direction="vertical">
        <Header>Header</Header>
        <Main>
          <Row gutter={100}>
            <Col span={12} className="qc-editor">
                <div className="qc-editor__phone">
                  {imagesArray}
                </div>
            </Col>
            <Col span={12}>
                <Upload
                  onStart={handelStart}
                  onRemove={handelRemove}
                  action="https://juma-tgm.oss-cn-shenzhen.aliyuncs.com"
                  beforeUpload={handelBeforeUpload}
                  listType="picture"
                  tiggert={
                    <Button size="small" type="primary">选取文件</Button>
                  }
                  tip={
                    <div className="sy-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  }>
                  <Button size="small" type="primary" onClick={handelClick}>生成模板</Button>
                </Upload>
            </Col>
          </Row>
        </Main>
        <Footer>Footer</Footer>
      </Container>
  );
}

export default H5editor