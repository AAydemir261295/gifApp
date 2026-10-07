export default async function cacheMw(req, res, next) {
    let inputValue = req.query.value;
    let client = req.app.get("redis");
    const value = await client.get(inputValue);

    if (value) {
        req.cached = JSON.parse(value);
        next()
    } else {
        next()
    }
}