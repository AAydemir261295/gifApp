var form = document.forms[0];
var images = document.images;
var imgEle = document.getElementById("img");
var currentGifResult = null;
var eventEmitter = new MyEventEmitter();

async function request(url) {
    try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

function getUrl(value) {
    let str = "http://localhost:3000/get?value=";
    return str + value;
}


function setImgSources(sources) {
    for (let q = 0; q < sources.length; q++) {
        const src = sources[q];
        const downloadingImage = new Image();
        downloadingImage.src = src;
        downloadingImage.onload = () => {
            images[q].src = downloadingImage.src;
        };
    }
}

function showErrors(statusCode) {
    
}


form.onsubmit = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.currentTarget);
    let inputValue = formData.get("giphy");
    let requestUrl = getUrl(inputValue);
    // let imgUrls = await request(requestUrl);
    let imgUrls = false;

    if (imgUrls) {
        let sources = JSON.parse(imgUrls).result;
        currentGifResult = sources;
        eventEmitter.emit("new", { input: inputValue, data: sources });
        setImgSources(sources);
    } else {
        showModal("");
    }
}



