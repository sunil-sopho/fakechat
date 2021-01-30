/*
Module dependencies:
  - Express
  - Http (to run Express)
  - Body parser (to parse JSON requests)
  It is a common practice to name the variables after the module name.
  Ex: http is the "http" module, express is the "express" module, etc.
*/
var express = require("express")
  , bodyParser = require("body-parser");
var path = require('path');
var morgan  = require('morgan');
var app = require('./applicationInstance');


var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var http = require("http").createServer(app);
var compression = require('compression');

// var connection2 = require('./backend/Models/db_Model2.js')
//var mainRoutes = require(__dirname+'/backend/routes/MainRoutes');
var _ = require("underscore");
//var io = require("socket.io").listen(http);

var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);


//Server's IP address
// app.set("ipaddr", process.env.IP || "127.0.0.1" );

//Server's port number
app.set("port", process.env.PORT || 4000);


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


//app.use(bodyParser()); // get information from html forms

app.use(compression());
app.use(express.static(path.resolve(__dirname,'client/public')));




app.set('views',__dirname + '/client/views');
app.engine('html',require('ejs').renderFile);
app.set("view engine", "ejs");
//app.use(express.static("public",__dirname + '/client/public'));
//Tells server to support JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// required for passport
app.use(session({ secret: 'letthegamebegins' })); // session secret

app.use(flash()); // use connect-flash for flash messages stored in session


app.use(session({
key:'user_sid',
secret: 'letthegamebegins',
resave:false,
saveUninitialized:false,
cookie:{
    expires:600000
}

}));



app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
  {
    // no: set a new cookie
    // var randomNumber=Math.random().toString();
    // randomNumber=randomNumber.substring(2,randomNumber.length);
    // usernum++;
    // res.cookie('cookieName',usernum, { maxAge: 900000, httpOnly: false });
    console.log('cookie created successfully');
  }
  else
  {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});




//Start the http server at port and IP defined before
http.listen(app.get("port"), function() {
  console.log("Server up and running. Go to http://" + "localhost" + ":" + app.get("port"));
});