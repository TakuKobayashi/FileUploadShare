import { NextFunction, Request, Response } from 'express';
import { Client, Config, ClientConfig, middleware, MiddlewareConfig, TextMessage } from '@line/bot-sdk';

const express = require('express');
const lineBotRouter = express.Router();

const config: Config = {
  channelAccessToken: process.env.LINE_BOT_CHANNEL_ACCESSTOKEN!,
  channelSecret: process.env.LINE_BOT_CHANNEL_SECRET!,
};

const client = new Client(config as ClientConfig);

lineBotRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello line');
});

lineBotRouter.post('/webhook', middleware(config as MiddlewareConfig), (req: Request, res: Response, next: NextFunction) => {
  console.log(JSON.stringify(req.body));
  Promise
  .all(req.body.events.map(handleEvent))
  .then((result) => res.json(result))
  .catch((err) => {
    console.error(err);
    res.status(200).end();
  });
});

async function handleEvent(event: any) {
//  let message = "画像や動画ファイルをアップロードしてください!!";
  let message = event.message.text;
  if (event.type === 'message'){
    if (event.message.type === 'image' || event.message.type === 'video'){
      const content = await client.getMessageContent(event.message.id);
      console.log(content);
    }
  }

  // create a echoing text message
  const echo: TextMessage = { type: 'text', text: message };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

export { lineBotRouter };
