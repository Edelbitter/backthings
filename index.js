const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const url = require('url');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('/', (request, response) => response.send('Hiho'));

app.use('/api', router);

router.get('/', (request, response) => {
    response.json({ eins: 'hihohiho', zwei: 'osoloemio', drei: 'meh' });
})

app.listen(port, () => console.log('listening'));

router.get('/things', (request, response) => {
    var urlParts = url.parse(request.url, true);
    var parameters = urlParts.query;
    var myParam = parameters.myParam;

    var myResponse = `I multiplied the number you gave me (${myParam}) by 5 and got ${myParam * 5}`;

    response.json({ message: myResponse });
});

app.post('/', (req, res) => {

})