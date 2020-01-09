const http = require('http');
const cheerio = require('cheerio');

let url = 'http://localhost:3000/#/h5editor';

http.get(url, function (res) {
    let chunks = [],
        size = 0;

    res.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length;
    });

    res.on('end', function () {
        console.log('数据包传输完毕');
        let data = Buffer.concat(chunks, size);
        let html = data.toString();

        let $ = cheerio.load(html);
        console.log(html);
    });

});
