const models = require('../db/models'); 
 
 class QueueController { 
 
    add = async (req,res) => { 
       const { userId } = req.body; 
       await models.Queues.create({ 
          userId
       });
       res.send('done'); 
    };

    getClient = async (req,res) => {
        const { id } = req.body;
        await models.Queues.update( { status: 1, workerId: req.validatedUser.id }, {
           where: { id }
        });
        res.send('Get Client');
    };
 };


 module.exports = QueueController;
