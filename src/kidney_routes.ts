import type { Request ,Response} from "express";
import express from "express";

const app = express();
app.use(express.json());
const port = 4001;

app.post("/", (req:Request , res:Response)=>{
    const kidneyId = req.query.kidneyId;
    const {username, password} = req.body;
   if(Number(kidneyId) !== 1){
     res.send("don't have kidney right now");
   }
   console.log(kidneyId);
   if(username !=="sachin" || password !=="echan" ){
    res.status(403).send("wrong inputs please give right inputs");
   }
   console.log(username, password);
})

app.listen(port ,()=>{
    console.log(`Listening on port ${port}`);
})
