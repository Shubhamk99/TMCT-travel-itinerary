const responseWrapper = require('../utils/responseWrapper');

const validateRequest = (schema) => (req, res, next) => {
  for( let key in schema) {
    const { error } = schema[key].validate(req[key], { abortEarly: false })
    if (error) {
      return responseWrapper.errorResponse(res, error, 400)
    }
  }
  next()
}

module.exports = validateRequest