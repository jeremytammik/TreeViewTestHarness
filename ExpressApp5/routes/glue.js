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
 *  Glue API calls. 
 */

var https = require("https");
var request = require("request");
var glueUtils = require("./glueUtils.js"); 

// To Do: change here. Optional. no need if you don't use Glue.   

var _baseUrl = "https://b4.autodesk.com/api/";
var _apiKey = "<your glue key comes here>";
var _apiSecret = "<your glue secret comes here>"; 
var _companyId = "<your compnay id comes here>";

exports.baseUrl = _baseUrl;

/* =============================
 *  Login call for Glue API 
 */

exports.loginglue = function (req, res) {
    //console.log(req.body);
    
    var timeStamp = glueUtils.timeStamp2().toString();
    var signature = glueUtils.signature2(_apiKey + _apiSecret + timeStamp).toString();

    var userid= req.body.username;
    var pswd = req.body.password;

    var options = {
        method: 'POST',
        url: _baseUrl + 'security/v1/login.json',
        headers: {
            'cache-control': 'no-cache',
            'content-type': "application/json"
        },
        formData: {
            login_name: userid,
            password: pswd, 
            company_id: _companyId, 
            api_key: _apiKey,
            timestamp: timeStamp,
            sig: signature
        }
    };
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        // console.log(body);
        
        var auth_token = "";
        var jsonObj = JSON.parse(body);
        if (jsonObj) {
            auth_token = jsonObj.auth_token;
        }
        // Save ticket as a session data.
        req.session.token = auth_token;
        
        // Send back the result 
        res.send(body);
    });
}

/* =====================================
 *  Generic REST call for Glue API. 
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
    //var url = baseUrl + resource;  
    
    var timeStamp = glueUtils.timeStamp2().toString();
    var signature = glueUtils.signature2(_apiKey + _apiSecret + timeStamp).toString();
    
    // Session data
    var token;
    if (req.session.token) {
        //console.log("token=" + req.session.token);
        token = req.session.token;
    }
    
    // Merge parameters
    var tokenObj = {
        company_id: _companyId, 
        api_key: _apiKey,
        timestamp: timeStamp,
        sig: signature, 
        auth_token: token
    };
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
    
    var url = _baseUrl + resource + ".json";
    
    console.log(data);
    
    //var options = {
    //    method: method,
    //    url: url,
    //    headers: {
    //        'cache-control': 'no-cache'
    //    },
    //    qs: data
    //};
    
    var options = {
        method: method,
        url: url,
        headers: {
            'cache-control': 'no-cache'
        }
    };
    if (method == "GET") {
        options['qs'] = data;
    }
    else if (method == "POST") { // To Do: need to test this. 
        options['formData'] = data;
    }
    
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.send(body);
    });

};