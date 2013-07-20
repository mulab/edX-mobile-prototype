var initPanel = function(bodyInner) {
    var ColorGroup = [
        [255, 200, 200],
        [200, 255, 200],
        [200, 200, 255],
        [229, 52, 129],
        [252, 178, 21],
        [156, 203, 59],
        [37, 176, 230],
        [129, 81, 161],
        [229, 51, 17],
        [252, 235, 1],
        [0, 203, 164],
        [65, 101, 230],
        [161, 59, 90]
    ],
        highlightColor = [255, 255, 255],
        lastFocus = [0, 0],
        defaultColor = [242, 242, 242],
        currentWeek = 0;
    var totalNum = [0, 0, 0];

    var thisColor;

    function clearDone(num) {
        $(verticallist.find("li")[num]).css('opacity', '1.0');
        //$(verticallist.find("li")[num]).animate({'opacity':'1.0'},200);
    };

    function clearDoneAll() {
        clearDone(totalNum[2] - 1);
    };

    function makeSpan(){
        return '<span class="colorTag" style="background-color: #ff0000; width:1em;height:100%;position:absolute;top:0;left:0;"></span>';
    };

    function setFocus(week, sub) {
        // $(weeklist.find("li")[lastFocus[0]]).css('background-color', makeColor(defaultColor));
        // $(sublist.find("li")[lastFocus[1]]).css('background-color', makeColor(defaultColor));

        // lastFocus = [week, sub];
        // thisColor = $(sublist.find("li")[sub]).css('background-color');
        // $(weeklist.find("li")[week]).css('background-color', makeColor(highlightColor));
        // $(sublist.find("li")[sub]).css('background-color', thisColor);
        // verticallist.find("li").css('background-color', thisColor);

        /*
        *week not change,sub change
        */
        if(week == lastFocus[0]){
            $(weeklist.find("li")[week]).css('background-color', makeColor(highlightColor));
            //sub also not change
            if(sub == lastFocus[1]){
                $(sublist.find("li")[sub]).css('background-color', thisColor);
                verticallist.find("li").css('background-color', thisColor);
            }
            //sub change
            else{
                $(sublist.find("li")[lastFocus[1]]).css('background-color', makeColor(defaultColor));
                thisColor = $(sublist.find("li>.colorTag")[sub]).css('background-color');
                $(sublist.find("li")[sub]).css('background-color', thisColor);
                verticallist.find("li").css('background-color', thisColor);
                sublist.listview("refresh");
            }
        }
        /*
        *week change
        */
        else{
            $(weeklist.find("li")[lastFocus[0]]).css('background-color', makeColor(defaultColor));
            $(weeklist.find("li")[week]).css('background-color', makeColor(highlightColor));
            sublist.find("li>.colorTag").each(function(index, element) {
                $(element).css('background-color', randomColor());
            });
            thisColor = $(sublist.find("li>.colorTag")[sub]).css('background-color');
            $(sublist.find("li")[sub]).css('background-color', thisColor);
            verticallist.find("li").css('background-color', thisColor);
        }
        lastFocus = [week,sub];
    };

    function makeColor(colorList) {
        return 'rgb(' + String(colorList[0]) + ',' + String(colorList[1]) + ',' + String(colorList[2]) + ')';
    }
    var randomColor = function() {
        return makeColor(ColorGroup[Math.floor((Math.random() * ColorGroup.length))]);
    };
    var displayHack = function() {
        //verticallist.addClass("ui-sidetag-panel-closed");
        //sidetag.css("width", $("div:jqmData(role='panel')").css("height"));
        sublist.find("li>.colorTag").each(function(index, element) {
            $(element).css('background-color', randomColor());
        });
        thisColor = $(sublist.find("li>.colorTag")[0]).css("background-color");
        setFocus(lastFocus[0],lastFocus[1]);
        verticallist.listview("refresh");
        // setFocus(1,1);
        // markDone(3);
    };
    bodyInner.find("div:jqmData(role='panel')").trigger("create");
    var weeklist = bodyInner.find("ul#weeklist");
    var sublist = bodyInner.find("ul#sublist");
    var verticallist = bodyInner.find("ul#verticallist");
    var sidetag = bodyInner.find('.sidetag');
    var storage = window.localStorage;
    $("div:jqmData(role='panel')").on("swiperight", function() {
        $(this).panel("open");
        sidetag.css("visibility", "hidden");
        verticallist.css("margin-left", 0);
    });
    $("div:jqmData(role='panel')").on("panelclose", function(event, ui) {
        //sidetag.css("visibility", "visible");
        //verticallist.css("margin-left", "1.5em");
    });
    var coursepath;
    var paneltree = {};
    var getCoursepath = function() {
        if(storage.hasOwnProperty("raw_coursepath")){
            coursepath = storage.getItem("raw_coursepath");
        }
        else coursepath = "../data/2013_Spring_Tsinghua/";
        debug = false;
    };
    var getHierarchy = function(coursepath) {
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
    var loadChapter = function(coursepath, url_name) { //Week or Section
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
    var loadSequential = function(coursepath, url_name) { //Subsection
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
    var loadVertical = function(coursepath, url_name) { //Unit
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
    var render = function() {
        weeklist.html("");
        totalNum[0] = paneltree.length;
        for (var chapterIndex in paneltree) {
            var chapter = paneltree[chapterIndex];
            var display_name = (chapter.hasOwnProperty("display_name")) ? chapter["display_name"] : chapter["url_name"];
            weeklist.append("<li>" + display_name + "</li>");
            $(weeklist.children("li")[chapterIndex]).click({
                "chapter": chapter
            }, (function(event) {
                var sequentials = event.data.chapter["sequentials"];
                var sidetag_week = (event.data.chapter.hasOwnProperty("display_name")) ? event.data.chapter["display_name"] : event.data.chapter["url_name"];
                sublist.html("");
                verticallist.html("");
                sidetag.html("");
                sidetag.append("<span>" + sidetag_week + ":&#9</span>")
                totalNum[1] = sequentials.length;
                for (var sequentialIndex in sequentials) {
                    var sequential = sequentials[sequentialIndex];
                    var sequential_name = (sequential.hasOwnProperty("display_name")) ? sequential["display_name"] : sequential["url_name"];
                    sublist.append("<li>" +makeSpan()+ sequential_name + "</li>");
                    $(sublist.children("li")[sequentialIndex]).click({
                        "sequential": sequential
                    }, (function(event) {
                        var verticalSet = event.data.sequential["verticals"];
                        verticallist.html("");
                        var sidetag_sequential = (event.data.sequential.hasOwnProperty("display_name")) ? event.data.sequential["display_name"] : event.data.sequential["url_name"];
                        if (sidetag.find("span").length == 2) {
                            $(sidetag.find("span")[1]).html(sidetag_sequential);
                        } else {
                            sidetag.append("<span>" + sidetag_sequential + "</span>");
                        }
                        totalNum[2] = verticalSet.length;
                        for (var verticalIndex in verticalSet) {
                            var vertical = verticalSet[verticalIndex];
                            var vertical_name = (vertical.hasOwnProperty("display_name")) ? vertical["display_name"] : vertical["url_name"];
                            storage.setItem("unitData", JSON.stringify(event.data.sequential));
                            storage.setItem("coursepath", "../../" + coursepath);
                            verticallist.append("<li>" + vertical_name + "</li>");
                            $(verticallist.children("li")[verticalIndex]).click({
                                "verticalIndex": verticalIndex
                            }, function(event) {
                                //window.location.href = "./src/unitPage/unit.html";
                                $.mobile.loading( "show");
                                storage.setItem("verticalIndex", event.data.verticalIndex);
                                self.location.href = "./src/unitPage/unit.html";
                            });
                        }
                        setFocus(currentWeek, $(this).index());
                        clearDoneAll();
                        verticallist.listview("refresh");
                    }));
                }
                sublist.listview("refresh");
                currentWeek = $(this).index();
                setFocus($(this).index(), 0);
                $(sublist.children("li")[0]).trigger("click");
            }));
            weeklist.listview("refresh");
        }
    };
    getCoursepath();
    paneltree = getHierarchy(coursepath);
    render();
    $(weeklist.children("li")[0]).trigger("click");
    //$(sublist.children("li")[0]).trigger("click");
    displayHack();
};