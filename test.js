import test from 'ava'
import { requestAnimationFrame, cancelAnimationFrame } from './src/index.js'
import raf from 'raf'
raf.polyfill()

test.cb('only invoke once', t => {
    let count = 0
    const add = () => count += 1

    requestAnimationFrame(add)
    requestAnimationFrame(add)
    requestAnimationFrame(add)

    setTimeout(() => {
        t.is(count, 1)
        t.end()
    }, 20)
})

test.cb('return same id for duplicate callback', t => {
    const animation = () => { }

    const id1 = requestAnimationFrame(animation)
    const id2 = requestAnimationFrame(animation)

    setTimeout(() => {
        t.is(id1, id2)
        t.end()
    }, 20)
})

test.cb('cancel', t => {
    let count = 0
    const add = () => count += 1

    requestAnimationFrame(add)
    requestAnimationFrame(add)
    const id = requestAnimationFrame(add)

    cancelAnimationFrame(id)

    setTimeout(() => {
        t.is(count, 0)
        t.end()
    }, 20)
})
