const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Proyecto = require('./models/project');
require('dotenv').config({path:'./.env'})

const puerto = process.env.PORT
const dbkey = process.env.MONGODB_KEY


const app = express();


mongoose.connect(dbkey,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=> app.listen(puerto))
    .catch((err)=> console.log(err))

app.set('view engine', 'ejs')
//app.listen(3000)

// app.use((req, res, next)=>{
//     console.log('host:', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method:', req.method);
//     next()
// })
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.post('/project-add',(req,res)=>{
    console.log(req.body)
    const proyecto = new Proyecto(req.body)
    proyecto.save()
    .then((result)=>{
        res.redirect('/')
    })
    .catch((err)=>{console.log(err)})
})


app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/project-add',(req,res)=>{
    res.render('projectAdd')
})
app.get('/project',(req,res)=>{
    res.render('projectLanding')
})
app.get('/project-list',(req,res)=>{
    res.render('projectsList')
})
app.use((req,res)=>{
    res.status(404).render('404')
})




