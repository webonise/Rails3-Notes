# NodeJs

## What is node js?

Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

Node.js is a server side software system designed for writing scalable internet application, notably web servers. Programs are written on the server side in javaScript, using event-driven, asynchronous I/O to minimize overhead and masimize scalability.

Node.js allows to run javaScript code in the backend, outside a browser. 

## V8(javaScript engine)

The V8 javaScript Engine is an open source javaScript engine. V8 compiles javaScript to native machine code before executing it.

## Installation

*sudo apt-get install python-software-properties
*sudo add-apt-repository ppa:chris-lea/node.js
*sudo apt-get update
*sudo apt-get install nodejs npm
or follow the below link:
[https://github.com/joyent/node/wiki/Installation](https://github.com/joyent/node/wiki/Installation)

##Sample Applications

var http = require(“http”)
var server = http.createServer();
server.listen(8080);

The first line requires the http module that ships with Node.js and makes it accessible through the variable http. 
http module: where HTTP server code lives
CreateServer function returns an object and this object has a method named listen, and takes a numeric value which indicates the port number of HTTP server is going to listen on.

**server.js**
Var http = require(“http”);
http.createServer(functiion(request, response){
	response.writeHead(200,  {“Content-Type”: “text/plain”}):
	response.write(“Hello World”);
	response.end();
}).listen(8080);

**Execute script with Node.js**
in terminal run the following command:
node server.js

Now, open browser and point at http://localhost:8080. This should display a web page that says “Hello World”.

## How function passing makes HTTP server work

var http = require(“http”);
function onRequest(request, response){
	response.writeHead(200, {“Content-Type”: “text/plain”});
	response.write(“Hello world”);
	response.end();
}
http.createServer(onRequest).listen(8080);

*note:* Node's approach isn't unique.

## Event-driven asynchronous callbacks:

var result =  database.query(“select & from table”);
console.log(“hello world”);

The first line queries a database for lots of rows, the second line puts “hello world” to the console.
Let's assume that the database query is really slow, that it has to read an awful lot of rows, which takes several seconds.
The way written the above code, the JavaScript interpreter of Node.js first has to read the complete result set from the database, and then it can execute the console.log() function like other programing laguage.
The execution model of Node.js is different- there is only one single process. If ther is a slow database query somewhere in this process, this affect the whole process-everthing comes to a halt until the slow query has finished.
For avoiding the above problem, Node.js  introduces the concept of event driven, asynchronous callbacks, asynchronous callbacks, by utilizing an event loop.

database.query("SELECT * FROM hugetable", function(rows) {
  var result = rows;
});
console.log("Hello World");

Here, instead of expecting database.query() to directly return a result to us, we pass it a second parameter, an anonymous function. 
Now, Node.js can handle the database request asynchronously.

*Example:*
*server.js*
var http = require(“http”);
function onRequest(request, response){
	response.writeHead(200, {“Content-Type”: “text/plain”});
	response.write(“Hello world”);
	response.end();
}
http.createServer(onRequest).listen(8080);
console.log(“Server has started.”);

## How server handles requests:

When the callbacks fires and onRequest() function gets triggered, two parameter are passed into it: request and response.
Those are objects, and use their method to handle the details of HTTP request that occured and to respond to the request.
Whenever a request is received, it uses the response.writeHead() function to send a HTTP status 200 and content-type in the HTTP response headerm and the response.write() function to send the text “Heelo World” in the HTTP response body.
At last, we call response.end() actually finish our response.