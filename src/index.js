import { getKeyByValue } from './helper'

const callbackMap = new Map()

const requestAnimationFrame = callback => {
    if (!callbackMap.has(callback)) {
        const requestId = window.requestAnimationFrame(ts => {
            callbackMap.delete(callback)
            callback(ts)
        })
        callbackMap.set(callback, requestId)
        return requestId
    }
    else {
        return callbackMap.get(callback)
    }
}

const cancelAnimationFrame = requestId => {
    callbackMap.delete(getKeyByValue(callbackMap, requestId))
    return window.cancelAnimationFrame(requestId)
}

export default {
    requestAnimationFrame,
    cancelAnimationFrame,
}
