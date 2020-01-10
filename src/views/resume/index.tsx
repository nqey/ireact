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
  Step,
  Avatar
} from 'src/basic';
import 'src/assets/resume.scss';

interface resumeInfoAttr {
  label:string
  value:string
}

interface IP {
  title:string
  items:Array<resumeInfoAttr>
  avatar?:string
}

const Info: React.FC<IP> = (props) => {
  const { title, avatar, children, items } = props
  const doms = items.map(item => {
    return (
      <div className="qc-resume-info__item">
        <span className="qc-resume-info__label">{ item.label }：</span>
        <span className="qc-resume-info__text">{ item.value }</span>
      </div>
    )
  })
  return (
    <div className="qc-resume-info">
      <div className="qc-resume-info__header">
        <Avatar size={30} src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></Avatar>
        <span className="title">{title}</span>
      </div>
      { doms }
    </div>
  )
}

interface resumeExperienceAttr {
  label:string
  description:string|React.ReactNode
}

interface IPE {
  title:string
  items:Array<resumeExperienceAttr>
  avatar?:string
}

const Experience: React.FC<IPE> = (props) => {
  const { title, avatar, children, items } = props
  const doms = items.map(item => {
    return (
      <Step title={item.label} status="process" description={item.description}></Step>
    )
  })
  return (
    <div className="qc-resume-experience">
      <div className="qc-resume-experience__header">
        <Avatar size={30} src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></Avatar>
        <span className="title">{title}</span>
      </div>
      <Steps direction="vertical" space={100}>
        { doms }
      </Steps>
    </div>
  )
}

const workExperience1 = (
  <div>
    <p>2018年10月-至今</p>
    <p>前端工程师/前端组长 / 15000 - 20000/月</p>
    <p>
      1.公共组件&技术架构
      <br/>
     ......................
    </p>
    <p>
      2.业务开发&人员管理
      <br/>
      ......................
    </p>
    <p>相关技术:es6、vue、react、TypeScript、webpack、requireJs、jenkins。</p>
  </div>
)

const workExperience2 = (
  <div>
    <p>2018年01月-2018年10月</p>
    <p>高级前端工程师/前端负责人 / 10000 - 15000/月</p>
    <p>
      1.技术架构&开发
      <br/>
      从0到1搭建前端体系。
      共开发《中国商品诚信数据库官网》（http://www.cpsdb.com/#/index）、
      《中国商品诚信数据库企业自主管理后台》（http://yw.cpsdb.com/#/login）、
      《CPS公共业务自主管理平台》（http://mp.cpsdb.com/#/login）、
      《中华搜APP》苹果商店或者应用宝搜索中华搜APP下载安装
    </p>
    <p>
      2.人员培训
      <br/>
      培训初中级前端开发。
    </p>
    <p>相关技术:es6、vue、webpack、requireJs。</p>
  </div>
)

const workExperience3 = (
  <div>
    <p>2015年2月-2017年12月</p>
    <p>web工程师 / 15000 - 25000/月</p>
    <p>
      1.技术选型&开发
      <br/>
      根据需求提供技术可行性方案、环境搭建、制作demo、公共组件、Web应用的前后端开发上线等。项目需求全部按时交纳，有效解决了部门工作中所遇开发方面的问题。
    </p>
    <p>
      2.系统性能优化
      <br/>
      从数据库索引、SQL重构、业务调整、页面加载优化等多方面进行。性能优化明显，如原本几分钟才能出结果的程序，达到十几秒或者秒出结果的程度。
    </p>
    <p>
      3.技术支援
      <br/>
      应业务需求，主动开发各种提高工作效率的小工具想，协助业务人员有效避免各种重复机械的工作。
    </p>
    <p>相关技术:Java、Java Script、Html5、CSS3、Pro*C、Oracle、PostgreSQL。</p>
  </div>
)

const workExperience4 = (
  <div>
    <p>2012年02月-2015年02月</p>
    <p>web工程师 / 6000 - 8000/月</p>
    <p>
      1.javaweb项目开发
      <br/>
      Web应用的前后端开发、存储过程开发、QA管理与技术支持。参与过物流管理、销售系统、生产系统、数据可视化等多个Web项目的开发。
      <br/>
      参与过的项目全部按时完成需求，按时交纳成果。
      <br/>
      如：2014年下半年主力开发6000万日元规模的《味之素》生产管理系统。20人团队历时6个月成功交付。
      期间对多名新人进行技术教导，以及协助部长管理项目进度。
    </p>
    <p>
      2.带新人
      <br/>
      成功带领多名新人上手开发。
    </p>
    <p>相关技术:Java、Java Script、Html5、CSS3、Oracle。</p>
  </div>
)

const Resume: React.FC = () => {
  return (
    <Container className="qc-resume">
      <Aside className="qc-resume__aside">
        <div className="qc-resume__profile">
          <div className="is-vertical-middle">
            <div className="qc-resume__item qc-resume__avatar">
              <Avatar size={116} src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></Avatar>
            </div>
            <div className="qc-resume__item">
              <span className="qc-resume__label">姓名：</span>
              <span className="qc-resume__text">秦超</span>
            </div>
            <div className="qc-resume__item">
              <span className="qc-resume__label">职业：</span>
              <span className="qc-resume__text">前端工程师</span>
            </div>
          </div>
        </div>
        <div className="qc-resume__info">
          <Info title="基本信息" items={[
            {
              label: '性别',
              value: '男'
            },
            {
              label: '生日',
              value: '1990年08月'
            },
            {
              label: '手机',
              value: '173-8045-5931'
            },
            {
              label: '邮箱',
              value: 'shincyou@hotmail.com'
            },
            {
              label: 'git',
              value: 'shincyou@hotmail.com'
            },
            {
              label: '工龄',
              value: '8年工作经验'
            },
            {
              label: '优势',
              value: '熟知且真实参与web项目全套流程'
            }
          ]}/>
          <Info title="求职意向" items={[
            {
              label: '求职状态',
              value: '在职寻求新机会'
            },
            {
              label: '期望地点',
              value: '成都'
            },
            {
              label: '期望行业',
              value: '医疗/互联网/金融'
            },
            {
              label: '期望职业',
              value: '高级前端工程师/前端经理'
            },
            {
              label: '期望月薪',
              value: '20k - 30k/月'
            },
            {
              label: '工作性质',
              value: '全职'
            }
          ]}/>
          <Info title="教育背景" items={[
            {
              label: '开始时间',
              value: '2009年09月'
            },
            {
              label: '结束时间',
              value: '2012年09月'
            },
            {
              label: '学历',
              value: '大专'
            },
            {
              label: '学校名称',
              value: '四川托普信息技术职业学院'
            },
            {
              label: '所学专业',
              value: '计算机'
            }
          ]}/>
        </div>
        <Row className="qc-resume-skill">
          <Col span={12}>
            <Progress type="dashboard" percentage={70} color="#d0d622" format={() => {
              return 'vue 熟练'
            }}></Progress>
          </Col>
          <Col span={12}>
            <Progress type="dashboard" percentage={70} color="#d0d622" format={() => {
              return 'vue 熟练'
            }}></Progress>
          </Col>
          <Col span={12}>
            <Progress type="dashboard" percentage={70} color="#d0d622" format={() => {
              return 'vue 熟练'
            }}></Progress>
          </Col>
          <Col span={12}>
            <Progress type="dashboard" percentage={70} color="#d0d622" format={() => {
              return 'vue 熟练'
            }}></Progress>
          </Col>
          <Col span={12}>
            <Progress type="dashboard" percentage={70} color="#d0d622" format={() => {
              return 'vue 熟练'
            }}></Progress>
          </Col>
          <Col span={12}>
            <Progress type="dashboard" percentage={70} color="#d0d622" format={() => {
              return 'vue 熟练'
            }}></Progress>
          </Col>
        </Row>
      </Aside>
      <Main className="qc-resume__main">
        <Experience title="工作经验" items={[
          {
            label: '四川驹马科技有限公司',
            description: workExperience1
          },
          {
            label: '四川中新华搜信息技术有限公司',
            description: workExperience2
          },
          {
            label: '日本MJ株式会社（上海敏杰软件有限公司在日注册公司）',
            description: workExperience3
          },
          {
            label: '上海敏杰软件有限公司',
            description: workExperience4
          }
        ]}/>
      </Main>
    </Container>
  );
}

export default Resume