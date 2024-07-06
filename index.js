const express = require('express')
const app = express()
const PORT = 3000
const { dbConnection } = require('./config/config')

app.use(express.json())
dbConnection()

app.use('/users', require('./routes/users'))
app.use('/posts', require('./routes/posts'))
app.use('/comments', require('./routes/comments'))

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))