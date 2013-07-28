/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-27
 * Time: 上午3:22
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', 'text!modules/dashboardPage/dashboard.html', 'course'], function ($, dashboardHtml, course) {
        var pending = false;
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
                $.mobile.changePage($("#dashboard"), {dataUrl: $('base').attr('href')});
            }

            $('#dashboard').on("pageshow", function () {
                pending = false;
            });

            $('#link1').on("click", {value: 'data/2013_Spring_Tsinghua/'}, function (event) {
                onClickHandler(event);
            });
            $('#link2').on("click", {value: 'data/Software_as_a_Service/'}, function (event) {
                onClickHandler(event);
            });
        };

        function onClickHandler(e) {
            //TODO javascript has birth defect,it's difficult to handle when click very very very fast
            //these codes are still useless
            if (!pending) {
                pending = true;
                e.preventDefault();
                e.stopImmediatePropagation();
                if(window.localStorage.getItem('raw_coursepath')!= e.data.value || $('#course').length === 0){
                    window.localStorage.setItem('raw_coursepath', e.data.value);
                    course.initialize();
                }
                //if page exist
                else{
                    $.mobile.changePage($("#course"), {dataUrl: $('base').attr('href')})
                }
            }
        }

        return {
            initialize: init
        };
    }
)
;