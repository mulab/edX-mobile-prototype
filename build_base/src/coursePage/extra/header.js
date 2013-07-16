var initHeader = function(bodyInner){
	//field define
	var course_pic = bodyInner.find('.course-pic');
	var course_title_num = bodyInner.find('.course-title-num');
	var course_title_name = bodyInner.find('.course-title-name');
	var course_teacher = bodyInner.find('.course-teacher');
	var back_home = bodyInner.find('.back-home');
	var course_title_num_text;
	var course_title_name_text;
	var course_img_path = "static/images/course_image.jpg";
	var pro_img_path = "static/images/"
	var pro_img_json_path = "static/images/pro.json";
	var pro_img_list = [];
	var root_path;
	var debug = false;
	var storage = window.localStorage;
	//field define end

	//method define
	var loadTitle = function(coursepath){
		var rootDom = loadXmlFile(coursepath+"course.xml");
		var courseDom = rootDom.getElementsByTagName("course")[0];
		course_title_num_text = courseDom.attributes["course"].nodeValue;
		var url_name = courseDom.attributes["url_name"].nodeValue;
		courseDom = null;// free 
		rootDom = null;
		rootDom = loadXmlFile(coursepath+"course/"+url_name+".xml");
		courseDom = rootDom.getElementsByTagName("course")[0];
		course_title_name_text = courseDom.attributes["display_name"].nodeValue;
	}
	var loadCourseImage = function(coursepath){
		course_img_path = coursepath + course_img_path;
	}
	var loadTeacher = function(coursepath) {
		pro_img_json_path = coursepath + pro_img_json_path;
		$.ajaxSetup({
			async: false
		});
		$.getJSON(pro_img_json_path,function(json){
			pro_img_list = json["url"];
			for(var i = 0;i<pro_img_list.length;i++){
				pro_img_list[i] = coursepath + pro_img_path + pro_img_list[i];
			}
		})
		$.ajaxSetup({
			async: true
		});
	}
	var render = function(){
		course_pic.append("<img src='"+course_img_path+"'/>");
		course_title_num.text(course_title_num_text);
		course_title_name.text(course_title_name_text);
		for(var i = 0;i<pro_img_list.length;i++){
			course_teacher.append("<img src='"+pro_img_list[i]+"'/>");
		}
	}
	var getcoursepath = function(){
		if(storage.hasOwnProperty("raw_coursepath")){
            root_path = storage.getItem("raw_coursepath");
        }
        else root_path = "../data/2013_Spring_Tsinghua/";
        debug = false;	
	}
	//main
	getcoursepath();
	if(debug)alert("debug mode");
	loadTitle(root_path);
	loadTeacher(root_path);
	loadCourseImage(root_path);
	render();
}