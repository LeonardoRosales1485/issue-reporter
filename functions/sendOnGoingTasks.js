const { WebClient } = require('@slack/web-api');
const { token } = process.env.TOKEN
const { channel } = require("./utils")
const slack = new WebClient(token);

//Memory variables
let counter = 0
//Memory variables

function sendOnGoingTasks(data) {
    let list
    data.forEach(element => {
        counter++
        if (list === undefined) list = "<https://dispatchsss.atlassian.net/browse/" + element["TaskCode"]
            + "|" + element["TaskCode"]
            + " " + element["NombreTask"]
            + ">" + " tomada por "
            + element["Asignado"] + "\n"
        else list = list + "<https://dispatchsss.atlassian.net/browse/" + element["TaskCode"]
            + "|" + element["TaskCode"]
            + " " + element["NombreTask"]
            + ">" + " tomada por "
            + element["Asignado"] + "\n"
    })
    slack.chat.postMessage({
        channel: channel,
        text: `Hay ${counter} tasks que están en curso\n${list}`
    })
        .then(() => {
            console.log('Message sent to Slack successfully!');
        })
        .catch(console.error);
    return "Done"
}

exports.sendOnGoingTasks = sendOnGoingTasks