var Log = {};
var LogPageId = [{id: 1, desc: "浏览首页"}, {id: 2, desc: "浏览视频应用页"}, {id: 3, desc: "浏览文库应用页"}, {
	id: 4,
	desc: "浏览视频内容页"
}, {id: 5, desc: "浏览文库内容页"}, {id: 6, desc: "浏览个人主页"}, {id: 7, desc: "浏览个人首页"}, {id: 8, desc: "浏览个人资料页"}, {
	id: 9,
	desc: "浏览话题内容页"
}, {id: 10, desc: "浏览病例内容页"}];
/*
 window.onload=Log.createBrowse(1,"首页"); //	浏览日志
 window.onload=Log.createBrowse(2,"视频应用页"); //	浏览日志
 window.onload=Log.createBrowse(3,"文库应用页"); //	浏览日志
 window.onload=Log.createBrowse(4,"视频内容页"); //	浏览日志
 window.onload=Log.createBrowse(5,"文库内容页"); //	浏览日志
 window.onload=Log.createBrowse(6,"个人主页(个人中心)"); //	浏览日志
 window.onload=Log.createBrowse(7,"个人首页"); //	浏览日志
 window.onload=Log.createBrowse(8,"个人资料页"); //	浏览日志
 window.onload=Log.createBrowse(9,"话题内容页"); //	浏览日志
 window.onload=Log.createBrowse(10,"病例内容页"); //	浏览日志
 window.onload=Log.createBrowse(11,"会场页面"); //	浏览日志
 window.onload=Log.createBrowse(17, "视频列表页面"); //	浏览日志
 window.onload=Log.createBrowse(18, "文库列表页面"); //	浏览日志
 window.onload=Log.createBrowse(30,"医师频道页"); //	浏览日志
 window.onload=Log.createBrowse(31,"医师列表页"); //	浏览日志
 window.onload=Log.createBrowse(32,"搜索页"); //	浏览日志
 */

Log.urlList = {
	createBrowse: "/mcall/log/customer/browse/createBrowse/",	// 创建浏览记录
	updateLeave: "/mcall/log/customer/browse/updateLeave/"	// 更新浏览记录－离开页面时间
};
Log.logId = "";
Log.isClose = false;
Log.execute = function (funcName, paramJson) {
	var t = Log;
	var url = t.urlList[funcName];
	var responseData = null;
	var param = {};
	if (paramJson && paramJson != "") {
		param.paramJson = $.toJSON(paramJson);
	} else {
		//param.paramJson= "{}";
	}
	$.ajax({
		type: 'POST',
		url: url,
		data: param,
		dataType: "json",
		async: true,//(paramJson.async == true) ? true : false,
		timeout: 10000,
		success: function callback(rep) {
			if (rep && rep.responseObject) {
				responseData = rep.responseObject;
			} else {
				responseData = rep;
			}
			if (responseData)
				Log.logId = responseData.responsePk
		},
		error: function () {
		}
	});

	return responseData;
}

Log.getCookie = function (Name) {
	var cookieName = encodeURIComponent(Name) + "=",  //注cookie的名和值都是经过URL编码的,所有这里要用函数编码
	returnvalue = "",
	cookieStart = document.cookie.indexOf(cookieName),
	cookieEnd = null;
	if (cookieStart > -1) {
		cookieEnd = document.cookie.indexOf(";", cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		returnvalue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));  //对应的解码
	}
	return returnvalue;
}

Log.getPage = function (id) {
	var len = LogPageId.length;
	var page = null;
	for (var i = 0; i < len; i++) {
		var pageObj = LogPageId[i];
		if (pageObj != null && pageObj.id != null && pageObj.id == id) {
			page = pageObj;
		}
	}
	return page;
}

/**
 * 浏览记录
 * browseType:1-主页，2-视频应用页,3-文库应用页,4-视频内容页,5-文库内容页,6-个人主页,7-个人首页,8个人资料页
 */
Log.createBrowse = function (browseType, opDesc, url) {
	var t = Log;
	var broseUrl;
	if (url != undefined) {
		broseUrl = url;
	} else {
		broseUrl = window.location.href.substr(0, 250);
	}

	var param = {browseUrl: broseUrl, browseType: browseType, opDesc: opDesc};
	var openPage = t.getCookie("openPage");
	if (openPage == null || openPage == "") {
		t.execute("createBrowse", param);
		var exp = new Date();
		exp.setTime(exp.getTime() + 20 * 1000);
		document.cookie = "openPage=on;expires=" + exp.toGMTString();
	}

}

/**
 * 离开页面记录
 */
Log.updateLeave = function () {
	if (Log.logId && Log.logId != "") {
		var param = {id: Log.logId, async: false};
		Log.execute("updateLeave", param);
		Log.logId = "";
	}
};

window.onbeforeunload = function (evt) {
	Log.updateLeave();
};

/*
 window.onload=function(evt){
 if(getCookie("openPage")=="" && pageId !="" ){
 var page=Log.getPage(pageId);
 if(page!=null && page.id!=null && page.id!=""){
 Log.createBrowse(page.id,page.desc); //	浏览日志
 document.cookie="openPage=on;"
 pageId="";
 }
 }

 }
 */