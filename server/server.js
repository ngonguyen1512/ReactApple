import express from 'express';
require('dotenv').config();
import cors from 'cors';
import initRoutes from './src/routes'
import cons from './src/config/connectDatabase';
// import {dataPrices} from './src/utils/data'
// console.log(dataPrices)

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    method: ["POST", "PUT", "DELETE", "GET"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', (req, res) => {res.send('server on')});
initRoutes(app);
cons(app);

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
    console.log(`Server listening on port: http://localhost:${listener.address().port}`);
});