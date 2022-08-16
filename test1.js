var http = require('http');

//1.查看模組內擁有的功能
//console.log(http);

//比較常用的方法
//createServer(callback)：創造一個server實例
//listen(port)：啟動服務器並指定PORT
//setHeader(key, value)：寫入http封包header訊息
//write(str)：發送http回應
//end()：發送並結束http回應


//2.建立一個簡單HTTP server
// http.createServer(function (request, response){
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.write("Welcome!");
//   response.end();
// }).listen(8000, '127.0.0.1');

// console.log('Server running on port 8000.');
//之後打開localhost:8000，並觀察devtool內的network封包

//3.上面是回覆給client端字串，這次我們回覆一個完整的html頁面

// var fs = require('fs');

// http.createServer(function (request, response){

//   fs.createReadStream(__dirname + '/index.html').pipe(response);
// }).listen(8000, '127.0.0.1');

// console.log('Server running on port 8000.');

//4.也可讀取其他格式的檔案
// var fs = require('fs');

// http.createServer(function (request, response){

//   fs.createReadStream(__dirname + '/test.txt').pipe(response);
// }).listen(8000, '127.0.0.1');

// console.log('Server running on port 8000.');

//5.根據網址不同，回傳不同的字串
// http.createServer(function(req, res) {
//   if (req.url == "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("This is origin!");
//   }
//   else if (req.url == "/main") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("This is Main!");
//   }
//   else {//請求錯誤時的錯誤頁面
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Oh! origin Main!");
//   }
// }).listen(8000, "localhost");

//6.一個Websocket server 的雛形，將在第17章詳細提到
//此範例展示websocket如何處理將http升級成websocket的過程
//首先我們先看到wiki 中的交握協定部分https://zh.wikipedia.org/wiki/WebSocket

// var srv = http.createServer( (req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('okay');
// });
// srv.on('upgrade', (req, socket, head) => {
//   socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
//                'Upgrade: WebSocket\r\n' +
//                'Connection: Upgrade\r\n' +
//                '\r\n');
//   // \r\n 代表換行的意思
//   socket.pipe(socket); 
// });

// // now that server is running
// srv.listen(1337, '127.0.0.1');


//7.使用http模組發出get請求，此即為一個網站爬蟲的雛形

// http.get({
//    host: 'www.chinatimes.com',
//    path: '/'
// }, function(response) {
//     var body = '';
//     response.on('data', function(d) {
//         body += d;
//     });
//     response.on('end', function() {
//         console.log(body);  
//     });
// });



//8.使用http.request 發出POST請求
//請先打開另一個terminal，之後cd 到此目錄，執行test2.js
//再來用另一個terminal執行test1.js即可
//此時以下程式會發送一個POST的 request給 test2.js的 server

// var querystring = require('querystring');
// var postData = querystring.stringify({
//   'msg' : 'Hello World!'
// });

// var options = {
//   hostname: 'localhost',
//   port: 8000,
//   path: '/main',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': postData.length
//   }
// };

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function (chunk) {
//     console.log('BODY: ' + chunk);
//   });
// });

// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });

// req.write(postData);
// req.end();


//上面看到的'Content-Type': 'application/x-www-form-urlencoded',
//可參考https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods/POST








//#最後講到有關HTTPS部分


//這裡我們使用OpenSSL產生自己電腦簽發的https證書，但後面部署後的https我們會使用公開發行認證的https，會在部屬的單元提到
//一般我們網站部署後通常都會使用公開發行的https證書，而不建議使用自己簽發的

//OpenSSL安裝
//MAC與Linux已經安裝在電腦，可直接開啟terminal使用
//windows安裝OpenSSL可參考以下連結，或是可以使用git bash來產生https://git-for-windows.github.io/
//https://www.sslbuyer.com/index.php?option=com_content&view=article&id=128:install-openssl-win7&catid=25&Itemid=2595

//1.首先我們輸入以下，可以產生一把名為key.pem的私鑰 
//openssl genrsa -out key.pem
//2.接著用產生的私鑰產生一把用來生成證書的鑰匙，產生的過程會需要填入一些相關訊息，部分可留空
//openssl req -new -key key.pem -out csr.pem
//3.最後用剛才產生的鑰匙，產生證書
//openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem

//上面是創建CA機構的過程

//下面是有關創建server端的證書

//1.先產生一個server的私鑰
//openssl genrsa -out server-key.pem 1024
//2.使用檔案內寫好的openssl.cnf產生CSR
//openssl req -new -key server-key.pem -config openssl.cnf -out server-csr.pem
//3.使用機構的cert與key與server的csr與openssl.cnf產生server的cert
// openssl x509 -req -CA cert.pem -CAkey key.pem -CAcreateserial -in server-csr.pem -out server-cert.pem -extensions v3_req -extfile openssl.cnf
var https = require('https');
var fs = require('fs');

var options = {
	key: fs.readFileSync('./server-key.pem'),
	ca: [fs.readFileSync('./cert.pem')],
	cert: fs.readFileSync('./server-cert.pem')
};

https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
}).listen(3000,'127.0.0.1');


//之後啟動伺服器，到瀏覽器的https://localhost:3000即可，
//但因為是自己簽發的所以會出現不安全的警告

//用chrome可能會無法打開，可使用Firefox dev版本



//之後我們會講到用公開發行的https證書，及不會出現不安全的警告


////