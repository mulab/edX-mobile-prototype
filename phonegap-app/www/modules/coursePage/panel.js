/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-27
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', 'util', 'text!modules/coursePage/panel.html', 'unit'], function ($, util, panelHtml, unit) {
    var init = function ($page) {
        require(['jqm'], function () {
        });
        var $panel = $($page.find("div:jqmData(role='panel')"));
        $panel.html(panelHtml);

        var ColorGroup = [
                [255, 200, 200],
                [200, 255, 200],
                [200, 200, 255],
                /*[229, 52, 129],*/
                [252, 178, 21],
                [156, 203, 59],
                [37, 176, 230],
                /*[129, 81, 161],*/
                /*[229, 51, 17],*/
                [252, 235, 1],
                /*[0, 203, 164],*/
                /*[65, 101, 230],
                 [161, 59, 90],*/
                [254, 255, 108],
                [232, 189, 128],
                [255, 149, 155],
                /*[152,102,232],*/
                [137, 221, 255],
                [183, 216, 255],
                [203, 172, 232],
                [255, 149, 155],
                [232, 215, 219],
                [255, 230, 188]
            ],
            highlightColor = [255, 255, 255],
            lastFocus = {"week": 0, "sub": 0},
            defaultColor = [242, 242, 242],
            listItemCount = {"week": 0, "sub": 0, "vertical": 0},
            $weekList = $page.find("ul#weeklist"),
            $subList = $page.find("ul#sublist"),
            $verticalList = $page.find("ul#verticallist"),
        //sideTag = $page.find('.sidetag'),
            storage = window.localStorage,
            panelTree = {};

        $panel.trigger("create");

        get_course_path();
        panelTree = getHierarchy(coursepath);
        render();
        bind();

        function bind() {
            $panel.on("swiperight", function () {
                $(this).panel("open");
            });
            bindWeekListClickHandler();
            bindSubListClickHandler();
            bindVerticalListClickHandler();
        }

        function bindWeekListClickHandler() {
            $weekList.find("li").each(function (index, element) {
                $(element).on("click", {week: index}, function (event) {
                    setListStatus(event.data.week, 0);
                });
            });
        }

        function bindSubListClickHandler() {
            $subList.find("li").each(function (index, element) {
                $(element).on("click", {sub: index}, function (event) {
                    setListStatus(lastFocus.week, event.data.sub);
                });
            });
        }
        var pending = false;
        function bindVerticalListClickHandler() {
            $verticalList.find("li").each(function (index, element) {
                $(element).on("click", {verticalIndex: index}, function (event) {
                    event.stopImmediatePropagation();
                    storage.setItem("verticalIndex", event.data.verticalIndex);
                    storage.setItem("unitData", JSON.stringify(panelTree[lastFocus.week].sequentials[lastFocus.sub]));
                    if(!pending){
                        pending = true;
                        unit.initialize();
                        pending = false;
                    }
                });
            });
        }

        function render() {
            renderList($weekList, getWeekList());
            setListStatus(lastFocus.week, lastFocus.sub);
        }

        function get_course_path() {
            if (storage.hasOwnProperty("raw_coursepath")) {
                coursepath = storage.getItem("raw_coursepath");
            }
            else coursepath = "data/2013_Spring_Tsinghua/";
        }

        function getHierarchy(coursepath) {
            var xmlDom = util.loadXmlFile(coursepath + "course.xml");
            xmlDom = xmlDom.getElementsByTagName("course")[0];
            var url_name = xmlDom.getAttribute("url_name");
            xmlDom = util.loadXmlFile(coursepath + "course/" + url_name + ".xml");
            xmlDom = xmlDom.getElementsByTagName("course")[0];
            var chapterSet = xmlDom.getElementsByTagName("chapter");
            var hierarchy = [];
            for (var chapterIndex = 0; chapterIndex < chapterSet.length; chapterIndex++) {
                var chapter = chapterSet[chapterIndex];
                url_name = chapter.getAttribute("url_name");
                hierarchy.push(loadChapter(coursepath, url_name));
            }
            return hierarchy;
        }

        function loadChapter(coursepath, url_name) { //Week or Section
            var xmlDom = util.loadXmlFile(coursepath + "chapter/" + url_name + ".xml");
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
        }

        function loadSequential(coursepath, url_name) { //Subsection
            var xmlDom = util.loadXmlFile(coursepath + "sequential/" + url_name + ".xml");
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
        }

        function loadVertical(coursepath, url_name) { //Unit
            var xmlDom = util.loadXmlFile(coursepath + "vertical/" + url_name + ".xml");
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
        }

        function renderList($container, listData) {
            $container.html("");
            if ($.isArray(listData)) {
                var listString = "";
                for (var i = 0; i < listData.length; i++) {
                    listString += "<li><a>" + listData[i] + "</a></li>"
                }
                $container.append($(listString));
                $container.listview("refresh");
            }
            else {
                throw new Error("weekListData must be an array.")
            }
        }

        function renderColorTag() {
            $panel.find('li .colorTag').each(function (index, element) {
                $(element).css("background-color", getColor(index));
                console.log(index + ":" + getColor(index));
            });
        }

        function renderVerticalListColor(color) {
            $verticalList.find('li').each(function (index, element) {
                $(element).css("background-color", color);
            });
        }

        function renderWeekListColor(week, color) {
            if (isNaN(week))throw new TypeError("week,sub must be a number");
            $($weekList.find('li')[week]).css("background-color", color);
            lastFocus.week = week;
        }

        function renderSubListColor(sub) {
            if (isNaN(sub))throw new TypeError("week,sub must be a number");
            var _color = $($subList.find('li .colorTag')[sub]).css("background-color");
            $($subList.find('li')[sub]).css("background-color", _color);
            lastFocus.sub = sub;
            return _color;
        }

        function setListStatus(week, sub) {
            clearListStatus();
            renderList($subList, getSubList(week));
            renderList($verticalList, getVerticalList(week, sub));
            //renderColorTag();
            renderWeekListColor(week, makeColor(highlightColor));
            var color = (renderSubListColor)(sub);
            renderVerticalListColor(color);
            bindSubListClickHandler();
            bindVerticalListClickHandler();
        }

        function clearListStatus() {
            renderWeekListColor(lastFocus.week, makeColor(defaultColor));
        }

        function getColor(index) {
            var colorList = ColorGroup[index % ColorGroup.length];
            return makeColor(colorList);
        }

        function makeColor(colorList) {
            return 'rgb(' + String(colorList[0]) + ',' + String(colorList[1]) + ',' + String(colorList[2]) + ')';
        }

        function getWeekList() {
            var weekList = [];
            for (var i = 0; i < panelTree.length; i++) {
                var chapter = panelTree[i];
                var display_name = (chapter.hasOwnProperty("display_name")) ? chapter["display_name"] : chapter["url_name"];
                weekList.push(display_name);
            }
            listItemCount.week = weekList.length;
            return weekList;
        }

        function getSubList(iChapterIndex) {
            var subList = [];
            try {
                var chapter = panelTree[iChapterIndex];
                for (var i = 0; i < chapter.sequentials.length; i++) {
                    var sub = chapter.sequentials[i];
                    var sequential_name = (sub.hasOwnProperty("display_name")) ? sub["display_name"] : sub["url_name"];
                    //We need a color tag here;
                    //And we must give every tag a color here,otherwise $.css() wouldn't get correct color due to transition
                    sequential_name = '<span class="colorTag" style="width:1em;height:100%;position:absolute;top:0;left:0;background-color: ' + getColor(i) + ';"></span>' + sequential_name;
                    subList.push(sequential_name);
                }
                listItemCount.sub = subList.length;
            } catch (e) {
                listItemCount.sub = 0;
            } finally {
                return subList;
            }
        }

        function getVerticalList(iChapterIndex, iSubIndex) {
            var verticalList = [];
            try {
                var sub = panelTree[iChapterIndex].sequentials[iSubIndex];
                for (var i = 0; i < sub.verticals.length; i++) {
                    var vertical = sub.verticals[i];
                    var vertical_name = (vertical.hasOwnProperty("display_name")) ? vertical["display_name"] : vertical["url_name"];
                    verticalList.push(vertical_name);
                }
                listItemCount.vertical = verticalList.length;
            } catch (e) {
                listItemCount.vertical = 0;
            } finally {
                return verticalList;
            }
        }

    };

    return {
        initialize: init
    };
});