//
// (C) Copyright 2015-2016 by Autodesk, Inc.
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE. AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
// Use, duplication, or disclosure by the U.S. Government is subject to
// restrictions set forth in FAR 52.227-19 (Commercial Computer
// Software - Restricted Rights) and DFAR 252.227-7013(c)(1)(ii)
// (Rights in Technical Data and Computer Software), as applicable.
//
// Written by M.Harada. 
// 
/*
 * GET home page.
 */

var https = require("https");
var request = require("request");
var field = require("./field.js");
var glue = require("./glue.js"); 
var forge = require("./forge.js"); 

exports.index = function (req, res) {
    res.render('index', { title: 'Express', year: new Date().getFullYear() });
};

exports.about = function (req, res) {
    res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page.' });
};

exports.testHarness = function (req, res) {
    res.render('testHarness', { title: 'testHarness', year: new Date().getFullYear(), message: 'testHarness message' });
    //res.sendfile(__dirname + '/myPage.html'); 
};

exports.contact = function (req, res) {
    res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
};

/* ============================
 *  Run (Glue/Field/Forge)  
 */

exports.run = function (req, res) {
    //field.run(req, res); 
    //forge.run(req, res); 
};

exports.runfield = function (req, res) {
    field.run(req, res); 
};

exports.runglue = function (req, res) {
    glue.run(req, res);
};

exports.runforge = function (req, res) {
    forge.run(req, res);
}; 

// 
exports.login = function (req, res) {
    console.log(req.body);
    
    var bodyStr = '';
    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
    });
    req.on("end", function () {
        console.log(bodyStr); 
        res.send(bodyStr);
    });

    //res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
    var userid = req.body.username;
    var pswd = req.body.password;
    fieldLogin(userid, pswd, req, res);
    //var responseBody = fieldLogin(userid, pswd, res);
    //var ticket = responseBody.ticket; 
    //res.send(responseBody); 
};

function fieldLogin_(userid, pswd, req, res) {
    // This works. 
    var request = require("request");
    
    var options = {
        method: 'POST',
        url: 'https://bim360field.autodesk.com/api/login',
        headers: { 
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        formData: {
            username: userid,
            password: pswd
        }
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        // Session
        //req.session.token = "token value comes here."
        
        console.log(body);
        
        //res.send(body);
        //res.render(body);
        //return body;  

        //var ticket = body.ticket; // mh3i. I'm here.  this needs to be changed to Json. 
        var jsonObj = JSON.parse(body);
        if (jsonObj) {
            var ticket = jsonObj.ticket; 
        }
        // Session data
        req.session.token = ticket; 
        // Send back the result 
        res.send(body);

    });

}

/* =============================
 *  Login or authentication 
 */

exports.loginfield = function (req, res) {
    field.loginfield(req, res); 
}

exports.loginglue = function (req, res) {
    glue.loginglue(req, res);
}

// Forge 2-leg 
exports.token2leg = function (req, res) {
    forge.authenticate(req, res); 
}

// Simply save a given token. This is for testing purpose.
// See /auth call for 3-legged implimentation. 
// 
exports.token3legSet = function (req, res) {
    
    // save token
    var body = req.body;
    var auth_token = body.access_token;
    req.session.token = auth_token;
    
    res.send(body);
}

// Simply return the saved token. 
//
exports.token3legGet = function (req, res) {
    var token = req.session.token;
    res.send({ access_token: token });
}
