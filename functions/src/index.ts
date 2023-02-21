import * as functions from "firebase-functions";
import { PubSub } from '@google-cloud/pubsub'

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const randomNumber = functions.https.onRequest((request, response) => {
  console.log('running randomNumber');
  functions.logger.info("Hello logs!", {structuredData: true});
  const number = Math.round(Math.random() * 100);
  response.send(`Hello from Firebase! ${number}`);
});

export const hello = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send(`Hello from Firebase!`);
});


// ************** working with pubsub ***************** //
export const pubsubTriggeredFunction = functions.pubsub.topic('test-topic').onPublish((message, context) => {
    //function triggered by pubsub
    console.log('Got a pubsub message')

    const data = message.data ? Buffer.from(message.data, 'base64').toString() : 'ERR'

    console.log({ data })
    console.log({ context })

    return null // returns nothing
})


//function calls curl from the CLI to write a message to the local pubsub emulator
export const pubsubHelper = functions.https.onRequest(async (request, response) => {
  const price = request.body.stockPrice
  const pubsub = new PubSub()
  const messageID = await pubsub.topic('test-topic').publishMessage({
    json: { price: price },
  })
  response.status(201).send({ success: 'Published to pubsub test-topic -- message ID: ', messageID })
})

