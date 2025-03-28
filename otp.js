const twilio=require("twilio");
const express=require("express");
const otpgenerator=require("otp-generator");
const app=express();
app.use(express.json());

require('dotenv').config();
const otp=12345;
// otp generator
app.post("/getOtp",(req,res)=>{
    // const otp=12345;
    const body=req.body;
    const accountSid=process.env.accountSid;
    const authToken=process.env.authToken;
    const client=new twilio(accountSid,authToken);
    const otp=otpgenerator.generate(6,{digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
    client.messages.create({
        body:`otp for verification ${otp}`,
        from: process.env.twilioNumber,
        to:body.to
        // to:"+917268034706"
    }).then((messages)=>{
        console.log("message sent " + messages.sid);
        res.status(200).json({msg:"otp sent successfully"});
    }).catch((error)=>{
        console.error(error);
        res.status(400).json({msg:error});
    });
});
app.post("/verifyOtp",(req,res)=>{
    const body=req.body;
    if(body.otp==otp){
        res.status(200).json({msg:"otp verified"});
    }
    else{
        res.status(400).json({msg:"invalid otp"});
    }
});

app.listen(4000,()=>{
    console.log("server is running at 4000");
})