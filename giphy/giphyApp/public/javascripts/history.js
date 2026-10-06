var gifHistory = new Map();
var eventEmitter = new MyEventEmitter();

eventEmitter.subscribe("new", function (msg) {
    gifHistory.set(msg.input, msg.data);
    console.log(gifHistory.get(msg.input))
})
