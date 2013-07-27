/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-27
 * Time: 下午2:44
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', 'dashboard', 'util', 'text!modules/coursePage/header.html'], function ($, dashboard, util, headerHtml) {
    var init = function ($page) {
        require(['jqm'],function(){});
        $page.find("div:jqmData(role='header')").html(headerHtml);
        var course_pic = $page.find('.course-pic');
        var course_title_num = $page.find('.course-title-num');
        var course_title_name = $page.find('.course-title-name');
        var course_teacher = $page.find('.course-teacher');
        var back_home = $page.find('.back-home');
        var course_title_num_text;
        var course_title_name_text;
        var course_img_path = "static/images/course_image.jpg";
        var pro_img_path = "static/images/";
        var pro_img_json_path = "static/images/pro.json";
        var pro_img_list = [];
        var course_path;
        var storage = window.localStorage;

        get_course_path();
        loadTitle();
        loadTeacher();
        loadCourseImage();
        render();
        bind();
        back_home.trigger("create");

        function render() {
            course_title_name.text(course_title_name_text);
            course_title_num.text(course_title_num_text);
            for (var i = 0; i < pro_img_list.length; i++) {
                course_teacher.append("<img src='" + pro_img_list[i] + "'/>");
            }
            course_pic.append("<img src='" + course_img_path + "'/>");
        }

        function bind(){
            back_home.click(function(){
//               require(['dashboard'],function(dashboard){
//                   dashboard.initialize();
//               });
                //dashboard.initialize();
                $.mobile.changePage($("#dashboard"),{});
            });
        }

        function get_course_path() {
            if (storage.hasOwnProperty("raw_coursepath")) {
                course_path = storage.getItem("raw_coursepath");
            }
            else course_path = "data/2013_Spring_Tsinghua/";
        }

        function loadCourseImage() {
            course_img_path = course_path + course_img_path;
        }

        function loadTitle() {
            var rootDom = util.loadXmlFile(course_path + "course.xml");
            var courseDom = rootDom.getElementsByTagName("course")[0];
            course_title_num_text = courseDom.attributes["course"].nodeValue;
            var url_name = courseDom.attributes["url_name"].nodeValue;
            rootDom = util.loadXmlFile(course_path + "course/" + url_name + ".xml");
            courseDom = rootDom.getElementsByTagName("course")[0];
            course_title_name_text = courseDom.attributes["display_name"].nodeValue;
        }

        function loadTeacher() {
            pro_img_json_path = course_path + pro_img_json_path;
            $.ajaxSetup({
                async: false
            });
            $.getJSON(pro_img_json_path, function (json) {
                pro_img_list = json["url"];
                for (var i = 0; i < pro_img_list.length; i++) {
                    pro_img_list[i] = course_path + pro_img_path + pro_img_list[i];
                }
            });
            $.ajaxSetup({
                async: true
            });
        }
    };
    return {
        initialize: init
    };
});