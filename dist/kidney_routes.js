import express from "express";
import jwt from "jsonwebtoken";
const jwtPassword = "sachinsecretpassword";
import zod from "zod";
const app = express();
app.use(express.json());
const port = 4001;
const userSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
});
let UserLocalDatabase = [];
function usercheck(username, password) {
    if (username !== "sachin" || password !== "echan") {
        return false;
    }
    else {
        return true;
    }
}
function kidneyCheck(kidneyId) {
    if (kidneyId !== 1) {
        return true;
    }
    else {
        return false;
    }
}
app.post("/sign-up", (req, res) => {
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
        return result;
    }
    catch (e) {
        console.log("Error is this", e);
    }
});
app.get("/", (req, res) => {
    const kidneyIdd = req.query.kidneyId;
    if (!usercheck(req.body.username, req.body.password)) {
        res.json(() => {
            res.send("User doesn't exist");
        });
    }
    if (!kidneyCheck(Number(kidneyIdd))) {
        res.status(403).send("Not availble kidney");
    }
});
app.use((req, res, error) => {
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
});
//# sourceMappingURL=kidney_routes.js.map