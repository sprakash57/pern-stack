const jwt = require('jsonwebtoken');

const jwtGenerators = (user_id) => {
    return jwt.sign({ user: { id: user_id } }, process.env.jwtsecret, { expiresIn: '1h' });
}

module.exports = jwtGenerators;