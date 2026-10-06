var listEle = document.querySelector(".history-section__list");
var gifHistory = [];
var eventEmitter = new MyEventEmitter();
var input = document.querySelector(".slider__input");

function draw(value, data) {
    let li = document.createElement("li")
    li.className = "history-section__list-item";
    li.innerText = value;
    let keys = Object.keys(gifHistory);

    if (gifHistory.length == 0) {
        listEle.appendChild(li);
        gifHistory.push({ ele: li, value: value, data: data });
    } else {
        if (gifHistory.length > 19) {
            listEle.removeChild(gifHistory[gifHistory.length - 1].ele);
            gifHistory.unshift({ ele: li, value: value, data: data });
            gifHistory.pop();
        } else {
            gifHistory.unshift({ ele: li, value: value, data: data });
        }
        let lastEle = gifHistory[1].ele;
        listEle.insertBefore(li, lastEle);
    }

    li.addEventListener("click", function () {
        setImgSources(data);
        input.value = '';
    })
}

eventEmitter.subscribe("new", function (msg) {
    draw(msg.input, msg.data);
})

function drawHistory(data) {
    data.forEach(function (item) {
        let li = document.createElement("li")
        li.className = "history-section__list-item";
        li.innerText = item.value;
        listEle.appendChild(li);
        gifHistory.push({ ele: li, value: item.value, data: item.data });
        li.addEventListener("click", function () {
            setImgSources(item.data);
            input.value = '';
        })
    })
}

window.addEventListener("load", (event) => {
    var uncached = JSON.parse(localStorage.getItem("cache"));
    drawHistory(uncached);
});

window.addEventListener('beforeunload', (event) => {
    // localStorage.clear();
    let cached = JSON.stringify(gifHistory);
    localStorage.setItem("cache", cached);

});

