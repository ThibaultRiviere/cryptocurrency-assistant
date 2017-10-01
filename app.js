const ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
const Server = require('./lib/server/server.js');
const config = require('./lib/config/config.js')


function getInitializedAssistant() {
    const assistant = require('./lib/assistant/assistant.js');

    assistant.init();
    return assistant;
}

function getInitializedServer(config, assistant) {
    const server = new Server(config);

    server.post('/actions', (req, res) => {
        assistant.handleRequests(req, res)
    });
    return server;
}

function main() {
    const assistant = getInitializedAssistant();
    const server = getInitializedServer(config, assistant);
    server.listen(8000);
}

main();
