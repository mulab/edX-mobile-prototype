//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log("init() called");
};
$(document).ready(init);
$(function(){
    $('#screen').live('swiperight',function(){
        console.log("swipe right");
        $('#sidepanel').panel("open");
    });
});