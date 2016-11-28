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
var crypto = require('crypto');

// Glue utility 
// cf. Aaron's blog
// http://adndevblog.typepad.com/aec/2015/04/bim-360-glue-api-use-curl-or-postman-to-login-and-list-projects.html
// 
// getTime() 
// http://www.w3schools.com/jsref/jsref_gettime.asp

function GetUNIXEpochTimestamp() {
    
    var timeStamp = Math.floor((new Date).getTime() / 1000);
    
    return timeStamp;
};

function ComputeMD5Hash(aString) {
    
    var hash = crypto.createHash('md5').update(aString).digest("hex");
    
    return hash;
}

exports.timeStamp2 = function () {
    return GetUNIXEpochTimestamp();
}

exports.signature2 = function (aString) {
    return ComputeMD5Hash(aString);
}