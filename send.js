var q = 'task_queue';
var msg = process.argv.slice(2).join(' ') || "Hello World!";

ch.assertQueue(q, {durable: true});
ch.sendToQueue(q, new Buffer(msg), {persistent: true});
console.log(" [x] Sent '%s'", msg);

ch.consume(q, function(msg) {
    var secs = msg.content.toString().split('.').length - 1;
  
    console.log(" [x] Received %s", msg.content.toString());
    setTimeout(function() {
      console.log(" [x] Done");
    }, secs * 1000);
  }, {noAck: true});