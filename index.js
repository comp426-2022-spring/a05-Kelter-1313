
// Place your server entry point code here

// Require http module
const http = require('http')
const morgan = require("morgan")
// Make Express use its own built-in body parser to handle JSON
app.use(express.json());
// Require fs module
const fs = require('fs')

const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Serve static HTML files
app.use(express.static('./public'));

// Require minimist module (make sure you install this one via npm).
const args = require("minimist")(process.argv.slice(2))
// Use minimist to process one argument `--port=` on the command line after `node server.js`.

if (args["help"] == null){
const db = require('./src/services/database')

if(args["log"] == null || args["log"] == "true"){
  var logFlag = true
}else{logFlag = false}
// ^^ --log behavior 


var port = args["por"]
// Make this const default to port 3000 if there is no argument given for `--port`.
if (port == null){
  port = 5000
}
console.log(port)
// Use the fs module to create an arrow function using `fs.readFile`.
// Use the documentation for the Node.js `fs` module. 
// The function must read a file located at `./www/index.html` and do some stuff with it.
// The stuff that should be inside this function is all below.
var server = app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

app.use((req, res, next) => {
  let logdata = {
    remoteaddr: req.ip,
    remoteuser: req.user,
    time: Date.now(),
    method: req.method,
    url: req.url,
    protocol: req.protocol,
    httpversion: req.httpVersion,
    status: res.statusCode,
    referer: req.headers['referer'],
    useragent: req.headers['user-agent']
  }
  if(args["log"] == "false"){

  }else{
    const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
    // Set up the access logging middleware
    app.use(
      morgan('combined', { stream: accessLog })
      )
  }
  const stmt = db.prepare(`INSERT INTO accesslog (remoteaddr ,
    remoteuser ,
    time ,
    method ,
    url ,
    protocol ,
    httpversion ,
    status ,
    referer ,
    useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
  next()
  })

app.get("/app", (req, res, next) => {
  res.json({"message":"Your API works! (200)"})
  res.status(200)
  next()
})

if(args["debug"] == "true" || args["debug"] == null){
  /* must create endpoints

  --debug	If set to true, creates endlpoints /app/log/access/ which returns
              	a JSON access log from the database and /app/error which throws 
              	an error with the message "Error test successful." Defaults to 
		false.

*/
  app.get("/app/log/access", (req, res, next) => {
      const stmt = db.prepare('SELECT * FROM accesslog').all()
      res.status(200).json(stmt)
})
  app.get("/app/error", (req, res, next)=>{
    throw new Error('Error test successful.')
  })


}
//
app.use(function(req, res, next){
  res.json({"message":"Endpoint not found. (404)"})
  res.status(404)
  next()
})

// Necessary Functions
function coinFlip() {
  var a = Math.floor(Math.random() * 10) + 1;
  if (a <= 5){
    return "heads";
  }
  else{
    return "tails";
  }
}
 
function flipACoin(call) {
  var flipResult = coinFlip();
  var returnDict = {"call": call, "flip": flipResult, "result": ""};
  var resultOfCall = "lose";
  if (call == flipResult){
    resultOfCall = "win";
  }
  returnDict["result"] = resultOfCall;
  return returnDict;
}
 
function coinFlips(flips=1) {
  var a = [];
  for (let x = 0; x < flips; x++) {
    a.push(coinFlip());
  }
  return a;
}
 
function countFlips(array) {
  var a = Array.from(array);
  var counts = {"heads": 0, "tails": 0}
  for (let x = 0; x < array.length; x++) {
    if (a.pop() == "heads"){
      counts["heads"]+=1;
    }
    else{
      counts["tails"]+=1;
    }
  }
  return counts;
}
 
 
app.get("/app/flip/", (req,res) => {
  res.status(200).json({"flip":coinFlip()})
})
 
 
 
app.get("/app/echo/:number", (req, res) => {
  res.status(200).json({"message": req.params.number})
})
 
app.get("/app/flips/:number/", (req,res) =>{
  var a = coinFlips(req.params.number)
  res.status(200).json({"raw":a, "summary":countFlips(a)})
})
 
app.get("/app/flip/call/heads/", (req,res) =>{
  res.status(200).json(flipACoin("heads"))
})
 
app.get("/app/flip/call/tails/", (req,res) =>{
  res.status(200).json(flipACoin("tails"))
})



// case in which --help used
}else{
  console.log(`--port, -p	Set the port number for the server to listen on. Must be an integer
  between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
  a JSON access log from the database and /app/error which throws 
  an error with the message "Error test successful." Defaults to 
  false.

--log, -l   If set to false, no log files are written. Defaults to true.
  Logs are always written to database.

--help, -h	Return this message and exit.`)
}