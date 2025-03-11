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
    const proyecto = new Proyecto(req.body)
    proyecto.save()
    .then((result)=>{
        console.log('el nuevo proyecto:',result)
        res.redirect('/')
    })
    .catch((err)=>{console.log(err)})
})


app.get('/',(req,res)=>{
    //res.render('index')
    Proyecto.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index',{proyectos:result})
        })
        .catch((err)=>{console.log(err)})

})
app.get('/project-add',(req,res)=>{
    res.render('projectAdd')
})
// app.get('/project',(req,res)=>{
//     res.render('projectLanding')
// })

// app.get('/project-list',(req,res)=>{
//     Proyecto.find()
//         .then((result)=>{res.send(result)})
//         .catch((err)=>{console.log(err)})
//     // res.render('projectsList')
// })
app.get('/project-list',(req,res)=>{
    Proyecto.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('projectsList', {proyectos:result})
        })
        .catch((err)=>{console.log(err)})
})

app.get('/proyect-list/:id',(req,res)=>{
    const id= req.params.id
    console.log(id)
    Proyecto.findById(id)
        .then((result)=>{
            console.log(result)
            res.render('projectLanding', {proyecto:result})
            // res.render('projectLanding',{proyecto:result,nombre:result.nombre})
        })
        .catch(err=>{
            console.log(err)
        })
})

app.delete('/proyect-list/:id',(req,res)=>{
    const id= req.params.id
    Proyecto.findByIdAndDelete(id)
        .then(result=>{
            res.json({redirect:'/'})
        })
        .catch(err=>{
            console.log(err)
        })

})


app.use((req,res)=>{
    res.status(404).render('404')
})




