const port = 8888;
const express = require('express')
const app = express()

app.get('*',(req,res) => {
    res.send("Welcome to this new project")
})

app.listen(port,(err) => {
    if(err){
        console.log(err)
    }
    console.log(`Running on port ${port}`)
})