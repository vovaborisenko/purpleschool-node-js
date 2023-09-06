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

const [,, aParam, action, bParam] = process.argv
const a = Number(aParam)
const b = Number(bParam)

try {
    if (Number.isNaN(a) || Number.isNaN(b)) {
        throw new Error('1й и 3й параметры должны быть числами')
    }

    if (typeof actionMap[action] !== 'function') {
        throw new Error(`${action}: такой функции не существует`)
    }

    const result = actionMap[action](a, b)
    
    console.log('result:', result);
} catch ({ message }) {
    console.error(message)
}
