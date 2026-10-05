var express = require('express');
var router = express.Router();
const giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=ErljLqO5jDG9UQ6E7JjRVBujkwzRtHqm&limit=6&rating=g"

function getResultImgSrcs(data) {
    let result = [];
    for (let q = 0; q < data.length; q++) {
        const element = data[q];
        result.push(element.images.original.url);
    }
    return result;
}

function getLocale(value) {
    let ru = "ru";
    let en = "en";
    let latinRegex = new RegExp(/[a-zA-Z]/);
    let cyrillicRegex = new RegExp(/[а-яА-Я]/);

    console.log(value);
    if (value.match(latinRegex) && !value.match(cyrillicRegex)) {
        return en;
    } else if (!value.match(latinRegex) && value.match(cyrillicRegex)) {
        return ru;
    } else {
        return false;
    }

}

async function request(url) {
    try {
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

/* GET home page. */
router.get('', async function (req, res, next) {
    let inputValue = req.query.value;
    let locale = getLocale(inputValue);
    if (locale) {
        let url = `${giphyUrl}&q=${inputValue}&lang=${locale}`;
        console.log(url);
        let response = await request(url);
        let imgSources = getResultImgSrcs(response.data);
        res.send({ result: imgSources });
        // res.sendStatus(200);
    }
});

module.exports = router;
