const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser')
const app = express();
const key = "leonardorosales1485@gmail.com:ATATT3xFfGF0qnuuU8JmJO0g-i1S45sNi6jVyt9W1ruJE5RA2chkfOJa9lNgj7QVH1yalkULgLzQXFYi9dGPgONU9DplUwvThL5t3OjQ5Rt7zQXoOUmczZ8pcbYfxs0lnIDogFABBOI8VXOXs2a4EFFpFQqXnQwIXw7RKgV1XiZeZiaSxKHenPY=108BF2B3"
const fetch = require('node-fetch');

const PORT = process.env.PORT || 2020;
app.use(cors())
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json());

const bodyData = `{
  "filterId": 10020,
  "name": "Clinia Dev Board",
  "location": {
    "projectKeyOrId": "10020",
    "type": "project"
  },
  "type": "scrum"
}`;



app.get('/', (req, res) => {
    res.json({
        root: 'Esta respuesta. Indice',
        getOngoingIssues: 'Traer tasks del sprint actual que estan en curso',
        getPendingIssues: 'Traer tasks del sprint actual que estan disponibles',
        getDoneIssues: 'Traer tasks del sprint actual que estan hechas',
    });
});

app.get('/get-on-going-issues', (req, res) => {
    let name = req.params.name;
    fetch('https://dispatchsss.atlassian.net/rest/api/3/search?jql=project%20%3D%20"Clinia%20Dev%20Board"%20AND%20sprint%20IN%20openSprints()%20AND%20status="In%20Progress"', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                key
            ).toString('base64')}`,
            'Accept': 'application/json'
        }
    })
        .then(async function(response) {
            var wtf = await response.text();
            console.log(wtf);
            const parsed = JSON.parse(wtf)
            const parsedIssues = parsed.issues
            console.log(typeof parsedIssues);
            res.json({
                parsedIssues
            });
            return 200
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
});

app.get('/get-on-going-issuesPARSED', (req, res) => {
    let name = req.params.name;
    fetch('https://dispatchsss.atlassian.net/rest/api/3/search?jql=project%20%3D%20"Clinia%20Dev%20Board"%20AND%20sprint%20IN%20openSprints()%20AND%20status="In%20Progress"', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                key
            ).toString('base64')}`,
            'Accept': 'application/json'
        }
    })
        .then(async function(response) {
            var wtf = await response.text();
            const parsed = JSON.parse(wtf)
            const parsedIssues = parsed.issues
            const relevant = {
                TaskCode : parsedIssues[0]["key"],
                Tipo : parsedIssues[0]["fields"]["issuetype"]["name"],
            }
            res.json({
                relevant
            });
            return 200
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
