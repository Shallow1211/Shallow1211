//Process (進程)

//process.stdout和process.stdin都是stream的實例
//1.
//process.stdout.write("test");

// 等於
// console.log("test")

// 因為其內部實作為如下
// 
// console.log = function(d) {
//   process.stdout.write(d + '\n');
// };
// 
//2. 讀取檔案輸出到terminal，pipe流動時會自動寫入到terminal
// 

// var fs = require('fs');

// fs.createReadStream('./class1.js')
// .pipe(process.stdout);

// 

// 
//3.獲取輸入並輸出到命令列

// process.stdin.on('data', function(chunk) {

// process.stdout.write('data: ' + chunk);
// });

// process.stdin.on('end', function() {
// process.stdout.write('end');
// });
// 

//4.使用流

//process.stdin.pipe(process.stdout)


// 5.可設定編碼格式
// 
// process.stdin.setEncoding('utf8');
// 

// 6.取得執行程式之位置

// console.log("argv: ",process.argv);
// console.log("argv: ",process.argv[2]);

// // 7.如果在後面加上參數呢?
// 
// 執行 node test1 123
// 
// 返回一個陣列，參數從process.argv[2]開始



//8.取得執行程式時在terminal輸入之--參數
//輸入 node --harmony test1.js
 //console.log(process.execArgv);
// 




//9.取得相關執行環境
//console.log(process.env);


//10.主動發出應用程式警告
 //process.emitWarning('產生警告!');
// //自訂類型
 //process.emitWarning('Something Happened!', '我可自訂字串');

//11.回傳現在程式的執行路徑
 //console.log(process.cwd());
// 取得Node.js執行的路徑
 //console.log(process.execPath)

//12.更改執行緒的目錄，但不會更改到terminal所在目錄
// console.log('起始目錄' + process.cwd());
// try {
//   process.chdir('../');
//   console.log('現在目錄' + process.cwd());
// }
// catch (err) {
//   console.log(err);
// }

//13.立即離開Node.js進程
//process.abort();

// 一般使用exit離開，通常傳入0代表產生錯誤的離開，1代表成功狀態下的離開
// 任何異步動作與IO都會被中斷
// process.exit(0);
// process.exit(1);

//14.取得處理器類型
//console.log(process.arch);
// 以及
//取得使用的作業系統類型 例如:'darwin','freebsd','linux','solaris','win32'
//console.log(process.platform)



//15.取得gid與uid https://zh.wikipedia.org/wiki/%E7%94%A8%E6%88%B7ID
// if (process.getegid) {
//   console.log(`Current gid: ${process.getegid()}`);
// }
// if (process.geteuid) {
//   console.log(`Current uid: ${process.geteuid()}`);
// }


//16. 測試執行時間，給定兩個矛點
// var time = process.hrtime();//矛點一
// setTimeout(() => {
//   var diff = process.hrtime(time);//矛點二
//   console.log(`耗費 ${diff[0] +'秒＋' + diff[1]} nanoseconds`);
// }, 1000);

//測試總執行緒已經執行的時間
// var a = Date.now()
 //while(Date.now() - a < 1000);//讓進程卡住兩秒
// console.log(process.uptime())



//17.查看記憶體用量
//console.log(process.memoryUsage());


//18.從另一個進程中止當前進程
//新增一個test2.js
//之後把這個進程的PID填入

// console.log(process.pid)
//   process.on('SIGTERM', function(){
//   console.log('terminating');
//   process.exit(1);
// });
// setTimeout(() => {},50000)//用來持續進程進行


//19.

// process.stdin.resume();//也是用來保持進程用

// process.on('SIGINT', function() {
//   console.log('退出進程指令發動');//ctrl+c  之後必須使用ctrl+d退出
// });

//其他相關Signal事件可參考此 https://nodejs.org/api/process.html#process_signal_events


//20.
// process.nextTick()
// 非同步的幫手
// 其類似於如下

// setTimeout(function () {
//   console.log('沒有其他延遲的話我通常最後執行！');
//   }, 0)
// console.log('執行！');
// console.log('執行！');
// console.log('執行！');
// console.log('執行！');
// console.log('執行！');


// process.nextTick(function () {
// console.log('沒有其他延遲的話我通常最後執行！');
// }, 0)

// console.log('執行！');
// console.log('執行！');
// console.log('執行！');
// console.log('執行！');
// console.log('執行！');

// 
// 如果nextTick跟setTimeout 放一起nextTick會先執行
// 

// setTimeout(function () {
//   console.log('沒有其他延遲的話我通常最後執行setTimeout！');
//   }, 0)
// console.log('執行！');
// console.log('執行！');
// console.log('執行！');
// console.log('執行！');
// console.log('執行！');

// process.nextTick(function () {
// console.log('沒有其他延遲的話我通常最後執行！');
// }, 0)


//21.uncaughtException
//當前進程拋出一個沒有被catch的錯誤時，會觸發uncaughtException事件。


// process.on('uncaughtException', function (err) {
//   console.error('An uncaught error occurred!');
//   console.error(err.stack);
//   throw new Error('產生錯誤');
// });
// 非常正常，沒有產生任何訊息


// 改成下面

// process.on('uncaughtException', function (err) {
//   console.error('An uncaught error occurred!');
//   console.error(err.stack);
//   throw new Error('產生錯誤');
// });
// throw new Error('something wrong'); //主動拋出一個自訂的錯誤


// 補充
// uncaughtException事件，是免於Node進程終止的最後措施，否則Node就要執行process.exit();