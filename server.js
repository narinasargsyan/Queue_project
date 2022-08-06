const  express = require('express'); 
const jsonParser = bodyParser.json({type:'*/*'}); 
const bodyParser = require('body-parser'); 
const userRouter = require('./router/users'); 
const queueRouter = require('./router/queues')

const app = express();

app.use(jsonParser); 
app.use('/users', userRouter); 
app.use('/queues', queueRouter); 
 
app.listen('4041', 'localhost');
