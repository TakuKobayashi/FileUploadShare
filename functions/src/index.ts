// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
import { config, region } from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

require('dotenv').config();
admin.initializeApp(config().firebase);

import { lineBotRouter } from './routes/line/bot';

const app = express();

app.use('/line/bot', lineBotRouter);

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

export const api = region('asia-northeast1').https.onRequest(app);

export default app;
