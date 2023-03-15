const JWT = require('jsonwebtoken');

class Authentication {
    authenticate = (header, role) => {
        return new Promise((resolve, reject) => {
            const [_, token] = header.split(' ')
            JWT.verify(token, role, function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded)
                }
            });
        })
    }
    generateToken = (role, payload) => {
        let token = JWT.sign(payload, role);
        return token;
    }
}
module.exports = new Authentication();