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
app.post("/", (req, res) => {
    const kidneyIdd = req.query.kidneyId;
    try {
        if (!usercheck(req.body.username, req.bodxy.password)) {
            return res.status(401).json({ message: "User doesn't exist" });
        }
    } catch (err) {
        return res.status(402).send("invalid data", err);
    }
    if (!kidneyCheck(Number(kidneyIdd))) {
        return res.status(403).send("Not availble kidney");
    }
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=kidney_routes.js.map