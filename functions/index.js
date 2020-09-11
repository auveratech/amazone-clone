const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51HPvpzKHV6sqZdNwEy3mq6OCTFN7rg77DV6shk3zp5AAP38woyWASClsB5rtfO4sejS5kyV2ZyNg6eWa1nXZh94N0072JLfWxS')

// API setup



// App config
const app = express();

// Middlewares
app.use(cors({ origin: true}));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('Hello World'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Recieved Boom!! For this amount >>>', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of currency
        currency: 'usd',
    });

    //OK - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen command
exports.api = functions.https.onRequest(app)


//API Endpoint
// http://localhost:5001/clone-e75b9/us-central1/api











// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
