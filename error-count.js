import { error } from 'console';
import express from 'express';
const app = express();
const port = 3001;

let errorCount = 0;

app.get('/user', function (req, res) {
        throw new Error("User not found");
    res.status(200).json({ name: 'john' });
});

app.post('/user', function (req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function (req, res) {
    res.status(200).json({ errorCount });
});
app.use((req, res, next, err) => {
    errorCount++;
    res.status(404).json({ error: err.message });
})
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})