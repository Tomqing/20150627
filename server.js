/**
 * Created by tao on 2015/6/27.
 */

var http = require('http');

var server = http.createServer(waiter);

function waiter(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    var url = req.url;
    var urlObj = {};
    if(url.indexOf('?')>0){
        var urls = url.split('?');
        var pathname = urls[0];
        var queries = urls[1].split('&');
        queries.forEach(function(query){
            var q = query.split('=');
            urlObj[q[0]] = q[1];
        })
    }
    if(pathname == '/menu'){
        res.end('<ul><li><a href="/chicken">黄焖鸡</a></li><li><a href="/leg">鸡腿饭</a></li></ul>');
    }else if(pathname == '/chicken'){
        res.end('客官，黄焖鸡来了 。');
    }else if(pathname == '/leg'){
        res.end('客官，鸡腿饭'+urlObj['num']+'份来了 。');
    } else{
        res.end(url);
    }


}

server.listen(8080,'localhost');