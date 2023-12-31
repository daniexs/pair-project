const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')

const mainRouter = require('./routers')

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



app.use(mainRouter);




app.listen(port, ()=>{})