/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-27
 * Time: 上午3:22
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', 'text!modules/dashboardPage/dashboard.html', 'course'], function ($, dashboardHtml, course) {
        var init = function () {
            if (arguments.length > 0) {
                var $container = arguments[0];
                $container.html(dashboardHtml);
                require(['jqm'], function () {
                });
            }
            else {
                $('div[data-role="page"]:last').after(dashboardHtml);
                require(['jqm'], function () {
                });
                $.mobile.changePage($unit, {dataUrl: $('base').attr('href')});
            }

            $('#link1').on("click", {value: 'data/2013_Spring_Tsinghua/'}, function (event) {
                onClickHandler(event)
            });
            $('#link2').on("click", {value: 'data/Software_as_a_Service/'}, function (event) {
                onClickHandler(event)
            });
        };

        function onClickHandler(e) {
            //TODO javascript has birth defect,it's difficult to handle when click very very very fast
            //these codes are still useless
            e.preventDefault();
            e.stopImmediatePropagation();
            //var $this = $(e.currentTarget);
            //$.mobile.loading("show");
            window.localStorage.setItem('raw_coursepath', e.data.value);
            course.initialize();
        }

        return {
            initialize: init
        };
    }
)
;