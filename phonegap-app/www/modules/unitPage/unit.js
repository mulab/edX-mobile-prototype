/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-28
 * Time: 下午4:35
 * To change this template use File | Settings | File Templates.
 */
define(['jquery', 'text!modules/unitPage/unit.html','modules/unitPage/load-component'], function ($, unitHtml, loader) {
    var init = function () {

        coursePath = localStorage.getItem('coursepath');
        verticalIndex = parseInt(localStorage.getItem('verticalIndex'));
        p = $.parseJSON(localStorage.getItem('unitData'));
        //coursePath = '../../../data/2013_Spring_Tsinghua/';
        //verticalIndex = 0;
        //p = obj[3].sequentials[0];
        var content = "";
        if (p != null) {
            if (p.display_name)
                $('#title').html(p.display_name);
            else
                $('#title').html(p.url_name);
            for (var i in p.verticals) {
                var tmp = p.verticals[i];
                if (tmp.display_name == null) {
                    //tmp.display_name="Untitled";
                    tmp.display_name = tmp.components[0].type;
                }
                if (tmp.components == null)continue;
                if (tmp.components[0].type == "problem") {
                    //$('#nav_scroll_container').append(
                    content += '<a href="#" data-theme="c" data-role="button" data-iconpos="left" data-inline="true" data-icon="grid" class="horizontalButton">' + tmp.display_name + '</a>';
                }
                else {
                    //$('#nav_scroll_container').append(
                    content += '<a href="#" data-theme="c" data-role="button" data-iconpos="left" data-inline="true" data-icon="star" class="horizontalButton">' + tmp.display_name + '</a>';
                }
            }
        }
        console.log(content);
        unitHtml = unitHtml.split("<!-- nav -->").join(content);
        $('div[data-role="page"]:last').after(unitHtml);

        require(['jqm'], function () {
        });
        var $unit = $("#unit");
        $.mobile.changePage($unit, {dataUrl: $('base').attr('href')});
        {
            verticalControl = {};
            verticalControl.current = 0;
            verticalControl.start = 0;
            verticalControl.showNum = Math.floor($('#nav_scroll_holder').width() / $('.horizontalButton').width()) - 1;
            if (verticalControl.showNum <= 0)
                verticalControl.showNum = 1;
            //TODO: calculate showNum NOT according to fix width.
            //TODO: fix error: Error in event handler for 'undefined': IndexSizeError: DOM Exception 1 Error: Index or size was negative, or greater than the allowed value.
            verticalControl.unitWidth = $('.horizontalButton').width();
            /*verticalControl.buttons = $('.horizontalButton');
             verticalControl.holder = $('#nav_scroll_holder');
             verticalControl.controler = $('#nav_scroll');*/
            verticalControl.num = $('.horizontalButton').length;
            var refresh = function() {
                if(verticalControl.current==0)$('#left_button').addClass('ui-disabled');
                else if(verticalControl.current==verticalControl.num-1)$('#right_button').addClass('ui-disabled');
                else {
                    $('#left_button').removeClass('ui-disabled');
                    $('#right_button').removeClass('ui-disabled');
                }
                $('.horizontalButton').removeClass('ui-btn-active');
                $('.horizontalButton:eq('+String(verticalControl.current)+')').addClass('ui-btn-active');
                $('#nav_scroll').animate({left:String(-verticalControl.start * $('.horizontalButton').width())+'px'},200);
                ///////////////////////////////////
                var Res = '', verticaltmp = p.verticals[verticalControl.current];
                for(var i in verticaltmp.components)
                {
                    Res += '<div>'+loader.loadComponent(verticaltmp.components[i], coursePath)+'</div>';
                }
                $('#content_holder').html(Res);
                ///////////////////////////////////
            };
            var move = function (k) {
                if(k<0||k>=verticalControl.num)
                {
                    return;
                }
                verticalControl.current = k;
                if(k - verticalControl.start +1 > verticalControl.showNum){
                    verticalControl.start = k - verticalControl.showNum + 1;
                }
                if(k < verticalControl.start)
                {
                    verticalControl.start = k;
                }
                refresh();
            };
            verticalControl.turnLeft = function(){
                move(verticalControl.current-1);
            };
            verticalControl.turnRight = function(){
                move(verticalControl.current+1);
            };
            verticalControl.move = function(k){
                move(k);
            }
            verticalControl.refresh = function(k){
                refresh();
            }

            $('.horizontalButton').mouseup(function(){
                verticalControl.move($(this).index()-1); // -1 because of <script> tag
                //alert($(this).index());
            });
            $('#left_button').click(function(){verticalControl.turnLeft();});
            $('#right_button').click(function(){verticalControl.turnRight();});
            //$('div[data-role=content]').trigger('create');
            verticalControl.move(verticalIndex);
            $('#unit').on('swiperight', function(){verticalControl.turnLeft();});
            $('#unit').on('swipeleft', function(){verticalControl.turnRight();});
        }
    };
    return {
        initialize: init
    };
});