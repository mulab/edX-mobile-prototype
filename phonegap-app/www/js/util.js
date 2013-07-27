/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-27
 * Time: 下午3:43
 * To change this template use File | Settings | File Templates.
 */
define([],function () {
    function loadXmlFile(xmlFile){
        var xmlDom = null;
        if (window.ActiveXObject){
            xmlDom = new ActiveXObject("Microsoft.XMLDOM");
            //xmlDom.loadXML(xmlFile);//如果用的是XML字符串
            xmlDom.load(xmlFile);//如果用的是xml文件。
        }else if (document.implementation && document.implementation.createDocument){
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", xmlFile, false);
            xmlhttp.send(null);
            xmlDom = xmlhttp.responseXML;
        }else{
            xmlDom = null;
        }
        return xmlDom;
    }
    return {
        loadXmlFile:loadXmlFile
    };
});