var getHTML = function(coursepath, url_name) {
	var xmlDom = loadXmlFile(coursepath + "html/" + url_name + ".xml");
	xmlDom = xmlDom.getElementsByTagName("html")[0];
	if (xmlDom.hasAttribute("filename")) {
		//TODO: load the following file into corresponding position.
        return '<iframe src="'+coursepath + xmlDom.getAttribute("filename") + ".html"+'"></iframe>';
	} else {
		return '<iframe src="'+coursepath + "html/" + url_name + ".xml"+'"></iframe>';
	}
}

var getVideo = function(coursepath, url_name) {
	var xmlDom = loadXmlFile(coursepath + "video/" + url_name + ".xml");
	xmlDom = xmlDom.getElementsByTagName("video")[0];
	var youtube = xmlDom.getAttribute("youtube");
	var display_name = xmlDom.getAttribute("display_name");
	var source = xmlDom.getElementsByTagName("source")[0].getAttribute("src");
    return '<video controls><source src="'+source+'" type="video/mp4">Your browser does not support the video tag.</video>'
	//TODO: construct component
}

var getProblem = function(coursepath, url_name) {
	var xmlDom = loadXmlFile(coursepath + "problem/" + url_name + ".xml");
    return 'Problems are not supported yet.';
}

var getDiscussion = function(coursepath, url_name) {
	var xmlDom = loadXmlFile(coursepath + "discussion/" + url_name + ".xml");
    return 'Discussions are not supported yet.';
}

var loadComponent = function(component, coursepath){
    switch(component.type){
        case 'html': return getHTML(coursepath, component.url_name);
        case 'video': return getVideo(coursepath, component.url_name);
        case 'problem': return getProblem(coursepath, component.url_name);
        case 'discussion': return getDiscussion(coursepath, component.url_name);
    }
}
