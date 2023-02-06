const { WebClient } = require('@slack/web-api');
const token = process.env.TOKEN
const { channel } = require("./utils")
const slack = new WebClient(token);

//Memory variables
let counter = 0
//Memory variables

function sendPendingTasks(data) {
    let lista
    data.forEach(element => {
        counter++
        if (lista === undefined) lista = "<https://dispatchsss.atlassian.net/browse/" + element["TaskCode"]
            + "|" + element["TaskCode"]
            + " " + element["NombreTask"]
            + ">" + " tomada por "
            + element["Asignado"] + "\n"
        else lista = lista + "<https://dispatchsss.atlassian.net/browse/" + element["TaskCode"]
            + "|" + element["TaskCode"]
            + " " + element["NombreTask"]
            + ">" + " tomada por "
            + element["Asignado"] + "\n"
    })
    slack.chat.postMessage({
        channel: channel,
        text: `Hay ${counter} tasks que están disponibles\n${lista}`
    })
        .then(() => {
            console.log('Message sent to Slack successfully!');
        })
        .catch(console.error);
    return "Done"
}

exports.sendPendingTasks = sendPendingTasks