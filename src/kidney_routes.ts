
import type { Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";
const jwtPassword = "sachinsecretpassword";
import zod, { any } from "zod";

const app = express();
app.use(express.json());
const port = 4001;

const userSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8)
})

let UserLocalDatabase:any = [];
console.log("checking_____________________",UserLocalDatabase);
function usercheck(username: string, password: string) {
  if (username !== "sachin" || password !== "echan") {
    return false;
  }
  else {
    return true;
  }
}
function kidneyCheck(kidneyId: number) {
  if (kidneyId !== 1) {
    return true;
  }
  else {
    return false;
  }
}

function userVerify (token:any){
  // const result = jwt.verify(token, jwtPassword);
  //  if(result === "true"){
  // console.log("user exists");
  // }
 for(let i = 0; i<UserLocalDatabase.length; i++){
  if(UserLocalDatabase[i] === token){
    console.log("+++++++++++++++ User is find in the db ++++++++++++++");
  }
  else{
    console.log("--------------Not found-------------");
  }
 }
}
app.post("/sign-up", (req: Request, res: Response) => {
  const data = userSchema.safeParse(req.body);

  if (!data) {
    return "Give the inputs first";
  }
  try {
    const result = jwt.sign(data, jwtPassword);
    const decodedata = jwt.verify(result, jwtPassword);
    UserLocalDatabase.push(decodedata);
    console.log("Decoded the data is this : ", UserLocalDatabase);
    console.log("this the jwt tokens", result);
    userVerify(result);
    return result;
    
  }
  catch (e) {
    console.log("Error is this", e);
  }
})

app.post("/login" , (req: Request, res: Response) => {
  const data = userSchema.safeParse(req.body);
  if (!data) {
    return "Give the inputs first";
  }
  try {
    const token = jwt.sign(data, jwtPassword);
    const decodedata = jwt.verify(token, jwtPassword);
    console.log("Decoded the data is this : ", decodedata);
    console.log("this the jwt tokens", token);
    userVerify(token);
    return token;
  }
  catch (e) {
    console.log("Error is this", e);
  }
})

app.get("/"(req: Request, res: Response) => {
 func 
})

app.get("/", (req: Request, res: Response) => {
  const kidneyIdd = req.query.kidneyId;
  if (!usercheck(req.body.username, req.body.password)) {
    res.json(() => {
      res.send("User doesn't exist");
    })
  }
  if (!kidneyCheck(Number(kidneyIdd))) {
    res.status(403).send("Not availble kidney");
  }
})
app.use((req: any, res: any, error: any) => {
  if (error) {
    res.status(404).send("invalid page routes");
  }
  else {
    res.status(200).send("youre going well");
  }
});

// app.use((req:any, res:any, error:any, next:any)=>{
//    res.status(500).send("Internal Error occured");
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

