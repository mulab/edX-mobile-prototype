var initSidebar = function() {

	var getHierachy = function(coursepath) {
		var rootDom = loadXmlFile(coursepath+"course.xml");
		var courseDom = rootDom.getElementsByTagName("course")[0];
		var url_name = courseDom.getAttribute("url_name");
		courseDom = null;// free 
		rootDom = null;
		rootDom = loadXmlFile(coursepath+"course/"+url_name+".xml");
		courseDom = rootDom.getElementsByTagName("course")[0];
		var chapterSet = xmlDom.getElementsByTagName("chapter");
		var hierachy = [];
		for (var chapterIndex = 0; chapterIndex < chapterSet.length; chapterIndex++) {
			var chapter = chapterSet[chapterIndex];
			url_name = chapter.getAttribute("url_name");
			hierachy.push(loadChapter(coursepath, url_name));
		}
		return hierachy;
	}
	var loadChapter = function(coursepath, url_name) { //Week or Section
		var xmlDom = loadXmlFile(coursepath+"chapter/"+url_name+".xml");
		var chapterDom = xmlDom.getElementsByTagName("chapter")[0];
		var chapter = {};
		chapter["url_name"] = url_name;
		/* possible attributes:
		 * display_name
		 * graceperiod
		 * start
		 * xqa_key
		 */
		for (var attrIdx = 0; attrIdx < chapterDom.attributes.length; attrIdx++) {
			var attribute = chapterDom.attributes.item(attrIdx);
			chapter[attribute.nodeName] = attribute.nodeValue;
		}
		chapter["sequentials"] = [];
		//TODO: free xmlDom and chapterDom?
		var sequentialSet = chapterDom.getElementsByTagName("sequential");
		for (var sequentialIndex = 0; sequentialIndex < sequentialSet.length; sequentialIndex++) {
			var sequential = sequentialSet[chapterIndex];
			url_name = sequential.getAttribute("url_name");
			chapter["sequentials"].push(loadSequential(coursepath, url_name));
		}
		return chapter;
	}
	var loadSequential = function(coursepath, url_name) { //Subsection
		var xmlDom = loadXmlFile(coursepath+"sequential/"+url_name+".xml");
		var sequentialDom = xmlDom.getElementsByTagName("sequential")[0];
		var sequential = {};
		sequential["url_name"] = url_name;
		/* possible attributes:
		 * display_name
		 * graceperiod
		 * start
		 * xqa_key
		 * due
		 * format
		 * graded
		 * rerandomize
		 * showanswer
		 */
		for (var attrIdx = 0; attrIdx < sequentialDom.attributes.length; attrIdx++) {
			var attribute = chapterDom.attributes.item(attrIdx);
			sequential[attribute.nodeName] = attribute.nodeValue;
		}
		sequential["verticals"] = [];
		var verticalSet = sequentialDom.getElementsByTagName("vertical");
		//TODO: free xmlDom and sequentialDom?
		for (var verticalIndex = 0; verticalIndex < verticalSet.length; verticalIndex++) {
			var vertical = sequentialSet[verticalIndex];
			url_name = vertical.getAttribute("url_name");
			sequential["verticals"].push(loadVertical(coursepath, url_name));
		}
		return sequential;
	}
	var loadVertical = function(coursepath， url_name) { //Unit
		var xmlDom = loadXmlFile(coursepath+"vertical/"+url_name+".xml");
		var verticalDom = xmlDom.getElementsByTagName("vertical")[0];
		var vertical = {};
		vertical["url_name"] = url_name;
		/* possible attributes:
		 * attempts
		 * display_name
		 * start
		 * due
		 * format
		 * graded
		 * rerandomize
		 * showanswer
		 */
		for (var attrIdx = 0; attrIdx < verticalDom.attributes.length; attrIdx++) {
			var attribute = chapterDom.attributes.item(attrIdx);
			vertical[attribute.nodeName] = attribute.nodeValue;
		}
		vertical["components"] = [];
		//TODO: free xmlDom?
		for (var childIdx = 0; childIdx < verticalDom.childNodes.length; childIdx++) {
			var child = verticalDom.childNodes.item(childIdx);
			if (child.nodeName != "#text") {
				vertical["components"].push({
					"type": child.nodeName,
					"url_name": child.getAttribute("url_name")
				});
			}
		}
		return vertical;
	}

}