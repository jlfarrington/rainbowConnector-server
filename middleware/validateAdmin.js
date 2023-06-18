const jwt = require('jsonwebtoken');
const User = require('../db')

const validateAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token -->', token);
    if (!token) {
        return res.status(403).send({ auth: false, message: "no token found"}) 
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken -->', decodeToken);
            if(decodeToken.isAdmin) {
                let trueAdmin = decodeToken.isAdmin
                if (!err && decodeToken){
                    User.findOne({
                        where: {
                            id: decodeToken.id,
                            isAdmin: trueAdmin
                        }
                    })
                        .then(user => {
                            console.log('user -->', user);
                            if (!user) throw err;
                            console.log('req -->', req);
                            req.user = user;
                            return next();
                        })
                        .catch(err => next(err));
                } else {
                    req.errors = err;
                    return res.status(500).send('Not authorized');
                }
            } else {
                return res.status(500).send('Not an admin');
            }
           
        });
    }
};

module.exports = validateAdmin;