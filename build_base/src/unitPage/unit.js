var verticalControl = {}, p, coursePath = "../../../data/2013_Spring_Tsinghua";
$(document).ready(function () {
    verticalControl.current = 0;
    verticalControl.start = 0;
    verticalControl.showNum = Math.floor($('#nav_scroll_holder').width() / $('.horizontalButton').width());
    verticalControl.unitWidth = $('.horizontalButton').width();
    /*verticalControl.buttons = $('.horizontalButton');
     verticalControl.holder = $('#nav_scroll_holder');
     verticalControl.controler = $('#nav_scroll');*/
    verticalControl.num = $('.horizontalButton').length;
    var refresh = function () {
        if (verticalControl.current == 0)$('#left_button').addClass('ui-disabled');
        else if (verticalControl.current == verticalControl.num - 1)$('#right_button').addClass('ui-disabled');
        else {
            $('#left_button').removeClass('ui-disabled');
            $('#right_button').removeClass('ui-disabled');
        }
        $('.horizontalButton').removeClass('ui-btn-active');
        $('.horizontalButton:eq(' + String(verticalControl.current) + ')').addClass('ui-btn-active');
        $('#nav_scroll').css('left', String(-verticalControl.start * $('.horizontalButton').width()) + 'px');
        ///////////////////////////////////
        var Res = '', verticaltmp = p.verticals[verticalControl.current];
        for (var i in verticaltmp.components) {
            Res += verticaltmp.components[i].url_name;
        }
        $('#content_holder').html('');
        ///////////////////////////////////
    };
    var move = function (k) {
        if (k < 0 || k >= verticalControl.num) {
            return;
        }
        verticalControl.current = k;
        if (k - verticalControl.start + 1 > verticalControl.showNum) {
            verticalControl.start = k - verticalControl.showNum + 1;
        }
        if (k < verticalControl.start) {
            verticalControl.start = k;
        }
        refresh();
    };
    verticalControl.turnLeft = function () {
        move(verticalControl.current - 1);
    };
    verticalControl.turnRight = function () {
        move(verticalControl.current + 1);
    };
    verticalControl.move = function (k) {
        move(k);
    }
    verticalControl.refresh = function (k) {
        refresh();
    }

    $('.horizontalButton').mouseup(function () {
        verticalControl.move($(this).index());
        //alert($(this).index());
    });
    $('#left_button').click(function () {
        verticalControl.turnLeft();
    });
    $('#right_button').click(function () {
        verticalControl.turnRight();
    });
    //p = $.parseJSON(localStorage.getItem('unitData'));
    p = obj[0].sequentials[0];
    if (p != null) {
        if (p.display_name)
            $('#title').html(document.title = p.display_name);
        else
            $('#title').html(document.title = p.url_name);
        for (var i in p.verticals) {
            var tmp = p.verticals[i];
            if (tmp.components == null)continue;
            if (tmp.components[0].type == "problem") {
                $('#nav_scroll_container').append(
                    '<a href="#" data-theme="c" data-role="button" data-iconpos="left" data-inline="true" data-icon="grid" class="horizontalButton ui-btn-active">' + tmp.display_name + '</a>'
                );
                $('.nav_scroll_container').trigger("create");
            }
            else {
                $('#nav_scroll_container').append(
                    '<a href="#" data-theme="c" data-role="button" data-iconpos="left" data-inline="true" data-icon="star" class="horizontalButton ui-btn-active">' + tmp.display_name + '</a>'
                );
                $('.nav_scroll_container').trigger("create");
            }
        }

    }
    verticalControl.refresh();
});