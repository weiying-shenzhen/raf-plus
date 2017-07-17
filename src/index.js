const callbackList = []

const find = (list, predicate) => {
    for (let index = 0; index < list.length; index++) {
        if (predicate(list[index], index, list)) {
            return list[index]
        }
    }
    return null
}
const findIndex = (list, predicate) => {
    for (let index = 0; index < list.length; index++) {
        if (predicate(list[index], index, list)) {
            return index
        }
    }
    return -1
}

function raf(callback) {
    const entry = find(callbackList, item => item.callback === callback)
    if (entry) {
        return entry.requestId
    }
    else {
        const requestId = requestAnimationFrame(ts => {
            const index = findIndex(callbackList, item => item.callback === callback)
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
function caf(requestId) {
    const index = findIndex(callbackList, item => item.requestId === requestId)
    if (~index) {
        callbackList.splice(index, 1)
    }
    cancelAnimationFrame(requestId)
}

export {
    raf as requestAnimationFrame,
    caf as cancelAnimationFrame,
}
