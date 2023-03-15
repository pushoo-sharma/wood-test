const addContext = (req) => {
    if (!req.context) {
        req.context = {}
    }
    return req
}

module.exports = {
    addContext
}