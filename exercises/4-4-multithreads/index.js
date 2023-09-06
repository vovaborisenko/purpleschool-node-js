const os = require('os');
const { Worker } = require('worker_threads');
const { sqr } = require('./service');
const BIG_ARRAY_LENGTH = 3_000_000

const { length: coreCount } = os.cpus()

const workersCount = coreCount - 1 || 1
const minLengthWorkersSubarray = parseInt(BIG_ARRAY_LENGTH / workersCount)
const maxLengthWorkersSubarray = parseInt(BIG_ARRAY_LENGTH / workersCount) + BIG_ARRAY_LENGTH % workersCount

const bigArray = Array.from(new Array(BIG_ARRAY_LENGTH)).map((_item, index) => index + 1)
const workersArray = Array.from(new Array(workersCount))
    .map((_item, index) => {
        const subarrayLength = index === workersCount - 1 ? maxLengthWorkersSubarray : minLengthWorkersSubarray
        
        return Array.from(new Array(subarrayLength))
            .map((_item, innerIndex) => index * minLengthWorkersSubarray + innerIndex + 1)
    })

const main = async () => {
    performance.mark('start')
    sqr(bigArray)
    performance.mark('end')
    
    performance.mark('start workers')
    let workerResult = 0
    await Promise.all(workersArray.map((array) => new Promise(resolve => {
        const worker = new Worker('./worker.js', {
            workerData: { array }
        })

        worker.on('message', (value) => {
            workerResult += value
            resolve()
        })
    }) ))
    performance.mark('end workers')
    
    performance.measure('slow', 'start', 'end')
    performance.measure('workers', 'start workers', 'end workers')
    console.log(performance.getEntriesByType('measure'));
}

main()
