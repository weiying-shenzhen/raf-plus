import { getKeyByValue } from './helper'

const callbackMap = new Map()

export const requestAnimationFrame = callback => {
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

export const cancelAnimationFrame = requestId => {
    callbackMap.delete(getKeyByValue(callbackMap, requestId))
    return window.cancelAnimationFrame(requestId)
}
