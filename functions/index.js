
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express")
const cors =require("cors");
const { Api } = require("@mui/icons-material");
const stripe = require("stripe")('sk_test_51NcUJLSICw1qJQkeOam1Dp7sGlSi8SphGk9gKP2N8tcI04TDtqllP5MlfOf9kF7eIOM9DCkI9N93rdY59CV2SIIS00Be6pmZxk')



// API

// App config 

const app = express();


// Middlewares

app.use(cors({origin:true}));
app.use(express.json())


// Api routes 

app.get('/',(req ,res)=>(res.status(200).send("hello world")))


// Listen Command

express.api = functions.https.onRequest(app)

