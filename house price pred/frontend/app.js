const express=require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.post('/predict', async (req,res)=>{
    const {bedrooms,bathrooms,area,floors,coth,goth,ryear,lat,aar} = req.body;
    try{
        const response = await fetch('http://127.0.0.1:5000/predict',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({bedrooms,bathrooms,area,floors,coth,goth,ryear,lat,aar})
        })
        const result = await response.json();
        res.send(`<body style="background-repeat: no-repeat;background-size: cover;background-image: url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');display: flex;align-items: center;justify-content: center;height: 100vh;"><h1 style="color:#ffc107;width:75%;background-color:#212529;text-align:center;padding:20px;border-radius:8px;"> Predicted Result: minimum ₹ ${result.prediction} lakhs</h1></body>`);
    }catch(err){
        console.error(" Fetch Error:", err);
        res.status(500).send('Error in connection!');
    }
    
});
app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'));
})

app.listen(4000,()=>{
    console.log('Server started at port 4000');
})