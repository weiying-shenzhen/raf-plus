export const getKeyByValue = (map, value) => {
    let key = null
    map.forEach((v, k) => {
        if (v === value) {
            key = k
        }
    })
    return key
}