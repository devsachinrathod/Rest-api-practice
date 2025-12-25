import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];
app.post("/cooker" ,(req, res)=> {
    
    
}
)
app.get('/getVideoId',(req, res) => {
    const videoId = req.query.videoId;
    function isValidVideoId(id) {
        const regex = /^[a-zA-Z0-9_-]{11}$/;
        return regex.test(id);
    }
    function generateVideoId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
        let result = '';
        for (let i = 0; i < 11; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }
    generateVideoId();
    res.json({
        videoId: videoId
    })
})
app.get('/', function(req ,res ) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i = 0; i < numberOfKidneys; i++){
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys,
    })
})

app.post('/', function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy,
    })
    res.json({
        msg: "done"
    })
})

app.put('/', function (req, res) {
    for(let i = 0; i < users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }  
    res.json({
        msg: "done"
    })
})

app.delete('/', function(req, res) {
    let isAtleastOneUnhealthyKidney = false;
    for(let i = users[0].kidneys.length - 1; i >= 0; i--){
        if (!users[0].kidneys.healthy) {
            isAtleastOneUnhealthyKidney = true;
        }
    }

    if (isAtleastOneUnhealthyKidney) {
        for(let i = users[0].kidneys.length - 1; i >= 0; i--){
            if (!users[0].kidneys.healthy) {
                users[0].kidneys.splice(i,1);
            }
        }
        res.json({
            msg: "done"
        })
    }else{
        res.status(411).json({
            msg: "NO unhealthy kidney"
        })
    }
    
})

app.post('/User_money', function(req, res) {
    const money = req.body.money;
    const IntMoney = parseInt(money);

    if(!IntMoney === " " ){
        return res.status(400).json({
            msg: "Invalid money"
        })
    }
   console.log(typeof(IntMoney));
    if(IntMoney < 0) {
        return res.status(400).json({
            msg: "Money must be positive"
        })
    }

    users[0].money.push({
        money: money,
    })
    res.json({
        msg: "done"
    })
})

app.listen(3000,()=>console.log("connected"));