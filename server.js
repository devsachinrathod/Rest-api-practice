
// // import express from "express";
// // const app = express();

// // app.use(express.json());

// // function printNum(n){
// //   let ans =0;
// //   for(let i=0; i<=n; i++){
// //      ans =  ans + i;
// //   }
// //   return ans;
// // }

// // app.get('/',(req , res)=>{
// //   const n = req.query.n;
// //   const ans = printNum(n);
// //   res.send(ans);
// // })

// // app.get

// // const port = 4000;
// // app.listen(port,()=>{
// //   console.log(`App is runing ${port}`);
// // });

// import express from "express";
// const app = express();
// const port = 4000;

// // Middleware to parse JSON request body
// app.use(express.json());

// /**
//  * 1. Query Params Example
//  * URL: http://localhost:4000/search?keyword=NodeJS
//  */
// app.get("/search", (req, res) => {
//   const keyword = req.query.keyword;
//   res.send(`🔍 Searching for: ${keyword}`);
// });

// /**
//  * 2. Route Params Example
//  * URL: http://localhost:4000/user/101
//  */
// app.get("/user/:id", (req, res) => {
//   const userId = req.params.id;
//   res.send(`👤 User ID is: ${userId}`);
// });

// /**
//  * 3. Body Params Example
//  * URL: POST http://localhost:4000/user
//  * Body: { "name": "Sachin", "age": 23 }
//  */
// app.post("/user", (req, res) => {
//   const { name, age } = req.body;
//   res.send(`✅ User created: ${name}, Age: ${age}`);
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });
import express from "express";
const app = express();
const port = 4000;

app.use(express.json()); // for parsing JSON body

// 1️⃣ Route Params Example
// URL: http://localhost:4000/user/101
app.get("/user/:id", (req, res) => {
  const userId = req.params.id; // take directly from URL path
  res.send(`👤 Route Param → User ID is: ${userId}`);
});

// 2️⃣ Query Params Example
// URL: http://localhost:4000/search?name=Sachin&age=23
app.get("/search", (req, res) => {
  const { name, age } = req.query; // take from query string
  res.send(`🔍 Query Params → Name: ${name}, Age: ${age}`);
});

// 3️⃣ Body Example (POST request with JSON)
// URL: POST http://localhost:4000/login
// Body: { "username": "admin", "password": "1234" }
app.post("/login", (req, res) => {
  const { username, password } = req.body; // take from body
  res.send(`🔑 Body → Username: ${username}, Password: ${password}`);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
