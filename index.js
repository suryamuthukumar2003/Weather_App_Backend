const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
app.use(cors());
app.use(bodyparser.json());

app.post('/getWeather/:location',async (req,res)=>{
    const {location}=req.params;

    if(!location){
        res.status(400).json({status:"failure",message:"Location is required"})
    }
    try{
        const getWeather= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=Metric`).then((resp)=>resp.json());
        res.status(200).json(getWeather);

    }catch(err){
        res.status(500).json({status:"failure",message:"Error in fetching data",error:err});
    }
})


app.listen(8002,()=>{
    console.log("Server is ruuning on",8002);
})