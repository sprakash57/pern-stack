module.exports = function (req, res, next) {
    const { email, password } = req.body;
    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

    if (['/register', '/login'].includes(req.path)) {
        if (![email, password].every(Boolean)) {
            return res.json("Missing credentials");
        } else if (isEmailValid) {
            return res.json("Invalid Email");
        }
    }

    next();
}