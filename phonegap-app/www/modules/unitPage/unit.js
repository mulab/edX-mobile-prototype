/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-28
 * Time: 下午4:35
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', 'text!modules/unitPage/unit.html'], function ($, unitHtml) {
    var init = function () {
        $('div[data-role="page"]:last').after(unitHtml);
        require(['jqm'], function () {
        });
        var $unit = $("#unit");
        $.mobile.changePage($unit, {dataUrl: $('base').attr('href')});

    };
    return {
        initialize: init
    };
});