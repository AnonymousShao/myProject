/**
 * 功能描述：唯医联合登录 获取资源登录
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by ZhangHongda on 2016/12/02.
 */

var AllinAuthority = function() {
    var that = this;
    this.XHRList = {
    };
};

AllinAuthority.prototype = {
	isValid:{
		bidAllinCodeKey:0,
		YiPhone:true,
		YiCode:true,
		change:false,
		bindPhoneNum:0,
		bindSendNum:0,
		customerId:0,
		allinUrl:0,
	},
	path:{
		allinLogin:"//www.yi-ding.net.cn/call/yiding/web/user/userLogin/",//唯医联合登录
		isExist:"//www.yi-ding.net.cn/call/yiding/web/user/isExist/",//账号是否存在
		bindAllin:"//www.yi-ding.net.cn/call/yiding/web/user/bindAllin/",//绑定医鼎
		sendCode:"//www.yi-ding.net.cn/call/yiding/customer/send/code/create/",//发送验证码
		checkCode:"//www.yi-ding.net.cn/call/yiding/customer/send/code/update/",//校验验证码
	},
    init: function() {
    	var t = this;
		loginAbout.init({
			loginPass: function () {
				location.reload();
			}, registerPass: function () {
				location.reload();
			}
		});
    	t.clearNum($(".ev-bindYiNum"));
    	t.bindyiding();
    	t.createNum();//创建手机号
		t.allinIsBind();
    	t.checkYi();
    	t.changePhone();//更换手机号
		t.getAccount();//获取用户信息
		t.ret();//返回上一步
    },
    //获取数据
	ajaxFn:function(opt){
		$.ajax({
			type:opt.type,
			url:opt.url,
			data: {paramJson: $.toJSON(opt.param)},
			async:opt.async, 
			dataType:"json",
			jsonp:"callback",
			success:function(data){
				comm.loading.hide(); 
				if(data){
					opt.fn(data);
				}
			},
			error:function(data){
				//console.log("Error...");
			},
			beforeSend:function(){
				comm.loading.show();
			},
		});
	},
	// 填写账号名
	getAccount:function(){
		if(comm.getpara().mobile || comm.getpara().customerId){
			$(".yd-authAccount").show().text("使用唯医账号(" + comm.getpara().mobile + ")登录");
		}else{
			return;
		}
	},
    toast:function(content,time1,time2){
		setTimeout(function(){
			$(".errorTip").fadeIn();
			$(".errorTip span").text(content);
			setTimeout(function(){
				$(".errorTip").fadeOut();
				setTimeout(function () {
					$(".errorTip").removeClass("errorTipLong");
				},1000);
			},time2);
		},time1);
	},
	//清除账号
	clearNum:function(dom){
		dom.on("focus",function(){
			var txt = $(this).val();
			if(txt){
				$(".phone").css("display","inline-block");
				$(".phone .close").on("click",function(){
					 dom.attr("value","");
					 $(".phone").css("display","none");
					 $(".ev-bindYiLogin").removeClass("activation");//唯医绑定
				});
			}else{
				$(this).on("keyup",function(){
					if($(this).val()){
						$(".phone").css("display","inline-block");
						$(".phone .close").on("click",function(){
							 dom.attr("value","");
							 $(".phone").css("display","none");
							 $(".ev-bindYiLogin").removeClass("activation");//唯医绑定
						});
					}else{
						 $(".phone").css("display","none");
					}
				});
			}
		});
		dom.on("blur",function(){
			function isClick(){
				var isClick = false;
				$(".phone .close").on("click",function(){
					isClick = true;
					return isClick;
				})
				if(isClick){
					dom.attr("value","");
					$(".phone").css("display","none");
					$(".ev-bindYiLogin").removeClass("activation");//唯医绑定
				}else{
					$(".phone").css("display","none");
				}
			}
			isClick();
		})
	},
	//返回上一步
	ret:function(){
		var t = this;
		$(".ev-createReturn").on("click",function(){
			window.location.href = "//www.allinmd.cn/pages/singlePage/user/yiding_authority.html";
		});
        $(".ev-bindReturn").on("click",function(){
            $(".ev-createBind").show();
            $(".ev-bindAllin").hide();
        })
	},
    sendCode:function(dom,phone,typeId){
		var t = this;
		var time = 60;
		dom.off("click").on("click",function(){
			var phoneNum = phone.val();
			t.isValid.bindSendNum = phoneNum;
			if(phoneNum){
				t.ajaxFn({
					url: t.path.sendCode,
	                async:false,
	                param:{
	                	account: phoneNum,
						typeId:typeId,	//表示快速登录
						codeLength:4,
						createPasswd:1,//生成随机验证码
	                },
	                type:"post",
	                fn: function(data) {
						var codeNum=data.responseObject.responseData.codeNum;	//每日获取的验证码次数
						if(codeNum||codeNum==0){
							t.isValid.bidAllinCodeKey=data.responseObject.responsePk;
							var timer = setInterval(function () {
								time--;
								$(".validate").text(time + "s后重新获取");
								$(".validate").unbind("click");
								if (time == 0) {
									clearTimeout(timer);
									$(".validate").text("点击获取验证码");
									t.sendCode(dom,phone,typeId);
								}
								$(".reg-experiencePo").off("click").on("click",function(){
									clearTimeout(timer);
									$(".validate").text("点击获取验证码");
									t.sendCode(dom,phone,typeId);
								})
								$(".log-experiencePo").off("click").on("click",function(){
									clearTimeout(timer);
									$(".validate").text("点击获取验证码");
									t.sendCode(dom,phone,typeId);
								})
								$(".ev-createReturn").on("click",function(){
									clearTimeout(timer);
									$(".validate").text("点击获取验证码");
									t.sendCode(dom,phone,typeId);
									window.location.href = "//www.allinmd.cn/pages/singlePage/user/yiding_authority.html";
								})
							}, 1000);
						}else{
							t.toast("每日最多获取3次验证码,请明天再试", 300, 2000);
						}
					}
				});
			}else{
				t.toast("请填写正确的手机号", 300, 1500);
			}
		});
	},
	/*
	 * 授权后执行绑定判断
	 */
	allinIsBind:function(){
		var t = this;
		commLog.createBrowse(12, "登录注册-唯医登录-账号绑定");
		t.ajaxFn({
			url: t.path.allinLogin,
			type:"post",
            param:{
            	authorizationFlag:1,
            	customerId:comm.getpara().customerId,
            	loginType:"allin",
            }, 
            fn: function(data) {
            	var code = data.responseObject.responseCode;
            	var status = data.responseObject.responseStatus;
            	if(status){
            		switch (code) {
	              	//表示创建账号登录成功
	                  case '1A0001'://用该手机号创建
						  $(".loginCont").show();
	                	 $(".ev-createBind").css("display","block");
	                	 $(".ev-bindAllin").css("display","none");
	                	 $(".createAccountTxt").text("使用"+comm.getpara().mobile+"创建医鼎账号");
	                	 t.createNum();//调用创建账号
	                	 break;
						case '0A0004':
						  if(data.responseObject.responseData.customerUnite.mobile!=''){
							  if(localStorage.getItem("phoneNum")){
								  var histor = localStorage.getItem("phoneNum").split(",");
								  for (var i = 0;i<histor.length;i++) {
									  if(data.responseObject.responseData.customerUnite.mobile!=histor[i]){
										  localStorage.setItem("phoneNum",data.responseObject.responseData.customerUnite.mobile+','+histor);
									  }
								  }
							  }else{
								  localStorage.setItem("phoneNum",data.responseObject.responseData.customerUnite.mobile);
							  }
						  }else{
							  if(localStorage.getItem("phoneNum")){
								  var histor = localStorage.getItem("phoneNum").split(",");
								  for (var i = 0;i<histor.length;i++) {
									  if(comm.getpara().mobile!=histor[i]){
										  localStorage.setItem("phoneNum",comm.getpara().mobile+','+histor);
									  }
								  }
							  }else{
								  localStorage.setItem("phoneNum",comm.getpara().mobile);
							  }
						  }

						  localStorage.setItem("userState","true");
							localStorage.setItem("userId",comm.getpara().customerId);
							loginAbout.changeHead();
							window.location.href=localStorage.getItem("allinUrl");
	                	  break;
	                  case '1A0002':
						  $(".loginCont").show();
	                	  $(".ev-bindAllin").css("display","block");
	                	  $(".ev-createBind").css("display","none"); 
	                	  break;
	            	}
            	}else{
					if(code=='0B0008'){
						$(".ev-createBind").css("display","none");
						$(".loginCont").show();
						comm.alertBox({
							"mTitle":"账号已经被冻结",
							"title":"请更换账号进行登录",
							"ensure":"好的",
							"ensureCallback":function(){
								window.location.href=localStorage.getItem("allinUrl");
							},
						});
					}
				}
            }
		});
	},
    /*
     * 创建医鼎账号部分逻辑
     */
    //创建账号
    createNum:function(){
    	var t = this;
    	/*
		 *点击确认创建
		 *传参数
		 */
    	$(".ev-createAccount").off("click").on("click",function(){
			commLog.createBrowse(12, "登录注册-唯医登录-账号绑定");
			commLog.creatEvent({"id":156,"url":window.location.href,"keyword":"唯医联合登录，创建账号登录"});
    		t.ajaxFn({
				url: t.path.allinLogin,
				type:"post",
	            async:false,
	            param:{
	            	isCreateMobile:1,
	            	authorizationFlag:1,
	            	customerId:comm.getpara().customerId,
	            	loginType:"allin",
	            },
	            fn: function(data) {
	            	 var status = data.responseObject.responseStatus;
	            	 var code = data.responseObject.responseCode;
	            	 if (status) {//表示不存在
	                     switch (code) {
	                     	//表示创建账号登录成功
	                         case '0A0004':
								 if(localStorage.getItem("phoneNum")){
									 var histor = localStorage.getItem("phoneNum").split(",");
									 for (var i = 0;i<histor.length;i++) {
										 if(comm.getpara().mobile!=histor[i]){
											 localStorage.setItem("phoneNum",comm.getpara().mobile+','+histor);
										 }
									 }
								 }else{
									 localStorage.setItem("phoneNum",comm.getpara().mobile);
								 }

								 localStorage.setItem("userState","true");
								 localStorage.setItem("userId",comm.getpara().customerId);
								 loginAbout.changeHead();
								 window.location.href=localStorage.getItem("allinUrl");
								 loginAbout.changeHead();
								 localStorage.setItem("allLogin",1);
	                             break;
	                     }
	                 } else {
						 $(".errorTip").addClass("errorTipLong");
						 t.toast("绑定失败，账号已经绑定了其他的唯医账号(可解除已绑定唯医或更换手机号)",600,2000);
	                 }
	            }
	      	});
    	});
    },
    //用户选择更换手机号时
    changePhone:function(){
    	var t = this;
    	$(".ev-changeSigns").off("click").on("click",function(){
			commLog.creatEvent({"id":157,"url":window.location.href,"keyword":"唯医联合登录，更换手机号点击"});
    		$(".ev-bindAllin").css("display","block"); 
    		$(".ev-createBind").css("display","none");
			t.isValid.change = true;
    	});
		t.sendCode($(".ev-bindValidate"),$(".ev-bindYiNum"),2);
    },
    //当键盘输入数据时判断是否可以激活按钮
    checkYiPhone:function(){
    	var t = this;
		t.isValid.YiPhone = true;
		var phone = $(".ev-bindYiNum");
		t.isValid.bindPhoneNum = phone.val();
		var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
		var isPhone = phoneReg.test(phone.val());
		if(isPhone==false){	
			t.isValid.YiPhone = false;
		}
    },
    //失去焦点时走入逻辑
    checkYiPhone2:function(){
    	var t = this;
		t.isValid.YiPhone = true;
		var phone = $(".ev-bindYiNum");
		t.isValid.bindPhoneNum = phone.val();
		var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
		var isPhone = phoneReg.test(phone.val());
		if(isPhone==false){	
			t.toast("请填写正确手机号", 300,1500);
			t.isValid.YiPhone = false;
		}
    },
    //检查验证码
    checkYiCode:function(){
    	var t = this;
    	t.isValid.YiCode = true;
		if($(".ev-bindYiCode").val()==""){
			t.isValid.YiCode = false;
		}
    },
    checkYiCode2:function(){
    	var t = this;
    	t.isValid.YiCode = true;
		if($(".ev-bindYiCode").val()==""){
			t.toast("验证码不能为空", 300,1500);
			t.isValid.YiCode = false;
		}
    },
    checkYiActive:function(){
    	var t = this;
    	var phone = $(".ev-bindYiNum").val();
    	var code = $(".ev-bindYiCode").val();
    	if(phone&&code){
    		if(t.isValid.YiCode&&t.isValid.YiPhone){
    			$(".ev-bindYiLogin").addClass("activation");
    			t.bidYiLogin();
    		}else{
    			$(".ev-bindYiLogin").removeClass("activation");
				$(".ev-bindYiLogin").unbind("click");
    		}
    	}
    },
    checkYi:function(){
    	var t = this;
    	$(".ev-bindYiNum").on("blur",function(){
    		t.checkYiPhone2();
    		t.checkYiActive();
    	});
    	$(".ev-bindYiCode").on("blur",function(){
    		t.checkYiCode2();
    		t.checkYiActive();
    	});
    	$(".ev-bindYiNum").on("keyup",function(){
    		t.checkYiPhone();
    		t.checkYiActive();
    	});
    	$(".ev-bindYiCode").on("keyup",function(){
    		t.checkYiCode();
    		t.checkYiActive();
    	});
    },
    bidYiLogin:function(){

    	var t = this;
    	var phone = $(".ev-bindYiNum").val();
    	$(".ev-bindYiLogin").off("click").on("click",function(){
			commLog.createBrowse(12, "登录注册-唯医登录-账号绑定");
			commLog.creatEvent({"id":158,"url":window.location.href,"keyword":"唯医联合登录，更换手机号的登录提交"});
    		if($(this).is(".activation")){
    			if(t.isValid.bindPhoneNum!=t.isValid.bindSendNum){
    				t.toast("验证码不正确", 600, 1500);
    			}else{
    				/*
		    		 * 点击登录时首先验证验证码
		    		 */
					t.ajaxFn({
						url: t.path.allinLogin,
						type:"post",
						async:false,
						param:{
							bindMobile:phone,
							isCreateMobile:2,
							authorizationFlag:1,
							customerId:comm.getpara().customerId,
							isCreateCode:"",//是否输入验证码，默认输入验证码
							loginType:"allin",
						},
						fn: function(data) {
							var status = data.responseObject.responseStatus;
							var code = data.responseObject.responseCode;
							if (status) {//表示不存在
								switch (code) {
									//表示进入输入验证码页面
									case '1A0003':
										t.ajaxFn({
											url: t.path.checkCode,
											type:"post",
											async:false,
											param:{
												validCode:$(".ev-bindYiCode").val(),
												id:t.isValid.bidAllinCodeKey,
											},
											fn: function(data) {
												var status = data.responseObject.responseStatus;
												var code = data.responseObject.responseCode;
												if(status==false){ //表示验证码验证失败
													if(code=='1A0002'){
														t.toast("验证码错误,请重新获取", 300,1500);
													}else if(code=='1A0001'){
														t.toast("验证码已经失效,请重新获取", 300,1500);
													}
												}else{//验证码正确
													t.ajaxFn({
														url: t.path.allinLogin,
														type:"post",
														async:false,
														param:{
															bindMobile:phone,
															isCreateMobile:4,
															authorizationFlag:1,
															isCreateCode:1,
															customerId:comm.getpara().customerId,
															loginType:"allin",
														},
														fn: function(data) {
															var status = data.responseObject.responseStatus;
															var code = data.responseObject.responseCode;
															if (status) {//表示不存在
																switch (code) {
																	//表示进入输入验证码页面
																	case '0A0004':
																		//将验证码置为无效
																		t.ajaxFn({
																			url: t.path.checkCode,
																			type: "post",
																			async: false,
																			param: {
																				validCode: code,
																				id: t.isValid.fidcodeKey,
																				isValid:0,
																			},
																			fn: function (data) {
																				//console.log("已经将密码置为无效");
																			}
																		});
																		localStorage.setItem("userState","true");
																		if(localStorage.getItem("phoneNum")){
																			var histor = localStorage.getItem("phoneNum").split(",");
																			for (var i = 0;i<histor.length;i++) {
																				if($(".ev-bindYiNum").val()!=histor[i]){
																					localStorage.setItem("phoneNum",$(".ev-bindYiNum").val()+','+histor);
																				}
																			}
																		}else{
																			localStorage.setItem("phoneNum",$(".ev-bindYiNum").val());
																		}
																		localStorage.setItem("userId",data.responseObject.responsePk);
																		loginAbout.changeHead();
																		window.location.href=localStorage.getItem("allinUrl");
																		localStorage.setItem("allLogin",1);
																		break;
																}
															}
														}
													});
												}
											}
										});
										break;
								}
							} else {
								switch (code) {
									case '0A1006':
										$(".errorTip").addClass("errorTipLong");
										t.toast("绑定失败，账号已经绑定了其他的唯医账号(可解除已绑定唯医或更换手机号)",600,4000);
										break;
								}
							}
						}
					});

    			}
    			
    		}
    	});
    },
    bindyiding:function(){
    	var t = this;
    	$(".ev-bindYiNum").on("keyup",function(){
    		$(".phone").css("display","inline-block");
    	});
    	t.clearNum($(".ev-bindYiNum"));
    },

};

var allinAuthority = new AllinAuthority();

allinAuthority.init();
