const express = require('express')
const pug = require('pug')
const app = express()
const port = 3000
var bodyParser = require('body-parser')


app.set("view engine", "pug")
app.use(express.static('public'))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/lucka/:dag', (req, res) => {
    res.render('lucka', { dag: req.params['dag'] })
  })


app.post('/lucka/:dag', (req, res) => {
  const result = require(`./solutions/${req.params['dag']}/day_${req.params['dag']}`).solve(req.body.input);
  res.render('lucka', 
    { 
      dag: req.params['dag'],
      resultat: result
    });
})
  

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`AoC 2021 listening at http://localhost:${port}`)
})