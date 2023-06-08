const express = require('express');

const app = express();
app.set('view engine', 'ejs')
app.use((req, res, next)=>{
    console.log('host:', req.hostname);
    console.log('path: ', req.path);
    console.log('method:', req.method);
    next()
})

app.use(express.static('public'))