const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = 3000

const userRouter = require('./routes/user')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}))
app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`Listening at ${port}`)
})