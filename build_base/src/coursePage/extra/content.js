var initContent = function(bodyInner){
	var contentIframe = bodyInner.find('iframe');
	var storage = window.localStorage;
	var coursepath = (storage.hasOwnProperty("raw_coursepath"))?storage.getItem("raw_coursepath"):"../data/2013_Spring_Tsinghua/";
	storage.setItem("coursepath","../../"+coursepath);
	contentIframe.attr("src","./src/staticPage/Course Info.html");
};