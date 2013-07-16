var ColorGroup = [[255,200,200],[200,255,200],[200,200,255]],
    highlightColor = [255,255,255], lastFocus=[0,0], defaultColor=[242,242,242], currentWeek= 0;
var totalNum = [6, 7, 8];
function makeColor(colorList)
{
    return 'rgb('+String(colorList[0])+','+String(colorList[1])+','+String(colorList[2])+')';
}
var randomColor = function(){
    return makeColor(ColorGroup[Math.floor((Math.random()*ColorGroup.length))]);
};
function setFocus(week, sub)
{
    $('#sections ul li:eq('+String(lastFocus[0])+')').css('background-color', makeColor(defaultColor));
    $('#subsections ul li:eq('+String(lastFocus[1])+')').css('background-color', makeColor(defaultColor));

    lastFocus = [week, sub];
    thisColor = $('#subsections .colorTag:eq('+String(sub)+')').css('background-color');
    $('#sections ul li:eq('+String(week)+')').css('background-color', makeColor(highlightColor));
    $('#subsections ul li:eq('+String(sub)+')').css('background-color', thisColor);
    $('#units ul li').css('background-color', thisColor);
}
function markDone(num)
{
    $('#units ul li:eq('+String(num)+')').css('opacity','0.7');
}
function clearDone(num)
{
    $('#units ul li:eq('+String(num)+')').css('opacity','1.0');
}
function markDoneTill(num)
{
    $('#units ul li:lt('+String(num)+')').css('opacity','0.7');
}
function clearDone(num)
{
    $('#units ul li:lt('+String(num)+')').css('opacity','1.0');
}
function clearDoneAll()
{
    clearDone(totalNum[2]-1);
}
function swipeleft(){
    $('.container_12').animate({left:'-38em'},500);
}
function swiperight(){
    $('.container_12').animate({left:'0'},500);
}
function readVertical()
{
    ///////////// <- Expand Verticals and Record Progress
}
$(document).ready(function(){
	$('#subsections .colorTag').each(function(index, element){
        $(element).css('background-color',randomColor());
    });
    $('#subsections ul li').click(function(e){
        setFocus(currentWeek, $(this).index());
        clearDoneAll();
    });
    $('#sections ul li').click(function(e){
        setFocus($(this).index(),0);
        currentWeek = $(this).index();
    });
    $('#units ul li').click(function(){
        readVertical($(this).index());
    });
    setFocus(1,1);
    markDone(3);
});

