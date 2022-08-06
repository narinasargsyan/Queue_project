const jwt = require('jsonwebtoken'); 
const secret = 'shhhh'; 

const checkRole = (role, checkAgainst)  => {
    if(role !== checkAgainst) {
        throw new Error('Invalid Role')
    }
}

const authorization = (req,res,next) => {
    req.verifedUser = jwt.verify(req.headers.authorization, secret);
    res.send('authorization was successful');
    next();
};

const authorizationClient = (req,res,next) => {
    try {
        checkRole(req.verifedUser.role, 'client')
    } catch {
        return res.status(406).send('Invalid  Role')
    }
    res.send('authorization was successful');
    next();
};


const authorizationWorker = (req,res,next) => {
    try {
        checkRole(req.verifedUser.role, 'worker')
    } catch {
        return res.status(406).send('Invalid  Role')
    }
    res.send('authorization was successful');
    next();
};

module.exports = {
    authorization,
    authorizationWorker,
    authorizationClient
};