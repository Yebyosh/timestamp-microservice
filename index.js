// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/*
 A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
Waiting: 3. A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
*/

app.get("/api/:date", (req, res) => {
  const {date} = req.params;
  console.log(`0: ${date}`);
  console.log(`0': ${Date.parse(date)}`);
   
  if (isNaN(Date.parse(date))) {
    if (Number(date)) {
      const unix_time = Number(date);
      const utc_time = new Date(unix_time).toUTCString();

//      console.log(`1: ${unix_time}`);
//      console.log(`1: ${utc_time}`);

      res.json({unix: unix_time, utc: utc_time});
    } else {
      res.json({error : "Invalid Date"});
    }
  } else if (new Date(date)) {
    const unix_time = Date.parse(date);
    const utc_time = new Date(unix_time).toUTCString();

//    console.log(`3: ${unix_time}`);
//    console.log(`3: ${utc_time}`);

    res.json({unix: unix_time, utc: utc_time});
  }

});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
