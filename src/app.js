const express = require('express')
const pug = require('pug')
const app = express()
const port = process.env.PORT || 3000

var bodyParser = require('body-parser')
const { Day1 } = require('./solutions/1/day_1')
const { Day2 } = require('./solutions/2/day_2')


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
  let day;
  if(req.params['dag'] === '1'){
    day = new Day1();
  } 
  
  else if(req.params['dag'] === '2'){
    day = new Day2();
  }
  
  else {
    res.render('index');
    return;
  }  
  
  result = day.benchMark(req.body.input); 
  res.render('lucka', 
  { 
    dag: req.params['dag'],
    resultA: result.partA,
    resultB: result.partB,
    timeA: result.timeA,
    timeB: result.timeB,
  });
})
  

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`AoC 2021 listening at http://localhost:${port}`)
})