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
// Web Service Base Utilities
// 
// Custom objects: 
//   WebServiceList -- to store a list web services resource or end points. 
//   WebServiceBase -- to compose a web service resource. 
// 
// WebServiceList constructor takes a JSON string represening a list of available web services. 
// After that, you can query for a couple of common operatios. 
// 
// cf. WebServiceList uses linqjs tool for query.  
//   https://linqjs.codeplex.com/
//   https://github.com/fordth/jinqJs
//
// Usage: 
// Includes dependency linqjs tool's js:  
//   <script src="./linq.js_ver2.2.0.2/linq.js"></script>
// 
// then pass the JSON string to the constructor: 
//   var serviceList = new WebServiceList(glueServiceListJson);
// 
//   var serviceBase = new WebServiceBase(oneServiceJson);
//
// Written by: Mikako Harada. Sept., 2014.  
// Last updated: Sept. 17, 2016. 
//===================================================================


// Custom object to store a list of web services resource or end points.   
var WebServiceList = function (serviceListJson) {
    this.serviceList = serviceListJson;
};

// Helper functions. 
// Extract a list of group names from a given list of services. 
WebServiceList.prototype.getGroupList = function () {
    var gls = Enumerable.From(this.serviceList)
        .GroupBy("x => x.group").Select("y => y.First()")
        .Select("z =>z.group").ToArray();
    return gls;
};

// Extract a list of group names from a given list of services.
// This version wraps with <option> tab. 
// To be used to fill in <selection> pull down menu.
// e.g., <option value="data">data</option>... 
WebServiceList.prototype.getGroupOptionList = function () {
    var gls = Enumerable.From(this.serviceList)
        .GroupBy("x => x.group").Select("y => y.First()")
        .Select(function (x) { return ('<option>' + x.group + '</option>'); })
        .ToArray();
    return gls.join("");

    //var gls = Enumerable.From(this.serviceList)
    //.GroupBy("x => x.group").Select("y => y.First()")
    //.Select(function (x) { return ('<option value="' + x.group + '">' + x.group + '</option>') })
    //.ToArray();
    //return gls.join("");

};

// Extract a list of service names with a given group name.
WebServiceList.prototype.getServiceList = function (groupName) {
    var sls = Enumerable.From(this.serviceList)
        .Where(function (x) { return x.group == groupName })
        .Select("s => s.service").ToArray();
    return sls; 
};

// Extract a list of service names with a given group name.
// This version wraps with <option> tab. 
// To be used to fill in <selection> pull down menu.
// e.g., <option value="data">data</option>... 
WebServiceList.prototype.getServiceOptionList = function (groupName) {
    var sls = Enumerable.From(this.serviceList)
        .Where(function (x) { return x.group == groupName })
        .Select(function (x) { return ('<option>' + x.service + '</option>'); })
        .ToArray();
    return sls.join("");

    //opts = "";
    //for (var i = 0; i < resourceList.length; i++) {
    //    opts = opts + '<option value="' + resourceList[i] + '">' + resourceList[i] + '</option>'
    //}
};

// Extract a service object that matches a given group and service name.
WebServiceList.prototype.getService = function (groupName, serviceName) {
    var srv = Enumerable.From(this.serviceList)
        .Where(function (x) { return (x.group == groupName) && (x.service == serviceName) })
        .ToArray()[0];
    return srv;
};

// Return the first service definition.
WebServiceList.prototype.first = function () {
    return this.serviceList[0];
};

//-------------------------------------------------------
// Custom object to compose a string for web service resource.
var WebServiceBase = function (serviceJson) {
    this.service = serviceJson;
};

// Get full resource string, e.g., "model/v1/list"
// Note: Field does not follow this rule. e.g, "api/areas" 
// Adding additional checking.  
WebServiceBase.prototype.getFullResourceString = function () {
    if (this.service === undefined) return "undefined";
    var t = this.service; 
    var s = t.group;
    if (t.version != "") s = s + "/" + t.version; 
    s = s + "/" + t.service; 
    return (s);
};

// Get resource label string, e.g., "GET model/v1/list"
WebServiceBase.prototype.getResourceLabelString = function () {
    if (this.service === undefined) return "undefined"; 
    return (this.service.method + " " + this.getFullResourceString());
};


