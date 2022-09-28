const ErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)

    res.json({
        error: {
            errors: [
                {
                    message: err.message,
                }
            ]
        },
        code: statusCode,
        ...(process.env.NODE_ENV !== 'production' && {stack: err.stack})
    })
}

export default ErrorHandler