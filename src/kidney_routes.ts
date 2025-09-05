import type { Request ,Response} from "express";
import express from "express";

const app = express();
app.use(express.json());
const port = 4001;

function usercheck(username:string, password:string){
    if(username !== "sachin" || password !== "echan"){
        return false;
    }
    else{
        return true;
    }
}
function kidneyCheck(kidneyId:number){
  if(kidneyId !== 1 ){
    return true;
  }
  else{
    return false;
  }
}

app.post("/", (req:Request , res:Response)=>{
    const kidneyIdd = req.query.kidneyId;
 if(!usercheck(req.body.username, req.body.password)){
    res.json(()=>{
        res.send("User doesn't exist");
    })
 }
 if(!kidneyCheck(Number(kidneyIdd))){
   res.status(403).send("Not availble kidney");
 }
})

app.listen(port ,()=>{
    console.log(`Listening on port ${port}`);
})

