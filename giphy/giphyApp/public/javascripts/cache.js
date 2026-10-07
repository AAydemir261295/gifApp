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


function drawCache(data) {
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

eventEmitter.subscribe("check", (msg) => {
    let length = gifHistory.length
    for (let q = 0; q < length; q++) {
        const b = gifHistory[q];
        if (b.value == msg) {
            console.log("from cache");
            setImgSources(b.data);
            eventEmitter.emit("isOk", false);
            break;
        }
        if (q == length - 1) {
            console.log("not cached");
            eventEmitter.emit("isOk", true);
        }
    }
})

eventEmitter.subscribe("new", function (msg) {
    draw(msg.input, msg.data);
})

window.addEventListener("load", (event) => {
    var uncached = JSON.parse(localStorage.getItem("cache"));
    drawCache(uncached);
});

window.addEventListener('beforeunload', (event) => {
    let cached = JSON.stringify(gifHistory);
    localStorage.setItem("cache", cached);
});








