var initSidebar = function() {

	var getHierachy = function(coursepath) {
		var rootDom = loadXmlFile(coursepath+"course.xml");
		var courseDom = rootDom.getElementsByTagName("course")[0];
		var url_name = courseDom.attributes["url_name"].nodeValue;
		courseDom = null;// free 
		rootDom = null;
		rootDom = loadXmlFile(coursepath+"course/"+url_name+".xml");
		courseDom = rootDom.getElementsByTagName("course")[0];
		var chapterSet = xmlDom.getElementsByTagName("chapter");
		var hierachy = [];
		for (var chapterIndex = 0; chapterIndex < chapterSet.length; chapterIndex++) {
			var chapter = chapterSet[chapterIndex];
			url_name = chapter.attributes["url_name"].nodeValue;
			hierachy.push(loadChapter(coursepath, url_name));
		}
	}
	var loadChapter = function(coursepath, url_name) {
		var xmlDom = loadXmlFile(coursepath+"chapter/"+url_name+".xml");
		var chapterDom = xmlDom.getElementsByTagName("chapter")[0];
	}
	var loadSequential = function(coursepath, url_name) {
		;
	}
	var loadVertical = function(coursepath， url_name) {
		;
	}

}