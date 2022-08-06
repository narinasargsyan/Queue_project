const jwt = require('jsonwebtoken'); 
const secret = 'shhhh'; 

const checkRole = (role, checkAgainst)  => {
    if(role !== checkAgainst) {
        throw new Error('Invalid Role')
    }
}

const authorization = (req,_res,next) => {
    req.verifedUser = jwt.verify(req.headers.authorization, secret);
    next();
};

const authorizationClient = (req,res,next) => {
    try {
        checkRole(req.verifedUser.role, 'client')
    } catch {
        return res.status(406).send('Invalid  Role')
    }

    next();
};


const authorizationWorker = (req,res,next) => {
    try {
        checkRole(req.verifedUser.role, 'worker')
    } catch {
        return res.status(406).send('Invalid  Role')
    }
    next();
};

module.exports = {
    authorization,
    authorizationWorker,
    authorizationClient
};