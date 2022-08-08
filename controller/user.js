

const bcrypt = require("bcrypt"); 
const jwt = require('jsonwebtoken'); 
const secret = 'shhhh'; 
const models = require('../db/models'); 


 
class UserController {        
 
   registerWorker = async(req,res) =>  { 
      try { 
      
         const { fullname , email , password , phone } = req.body; 
         const salt = await bcrypt.genSalt(10); 
 
         const hashedPassword = await bcrypt.hash( password , salt ); 
            await models.Users.create({  
                fullname, 
                email, 
                password: hashedPassword, 
                phone,
                role: 'worker'
            })
            res.send("you have successfully registered!"); 
      } catch (err) { 
         res.status(400).send('Something went wrong')
            console.log('error=>', err); 
      } 
   } 
   registerClient = async(req,res) =>  { 
    try { 
    
       const { fullname , email , password , phone } = req.body; 
       const salt = await bcrypt.genSalt(10); 

       const hashedPassword = await bcrypt.hash( password , salt ); 
          await models.Users.create({  
              fullname, 
              email, 
              password: hashedPassword, 
              phone,
              role: 'client'
          })
          res.send("you have successfully registered!"); 
    } catch (err) { 
       res.status(400).send('Something went wrong')
          console.log('error=>', err); 
    } 
 } 
 
   login = async(req,res) => { 
      try{ 
         const { email , password } = req.body; 
      
         const user = await models.Users.findOne({ 
            where: { 
              email, 
            } 
         }); 
       
         if (!user) { 
           return res.status(404).send('user not exist'); 
         } 
 
         const math = await bcrypt.compare(password, user.password) 
       
         if (!math) { 
           return res.status(404).send('Credentials are invalid'); 
         } 
         const maxAge = 3 * 60 * 60; 
         const token = jwt.sign({ id: user.id, role: user.role }, secret,{expiresIn:maxAge}); 
         return res.send({ token:token,name:user.name }); 
      } 
      catch(err){ 
         console.log('error=>', err); 
         res.send(err); 
      } 
       
   } 
    
}
module.exports = UserController;