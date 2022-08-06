const express = require('express');
const QueueController = require('../controller/queue');
const {authorization, authorizationClient, authorizationWorker} = require('../middleware/authorization');
const queue = new QueueController();
const queueRouter = new express.Router();


queueRouter.post('/add', [ authorization, authorizationClient ], queue.add);
queueRouter.post('/getClient', [ authorization, authorizationWorker ], queue.getClient);
queueRouter.post('/finish', [ authorization, authorizationWorker ], queue.queueFinished);
queueRouter.get('/own', [ authorization ], queue.getOnOwn);

module.exports = queueRouter;
