const { STATUS_CODES, STATUS_MESSAGES } = require('./consts.js')
const responseHandler = async (res, payload, statusCode) => {
    if (statusCode < STATUS_CODES.BAD_REQUEST) {
        res.status(statusCode).send(payload)
        return
    }
    res.status(statusCode).send({
        'error': getErrorMessage(payload, statusCode)
    })
}

const getErrorMessage = (payload, statusCode) => {
    if (payload && payload.message)
        return payload.message
    return STATUS_MESSAGES[statusCode].replaceAll('_', ' ').toLowerCase()
}
module.exports = responseHandler