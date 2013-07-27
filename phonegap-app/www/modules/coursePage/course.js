/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-27
 * Time: 下午2:21
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', 'text!modules/coursePage/course.html', 'modules/coursePage/header', 'modules/coursePage/panel', 'modules/coursePage/content'], function ($, courseHtml, header, panel, content) {
    var init = function () {
        $('div[data-role="page"]:last').after(courseHtml);
        require(['jqm'], function () {
        });
//        $(document).on('pageload', function (event, data) {
        var $course = $("#course");
        $.mobile.changePage($course, {dataUrl: $('base').attr('href')});
        header.initialize($course);
        panel.initialize($course);
        content.initialize($course);
//        });
    };
    return {
        initialize: init
    };
});