const express = require('express'); 
const QueueController = require('../controller/queue'); 
const {authorization, authorizationClient, authorizationWorker} = require('../middleware/authorization');
const queue = new QueueController(); 
const queueRouter = new express.Router(); 
 

queueRouter.post('/add', [ authorization, authorizationClient], queue.add); 
queueRouter.post('/getClient', [authorization,authorizationWorker], queue.getClient);
queueRouter.post('/finish', [authorization,authorizationWorker], queue.queueFinished);
queueRouter.post('/own', [authorization, authorizationWorker], queue.getOnOwn);
queueRouter.get('/users/pending', [authorization,authorizationWorker], queue.getPending);
queueRouter.get('/users/inprogress', [authorization,authorizationWorker], queue.getInProgress);
queueRouter.get('/users/finished', [authorization,authorizationWorker], queue.getFinished);
queueRouter.get('/users/all', [authorization,authorizationWorker], queue.getAll);


module.exports = queueRouter;