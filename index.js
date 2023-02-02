const express = require('express');
const cors = require('cors');
const app = express();
const key = "leonardorosales1485@gmail.com:ATATT3xFfGF02ySUiRz3S5VNvgjhYCi7nL77P6ADVzNRhfhYi6CPYbSZOv_wSIqodULxE1WuJR6d0y4oUKtaKAARA6Ao73_MZkzrMvFEA3eNz4dGrn0P1R0lB0RFtueXxqQlmBhc3uAZ7u3YkmDp6SfFfeWToP390_rKaWCAQ7MPI8jK0HSed18=DEA3C616"
const fetch = require('node-fetch');


const bodyData = `{
  "filterId": 10020,
  "name": "Clinia Dev Board",
  "location": {
    "projectKeyOrId": "10020",
    "type": "project"
  },
  "type": "scrum"
}`;

app.use(cors())

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

app.listen(80, () => {
    console.log('server is listening on port 2020');
});
