// cf. https://www.npmjs.com/package/request
// I found out 'request' through postman
//

var request = require("request");
var utils = require("./glueUtils.js");


var baseApiUrl = "https://b4-staging.autodesk.com/api/";
var apiKey = "25662386885249529eeae868600feb7b";
var apiSecret = "91570a1a6ca848b9aa94902519237fce";
var companyId = "adn_devtech";

var timeStamp = utils.timeStamp2().toString();
var signature = utils.signature2(apiKey + apiSecret + timeStamp).toString();
  

var options = {
    method: 'POST',
    url: 'https://b4-staging.autodesk.com/api/security/v1/login.json',
    headers: { 'content-type': "application/json" },
    formData: {
        login_name: 'mikako.harada@autodesk.com',
        password: 'Adsk_2345',
        company_id: 'adn_devtech',
        api_key: '25662386885249529eeae868600feb7b',
        timestamp: timeStamp,
        sig: signature
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    console.log(response); 
    console.log(body);
    
});

