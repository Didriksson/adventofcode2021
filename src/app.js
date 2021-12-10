const express = require('express')
const pug = require('pug')
const app = express()
const port = process.env.PORT || 3000

var bodyParser = require('body-parser')
const { Day1 } = require('./solutions/1/day_1')
const { Day2 } = require('./solutions/2/day_2')
const { Day3 } = require('./solutions/3/day_3')
const { Day4 } = require('./solutions/4/day_4')
const { Day5 } = require('./solutions/5/day_5')
const { Day6 } = require('./solutions/6/day_6')
const { Day7 } = require('./solutions/7/day_7')
const { Day8 } = require('./solutions/8/day_8')
const { Day9 } = require('./solutions/9/day_9')
const { Day10 } = require('./solutions/10/day_10')

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
  
  else if(req.params['dag'] === '3'){
    day = new Day3();
  }  
  
  else if(req.params['dag'] === '4'){
    day = new Day4();
  }  
  else if(req.params['dag'] === '5'){
    day = new Day5();
  }  
  else if(req.params['dag'] === '6'){
    day = new Day6();
  }  
  else if(req.params['dag'] === '7'){
    day = new Day7();
  }  
  else if(req.params['dag'] === '8'){
    day = new Day8();
  }  
  else if(req.params['dag'] === '9'){
    day = new Day9();
  }  
  else if(req.params['dag'] === '10'){
    day = new Day10();
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