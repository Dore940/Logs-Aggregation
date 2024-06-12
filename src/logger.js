function log(message) {
    console.log(`[INFO]: ${message}`);
}

function error(message) {
    console.error(`[ERROR]: ${message}`);
}

module.exports = { log, error };