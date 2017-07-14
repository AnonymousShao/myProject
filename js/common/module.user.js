/**
 * 使用方法  user.privExecute({
				operateType: 'auth',   //'login','auth','conference'
				callback: function () {

				}
			});
 * @author liuyutao
 */
var user = {
	isRenZhengStatus: false,
	checkStatus: function() {
		var t = this;
		if(TempCache.getItem("userId")){
			t.callback();
			return false;
		}
		$.ajax({
			url: "/mcall/web/user/checkSession/",
			dataType: "json",
			type: "post",
			success: function(result) {
				if (result && result.responseObject.responseMessage.status) { //已登录
					t.callback();
				} else {
					user.redirectLogin();
				}
			}
		});
	},
	/**
	 * @description 判断是否登录
	 * @returns {boolean}
	 */
	checkSession: function() {
		var status;
		var t = this;
		if(TempCache.getItem("userId")){
			status = 1;
			return status;
		}
		$.ajax({
			url: "/mcall/web/user/checkSession/",
			dataType: "json",
			type: "post",
			async: false,
			success: function(result) {
				if (result && result.responseObject != null) { //已登录
					status = result.responseObject.responseMessage.status;
				} else {
					status = 0;
				}
			}
		});
		return status == 1;
	},
	/**
	 * @desc  获取登录用户的信息  获取完设置到localStorage里
	 */
	getSessionInfo: function() {
		var t = this;
		$.ajax({
			url: "/mcall/web/user/getSessionUser/",
			type: "get",
			async: false,
			dataType: "json",
			success: function(data) {
				if (data.responseObject != null) {
					TempCache.setItem("userId", data.responseObject.userId);
					TempCache.setItem("email", data.responseObject.email);
					TempCache.setItem("webSource", data.responseObject.webSource);
				} else {
					TempCache.removeItem("trueName");
					TempCache.removeItem("email");
				}
			}
		});
	},
	login: function() {
		var t = this,
			type, page, options;
		if (arguments.length > 0) {
			TempCache.setItem("UserCallback", Array.apply(this, arguments));
		}
		TempCache.setItem("fromPage", window.location.href);
		t.checkStatus();

	},
	// 获取认证信息    获取用户认证详情
	getAuthInfo: function() {
		var t = this;
		var state = null;
		$.ajax({
			url: "/mcall/web/user/getCustomerAuth/",
			type: "get",
			async: false,
			dataType: "json",
			success: function(data) {
				if (data && data.responseObject != null) {
					state = data.responseObject.state;
				}
			}
		});
		return state;
	},
	checkAllinUserAuth: function() {
		var t = this;
		t.getSessionInfo();
		var info;
		var webSource = TempCache.getCache("webSource");
		if (webSource == "website") { // 网站用户才可以
			info = t.getAuthInfo();
			if (info.customerId <= 0 || info.state == 3) {
				// 未申请  || 被拒绝
				//alert("您的认证申请正在审枋中。无法进行相关操作");
				return true;
			} else if (state == 1 || state == 2) {
				//认证已经通过，此时不允许再次认证
				window.location.href = '/';
			} else if (state == 0) {
				//已经提交申请 未审核 ，此时不允许再次认证
				//alert("你已经提交过认证，不能重复认证")
				popup("您的申请正在审核中");
			}
		} else {
			window.location.href = '/';
		}
	},
	getRenZhengInfo: function() {
		var t = this;
		var auth = customer.getData("getCustomerAuth");
		if (auth != null && !$.isEmptyObject(auth) && (auth.state == 1 || auth.state == 2)) {
			TempCache.setItem("trueName", auth.lastName + auth.firstName);
		}
		return auth;
	},
	//主方法
	privExecute: function(options) {
		var t = this;
		if (t.isRunning) {
			return;
		} else {
			t.isRunning = true;
			if (!options) {
				return;
			} else {
				t.options = options;
				if (options.operateType != "" && options.callback != null) {
					t.checkPriv();
				}
			}
		}
	},
	//	比较权限
	checkPriv: function() {
		var t = this,
			operateItem;
		if (t.options.operateType == "") {
			return;
		}
		if (t.options.operateType === "login" || t.options.operateType === "auth" || t.options.operateType === "conference") {
			t.isNeedLogin = true;
		}
		if (t.options.operateType === "auth") {
			t.isNeedRenZheng = true;
		}
		if (t.options.operateType === "conference") {
			t.isNeedLogin = true;
			t.isNeedConferenceWanShan = true;
		}

		if (t.isNeedLogin && !t.isNeedRenZheng) { //需要登录
			t.privCheckLogin();
		} else if (t.isNeedRenZheng) { //需要认证
			t.privCheckAuth();
		} else {
			t.privCheckSuccess(); // 需要登录
		}
	}, //	权限较验成功后处理
	privCheckSuccess: function() {
		var t = this;
		t.isRunning = false;

		function isEmptyObj(obj) {
			for (var key in obj) {
				return false;
			}
			return true;
		}

		if (typeof t.options != "undefined" && typeof t.options.callback != "undefined") {
			t.options.callback();
		} else {
			window.location.href = "/";
		}

	},
	privCheckLogin: function() {
		var t = this;
		t.isRunning = false;
		$.ajax({
			url: "/mcall/web/user/checkSession/",
			dataType: "json",
			type: "post",
			success: function(result) {
				if (result && result.responseObject.responseMessage.status) { //已登录
					t.options && t.options.callback();
				} else {
					user.redirectLogin();
				}
			}
		});
	},
	privCheckConference: function() {
		var t = this;
		if (t.checkSession()) {
			var auth = user.getRenZhengInfo();
			if (auth.firstName == "" || auth.lastName == "" ||
				auth.company == "" || auth.medicalTitle == "" ||
				auth.areasExpertise == "" || auth.clinicalTime == "") {
				t.redirectConferenceWanShan();
			}
		} else {
			user.redirectLogin();
		}
	},
	privCheckAuth: function() {
		var t = this;
		t.isRunning = false;
		if (t.checkSession()) {
			var auth = user.getRenZhengInfo();
			if (auth != null && !$.isEmptyObject(auth) && (auth.state == 1 || auth.state == 2)) {
				TempCache.setItem("trueName", auth.lastName + auth.firstName);
				t.options && t.options.callback();
			} else if (auth.state == "0") {
				//popup("很抱歉！我们正在加紧审核您的认证信息，请耐心等待... ");
				$("body").on("touchmove", function(e) {
					e.preventDefault();
					return false;
				})

				comm.alertBox({
					"title":"很抱歉！我们正在加紧审核您的认证信息，请耐心等待... ",
					"ensure":"知道了",
					ensureCallback:function(){
						if(document.referrer.lastIndexOf("/passport/")>-1){
							window.location.href="/";
							return false;
						}
						history.back();
					}
				});

				if (window.location.href.indexOf('/html/m/')!=-1) {
					$(".al-confirmModal").css({
						width:"30rem",
						marginLeft:"-15rem"
					});
				}
				t.options.reAuthCallback&&t.options.reAuthCallback();
				return false;
			} else if (auth.state == "3"){//认证拒绝
				comm.authFail();
				$("#now_goAuth").on("click",function(){//去认证
					TempCache.setItem("fromPage", window.location.href);
					comm.redirect("/pages/passport/toAuthNew.html?redirect=1&reAuth=1", 0);
				});
				$(".al-authGiveUp").on("click",function(e){
					if(t.options.noNeedBack){//不需要返回
						e.stopPropagation();
						$('.al-authFailBox').removeClass('show');
						$(".al-mainInner").removeClass('al-fullBlur');
					}else{//默认返回上一页
						history.back();
					}
				});
				return false;
			} else {
				//t.redirectRenZheng();
				t.redirectToRenZheng();
			}
		} else {
			//popup("您尚未登录,即将跳转至登录页");
			TempCache.setItem("needAuth", "true");
			TempCache.setItem("fromPage", window.location.href);
			/*setTimeout(function() {
				popupClose();
			}, 1500);*/
			//setTimeout(function() {
				comm.redirect("/pages/passport/login_select.html?redirect=1", 0);
			//}, 2000);
			//user.redirectLogin();
		}



	},
	needRenZhengHandler: function() {
		var href = "";
		if (user.getLoginStatus()) { // 已登录
			if (user.getRenZhengStatus()) { // 已认证
				if (!user.getWanShanStatus()) { // 未完善
					href = "/pages/passport/wanshanInfo.html?redirect=1";
				}
			} else { // 未认证
				href = "/pages/passport/toAuthNew.html?type=needAuth&redirect=1";
			}
		} else { // 未登录
			href = "/pages/passport/login_select.html?redirect=1";
		}

		if (href != "") {
			TempCache.setItem("needAuth", "true");
			TempCache.setItem("autoPlay", "true");
			TempCache.setItem("fromPage", window.location.href);
			comm.redirect(href, 0);
		}
	},
	getConferenceWanShanStatus: function() {
		var t = this;
		var auth = user.getRenZhengInfo();
		if (auth == undefined || $.isEmptyObject(auth) || auth.firstName == "" || auth.lastName == "" ||
			auth.company == "" || auth.medicalTitle == "" ||
			auth.areasExpertise == "" || auth.clinicalTime == "") {
			return false;
		} else {
			return true;
		}
	},
	needConferenceAuthHandler: function() {
		var href = "";

		if (user.getLoginStatus()) { // 已登录
			if (user.getConferenceWanShanStatus()) { // 已完善会议信息

			} else { // 未完善
				href = "/pages/passport/wanshanInfoConference.html";
			}
		} else { // 未登录
			href = "/pages/passport/login_select.html?redirect=1";
		}

		if (href != "") {
			if (window.location.href.indexOf("login_allin.html") < 0) {
				TempCache.setItem("fromPage", window.location.href);
			}
			TempCache.setItem("needConferenceAuth", "true");
			comm.redirect(href);
			return false;
		}
		return true;
	},
	/**
	 * 需认证，如未认证弹出全屏遮罩
	 */
	needRenZhengPop: function() {


		var userInfo = user.getRenZhengInfo();
		if (!user.getLoginStatus() || !user.getRenZhengStatus() || $.isEmptyObject(userInfo) || userInfo.medicalTitle == "" || userInfo.company == "" || userInfo.areasExpertise == "") { // 未登录或未认证

			var type;
			if (!user.getLoginStatus()) {
				type = 1;
				$("body").append('<div class="v3-check-renzheng" id="checkRenZhengBox">' +
					'   <div class="alpha-bg"></div>' +
					'   <div class="center-img login-type"></div>' +
					'</div>').css("overflow", "hidden");
			} else if (!user.getRenZhengStatus()) {
				type = 2;
				$("body").append('<div class="v3-check-renzheng" id="checkRenZhengBox">' +
					'   <div class="alpha-bg"></div>' +
					'   <div class="center-img "></div>' +
					'</div>');
			} else if (user.getRenZhengStatus()) {
				if (userInfo.medicalTitle == "" || userInfo.company == "" || userInfo.areasExpertise == "") {
					type = 3;
					$("body").append('<div class="v3-check-renzheng" id="checkRenZhengBox">' +
						'   <div class="alpha-bg"></div>' +
						'   <div class="center-img wanshan-type"></div>' +
						'</div>');
				}
			}
			$("#checkRenZhengBox,#checkRenZhengBox .alpha-bg,#checkRenZhengBox .center-img").height($(window).height());
			$("#checkRenZhengBox").on("vclick", function() {
				TempCache.setItem("needAuth", "true");
				TempCache.setItem("autoPlay", "true");
				TempCache.setItem("fromPage", window.location.href);

				if (type == 2) { // 已登录
					if (!user.getRenZhengStatus()) {
						comm.redirect("/pages/passport/toAuthNew.html?type=needAuth&redirect=1", 0);
					}
				} else if (type == 1) {
					comm.redirect("/pages/passport/login_select.html?redirect=1", 0);
				} else if (type == 3) {
					comm.redirect("/pages/passport/wanshanInfo.html", 0);
				}
			});

			$("body").on("vmousemove scroll", function() {
				return false;
			})
		}
	},
	getLoginStatus: function() {
		var t = this;
		var isLoginStatus = false;
		if(TempCache.getItem("userId")){
			isLoginStatus = true;
			return isLoginStatus;
		}
		$.ajax({
			url: "/mcall/web/user/checkSession/",
			dataType: "json",
			type: "post",
			async: false,
			success: function(result) {
				if (result && result.responseObject != null && result.responseObject.responseMessage.status == 1) { //已登录
					isLoginStatus = true;
				} else {
					isLoginStatus = false;
				}
			}
		});
		return isLoginStatus;
	},
	getRenZhengStatus: function() {
		var t = this;
		var isRenZhengStatus = false;
		var webUser = customer.getData("getWebUser");
		if (webUser != null && (!$.isEmptyObject(webUser)) && webUser.userId > 0) {
			TempCache.setItem("userId", webUser.userId);
			TempCache.setItem("username", webUser.username);
		} else {
			TempCache.removeItem("userId");
			TempCache.removeItem("username");
		}
		if (webUser != null && (!$.isEmptyObject(webUser)) && webUser.isAuth == 1) {
			isRenZhengStatus = true;
		}
		t.isRenZhengStatus = isRenZhengStatus;
		return isRenZhengStatus;
	},
	getWebUser: function() {
		var t = this;
		var isRenZhengStatus = false;
		var webUser = customer.getData("getWebUser");
		return webUser;
	},
	getWanShanStatus: function() {
		var t = this;
		var isWanShanStatus = false;
		var auth = customer.getData("getCustomerAuth");
		if (auth != null && (!$.isEmptyObject(auth)) && auth.medicalTitle != "" && auth.company != "" && auth.areasExpertise != "") {
			isWanShanStatus = true;
		}
		t.isWanShanStatus = isWanShanStatus;
		return isWanShanStatus;
	},
	redirectLogin: function() {
		//popup("您尚未登录,即将跳转至登录页");
		TempCache.removeItem("needAuth");
		TempCache.setItem("fromPage", window.location.href);
		//setTimeout(function() {
			comm.redirect("/pages/passport/login_select.html?redirect=1", 0);
		//}, 2000);
	},
	//跳转到登录页并记录来源页（被动)
	redirectToLogin: function() {
		TempCache.removeItem("needAuth");
		TempCache.setItem("fromPage", window.location.href);
		comm.redirect("/pages/passport/login_select.html?redirect=1", 0);
	},
	success: function(s) {
		var t = TempCache.getItem("fromPage");
		if(!t){ window.location.href= "//m.allinmd.cn/" };

		if(t.lastIndexOf("personal_")>-1||t.lastIndexOf("/sns.html")>-1){//从个人中心跳过来
			t="//m.allinmd.cn/pages/personal/personal_index.html";
		}
		if(t.lastIndexOf("message_")>-1){//从消息跳过来
			t="//m.allinmd.cn/pages/message/message_main.html";
		}
		TempCache.removeItem("fromPage");
		TempCache.removeItem("needAuth");

		if (t && typeof t != "undefined" && t != "") {
			TempCache.setItem("fromPage", "");
			TempCache.removeItem("fromPage");
		} else {
			t = "/";
			if (!s || s == "") {
				s = "登录成功，即将返回首页";
			}

		}
		if(s){
			popup(s);
		}
		setTimeout(function() {
			window.location.href = t;
		}, 1000);
	},
	registSuccess: function() {
		var t;
		var needConferenceAuth = TempCache.getItem("needConferenceAuth");
		var flag = comm.getpara().flag;
		if (needConferenceAuth != undefined && needConferenceAuth == "true") {
			s = "注册成功，即将跳转至完善资料页";
			t = "/pages/passport/wanshanInfoConference.html?isFollow=1";
		} else {
			s = "注册成功，即将跳转至认证页";
			t = "/pages/passport/toAuthNew.html?isFollow=1&flag=" + flag;
		}
		popup(s);
		setTimeout(function() {
			window.location.href = t;
		}, 3000);
	},
	redirectRenZheng: function() {
		popup("您尚未通过医师认证");
		TempCache.setItem("fromPage", window.location.href);
		setTimeout(function() {
			comm.redirect("/pages/passport/toAuthNew.html?redirect=1", 0);
		}, 3000);
	},
	//直接跳转至认证
	redirectToRenZheng: function() {
		TempCache.setItem("fromPage", window.location.href);
		comm.redirect("/pages/passport/toAuthNew.html?redirect=1", 0);
	},
	redirectConferenceWanShan: function() {
		//popup("您尚未完善资料");
		if (window.location.href.indexOf("login_allin.html") < 0) {
			TempCache.setItem("fromPage", window.location.href);
		}
		TempCache.setItem("needConferenceAuth", true);
		setTimeout(function() {
			comm.redirect("/pages/passport/wanshanInfoConference.html?redirect=1", 0);
		}, 3000);
	},
	privLogin: function(isAuth) {
		if (!this.getLoginStatus()) {
			TempCache.setItem("fromPage", window.location.href);
			if (isAuth != undefined && isAuth) {
				TempCache.setItem("needAuth", "true");
			}
			comm.redirect("/pages/passport/login_select.html?redirect=1", 0);
		}
	}
};

user.getLoginStatus();
user.getRenZhengStatus();
