var listEle = document.querySelector(".history-section__list");
var gifHistory = [];
var eventEmitter = new MyEventEmitter();



function draw(value, data) {
    var li = document.createElement("li")
    li.className = "history-section__list-item";
    li.innerText = value;
    let keys = Object.keys(gifHistory);

    if (gifHistory.length == 0) {
        listEle.appendChild(li);
        gifHistory.push({ ele: li, data: data });
    } else {
        if (gifHistory.length > 19) {
            console.log("here?");
            listEle.removeChild(gifHistory[gifHistory.length - 1].ele);
            gifHistory.unshift({ ele: li, data: data });
            gifHistory.pop();
        } else {
            gifHistory.unshift({ ele: li, data: data });
        }
        let lastEle = gifHistory[1].ele;
        listEle.insertBefore(li, lastEle);
    }
}

eventEmitter.subscribe("new", function (msg) {
    draw(msg.input, msg.data);
})
