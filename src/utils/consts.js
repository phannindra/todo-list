const STATUS_CODES = {
    'OK': 200,
    'CREATED': 201,
    'BAD_REQUEST': 400,
    'UNAUTHORIZED': 401,//Request needs to be authenticated
    'FORBIDDEN': 403,//No access to the requested resource
    'NOT_FOUND': 404,
    'INTERNAL_SERVER_ERROR': 500,
    'BAD_GATEWAY': 502
}

const STATUS_MESSAGES = {
    200: 'OK',
    201: 'CREATED',
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    500: 'INTERNAL_SERVER_ERROR',
    502: 'BAD_GATEWAY'
}

module.exports = { STATUS_CODES, STATUS_MESSAGES }