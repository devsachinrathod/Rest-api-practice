import { error } from "console";
import express from "express";
const app = express();
app.use(express.json());
const port = 4001;
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