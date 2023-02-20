const helmet = require('helmet')
const hpp = require('hpp')
const morgan = require('morgan')
const express = require('express') 
const app = express()
const env = process.env.NODE_ENV || 'development'
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { sequelize } = require('./models')
const port = process.env.PORT

dotenv.config();

if (process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'));
  app.use(helmet({contentSecurityPolicy : false}));
  app.use(hpp());
}
// middlewares

sequelize.sync({force:false})
    .then(() => {
        console.log('sequelize connection success')
    })
    .catch((err) => {
        console.log(err.name)
    })

app.use(bodyParser.json())

//routing
const router = express.Router();

const dataRouter = require('./routes/data')
const wordRouter = require('./routes/word')
app.use('/data',dataRouter)
app.use('/word',wordRouter)

//404
app.all('*', (req,res,next)=>{
	res.status(404).json({ status:'fail',message: '404 Not Found'})
})

//error handling (4 parameters -err/req/res/next)
app.use((err, req, res, next) => {
	// 템플릿 엔진에서 message 변수 사용 가능
	res.locals.message = err.message; 
	// 템플릿 엔진에서 error 변수 사용가능
	res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
	res.status(err.status || 500);
	res.render('error');
  })
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 