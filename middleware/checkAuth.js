const checkAuth = (req, res, next) => {
    console.log("desde checkauth.js")
    next()
}

export default checkAuth