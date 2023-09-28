const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const usersController = require('./controllers/usersController')
const patientsController = require('./controllers/patientsController')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'this is secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true 
    }
}))

app.get('/register',usersController.register)
app.post('/register',usersController.registerPost)

app.get('/login',usersController.login)
app.post('/login',usersController.loginPost)

app.get('/',patientsController.home)
app.get('/profiles',usersController.profile)
app.get('/profiles/add',usersController.addProfile)
app.post('/profiles/add',usersController.addPro)
app.get('/patients',patientsController.patientList)
app.get('/diseases',patientsController.diseaseList)



app.listen(port, ()=>{})