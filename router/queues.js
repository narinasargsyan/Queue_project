const express = require('express'); 
const QueueController = require('../controller/queue'); 
const {authorization, authorizationClient, authorizationWorker} = require('../middleware/authorization');
const queue = new QueueController(); 
const queueRouter = new express.Router(); 
 

queueRouter.post('/add', [ authorization, authorizationClient], queue.add); 
queueRouter.post('/getClient', [authorization,authorizationWorker], queue.getClient);
 
module.exports = queueRouter;