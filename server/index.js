require('dotenv').config()
const express = require('express')
const massive = require('massive')
const ctrl = require('./controller')
const app = express()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    const port = SERVER_PORT
    app.set('db', db)
    app.listen(port || 4000, () => console.log(`Server up on port: ${port}`))
    console.log('Database connected')
})

app.post('/api/register', ctrl.register)
app.post('/api/login', ctrl.login)
app.get('/api/posts/:user_id', ctrl.getPosts)
app.get('/api/post/:id', ctrl.findPost)