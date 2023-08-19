const express = require("express");
const cors = require("cors");
const functions = require("firebase-functions");

const stripe = require("stripe")(
    "sk_test_51NcUJLSICw1qJQkeOam1Dp7sGlSi8SphGk9gKP2N8tcI04TDtql"+
    "lP5MlfOf9kF7eIOM9DCkI9N93rdY59CV2SIIS00Be6pmZxk",
);

// API

// App config

const app = express();

// Middlewares

app.use(cors({origin: true}));
app.use(express.json());

// Api routes

app.get("/", (req, res) => res.status(200).send("<h1>Api is Working</h1>"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request Recieved for amount -> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    payment_method: "pm_card_visa",
    description: "Temporary Description",
  });
  // 201 is OK Created soomething
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen Command

exports.api = functions.https.onRequest(app);
