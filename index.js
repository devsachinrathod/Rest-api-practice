
import express from "express";
const app = express();

app.use(express.json());

function printNum(n){
  let ans =0;
  for(let i=0; i<=n; i++){
     ans =  ans + i;
  }
  return ans;
}

app.get('/',(req , res)=>{
  const n = req.query.n;
  const ans = printNum(n);
  res.send(ans);
})

const port = 4000;
app.listen(port,()=>{
  console.log(`App is runing ${port}`);
});