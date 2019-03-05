const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./Politipedia/politipedia-frontend/dist/politipedia-frontend'))

app.get('/callme', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))








