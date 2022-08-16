process.stdout.write("test");
console.log("test")

console.log = function(d) {
process.stdout.write(d + '\n');
};
var fs = require('fs');

fs.createReadStream('./class1.js')
.pipe(process.stdout);


process.stdin.on('data', function(chunk) {

process.stdout.write('data: ' + chunk);
});

process.stdin.on('end', function() {
process.stdout.write('end');
});

process.stdin.pipe(process.stdout)

process.stdin.setEncoding('utf8');
 


console.log("argv: ",process.argv);
console.log("argv: ",process.argv[2]);





//8.取得執行程式時在terminal輸入之--參數
//輸入 node --harmony test1.js
 console.log(process.execArgv);
 




//9.取得相關執行環境
//console.log(process.env);


//10.主動發出應用程式警告
 //process.emitWarning('產生警告!');
// //自訂類型
 //process.emitWarning('Something Happened!', '我可自訂字串');

//11.回傳現在程式的執行路徑
 console.log(process.cwd());
// 取得Node.js執行的路徑
 console.log(process.execPath)

//12.更改執行緒的目錄，但不會更改到terminal所在目錄
console.log('起始目錄' + process.cwd());
try {
process.chdir('../');
console.log('現在目錄' + process.cwd());
}
catch (err) {
console.log(err);}

//13.立即離開Node.js進程
process.abort();


process.exit(0);
process.exit(1);

//14.取得處理器類型
console.log(process.arch);
以及
//取得使用的作業系統類型 例如:'darwin','freebsd','linux','solaris','win32'
//console.log(process.platform)



取得gid與uid https://zh.wikipedia.org/wiki/%E7%94%A8%E6%88%B7ID
if (process.getegid) {
console.log(`Current gid: ${process.getegid()}`);}
if (process.geteuid) {
console.log(`Current uid: ${process.geteuid()}`);
}


var time = process.hrtime();//矛點一
setTimeout(() => {
var diff = process.hrtime(time);//矛點二
console.log(`耗費 ${diff[0] +'秒＋' + diff[1]} nanoseconds`);
}, 1000);


var a = Date.now()
while(Date.now() - a < 1000);//讓進程卡住兩秒
console.log(process.uptime())



console.log(process.memoryUsage());


新增一個test2.js
之後把這個進程的PID填入

console.log(process.pid)
process.on('SIGTERM', function(){
console.log('terminating');
process.exit(1 
});
setTimeout(() => {},50000)//用來持續進程進行



process.stdin.resume();//也是用來保持進程用

process.on('SIGINT', function() {console.log});




process.nextTick()
setTimeout(function () 
           
{
console.log('沒有其他延遲的話我通常最後執行！');
 }, 0)
console.log('執行！');
console.log('執行！');
console.log('執行！');
console.log('執行！');
console.log('執行！');


process.nextTick(function () {
console.log('沒有其他延遲的話我通常最後執行！');
}, 0)

console.log('執行！');
console.log('執行！');
console.log('執行！');
console.log('執行！');
console.log('執行！');


setTimeout(function () {
console.log('沒有其他延遲的話我通常最後執行setTimeout！');
}, 0)
console.log('執行！');
console.log('執行！');
console.log('執行！');
console.log('執行！');
console.log('執行！');

process.nextTick(function () {
console.log('沒有其他延遲的話我通常最後執行！');
}, 0)


uncaughtException
//當前進程拋出一個沒有被catch的錯誤時，會觸發uncaughtException事件。


process.on('uncaughtException', function (err) {
console.error('An uncaught error occurred!');
console.error(err.stack);
throw new Error('產生錯誤');
});
非常正常，沒有產生任何訊息


// 改成下面

process.on('uncaughtException', function (err) {console.error('An uncaught error occurred!');
console.error(err.stack);
throw new Error('產生錯誤');
});
// throw new Error('something wrong'); //主動拋出一個自訂的錯誤


