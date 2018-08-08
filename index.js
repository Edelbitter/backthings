const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const url = require('url');
const webpush = require('web-push');

const vapidKeys = {
    "publicKey": "BAQsFOEQGlL7T08PGFDSLcsYXrbfBndZjx8ZTtmLsFbNdbpW06mxvdjX6P7jgTJWmihBHrQ3cFFOdzHjrbP6RI8",
    "privateKey": "18bEjco9FJsVTDt2dIZbtB3zx32LnRIpviqk04i3iZ8"
}

let subscriptions = [];

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

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
    subscriptions.push(req.body);
    res.json({ yo: "hoho" });
})

app.post('/send',sendNotification)

export function sendNotification(req,res) {
    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    }


    Promise.all(subscriptions.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload))))
        .then(() => res.status(200).json({ message: 'Newsletter sent successfully.' }))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}