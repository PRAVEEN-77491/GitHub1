if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const express = require('express');
const app  = express();
const expressLayout = require('express-ejs-layouts');
const bodyParser  = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine' , 'ejs');
app.set('views' , __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser : true})
const db= mongoose.connection
db.on('error' ,error => console.error(error))
db.once('open', ()=> console.log("connected to mongoose"))

app.use('/' , indexRouter)
app.use('/authors' , authorRouter)
//app.use(bodyParser.urlencoded({ extended :true}))

app.listen(process.env.PORT ||3000);