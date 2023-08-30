const notifier = require('node-notifier');

/**
 * принимает параметры в виде: 1h 4m 5s
 */
const MS_IN_S = 1000
const S_IN_M = 60
const M_IN_H = 60
const H_IN_D = 24
const TIME_UNIT_MAP = {
    ms: 1,
    get s() { return this.ms * MS_IN_S }, 
    get m() { return this.s * S_IN_M }, 
    get h() { return this.m * M_IN_H }, 
    get d() { return this.h * H_IN_D }, 
}
const regExpTimeUnit = /^(\d+)([smhd])$/

const [,, ...args] = process.argv

const timeout = args.reduce((result, item) => {
    const [,count, timeUnit] = item.match(regExpTimeUnit) || []

    if (count <= 0 || !timeUnit) {
        return result
    }

    return result + count * TIME_UNIT_MAP[timeUnit]
}, 0)

if (timeout > 0) {
    setTimeout(() => {
        notifier.notify({
            title: 'Время закончилось!',
            message: 'Hello from node, Mr. User!',
            sound: true,
            wait: true
        });
        console.log('Время закончилось!')
    }, timeout)

    console.log('Таймер запущен на', timeout, 'ms')
} else {
    console.error('Некорректный формат времени')
}
