//
// (C) Copyright 2016 by Autodesk, Inc.
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

// To Do:  Change here (2/2)   

var OAuth2Config = {
    authorizationURL: 'https://developer.api.autodesk.com/authentication/v1/authorize',
    tokenURL: 'https://developer.api.autodesk.com/authentication/v1/gettoken',
    clientID: '<your client id comes here>',
    clientSecret: '<your secret comes here>',
    callbackURL: "<your callback comes here>"
};
var OAuth2Scope = 'data:read data:write user-profile:read bucket:read';

// MH: 
var OAuth2Token = null; 

//  To Do: 
//  For the purpose of test harness, I'm simply saving the value here. 
//  In practice, you will need to save the token per user. 
// 
// http://stackoverflow.com/questions/20431049/what-is-function-user-findorcreate-doing-and-when-is-it-called-in-passport
// https://github.com/jaredhanson/passport-github 
// https://github.com/jaredhanson/passport-oauth2

function OAuth2VerifyCallback(accessToken, refreshToken, profile, cb) {
       
    console.log('accessToken ', accessToken);
    console.log('refreshToken ', refreshToken);
    console.log('profile ', profile);
    console.log('cb ', cb); // callback 
    
    // To Do: In practice, you will need to implement this. 
    //User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    //     return cb(err, user);
    //});

    // For now, save accessToken as a session data. 
    //global.savedToken = accessToken; // This works for test. But not recomend.  
    profile = {accessToken: accessToken};

    return cb(null, profile);
}

exports.config = OAuth2Config;
exports.verifyCallback = OAuth2VerifyCallback;
exports.scope = OAuth2Scope;

function getSavedToken() {
    return OAuth2Token; 
}
exports.token = getSavedToken(); 