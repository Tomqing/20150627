var fs = require('fs');
var http = require('http');
var path = require('path');
var server = http.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});//设置头部信息
    var url = req.url;//读取访问的url
    console.log(url);
    var pro = process.cwd();
    var msg = "";
    var urlParam;
    if(url == '/'){
        url = '';
    }
    urlParam = pro + url;
    if( url == '/favicon.ico'){
        res.end(''); return;
    }
    if(fs.existsSync(urlParam)){
        fs.stat(urlParam,function(err,stats){
            if(stats.isFile()){
                fs.readFile(urlParam,'utf-8',function(err,data){
                    if(err){
                        res.end('读取出错');
                    }else{
                        res.end(data + "<br><a href='/'>返回根目录</a>");
                    }
                })
            }else if(stats.isDirectory()){
                fs.readdir(urlParam,function(err,arr){
                    if(err){
                        res.end('读取文件出错');
                    }else{
                        msg += "<ul>";
                        arr.forEach(function(a,b){
                            msg += "<li><a href=" + url + '/' + a + ">" + a + "</a></li>";
                        });
                        msg += "<li><a href='/' style='color:darkred'>返回根目录</a></li>";
                        msg += "</ul>";
                    }
                    res.end(msg);
                })
            }
        });
    }else{
        msg += "你访问的文件不存在<br><a href='/'>返回根目录</a>";
        res.end(msg);
    };
}).listen('8080','localhost');