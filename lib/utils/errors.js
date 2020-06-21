class MissingQueryParamsError extends Error {
  constructor (params) {
    super(`Required query params missing: ${params}`)
    this.name = 'QueryParamsError'
    this.status = 400
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
  console.log(err.stack)
  res.status(err.status || 500).send(err.message)
}
