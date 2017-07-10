const callbackList = []

function requestAnimationFrame(callback) {
    const entry = callbackList.find(item => item.callback === callback)
    if (entry) {
        return entry.requestId
    }
    else {
        const requestId = window.requestAnimationFrame(ts => {
            const index = callbackList.findIndex(item => item.callback === callback)
            callbackList.splice(index, 1)
            callback(ts)
        })
        callbackList.push({
            callback,
            requestId,
        })
        return requestId
    }
}
function cancelAnimationFrame(requestId) {
    const index = callbackList.findIndex(item => item.requestId === requestId)
    if (index !== -1) {
        callbackList.splice(index, 1)
    }
    return window.cancelAnimationFrame(requestId)
}

export default {
    requestAnimationFrame,
    cancelAnimationFrame,
}
