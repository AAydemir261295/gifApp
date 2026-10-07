import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import indexRoute from "./routes/index.js";
import getRoute from "./routes/get.js";

import { createClient } from 'redis';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();


const client = createClient({
  url: 'redis://redis:6379'
});


// const client =
//   redis.createClient({
//     // url: 'redis://0.0.0.0:6379'
//     url: 'redis//red1s:6379'
//   });

await client.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("redis", client);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRoute);
app.use('/get', getRoute);

export default app;

