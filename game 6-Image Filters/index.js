const express = require('express');
const app = express();

app.use(express.static('public'))
app.use('/static', express.static('public'))

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Zdrasti');
})

app.listen(3000);