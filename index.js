require('dotenv').config()
const express= require('express')
const cors =require('cors')

const stripe =require('stripe')(process.env.STRIPE_SCERET_KEY)
const app=express();
 const Port=8000;

 app.use(express.json())
app.use(cors())

app.post('/',async(req,res)=>{
    try{
 
        const {amount}=req.body;
     const paymentIntent =await stripe.paynmentIentents.create({

        amount:amount,
        currency:'INR',
        payment_method_type:['card']
     });

     const clientSecret=paymentIntent.client_secret;
     res.json({
    clientSecret
     });
    }catch(e){
        console.log(e)
    }

})

 app.listen(Port,()=>{
    console.log('Listening on port 8000')
 })