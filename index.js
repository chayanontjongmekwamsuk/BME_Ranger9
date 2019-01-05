/*
'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const config = require('./config.json');

const port = process.env.PORT || 3000

// create LINE SDK client
const client = new line.Client(config);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// webhook callback
app.post('/webhook', line.middleware(config), (req, res) => {
  // req.body.events should be an array of events
  res.sendStatus(200)
  if (!Array.isArray(req.body.events)) {
    return res.status(200).end();
  }
  // handle events separately
  Promise.all(req.body.events.map(event => {
    console.log('event', event);
    // check verify webhook event
    if (event.replyToken === '00000000000000000000000000000000' ||
      event.replyToken === 'ffffffffffffffffffffffffffffffff') {
      return;
    }
    return handleEvent(event);
  }))
    .then(() => res.end())
    .catch((err) => {
      console.error(err);
      res.status(200).end();
    });
});

// simple reply function
const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};

// callback function to handle a single event
function handleEvent(event) {
  switch (event.type) {
    case 'message':
      const message = event.message;
      switch (message.type) {
        case 'text':
          return handleText(message, event.replyToken);
        case 'image':
          return handleImage(message, event.replyToken);
        case 'video':
          return handleVideo(message, event.replyToken);
        case 'audio':
          return handleAudio(message, event.replyToken);
        case 'location':
          return handleLocation(message, event.replyToken);
        case 'sticker':
          return handleSticker(message, event.replyToken);
        default:
          throw new Error(`Unknown message: ${JSON.stringify(message)}`);
      }

    case 'follow':
      return replyText(event.replyToken, 'Got followed event');

    case 'unfollow':
      return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);

    case 'leave':
      return console.log(`Left: ${JSON.stringify(event)}`);

    case 'postback':
      let data = event.postback.data;
      return replyText(event.replyToken, `Got postback: ${data}`);

    case 'beacon':
      const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
      return replyText(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

    default:
      throw new Error(`Unknown event: ${JSON.stringify(event)}`);
  }
}

function handleText(message, replyToken) {
  return replyText(replyToken, message.text);
}

function handleImage(message, replyToken) {
  return replyText(replyToken, 'Got Image');
}

function handleVideo(message, replyToken) {
  return replyText(replyToken, 'Got Video');
}

function handleAudio(message, replyToken) {
  return replyText(replyToken, 'Got Audio');
}

function handleLocation(message, replyToken) {
  return replyText(replyToken, 'Got Location');
}

function handleSticker(message, replyToken) {
  return replyText(replyToken, 'Got Sticker');
}

const port = config.port;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
*/

// initial return hello

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/webhook', (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  let msg = req.body.events[0].message.text;
  // reply(reply_token)
  reply(reply_token, msg);
  res.sendStatus(200);
});

app.listen(port);

function reply(reply_token, msg) {
// function reply(reply_token) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {leSLT6TM73BCkORSMedsDEI0MfrS29lfV6wIIsXbF6UmJ5Y2d+Y80RAlxtIkfFuPhJOL5+8lx4Wyv6ojj1Eibr04O1n3fORRGHwUnIyM8tfV//liRGkp73cDYiCTN/ZTkd42KICBYRCWO4ctm02u/wdB04t89/1O/w1cDnyilFU=}',
  };

  let body = JSON.stringify({
    replyToken: reply_token,
    /*
        messages: [{
            type: 'text',
            text: 'Hi Aoff who is the most beautiful girl'
        },
        {
            type: 'text',
            text: 'How can I help you?'
        }] */

    /*
        messages: [{
            type: 'text',
            text: msg
        }] */

    messages: [{

      type: 'template',
      altText: 'this is a carousel template',
      template: {
        type: 'carousel',
        columns: [
          {
            thumbnailImageUrl: 'https://www.mcchrystalgroup.com/wp-content/uploads/2017/05/day1.png',
            imageBackgroundColor: '#FFFFE0',
            title: 'Day1',
            text: 'Information',
            defaultAction: {
              type: 'uri',
              label: 'View detail',
              uri: 'https://weather.com/weather/today/l/13.75,100.49?par=google',
            },
            actions: [
              {
                type: 'postback',
                label: 'Pressure',
                data: 'action=pressure&itemid=111',
              },
              {
                type: 'postback',
                label: 'Temperature',
                data: 'action=temp&itemid=111',
              },
              {
                type: 'uri',
                label: 'View more detail',
                uri: 'https://weather.com/weather/today/l/13.75,100.49?par=google',
              },
            ],
          },
          {
            thumbnailImageUrl: 'https://carlosvargas.com/wp-content/uploads/2014/01/day2-1-1.jpg',
            imageBackgroundColor: '#000000',
            title: 'Day2',
            text: 'Information',
            defaultAction: {
              type: 'uri',
              label: 'View detail',
              uri: 'https://weather.com/weather/today/l/13.75,100.49?par=google',
            },
            actions: [
              {
                type: 'postback',
                label: 'Humidity',
                data: 'action=humid&itemid=222',
              },
              {
                type: 'postback',
                label: 'Accelerometer',
                data: 'action=acc&itemid=222',
              },
              {
                type: 'uri',
                label: 'View detail',
                uri: 'http://example.com/page/222',
              },
            ],
          },
        ],
        imageAspectRatio: 'rectangle',
        imageSize: 'cover',
      },
    }],
  });

  request.post({
    url: 'https://api.line.me/v2/bot/message/reply',
    headers: headers,
    body: body,
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode);
  });
}
