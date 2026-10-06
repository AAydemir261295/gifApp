function MyEventEmitter() {
    this.events = {};
}

MyEventEmitter.prototype.subscribe = function (eventName, fn) {
    if (!this.events[eventName]) {
        this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    return () => {
        this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
}

MyEventEmitter.prototype.emit = function (eventName, data) {
    const event = this.events[eventName];
    if (event) {
        event.forEach(fn => {
            fn.call(null, data);
        });
    }
}