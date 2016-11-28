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
 *  Field API calls. 
 */

var https = require("https");
var request = require("request");

var _baseUrl = "https://bim360field.autodesk.com/";

exports.baseUrl = _baseUrl; 

/*================================
 *  Login call for Field API 
 */

exports.loginfield = function (req, res) {
    //console.log(req.body);
    
    var userid = req.body.username;
    var pswd = req.body.password;
    
    var options = {
        method: 'POST',
        url: _baseUrl + 'api/login',
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
        // console.log(body);
        
        var ticket = ""; 
        var jsonObj = JSON.parse(body);
        if (jsonObj) {
            ticket = jsonObj.ticket;
        }
        // Save ticket as a session data.
        req.session.token = ticket;

        // Send back the result 
        res.send(body);
    });
}

/* ======================================
 *  Generic REST call for Field API. 
 */

exports.run = function (req, res) {
    console.log(req.body);
    var body = req.body;
    var method = body.method;
    var resource = body.resource;
    var param_required = body.param_required;
    var param_optional = body.param_optional;
    var param_urlSegment = body.param_urlSegment;

    var baseUrl = _baseUrl; 
    
    // Session data
    var token;
    if (req.session.token) {
        //console.log("token=" + req.session.token);
        token = req.session.token;
    }
    
    // Merge parameters
    var tokenObj = { ticket: token };
    var data = {};
    for (var attr in tokenObj) { data[attr] = tokenObj[attr]; }
    
    // Required parameters 
    for (var attr in param_required) {
        data[attr] = param_required[attr];
    }
    
    // Optional parameters 
    for (var attr in param_optional) {
        var val = param_optional[attr];
        if (val.length > 0) {
            data[attr] = val;
        }
    }
    
    // Url segment parameters 
    //if (param_urlSegment && param_urlSegment.length > 0) {
    
    for (var attr in param_urlSegment) {
        var val = param_urlSegment[attr];
        if (val.length > 0) {
            // replace the url segment here  
            var s = "{" + attr.toString() + "}";
            resource = resource.replace(s, val);
        }
    }
    //}
    
    var url = baseUrl + resource;
    
    console.log(data);
    
    var options = {
        method: method,
        url: url,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        formData: data
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.send(body);
    });

};