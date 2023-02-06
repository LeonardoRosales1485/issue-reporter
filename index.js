const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser')
const { getOngoingIssues } = require("./functions/getOnGoing")
const { getPendingIssues } = require("./functions/getPending")
const { getDoneIssues } = require("./functions/getDone")

const app = express();
const PORT = process.env.PORT || 2020;
app.use(cors())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json());

app.get('/', (req, res) => {
    res.json({
        root: 'Esta respuesta. Indice',
        "/get-on-going-issues": 'Traer tasks del sprint actual que estan en curso',
        "/get-pending-issues": 'Traer tasks del sprint actual que estan disponibles',
        "/get-done-issues": 'Traer tasks del sprint actual que estan hechas',
    });
});

app.get('/get-on-going-issues', (req, res) => {
    getOngoingIssues(res)
});

app.get('/get-pending-issues', (req, res) => {
    getPendingIssues(res)
});

app.get('/get-done-issues', (req, res) => {
    getDoneIssues(res)
});

app.get('/auth', (req, res) => {
    getDoneIssues(res)
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
