const proxy = require('http-proxy-middleware');

module.exports = function (app) { 
    app.use(proxy('/thirdparty',{
        target:'http://thirdparty-manage.jumaps.com/',
        headers: {
            host: 'thirdparty-manage.jumaps.com'
        },
        secure:false,
        changeOrigin:true,
        pathRewrite:{
            "^/thirdparty":""
        }
    }))
}