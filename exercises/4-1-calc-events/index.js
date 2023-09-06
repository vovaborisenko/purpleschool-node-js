const { EventEmitter } = require('events');
const add = require('./add');
const divide = require('./divide');
const multiply = require('./multiply');
const subtract = require('./subtract');
const actionMap = {
    add,
    divide,
    multiply,
    subtract
}

const myEmitter = new EventEmitter()

Object.entries(actionMap).forEach(([event, action]) => {
    myEmitter.on(event, (a, b) => myEmitter.emit('result', action(a, b)))
})
myEmitter.on('result', (result) => console.log('result:', result))

const [,, aParam, action, bParam] = process.argv
const a = Number(aParam)
const b = Number(bParam)

try {
    if (Number.isNaN(a) || Number.isNaN(b)) {
        throw new Error('1й и 3й параметры должны быть числами')
    }

    if (actionMap[action]) {
        throw new Error(`${action}: такой функции не существует`)
    }

    myEmitter.emit(action, a, b)
} catch ({ message }) {
    console.error(message)
}
