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
import qq from 'src/assets/images/QQ.svg';

interface resumeInfoAttr {
  label:string
  value:string|React.ReactNode
}

interface IP {
  title:string
  items:Array<resumeInfoAttr>
  avatar?:string
  icon?:string
}

const Info: React.FC<IP> = (props) => {
  const { title, avatar, children, items, icon } = props
  const doms = items.map((item, i) => {
    return (
      <div className="qc-resume-info__item" key={'Info'+i}>
        <span className="qc-resume-info__label">{ item.label }：</span>
        <span className="qc-resume-info__text">{ item.value }</span>
      </div>
    )
  })
  return (
    <div className="qc-resume-info">
      <div className="qc-resume-info__header">
        <Avatar size={30} icon={icon}></Avatar>
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
  icon?:string
}

const Experience: React.FC<IPE> = (props) => {
  const { title, avatar, children, items, icon } = props
  const doms = items.map((item, i) => {
    return (
      <Step title={item.label} key={'Experience'+i} status="process" description={item.description}></Step>
    )
  })
  return (
    <div className="qc-resume-experience">
      <div className="qc-resume-experience__header">
        <Avatar size={30} icon={icon}></Avatar>
        <span className="title">{title}</span>
      </div>
      <Steps direction="vertical" className="qc-resume-experience__steps">
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
      1.公共组件&技术选型
      <br/>
      &#12288;开发提供稳定且易扩展的基础组件，
      接收业务需求，开发业务组件（如表单组件、输入框组件、布局组件、车辆管理组件、附件直传阿里云上传组件等）。
      公共组件应用到公司所有业务系统中得到长期验证，稳定性可靠。
      <br/>
      &#12288;规范开发流程，如采用Jenkins+gitlab+webhook+eslint的技术手段验证每次业务系统代码提交的质量。
      实施期间，开发人员提交代码的错误，显著减少。
      <br/>
      &#12288;新工程搭建及技术选型。
    </p>
    <p>
      2.前端可视化编辑系统
      <br/>
      &#12288;<b>自主开发前端可视化编辑系统</b>，可覆盖大部分前端页面开发场景。
      <br/>
      &#12288;<b>主要使用对象为非前端人员，产品，测试人员可在前端不参与的情况下简单的拖拽即可生成各种前端页面。 </b>
      <br/>
      &#12288;<b>生成页面可根据不同状态随意转换页面展示形态，符合页面在不同业务场景下的展示不同内容的需求 </b>
      <br/>
      &#12288;<b>极大的解放了前端开发人员的工作量。人人都可通过简单的配置开发一个完整的且富逻辑的页面</b>
      <br/>
      &#12288;<b>完美贴合工作流审批</b>
      <br/>
      &#12288;目前已成功应用于各个业务系统且运行稳定。
      <br/>
    </p>
    <p>
      3.工作流平台开发&在线流程编辑器
      <br/>
      &#12288;工作流平台开发，赋予业务系统业务审批的能力。
      <br/>
      &#12288;技术上在给予各业务系统前端自定义页面能力的基础上，提供各种前端勾子，保证工作流业务功能的统一性。
      <br/>
      &#12288;二次开发基于Activiti Model Editor组件的在线流程编辑器,供业务相关人员绘制审批流程图。
      <br/>
      &#12288;协助各业务系统稳定接入工作流，如《FMS财务管理系统》,《TMS运输管理系统》,《SCM供应链管理系统》,《TSL租售管理系统》,《crm客户管理系统》等
    </p>
    <p>
      4.人员管理
      <br/>
      &#12288;管理5名成员的前端一组（共两个小组分别支撑两个研发部门），为项目中的需求合理分配资源，协助各项目负责人保证迭代进度。
      <br/>
      &#12288;定期知识分享，小组成员每半月一次轮流分享。
    </p>
    <p>相关技术:es6、vue、react、TypeScript、webpack、requireJs、jenkins。</p>
  </div>
)

const workExperience2 = (
  <div>
    <p>2018年01月-2018年10月</p>
    <p>前端工程师/前端负责人 / 10000 - 15000/月</p>
    <p>
      1.技术选型&开发
      <br/>
      &#12288;从0到1搭建前端体系。
      共开发《中国商品诚信数据库官网》（http://www.cpsdb.com/#/index）、
      《中国商品诚信数据库企业自主管理后台》（http://yw.cpsdb.com/#/login）、
      《CPS公共业务自主管理平台》（http://mp.cpsdb.com/#/login）、
      《中华搜APP》苹果商店或者应用宝搜索中华搜APP下载安装
    </p>
    <p>
      2.人员管理
      <br/>
      &#12288;培养初级前端开发。项目进度管理。
    </p>
    <p>相关技术:es6、vue、webpack、requireJs。</p>
  </div>
)

const workExperience3 = (
  <div>
    <p>2012年2月-2017年12月</p>
    <p>web工程师 / 15000 - 25000/月</p>
    <p>
      1.web项目开发
      <br/>
      &#12288;Web应用的前后端开发、存储过程开发、SQL重构优化、QA管理与技术支持、开发提高工作效率的小工具等。
      <br/>
      &#12288;参与过物流管理、销售系统、生产系统、会计系统、数据可视化等多个Web项目的开发。
    </p>
    <p>相关技术:Java、Java Script、Html5、CSS3、Pro*C、Oracle、PostgreSQL。</p>
    <p>
      2.人员培训
      <br/>
      &#12288;带过很多新人成功入门开发
    </p>
  </div>
)


// const workExperience4 = (
//   <div>
//     <p>2012年02月-2015年02月</p>
//     <p>web工程师 / 6000 - 8000/月</p>
//     <p>
//       1.web项目开发
//       <br/>
//       &#12288;Web应用的前后端开发、存储过程开发、SQL重构优化、QA管理与技术支持、开发提高工作效率的小工具等。参与过物流管理、销售系统、生产系统、会计系统、数据可视化等多个Web项目的开发。
//     </p>
//     <p>相关技术:Java、Java Script、Html5、CSS3、Pro*C、Oracle、PostgreSQL。</p>
//   </div>
// )

const openQQ = () => {
  window.open('http://wpa.qq.com/msgrd?v=3&uin=550491568&site=qq&menu=yes')
}

const Resume: React.FC = () => {
  return (
    <Container className="qc-resume">
      <Aside className="qc-resume__aside">
        <div className="qc-resume__profile">
          <div className="is-vertical-middle">
            <div className="qc-resume__item qc-resume__avatar">
              <Avatar size={116} icon="sy-icon-user-solid"></Avatar>
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
          <Info title="基本信息" icon="sy-icon-s-custom" items={[
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
              label: 'QQ',
              value: (
                <a target="_blank" onClick={openQQ}><img src={qq}/>550491568<img src={qq}/>在线撩</a>
              )
            },
            {
              label: 'git',
              value: 'https://github.com/nqey/ireact'
            },
            {
              label: '工龄',
              value: '8年工作经验'
            },
            {
              label: '优势',
              value: '多年web项目主力开发经验，小团队管理经验'
            }
          ]}/>
          <Info title="求职意向" icon="sy-icon-s-flag" items={[
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
              value: '前端工程师'
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
          <Info title="教育背景" icon="sy-icon-s-order" items={[
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
          <Col span={24}>
            <Progress type="line" percentage={80} color="#ff0000d9" format={() => {
              return 'vue 熟练'
            }}></Progress>
          </Col>
          <Col span={24}>
            <Progress type="line" percentage={70} color="#ff0000d9" format={() => {
              return 'react 熟练'
            }}></Progress>
          </Col>
           <Col span={24}>
            <Progress type="line" percentage={30} color="#008000b8" format={() => {
              return 'angular 了解'
            }}></Progress>
          </Col>
          <Col span={24}>
            <Progress type="line" percentage={70} color="#ff0000d9" format={() => {
              return 'webpack 熟练'
            }}></Progress>
          </Col>
          <Col span={24}>
            <Progress type="line" percentage={80} color="#ff0000d9" format={() => {
              return 'es6 熟练'
            }}></Progress>
          </Col>
          <Col span={24}>
            <Progress type="line" percentage={50} color="green" format={() => {
              return 'TypeScript 一般'
            }}></Progress>
          </Col>
        </Row>
      </Aside>
      <Main className="qc-resume__main">
        <Experience title="工作经验" icon="sy-icon-s-platform" items={[
          {
            label: '四川驹马科技有限公司',
            description: workExperience1
          },
          {
            label: '四川中新华搜信息技术有限公司',
            description: workExperience2
          },
          {
            label: '上海敏杰软件有限公司&日本MJ株式会社（上海敏杰软件有限公司在日注册公司）',
            description: workExperience3
          },
          // {
          //   label: '上海敏杰软件有限公司',
          //   description: workExperience4
          // }
        ]}/>
      </Main>
    </Container>
  );
}

export default Resume