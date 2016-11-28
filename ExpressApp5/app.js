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

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// MH: for OAuth
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth2');
global.savedToken = null; 
////

// MH: added.
// Session data 
// http://blog.modulus.io/nodejs-and-express-sessions
app.use(express.cookieParser());
app.use(express.session({secret: 'treeviewtestharness'})); 


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// MH: for OAuth
app.use(passport.initialize());
//app.use(passport.session());
////

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// MH: added for reading post body
app.use(express.bodyParser()); 

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// cf. https://www.airpair.com/express/posts/expressjs-and-passportjs-sessions-deep-dive 
// MH: for OAuth
//passport.serializeUser(function (user, done) {
//    console.log("passport.serializeUser usere.id=" + user.id);
//    done(null, user);
//});

passport.serializeUser(function (user, done) {
    console.log("passport.serializeUser usere.id=" + user.id);
    var sessionUser = {_id: user._id, name: user.name }; 
    done(null, sessionUser);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var forgeOAuth2 = require('./routes/forgeOAuth.js');

passport.use('oauth2', new OAuth2Strategy(forgeOAuth2.config, forgeOAuth2.verifyCallback));

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

app.get('/testHarness', routes.testHarness);

app.post('/run', routes.run);
app.post('/runfield', routes.runfield);
app.post('/runglue', routes.runglue);
app.post('/runforge', routes.runforge);

app.get('/auth', passport.authenticate('oauth2', { scope: 'data:read data:write bucket:read', session: false }));

app.get('/oauth_callback', passport.authenticate('oauth2', { scope: 'data:read data:write bucket:read', session: false, failureRedirect: '/contact'}),
    function (req, res) {
    var token = req.user.accessToken;
    console.log('/oauth_callback accessToken=' + token); 
    req.session.token = token;
    res.redirect('/testHarness/?auth=success');
}
);

// authentications 
app.post('/login', routes.login);
app.post('/loginfield', routes.loginfield);
app.post('/loginglue', routes.loginglue);

app.post('/token2leg', routes.token2leg);
app.get('/token3leg', routes.token3legGet); 
app.post('/token3leg', routes.token3legSet); 

// create server 
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
