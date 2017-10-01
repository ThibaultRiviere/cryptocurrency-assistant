const fs = require('fs');
const path = require('path');
const assert = require('assert');

function validateFile(filePath) {
    const isFile = fs.statSync(filePath).isFile();
    assert(isFile, 'conf dir should only contains files' );
    const fileInfo = path.parse(filePath);
    assert(fileInfo.ext === '.json', 'file should be a json extension')
    return fileInfo;
}

function parseFile(pathDir, jsonFile) {
    const filePath = path.resolve(`${pathDir}/${jsonFile}`);
    validateFile(filePath);
    return JSON.parse(fs.readFileSync(filePath));
}

function getJSONFiles(pathDir) {
    const results = {};
    JSONFiles = fs.readdirSync(pathDir);
    JSONFiles.forEach(jsonFile => {
        if (jsonFile[0] !== '.') {
            const json = parseFile(pathDir, jsonFile);
            results[jsonFile.split('.')[0]] = json;
        }
    });
    return results;
}

module.exports = getJSONFiles(path.join(__dirname, './conf'));
