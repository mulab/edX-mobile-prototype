var initPanel = function(bodyInner){
	bodyInner.find("div:jqmData(role='panel')").trigger("create");
	var weeklist = bodyInner.find("ul#weeklist");
	var sublist = bodyInner.find("ul#sublist");
	var verticallist = bodyInner.find("ul#verticallist");
    var storage = window.localStorage;
	$("div:jqmData(role='panel')").on("swiperight",function(){
		$(this).panel("open");
	});
	var coursepath;
	var paneltree = {};
	var getCoursepath = function(){
		coursepath = "../data/2013_Spring_Tsinghua/";
		debug = true;
	};
	var getHierarchy = function (coursepath) {
        var xmlDom = loadXmlFile(coursepath + "course.xml");
        xmlDom = xmlDom.getElementsByTagName("course")[0];
        var url_name = xmlDom.getAttribute("url_name");
        xmlDom = loadXmlFile(coursepath + "course/" + url_name + ".xml");
        xmlDom = xmlDom.getElementsByTagName("course")[0];
        var chapterSet = xmlDom.getElementsByTagName("chapter");
        var hierarchy = [];
        for (var chapterIndex = 0; chapterIndex < chapterSet.length; chapterIndex++) {
            var chapter = chapterSet[chapterIndex];
            url_name = chapter.getAttribute("url_name");
            hierarchy.push(loadChapter(coursepath, url_name));
        }
        return hierarchy;
    };
    var loadChapter = function (coursepath, url_name) { //Week or Section
        var xmlDom = loadXmlFile(coursepath + "chapter/" + url_name + ".xml");
        xmlDom = xmlDom.getElementsByTagName("chapter")[0];
        var chapter = {};
        chapter["url_name"] = url_name;
        /* possible attributes:
         * display_name
         * graceperiod
         * start
         * xqa_key
         */
        for (var attrIdx = 0; attrIdx < xmlDom.attributes.length; attrIdx++) {
            var attribute = xmlDom.attributes.item(attrIdx);
            chapter[attribute.nodeName] = attribute.nodeValue;
        }
        chapter["sequentials"] = [];
        var sequentialSet = xmlDom.getElementsByTagName("sequential");
        for (var sequentialIndex = 0; sequentialIndex < sequentialSet.length; sequentialIndex++) {
            var sequential = sequentialSet[sequentialIndex];
            url_name = sequential.getAttribute("url_name");
            chapter["sequentials"].push(loadSequential(coursepath, url_name));
        }
        return chapter;
    };
    var loadSequential = function (coursepath, url_name) { //Subsection
        var xmlDom = loadXmlFile(coursepath + "sequential/" + url_name + ".xml");
        xmlDom = xmlDom.getElementsByTagName("sequential")[0];
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
        for (var attrIdx = 0; attrIdx < xmlDom.attributes.length; attrIdx++) {
            var attribute = xmlDom.attributes.item(attrIdx);
            sequential[attribute.nodeName] = attribute.nodeValue;
        }
        sequential["verticals"] = [];
        var verticalSet = xmlDom.getElementsByTagName("vertical");
        for (var verticalIndex = 0; verticalIndex < verticalSet.length; verticalIndex++) {
            var vertical = verticalSet[verticalIndex];
            url_name = vertical.getAttribute("url_name");
            sequential["verticals"].push(loadVertical(coursepath, url_name));
        }
        return sequential;
    };
    var loadVertical = function (coursepath, url_name) { //Unit
        var xmlDom = loadXmlFile(coursepath + "vertical/" + url_name + ".xml");
        xmlDom = xmlDom.getElementsByTagName("vertical")[0];
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
        for (var attrIdx = 0; attrIdx < xmlDom.attributes.length; attrIdx++) {
            var attribute = xmlDom.attributes.item(attrIdx);
            vertical[attribute.nodeName] = attribute.nodeValue;
        }
        vertical["components"] = [];
        for (var childIdx = 0; childIdx < xmlDom.childNodes.length; childIdx++) {
            var child = xmlDom.childNodes.item(childIdx);
            if (child.nodeName != "#text") {
                vertical["components"].push({
                    "type": child.nodeName,
                    "url_name": child.getAttribute("url_name")
                });
            }
        }
        return vertical;
    };
    var render = function(){
    	weeklist.html("");
    	for(var chapterIndex in paneltree){
    		var chapter = paneltree[chapterIndex];
    		var display_name = (chapter.hasOwnProperty("display_name"))?chapter["display_name"] : chapter["url_name"];
    		weeklist.append("<li>"+display_name+"</li>");
    		$(weeklist.children("li")[chapterIndex]).click({"chapter":chapter},(function(event){
    			var sequentials = event.data.chapter["sequentials"];
    			sublist.html("");
                verticallist.html("");
    			for(var sequentialIndex in sequentials){
    				var sequential = sequentials[sequentialIndex];
    				var sequential_name = (sequential.hasOwnProperty("display_name"))?sequential["display_name"] : sequential["url_name"];
    				sublist.append("<li>"+sequential_name+"</li>");
    				$(sublist.children("li")[sequentialIndex]).click({"sequential":sequential},(function(event){
    					var verticalSet = event.data.sequential["verticals"];
    					verticallist.html("");
    					for(var verticalIndex in verticalSet){
    						var vertical = verticalSet[verticalIndex];
    						var vertical_name = (vertical.hasOwnProperty("display_name"))?vertical["display_name"]:vertical["url_name"];
    						verticallist.append("<li>"+vertical_name+"</li>");
    						$(verticallist.children("li")[verticalIndex]).click((function(){
    							//TODO
    							alert("hello!code not completed!");
    						}));
    					}
    					verticallist.listview("refresh");
    				}));
    			}
    			sublist.listview("refresh");
                $(sublist.children("li")[0]).trigger("click");
    		}));
    		weeklist.listview("refresh");
    	}
    };
    getCoursepath();
    paneltree = getHierarchy(coursepath);
    render();
    $(weeklist.children("li")[0]).trigger("click");
    $(sublist.children("li")[0]).trigger("click");
};