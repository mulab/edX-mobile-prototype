$(document).ready(function(){
	//field define
	var course_pic = $('.course-pic');
	var course_title_num = $('.course-title-num');
	var course_title_name = $('.course-title-name');
	var course_teacher = $('.course-teacher');
	var back_home = $('.back-home');
	var course_title_num_text;
	var course_title_name_text;
	var img_path;
	//field define end

	//method define
	var loadTitle = function(rootpath){
		var rootDom = loadXmlFile(rootpath+"course.xml");
		var courseDom = rootDom.getElementsByTagName("course");
		course_title_num_text = courseDom.attributes["course"].nodeValue;
		var url_name = courseDom.attributes["url_name"].nodeValue;
		courseDom = null;// free 
		rootDom = null;
		rootDom = loadXmlFile(rootpath+"course/"+url_name);
		courseDom = rootDom.getElementsByTagName("course");
		course_title_name_text = courseDom.attributes["display_name"];
	}
	var loadCourseImage = function(rootpath){
		img_path = rootpath + "static/images/course_image.png";
	}
	var loadTeacher = function(rootpath){
		var 
	}
});