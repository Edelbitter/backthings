const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const url = require('url');

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