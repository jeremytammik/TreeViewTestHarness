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
// Tree View Utilities
// 
// Function: JsonToTreeViewData() 
// 
// This function takes a JSON string and conver to JSON data to
// pass to inspire-tree viewer.
// cf. Inspire-tree 
//   http://www.inspire-tree.com/
//   https://github.com/helion3/inspire-tree
// 
// Usage: 
// includes dependency inspire-tree tool's js and css:  
//   <link rel="stylesheet" href="./inspire-tree-master/dist/inspire-tree.css" type="text/css"/>
//   <script src="./inspire-tree-master/dist/inspire-tree-bundled.min.js"></script>
// 
// then pass the JSON string to the function: 
//   var treeViewData = JsonToTreeViewData(jsonString);
//
// Written by: Mikako Harada. Sept., 2014.  
// Last updated: Sept. 17, 2016. 
//===================================================================

//===================================================================
// Check the object type for JSON object.  
// cf. http://stackoverflow.com/questions/11182924/how-to-check-if-javascript-object-is-json
//=================================================================== 

var stringConstructor = "testString".constructor;
var arrayConstructor = [].constructor;
var objectConstructor = {}.constructor;

function objectType(obj)
{
    if (obj === null) {
        return "null"; 
    }
    else if (obj === undefined) {
        return "undefined";
    }
    else if (obj.constructor === stringConstructor) {
        return "String";
    }
    else if (obj.constructor === arrayConstructor) {
        return "Array";
    }
    else if (obj.constructor === objectConstructor) {
        return "Object"; 
    }
    else {
        return "don't know"; 
    }
}


//===================================================================
// Function: JsonToTreeViewData()
// This function takes a JSON string and conver to JSON data to
// pass to inspire-tree viewer.
// cf. Inspire-tree 
//   http://www.inspire-tree.com/
//   https://github.com/helion3/inspire-tree
// 
// Usage: 
// var treeViewData = JsonToTreeViewData(jsonString);  
//====================================================================

// MH: To Do. Check the input data. e.g., {}, "". 

function JsonToTreeViewData(jsonString)
{
    var jsonObj = JSON.parse(jsonString);
    var treeView = JsonToTreeNode("JSON", jsonObj);
    return [treeView]; 
}

// Helper function for JsonToViewViewData()
// 
function JsonToTreeNode(key, jsonObj) {

    var node = { text: key, children: [] };
    var children = [];

    var objType = objectType(jsonObj);

    if (objType === "Object") // We have an object. 
    {
        //console.log("We have an object: " + jsonObj);

        var objKeys = Object.keys(jsonObj);
        var len = objKeys.length;
        for (var i = 0; i < len; i++) {
            var name = objKeys[i];
            //var value = jsonObj[name].valueOf();
            var value = jsonObj[name]; 

            //var text = name + " : " + value;
            var tmpNode = JsonToTreeNode(name, value);
            //console.log(text); 
            children.push(tmpNode);
            //node.children = node.children.push(tmpNode);
        }
        //node.text = "{} " + key;
        node.text = key; 
        node.children = children;
        return node;
    }
    else if (objType === "Array") // We have a list. 
    {
        var len = jsonObj.length;
        //console.log("We have a list. Length = " + jsonObj.length);

        var text = key + "[" + len + "]";
        //console.log(text);
        node.text = text; 

        // Iterate over each object. 
        for (var i = 0; i < len; i++) {
            //var keyIndx = "{} " + i;
            //var keyIndx = "[" + i + "]"; 
            var keyIndx = i;

            //var itmString;

            var itm = jsonObj[i];
            //if (itm == null) {
            //    itmString = "<null>"
            //}
            //else itmString = JSON.stringify(itm);

            var tmpNode = JsonToTreeNode(keyIndx, itm);
            children.push(tmpNode);
            //node.children = node.children.push(tmpNode);
        }
        node.children = children;
        return node;

    }
    else // Should be a (name : value) pair
    {
        //console.log("(name:value) pair: " + jsonObj);

        var val; 
        if (jsonObj === null) {
            val = "<null>"; 
        }
        else {
            val = jsonObj.toString(); 
        }

        var text = key + " : " + val;
        var key = key;
        var value = jsonObj;

        //console.log(text)

        var node = { text: text, key: key, value: value };
        return node;
    }

}
