const Koa = require('koa');
const path = require('path');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
// 引入模块
const bodyParser = require('koa-bodyparser');

const fs = require('fs-extra')

const app = new Koa();

// 挂载到app
app.use(bodyParser());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.post('/capture', async (ctx, next) => {
    
    const images = ctx.request.body.images.map(img => {
      return `<img src="${img}" style="width: 100%;"/>`
    })
    console.log('-----images-------', images)
    let text = "";
    text += '<!DOCTYPE html>'
    text += '<html lang="en">'
    text += images.join('')
    text += '</html>'

    // 写入自定义配置项
    fs.writeFileSync('template.html', text)
    ctx.response.body = {
      status: 200,
      message: '模板生成成功！'
    }
});

// add url-route:
router.get('/download', async (ctx, next) => {
  ctx.append('Content-disposition', 'attachment;filename=template.html');
  ctx.append('Content-Type', 'application/octet-stream');
  var data = fs.readFileSync('template.html','utf-8');
  ctx.response.body = data;
});




// add router middleware:
app.use(router.routes());

app.listen(3001);
console.log('app started at port 3001...');