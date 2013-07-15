var verticalControl = {};
$(document).ready(function(){
    verticalControl.current = 0;
        verticalControl.start = 0;
        verticalControl.showNum = Math.floor($('#nav_scroll_holder').width() / $('.horizontalButton').width());
        verticalControl.unitWidth = $('.horizontalButton').width();
        /*verticalControl.buttons = $('.horizontalButton');
        verticalControl.holder = $('#nav_scroll_holder');
        verticalControl.controler = $('#nav_scroll');*/
        verticalControl.num = $('.horizontalButton').length;
        var refresh = function() {
            $('.horizontalButton').removeClass('ui-btn-active');
            $('.horizontalButton:eq('+String(verticalControl.current)+')').addClass('ui-btn-active');
            $('#nav_scroll').css('left',String(-verticalControl.start * $('.horizontalButton').width())+'px');
        };
        var move = function (k) {
            if(k<0||k>=verticalControl.num)return;
            verticalControl.current = k;
            if(k - verticalControl.start +1 > verticalControl.showNum){
                verticalControl.start = k - verticalControl.showNum + 1;
            }
            if(k<verticalControl.start)
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
        verticalControl.move($(this).index());
        //alert($(this).index());
    });
    $('#left_button').click(function(){verticalControl.turnLeft();});
    $('#right_button').click(function(){verticalControl.turnRight();});
    p = $.parseJSON(localStorage.getItem('unitData'));
    if(p!=null)
    {
        
    }
});