// cf. https://www.npmjs.com/package/node-rest-client 
//var http = require('http');

var Client = require('node-rest-client').Client;

var client = new Client();

var args = {
    data:{username:"mikako.harada@autodesk.com",password:"Adsk_2010"}, 
    headers: {"Content-Type":"application/json"}
};
// This does not work 
//var args = {
//    parameters:{username:"mikako.harada@autodesk.com",password:"Adsk_2010"}, 
//    headers: {"Content-Type":"application/json"}
//};

client.post("https://bim360field.autodesk.com/api/login", args, function (data, response){
    // parse response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
    //JSON.parse(response)
    var j = JSON.parse(data);
    console.log(j);

    var t = j.ticket;
    console.log("ticket = " + t); 
}); 