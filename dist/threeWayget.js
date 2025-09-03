import express from "express";
import * as fs from "fs";
import path from "path";
const app = express();
app.use(express.json());
const port = 4000;
app.get("/create-file", (req, res) => {
    try {
        // Build absolute path to Desktop
        const desktopPath = path.join(process.env.HOMEPATH || "C:\\Users\\ADMIN\Desktop\sachin.txt");
        fs.writeFileSync(desktopPath, "Hello from Express + TypeScript!");
        res.send(`✅ File created at: ${desktopPath}`);
    }
    catch (err) {
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
function wait1(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("wait1 resolved");
        }, t * 1000);
    });
}
function wait2(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("wait2 resolved");
        }, t * 1000);
    });
}
function wait3(t) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("wait3 resolved");
        }, t * 1000);
    });
}
function calculateTime(t1, t2, t3) {
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
app.post('/post', async (req, res) => {
    const { username, password, n1, n2, n3 } = req.query;
    // Ensure n1, n2, n3 are numbers and provide defaults if undefined
    const t1 = typeof n1 === "number" ? n1 : 1;
    const t2 = typeof n2 === "number" ? n2 : 1;
    const t3 = typeof n3 === "number" ? n3 : 1;
    await calculateTime(t1, t2, t3).then((time) => {
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
    console.log(`this the username : ${username} and password : ${password}`);
});
// You need to import or define the User model above this route if you want to use it.
// For demonstration, here's a placeholder User object with a static findOneById method.
// Replace this with your actual User model import.
class User {
    static findOneById(id) {
        // Dummy implementation, replace with actual DB logic
        if (id === "1")
            return { id: "1", name: "Sachin" };
        return null;
    }
}
app.get('/api/getuser', (req, res) => {
    const getId = req.query.getId;
    try {
        const user = User.findOneById(getId);
        if (user) {
            res.send(`User exists on the platform: ${JSON.stringify(user)}`);
        }
        else {
            res.status(404).send("User does not exist on the platform");
        }
    }
    catch (err) {
        res.status(500).send("Please sign in, user not exist");
    }
});
function checkAuth(username, password) {
    if (username !== "sachin" && password !== "echan") {
        return false;
    }
    else {
        return;
    }
}
app.get('/health-check-up', (req, res) => {
    const { username, password } = req.body;
    if (checkAuth(username, password)) {
        res.status(403).send("user is not exist");
    }
    else {
        res.status(200).send("Authentication ahe");
    }
});
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
//# sourceMappingURL=threeWayget.js.map