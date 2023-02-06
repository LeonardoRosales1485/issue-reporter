const fetch = require('node-fetch');
const { key } = process.env.KEY || require("../doNotUploadToProd")
const { sendDoneTasks } = require("./sendDoneTasks")

//Memory variables
let data
//Memory variables


function getDoneIssues(originalResponse) {
    fetch('https://dispatchsss.atlassian.net/rest/api/3/search?jql=project%20%3D%20"Clinia%20Dev%20Board"%20AND%20sprint%20IN%20openSprints()%20AND%20status="Done"', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                key
            ).toString('base64')}`,
            'Accept': 'application/json'
        }
    })
        .then(async function (response) {
            var wtf = await response.text();
            const parsed = JSON.parse(wtf)
            const parsedIssues = parsed.issues
            const tasks = parsedIssues.map((x) => {
                let details = {
                    Tipo: x["fields"]["issuetype"]["name"],
                    TaskCode: x["key"],
                    NombreTask: x["fields"]["summary"],
                    Asignado: x["fields"]["assignee"]["displayName"],
                    Estado: x["fields"]["status"]["name"],
                }
                return details
            });
            data = tasks
            console.log(tasks);

            originalResponse.json({
                tasks
            });
            return 200
        })
        .then(text => {
            console.log(text)
            sendDoneTasks(data)
        })
        .catch(err => console.error(err));
}

exports.getDoneIssues = getDoneIssues