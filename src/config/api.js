import axios from 'axios'
// import cache from './cache'

const getDomain = () => {
    const DOMAIN_KEY = {
        develop: 'jumapsdev',
        test: 'jumapstest',
        trunk: 'jumapstrunk',
        product: 'jumaps'
    };
    const hostname = window.location.hostname;
    const developReg = /(jumapsdev|127\.0\.0\.1|localhost)/;
    let domain;
    if (developReg.test(hostname)) {
        domain = DOMAIN_KEY.develop;
    }
    //测试
    else if (hostname.indexOf(DOMAIN_KEY.test) != -1) {
        domain = DOMAIN_KEY.test;
    }
    //灰度
    else if (hostname.indexOf(DOMAIN_KEY.trunk) != -1) {
        domain = DOMAIN_KEY.trunk;
    }
    //线上
    else {
        domain = DOMAIN_KEY.product;
    }
    return domain;
}

export const apiFmsSrv = `//fms-manage.${getDomain()}.com`

/**
 * @returns pay data
 */
export const getPayData = async id => {
  const res = await axios.get(`${apiFmsSrv}/transaction-record/pushDetail.html?id=${id}`, {
    // adapter: cache({
    //   local: false // 是否永久保留在本地，默认为false
    // })
  })
  return res.data
}

/**
 * @returns pay qrcode url
 */
export const getQrCodeUrl = op => {
  return `${apiFmsSrv}/qrcode/allinpay/gen.html?trxamt=${op.trxamt}&reqsn=${op.reqsn}&body=${op.body}&paytype=${op.paytype}`
}

