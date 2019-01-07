// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const manager = new require('./singalr/manager')();
const logs = document.getElementById("logsTA");
let connection;

async function connect() {

    var urlInput = document.getElementById("serverInput");
    if (!urlInput) {
        alert("Failed to get server URL")
        return;
    }
    var serverURL = urlInput.value;
    console.log(serverURL);
    if (!serverURL) {
        alert("Failed to get server URL")
        return;
    }
    var result = await manager.connect(serverURL);
    if (!!result) {
        addLog("_______________________");
        addLog(`Connected to ${serverURL} Successfully`);
        addLog("_______________________");
    }
}

async function send() {
    const methodName = document.getElementById("sendMethod").value;
    const data = document.getElementById("sendData").value;
    const result = await manager.callMethod(methodName, data);
    if (!!result) {
        addLog("Message Sent Successfully!");
        addLog("_______________________");
    } else {
        addLog(`Failed To Send Message to Method ${methodName}`);
        addLog("_______________________");
    }
}

function listen() {
    const methodName = document.getElementById("listenMethod").value;

    manager.listenToMethod(methodName, (data) => {
        addLog(`Message Received: ${data}`);
        addLog("_______________________");
    })
}

function addLog(logEntry) {
    logs.value += logEntry;
    logs.value += "\n"
    logs.scrollTop = logs.scrollHeight;
}

document.getElementById("listenBTN").addEventListener("click", listen);
document.getElementById("sendBTN").addEventListener("click", send);
document.getElementById("connectBTN").addEventListener("click", connect);

