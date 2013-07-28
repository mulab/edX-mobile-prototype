/**
 * Created with JetBrains WebStorm.
 * User: cg
 * Date: 13-7-27
 * Time: 上午2:51
 * To change this template use File | Settings | File Templates.
 */

require.config({
    baseUrl:'./',
    paths:{
        data:'data',
        plugin:'js/plugin',
        jquery:'js/jquery-1.9.1',
        jqm:'js/jquery.mobile-1.3.1',
        util:'js/util',
        text:'js/text',
        dashboard:'modules/dashboardPage/dashboard',
        course:'modules/coursePage/course',
        unit:'modules/unitPage/unit'
    }
});
require(['jquery','dashboard'],function($,dashboard){
    var $body = $('body');
//    $body.html(dashboardHtml);
    dashboard.initialize($body);
});