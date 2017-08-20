const fs = require('fs');
const path = require('path');

const ApiAiAssistant = require('actions-on-google').ApiAiAssistant;

class Assistant {
    constructor() {
        this._init = false;
        this._map = null;
    }

    static loadActions() {
        const map = new Map();
        const actionDir = path.join(__dirname, './actions');
        const actions = fs.readdirSync(actionDir) 
        actions.forEach(action => {
            const pathFile = path.join(actionDir, action)
            map.set(path.parse(pathFile).name, require(pathFile));
        });
        return map;
    }

    init() {
        if (this._init) {
            return this;
        }
        this._map = Assistant.loadActions();
        this._init = true;
    } 

    handleRequests(req, res) {
        const assistant = new ApiAiAssistant({ request: req, response: res });
        assistant.handleRequest(this._map);
    }
}


module.exports = new Assistant();
