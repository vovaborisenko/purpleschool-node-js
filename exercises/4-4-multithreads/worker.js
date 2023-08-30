const { parentPort, workerData } = require('worker_threads');
const { sqr } = require('./service');

function handler ({ array }) {
    return sqr(array)
}

parentPort.postMessage(handler(workerData))
