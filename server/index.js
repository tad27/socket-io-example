const express = require('express')
const app = express()
const port = 3008

app.get('/', (req, res) => {
  res.send('Hello Tad!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})