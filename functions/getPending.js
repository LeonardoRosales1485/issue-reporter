const fetch = require('node-fetch');
const { key } = process.env.KEY || require("../keys/doNotUploadToProd")
const { sendPendingTasks } = require("./sendPendingTasks")

//Memory variables
let data
//Memory variables

function getPendingIssues(originalResponse) {
    fetch('https://dispatchsss.atlassian.net/rest/api/3/search?jql=project%20%3D%20"Clinia%20Dev%20Board"%20AND%20sprint%20IN%20openSprints()%20AND%20status="To%20Do"', {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                key
            ).toString('base64')}`,
            'Accept': 'application/json'
        }
    })
        .then(async function (response) {
            let assigneeName = "Libre"
            var wtf = await response.text();
            const parsed = JSON.parse(wtf)
            const parsedIssues = parsed.issues
            console.log(parsedIssues);
            const tasks = parsedIssues.map((x) => {
                if (x["fields"]["assignee"] !== null) { assigneeName = x["fields"]["assignee"]["displayName"] }
                else assigneeName = "Libre";
                let details = {
                    Tipo: x["fields"]["issuetype"]["name"],
                    TaskCode: x["key"],
                    NombreTask: x["fields"]["summary"],
                    Asignado: assigneeName,
                    Estado: x["fields"]["status"]["name"],
                }
                return details
            });
            data = tasks
            console.log(tasks);

            originalResponse.json({
                tasks
            });
            return data
        })
        .then(text => {
            console.log(text)
            sendPendingTasks(data)
        })
        .catch(err => console.error(err));
}

exports.getPendingIssues = getPendingIssues