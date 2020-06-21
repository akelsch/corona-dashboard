class BadRequestError extends Error {
  constructor (message, name = 'BadRequestError') {
    super(message)
    this.name = name
    this.status = 400
  }
}

class MissingQueryParamsError extends BadRequestError {
  constructor (params) {
    super(`Required query params missing: ${params}`, 'MissingQueryParamsError')
  }
}

export function assertNoQueryParamMissing (params) {
  const missingParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (!value) {
      acc.push(key)
    }
    return acc
  }, [])

  if (missingParams.length > 0) {
    throw new MissingQueryParamsError(missingParams)
  }
}

export default function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  if (!(err instanceof BadRequestError)) {
    console.error(err.stack)
  }

  res.status(err.status || 500)
  res.json({
    error: err.name,
    message: err.message
  })
}
