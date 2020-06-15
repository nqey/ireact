import React, { useState, useEffect } from 'react'
import { getPayData, getQrCodeUrl } from 'src/config/api.js'
import wxPng from './icon-wx.png';
import zfbPng from './icon-zfb.png';
import qrcodePng from './qrcode.png';
import zfsbPng from './zfsb.png';
import './index.scss';

import {
  Main,
  Card,
  Divider,
  Container,
  Footer,
  Drawer,
  Button,
  Icon
} from 'src/basic';

const getData = () => {
  const data = {
    code:0,
    data: {
      items: [{
        plateNumber: '川A54321',
        billNo: 'XXXXXXXXXXXXX',
        source: 'XXXXXXXXXXXXX',
        billStartTime: '2020-06-08 12:12:12',
        billEndTime: '2020-06-08 12:12:12',
        transactionAmount: 15000
      }, {
        plateNumber: '川A54321',
        billNo: 'XXXXXXXXXXXXX',
        source: 'XXXXXXXXXXXXX',
        billStartTime: '2020-06-08 12:12:12',
        billEndTime: '2020-06-08 12:12:12',
        transactionAmount: 15000

      }, {
        plateNumber: '川A54321',
        billNo: 'XXXXXXXXXXXXX',
        source: 'XXXXXXXXXXXXX',
        date: '2020-06-08 12:12:12',
        transactionAmount: 15000
      }],
      recordRemark: 'xxxxxxxxxxxxxxxx',
      recordAmount: '999999',
      payerName: '张三'
    }
  }
  return Promise.resolve(data)
}

const curDrawer = () => {
  return {
    wx: () => {
      return 
    }
  }
}

const sbImg = (
  <img src={zfsbPng} width="70%" style={{
    width: '80%',
    maxWidth: '220px'
  }}/>
)

const errInfo = (
  <div className="pay-msg-box">
    {sbImg}
    <h3>
      网络错误
    </h3>
    <p>
      您可尝试重新支付
    </p>
    <p>
      若有疑问，请联系您的客户经理
    </p>
  </div>
);

const waitInfo = (
  <div className="pay-msg-box">
    <h3>
      数据获取中...
    </h3>
  </div>
);

const noDataInfo = (
  <div className="pay-msg-box">
    {sbImg}
    <h3>
      数据获取失败
    </h3>
    <p>
      您可尝试重新支付
    </p>
    <p>
      若有疑问，请联系您的客户经理
    </p>
  </div>
);

const PayView: React.FC = (props:any) => {
  let [res, setRes] = useState<any>(null);

  if (!res) {
    let id = props && props.match && props.match.params.id;
    getData().then(res => setRes(res))
    return waitInfo
  }

  const data = res.data;
  const code = res.code;
  if (code != 0) {
    return errInfo;
  }
  if (Object.keys(data).length === 0) {
    return noDataInfo;
  }

  const formart = (str:any) => {
    return str || '-'
  }

  const wxUrl:any = getQrCodeUrl({
    trxamt: data.recordAmount,
    reqsn: data.transactionNo,
    body: '微信',
    paytype: 'W01'
  });

  const zfbUrl:any = getQrCodeUrl({
    trxamt: data.recordAmount,
    reqsn: data.transactionNo,
    body: '支付宝',
    paytype: 'W02'
  });

  const cards = data.items.map((d:any, inx:any) => {
    const header = (
        <div>
            <p className="plateNumber">{formart(d.plateNumber)}</p>
            <p>账单：{formart(d.billNo)}</p>
            <p>账单类型： {formart(d.costItemName)}</p>
            <p>开始时间： {formart(d.billStartTime)}</p>
            <p>结束时间： {formart(d.billEndTime)}</p>
        </div>
    );
    return (
        <Card header={header} key={inx} className='sy-form-item'>
          <span className="label">应付金额：</span>
          <span className="amount">{d.transactionAmount || 0}元</span>
        </Card>
    );
  });
  const drawer:any = {
    wxCtr: null,
    wx: (
      <Drawer name="wxDrawer" zIndex={2039} ins={false} size="full" onCtr={(ctr:any) => { drawer.wxCtr = ctr }} direction="rtl" content={
          <main className="sy-main" style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            flexFlow: 'column'
          }}>
            <div>
              <div style={{
                textAlign: 'center'
              }}>
                <img src={qrcodePng} alt="二维码加载失败" width="70%" style={{
                  width: '60%',
                  maxWidth: '136px'
                }}/>
              </div>
              <div style={{
                height: '5%',
              }}>
              </div>
              <div style={{
                maxWidth: '320px',
                margin: '0 auto'
              }}>
                <h4>方法一：使用微信扫码支付</h4>
                <p>微信首页点击右上角「+」，选择扫一扫，扫描二维码发起支付</p>
                <Divider/>
                <h4>方法二：将二维码截图后，在App内扫一扫打开</h4>
                <p>1、将二维码截图保存至手机相册</p>
                <p>2、在微信中点击右上角「+」，选择扫一扫</p>
                <p>3、点击右下角打开相册</p>
                <p>4、选择二维码截图，点击「完成」</p>
              </div>
            </div>
          </main>
      }/>
    ),
    zfbCtr: null,
    zfb: (
      <Drawer name="zfbDrawer" zIndex={2039} ins={false} size="full" onCtr={(ctr:any) => { drawer.zfbCtr = ctr }} direction="rtl" content={
          <main className="sy-main" style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            flexFlow: 'column'
          }}>
            <div>
              <div style={{
                textAlign: 'center'
              }}>
                <img src={qrcodePng} alt="二维码加载失败" width="70%" style={{
                  width: '60%',
                  maxWidth: '136px'
                }}/>
              </div>
              <div style={{
                height: '5%',
              }}>
              </div>
              <div style={{
                maxWidth: '320px',
                margin: '0 auto'
              }}>
                <h4>方法一：使用支付宝扫码支付</h4>
                <p>支付宝首页点击右上角「+」，选择扫一扫，扫描二维码发起支付</p>
                <Divider/>
                <h4>方法二：将二维码截图后，在App内扫一扫打开</h4>
                <p>1、将二维码截图保存至手机相册</p>
                <p>2、在支付宝中点击右上角「+」，选择扫一扫</p>
                <p>3、点击右下角打开相册</p>
                <p>4、选择二维码截图，点击「完成」</p>
              </div>
            </div>
          </main>
      }/>
    ),
    payCtr: null,
    pay: (
      <Drawer name="payDrawer" ins={false} onCtr={(ctr:any) => { drawer.payCtr = ctr }} content={
        <div className="pay-flex-column">
          <div className="item" onClick={():void => drawer.zfbCtr && drawer.zfbCtr.open()}>
            <div className="title">
              <img src={zfbPng}/>
              <span>支付宝支付</span>
            </div>
            <Icon name="arrow-right"/>
          </div>
          <Divider width="90%" margin="0 auto"/>
          <div className="item" onClick={():void => drawer.wxCtr && drawer.wxCtr.open()}>
            <div className="title">
              <img src={wxPng}/>
              <span>微信支付</span>
            </div>
            <Icon name="arrow-right"/>
          </div>
          <Divider width="90%" margin="0 auto"/>
          <div className="item amount">应付合计：{data.recordAmount || 0}元</div>
        </div>
      }/>
    ),
    base: (
      <Drawer name="baseDrawer" ins={true} modal={false} content={
        <div className="pay-flex-row">
          <span className="amount">应付合计：{data.recordAmount || 0}元</span>
          <Button type="primary" style={{
            fontSize: '18px'
          }} onClick={():void => drawer.payCtr && drawer.payCtr.open()}>付款</Button>
        </div>
      }/>
    )
  }
  const render = () => {
    return (
      <Container direction="vertical">
          <Main>
            <div className="pay-name-b">
              <span className="pay-name-c">尊敬的客户</span>
              <span className="pay-name-m"> {data.payerName} </span>
              <span className="pay-name-c">你好！</span>
            </div>
            {cards}
            <Divider/>
            <Card header={
              <div>
                  <p className="plateNumber">备注</p>
              </div>
            } className='sy-form-item'>
              <p>{formart(data.recordRemark)}</p>
            </Card>
            <div style={{
              'height': '80px'
            }}></div>
          </Main>
          <Footer>
              {drawer.base}
              {drawer.pay}
              {drawer.wx}
              {drawer.zfb}
          </Footer>
      </Container>
    )
  };
  return render();
}

export default PayView
