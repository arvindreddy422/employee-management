const express = require('express')

const userRouter = require('./routes/userRoute')
const empRouter = require('./routes/empRoute')
const uploadRouter = require('./routes/uploadRoute')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', userRouter)
app.use('/api/v1', empRouter)
app.use('/api/v1', uploadRouter)
app.get('/', (req, res) => {
  res.send('main')
})

app.listen(4000, () => {
  console.log(`up on ${4000}...`)
})
