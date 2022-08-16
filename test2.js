
setTimeout(function(){
    console.log('sending SIGTERM to process %d', process.pid);
    process.kill(2179, 'SIGTERM');
}, 500);

setTimeout(function(){
    console.log('never called');
}, 1000);