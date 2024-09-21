require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

const PORT = process.env.PORT || 3001

const { typeError }= require('./middlewares/errors')
const { dbConnection } = require('./config/config')

app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))

app.use(typeError)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))