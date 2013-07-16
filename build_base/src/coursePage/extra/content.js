var initContent = function(bodyInner){
	var contentIframe = bodyInner.find('#main');
	var storage = window.localStorage;
	var coursepath = (storage.hasOwnProperty("raw_coursepath"))?storage.getItem("raw_coursepath"):"../data/2013_Spring_Tsinghua/";
	storage.setItem("coursepath","../../"+coursepath);
	$.get(coursepath+"info/updates.html",function(data){
		contentIframe.html(data);
	});
	$('div:jqmData(role="page")').css("padding-top","auto");
};