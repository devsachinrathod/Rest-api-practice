import express from "express";
import type { Request, Response } from "express";
import * as fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
const port = 4000;

app.get("/create-file", (req: Request, res: Response) => {
  try {
    // Build absolute path to Desktop
    const desktopPath = path.join(
      process.env.HOMEPATH || "C:\\Users\\ADMIN\Desktop\sachin.txt"
    );

    fs.writeFileSync(desktopPath, "Hello from Express + TypeScript!");

    res.send(`✅ File created at: ${desktopPath}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error creating file.");
  }
});
// function fooloop(n: any) {
//   for (let i = 0; i < n; i++) {
//     if (i == 10) {
//       break;
//     }
//     console.log("All the number is printed");
//     console.log(i, "\t");

//   }
// }
function wait1(t:any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("wait1 resolved");
    }, t * 1000);
  });
}

function wait2(t:any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("wait2 resolved");
    }, t * 1000);
  });
}

function wait3(t:number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("wait3 resolved");
    }, t * 1000);
  });
}

function calculateTime(t1:number, t2:number, t3:number) {
  const start = Date.now();

  return wait1(t1)
    .then(() => wait2(t2))
    .then(() => wait3(t3))
    .then(() => {
      const end = Date.now();
      return end - start; // total time in ms
    });
}

// usage


app.post('/post', async (req: Request, res: Response,) => {

  const { username, password , n1, n2, n3} = req.body;
  await calculateTime(n1,n2, n3).then((time) => {
  const extacttime = time / 1000;
  console.log("Total time taken:", extacttime, "ms");
});
  if (username == "sachin") {
    console.log("sachin present");
  }
  else {
    console.log("he is absent");
  }
  // fooloop(num);
  console.log(`this the username : ${username} and password : ${password}`
  )
})

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
