var getHTML = function(coursepath, url_name) {
	var xmlDom = loadXmlFile(coursepath + "html/" + url_name + ".xml");
	xmlDom = xmlDom.getElementsByTagName("html")[0];
	if (xmlDom.hasAttribute("filename")) {
		//TODO: load the following file into corresponding position.
		coursepath + xmlDom.getAttribute("filename") + ".html";
	} else {
		//TODO: load the childNodes of xmlDom into corresponding position.
	}
}

var getVideo = function(coursepath, url_name) {
	var xmlDom = loadXmlFile(coursepath + "video/" + url_name + ".xml");
	xmlDom = xmlDom.getElementsByTagName("video")[0];
	var youtube = xmlDom.getAttribute("youtube");
	var display_name = xmlDom.getAttribute("display_name");
	var source = xmlDom.getElementsByTagName("source")[0].getAttribute("src");
	//TODO: construct component
}

var getProblem = function(coursepath, url_name) {
	var xmlDom = loadXmlFile(coursepath + "problem/" + url_name + ".xml");
}

var getDiscussion = function(coursepath, url_name) {
	var xmlDom = loadXmlFile(coursepath + "discussion/" + url_name + ".xml");
}