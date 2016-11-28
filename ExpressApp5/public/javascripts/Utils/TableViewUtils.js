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

//===================================================================
// Table View Utilities
// 
// Custom objects: 
//   TableView -- to store and display a list of parameters for web services.
//
// Usage: 
// Pass in the id of table body in constructor. 
//   var myTableView = new TableView("myParamTable");
//
// Written by: Mikako Harada. Sept., 2014.  
// Last updated: Sept. 18, 2016. 
//===================================================================

// Custom object to store a list of web services resource or end points.   
var TableView = function (id) {
    this.id = "#" + id; // html table element id 
};

// Helper functions. 
// Add a list of parameters to the table if the same name does not exists. 
TableView.prototype.addParamListToTable = function (keys, color) {
    if (!(Array.isArray(keys))) return;

    for (var i = 0; i < keys.length; i++) {
        this.addParamToTable(keys[i], color);
    }
}

// Add one parameter to the table if the same parameter does not exists.
 
//TableView.prototype.addParamToTable_v1 = function(key, color) {
//    var rowIndex = this.findParamInTable(key);
//    if (rowIndex < 0) { // new param
//        this.addParamToTable(key, color); 
//        //$(this.id).append("<tr><th>" + key + "</th><th> </th></tr>");
//    }
//    else { // param exists

//    }
//}

TableView.prototype.addParamToTable = function (key, color) {
    var rows = this.findParamInTable(key);
    if (rows.length > 0) { // param exists. we assume no duplicate name. 
        rows[0].style = 'color:' + color;
    }
    else { // new param 
        this.appendParamToTable(key, color);
    }
}

// Add one parameter to the table. 
// e.g., arrow = "&#9654;"  
TableView.prototype.appendParamToTable = function (key, color) {
    var style = 'style="color:' + color + '"'; 
    $(this.id).append("<tr " + style + '>' 
        + '<td onclick="tableCellCopyClicked(this)">' + ">" + '</td>' 
        + '<td id=key>' + key + '</td>' 
        + '<td contenteditable="true"></td>' 
        + '</tr>'
    );
}

// Check if a param name already exisit in the table. 
// If so, return the rows.  

//TableView.prototype.findParamInTable = function (key) {
//    //var rows = $(this.id + " tr").filter(':contains("' + key + '")');
//    var rows = $(this.id + " tr #key").filter(
//        function () { 
//            return $(this).text() == key; 
//        });
//    return rows; 
//}

TableView.prototype.findParamInTable = function (key) {
    //var rows = $(this.id + " tr").filter(':contains("' + key + '")');
    var rows = $(this.id + " tr #key").filter(
        function () {
            return $(this).text() == key;
        }).closest("tr");
    return rows;
}

// Initialize the color of text in the table.
TableView.prototype.initFontColor = function (color) {
    var style = 'color:' + color;
    var rows = $(this.id + " tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style = style; 
    }
}

// Change the color of a given row
// Initialize the color of text in the table.
//TableView.prototype.setRowColor = function (row, color) {
//    row.style = 'color:' + color;
//}

// Save a list of parameters in the table in JSON format
TableView.prototype.tableViewToParamList = function (keys) {
    
    if (!keys) return [];

    var paramList = [];

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]; 
        var rows = this.findParamInTable(key);
        if (rows.length > 0) { // We don't expect more than one. 
            var row = rows[0];
            var val = row.cells[2].textContent; 
            //console.log(" this is a value: " + val);
            //alert(" this is a value: " + val);
            
            // string of form: "key : value"
            var pair = '"' + key + '"' + ":" + '"' + val + '"'; 
            // MH: or maybe I need a string? 
            paramList.push(pair); 
        }
    }
    //alert(" this is paramList: " + paramList);
    var paramString = paramList.join(", ");
    var str = "{ " + paramString + " }"
    return JSON.parse(str); 
}
