const callbackMap = new Map()

export const requestAnimationFrame = callback => {
    if (!callbackMap.has(callback)) {
        const requestId = window.requestAnimationFrame(ts => {
            callbackMap.delete(callback)
            callback(ts)
        })
        callbackMap.set(callback, requestId)
    }
}

export const cancelAnimationFrame = callback => {
    const requestId = callbackMap.get(callback)
    window.cancelAnimationFrame(requestId)
    callbackMap.delete(callback)
}
