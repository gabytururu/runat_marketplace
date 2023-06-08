const express = require('express');
const morgan = require('morgan')

const app = express();

app.set('view engine', 'ejs')
app.listen(3000)

app.use((req, res, next)=>{
    console.log('host:', req.hostname);
    console.log('path: ', req.path);
    console.log('method:', req.method);
    next()
})
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})

