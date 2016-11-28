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

function makeRestCallLoginField() {
    //initRequestResponse();
    fieldLogin("mikako.harada@autodesk.com", "Adsk_2010");
                //var response = FieldLogin(userName, password); 
                //showRequestResponse(response); 
}

// Ajax call for REST API. 
// http://www.w3schools.com/jquery/jquery_ajax_get_post.asp
// 
function fieldLogin(userName, password) {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // string to Json 
            //var serviceListJson = JSON.parse(this.response);
            // Initialize the web service list 
            //alert("response: " + this.response + "\n this status: " + this.status);
            console.log("POST field login, response: " + this.response + "\n this status: " + this.status);

        }
    }
    var baseUrl = "https://bim360field.autodesk.com";
    var url = baseUrl + "/api/login";
    var data = { username: userName, password: password };
    
    xhttp.open("POST", url, true);
    //xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(data);
    
    console.log("POST field login, sent");
};


function fieldLogin_v5(userName, password) {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Received response. 
            alert("response: " + this.response + "\n this status: " + this.status);
            // Update the response areas
            $("#textAreaResponse").html(this.response);
            //textAreaResponseChanged(); 
            //$("#treeView").textContents = this.response; 
            
            // Reload the tree view
            var data = JsonToTreeViewData(this.response);
            tree.load(data);
        }
    }
    var baseUrl = "https://bim360field.autodesk.com";
    var url = baseUrl + "/api/login";
    var data = { username: userName, password: password };
    
    xhttp.open("POST", "/run", true);
    //xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send(data);
                //xhttp.send(); 
};

// This is the one working. 
function fieldLogin_v52(userName, password) {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Received response. 
            alert("response: " + this.response + "\n this status: " + this.status);
            // Update the response areas
            $("#textAreaResponse").html(this.response);
            //textAreaResponseChanged(); 
            //$("#treeView").textContents = this.response; 
            // Reload the tree view
            var data = JsonToTreeViewData(this.response);
            tree.load(data);
        }
    }
    var data = { username: userName, password: password };
    xhttp.open("POST", "/loginfield", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify(data));
                //xhttp.send("username=mikako.harada@autodesk.com&password=Adsk_2010");
};

function fieldLogin_v2(userName, password) {
    
    var baseUrl = "https://bim360field.autodesk.com";
    var url = baseUrl + "/api/login";
    
    $.post(url,
                    {
        username: userName,
        password: password
    },
                    function (data, status) {
        alert("data: " + data + "\nstatus: " + status);
    });

};

function field_adminProject(userName, password) {
    
    var baseUrl = "https://bim360field.autodesk.com";
    var url = baseUrl + "/fieldapi/admin/v1/project_names";
    
    $.post(url,
                    {
        ticket: "58e4b5c7-5152-4ca3-a176-4ca47f205dde"
    },
                    function (data, status) {
        alert("data: " + data + "\nstatus: " + status);
    });

};

function fieldLogin_v3(userName, password) {
    var form = new FormData();
    form.append("username", "mikako.harada@autodesk.com");
    form.append("password", "Adsk_2010");
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bim360field.autodesk.com/api/login",
        "method": "POST",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "f8d8d247-ba1f-09e9-a1c9-0059e3d1a4f0"
        },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// this say Glue, but looks like field. 

function makeRestCallLoginGlue(userid, pswd) {
    // To Do.  need to come back later. 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Received response. 
            //alert("response: " + this.response + "\n this status: " + this.status);
            console.log("POST /loginfield response: " + this.response + "\n this status: " + this.status);
            
            // Update the response areas
            $("#textAreaResponse").html(this.response);
            //textAreaResponseChanged(); 
            //$("#treeView").textContents = this.response; 
            // Reload the tree view
            var data = JsonToTreeViewData(this.response);
            tree.load(data);
        }
    }
    var data = { username: userid, password: pswd };
    xhttp.open("POST", "/loginfield", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(data));
    
    console.log("POST /loginfield, sent");
}