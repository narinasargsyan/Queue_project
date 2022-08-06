const models = require('../db/models'); 
 
 class QueueController { 
 
   add = async (req,res) => { 
       const { id }  = req.verifedUser;

       await models.Queues.create({ 
          userId: id,
          status: 0,
       });
       res.send('done'); 
    };

   getClient = async (req,res) => {
        const { id } = req.body;
        const queue = await models.Queues.findOne({ 
         where: { id } 
        }); 

        if(queue.status !== 0) {
            return res.status(406).send('Queue already in processing');
        }

        await models.Queues.update( { status: 1, workerId: req.verifedUser.id }, {
           where: { id }
        });
        res.send('Get Client');
    };

   
   queueFinished = async (req,res) => {
      try { 
         const { id } = req.body;
         const queue = await models.Queues.findOne({ 
            where: { id } 
         }); 

         if(queue.status !== 1) {
            return res.status(406).send('Queue shoul be in processing to finish');
         }  

         if(queue.workerId === req.verifedUser.id) {
            await models.Queues.update( { status: 2 }, {
               where: { id }
            });
            return res.send(200)
         } 
         res.status(406).send('Invalid Queue Id');
      } catch(e) {
         console.log('eeee', e)
            res.send('something went wrong')
      }
   }

   getOnOwn = async (req,res) => {
    try {
      const { id, userId, workerId, status } = req.body;
         const queueAll = await models.Queues.findAll({ 
            where: { 
              id,
              userId,
              workerId,
              status,
            } 
         }); 
    } catch (e) {
      console.log('eeee', e)
         res.send('something went wrong')
    }
   };

}

module.exports = QueueController;
