/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-27
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */
define(['jquery','text!modules/coursePage/content.html'],function ($,contentHtml) {
    var init = function($page){
        require(['jqm'], function () {
        });
        var $content = $($page.find("div:jqmData(role='content')"));
        $content.html(contentHtml);
        var $iframe = $($content.find('#main'));
        var storage = window.localStorage;
        var course_path = (storage.hasOwnProperty("raw_coursepath"))?storage.getItem("raw_coursepath"):"data/2013_Spring_Tsinghua/";
        storage.setItem("coursepath",course_path);
        $.get(course_path+"info/updates.html",function(data){
            $iframe.html(data);
        });
    };
    return {
        initialize:init
    };
});