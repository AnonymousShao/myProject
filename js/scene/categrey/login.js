/**
 * 功能描述： 首页登录模块 
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by ZhangHongDa on 2016/11/21.
 *
 */
	var loginFn={
		isValid:{
			phone:true,pass:true,code:true,quiPhone:true,quiCode:true,fidPhone:true,fidCode:true,bidWeiPhone:true,bidWeiCode:true,
			restPass:true,restPass2:true,weiBtnReg:false,caosPhone:true,caosPas:true,caosNum:true,caosCode:true,
			fidcodeKey:0,//找回密码的主键id
			fidCustomerId:0,//找回密码的customerId
			quicodeKey:0,//快速登录的主键id
			quiCustomerId:0,//快速登录的customerId
			quiValidCode:0,
			quiCrePass:0,//快速登录的随机密码
			bidValidCode:0,//绑定微信验证码
			bidcodeKey:0,//绑定微信主键id
			bidWeiPass:0,
			userId:0,//保存userId
			logCliNum:0,
			fidPhoneNum:0,//找回密码时用户输入的账号
    		fidSendCodeNum:0,//找回发送验证码的账号
    		quiPhoneNum:0,//快速登录用户输入的账号
    		quiSendCodeNum:0,//快速登录发送验证码的账号
			regcodeKey:0,
			bidWeiNum:0,
			sendBinWei:0,
			weiUrl:1,
			caosNum:0,//caos绑定的手机号
			bidCaosCodeKey:0,//绑定caos主键id
			bidCaosPhone:0,//caos登录输入的手机号
			bidCaosSend:0,//caos发送验证码的手机号
			caosPass:0,//在登录第二个接口createUserCaosBind传的pass值
			caosCusId:0,
			caosCodeKey:0//验证码
		},
		path:{
			isExist:"//www.yi-ding.net.cn/call/yiding/web/user/isExist/",//判断账号是否存在
			login:"//www.yi-ding.net.cn/call/passport/securitycheck",//点击登录
			sendCode:"//www.yi-ding.net.cn/call/yiding/customer/send/code/create/",//发送验证码
			checkCode:"//www.yi-ding.net.cn/call/yiding/customer/send/code/update/",//校验验证码
			updataPass:"//www.yi-ding.net.cn/call/yiding/web/user/update_passwd/",//修改密码
			mobLogin:"//www.yi-ding.net.cn/call/yiding/web/user/userLogin/",
			weixinBind:"//www.yi-ding.net.cn/call/yiding/interact/loginBind/",
			userId:"//www.yi-ding.net.cn/call/yiding/web/user/getWebUser/",//获取用户信息
			islogin:"//www.yi-ding.net.cn/call/yiding/web/user/checkSession/",//判断是否登录
			allinLogin:"//www.yi-ding.net.cn/call/yiding/web/user/bindAllin/",
			register:"//www.yi-ding.net.cn/call/yiding/web/user/userRegist/",
		},
		init:function(fn){
			var t = this;
			t.objFn = fn;
			t.clearNum($(".ev-phoneNum"));//清除账号
			t.clearPass($(".ev-passWord"));//清除密码
			t.eyeOpen();					//密码显隐
			t.finPas();						//找回密码
			t.quiLog();						//手机快捷登录
			t.allinBingLogin();				//唯医登录
			t.returnText();					//返回上一步
			t.hisPhone();//出现历史账户
			t.checkLogin();//登录
			t.weixin();//微信登录
			t.checkBidLogin();
			t.close();//页面关闭
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
					// console.log("Error...");
				},
				beforeSend:function(){
					comm.loading.show();
				},
			});
		},
		//提示框的toast显示,time1:时间间隔，time2:显示时间。
		toast:function(content,time1,time2){
			setTimeout(function(){
				$(".errorTip").fadeIn();
				$(".errorTip span").text(content);
				setTimeout(function(){
					$(".errorTip").fadeOut();
					setTimeout(function(){
						$(".errorTip").removeClass("errorTipLong");
					},1000);
				},time2);
			},time1);
		},
		//清除账号
		clearNum:function(dom){
			var t = this;
			dom.on("focus",function(){
				var txt = $(this).val();
				$(".password").css("display","none");
				if(txt){
					$(".phone").css("display","inline-block");
					$(".phone .close").on("click",function(){
						var timer1 = setInterval(function(){
							$(".errorTip").hide()
							setTimeout(function(){
								clearInterval(timer1);
							},1000);
						},100);
						 dom.attr("value","");
						 $(".phone").css("display","none");
						 $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
						 $(".ev-quiLoginBtn").removeClass("activation");//快速登录
						 $(".ev-fidNext").removeClass("activation");//找回密码下一步
						 $(".ev-passSave").removeClass("activation");//重置密码
						 $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
					});
				}else{
					$(this).on("keyup",function(){
						if($(this).val()){
							$(".phone").css("display","inline-block");
							$(".phone .close").on("click",function(){
								 dom.attr("value","");
								 $(".phone").css("display","none");
								 $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
								 $(".ev-quiLoginBtn").removeClass("activation");//快速登录
								 $(".ev-fidNext").removeClass("activation");//找回密码下一步
								 $(".ev-passSave").removeClass("activation");//重置密码
								 $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
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
					setTimeout(function(){
						if(isClick){
							dom.attr("value","");
							$(".phone").css("display","none");
							setTimeout(function(){
								$(".errorTip").css("display","none");
							},400);
							$(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
							$(".ev-quiLoginBtn").removeClass("activation");//快速登录
							$(".ev-fidNext").removeClass("activation");//找回密码下一步
							$(".ev-passSave").removeClass("activation");//重置密码
							$(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
						}else{
							$(".phone").css("display","none");
						}
					},200);
				}
				isClick();
				//当点击选择别的登录方式时，不显示错误提示
				(function isJump(){
					$(".isJump").on("click",function(){
						var timer = setInterval(function(){
							$(".errorTip").hide();
							setTimeout(function(){
								clearInterval(timer);
							},1000);
						},100);
					});
					$(".phone .close").on("click",function(){
						var timer = setInterval(function(){
							$(".errorTip").hide();
							setTimeout(function(){
								clearInterval(timer);
							},1000);
						},100);
					})
					$(".password .close").on("click",function(){
						var timer = setInterval(function(){
							$(".errorTip").hide();
							setTimeout(function(){
								clearInterval(timer);
							},1000);
						},100);
					})
				}());
			})
		},
		//清除密码
		clearPass:function(dom){
			dom.on("focus",function(){
				var txt = $(this).val();
				$(".password").css("display","inline-block");
				if(txt){
					$(".password").css("display","inline-block");
					$(".password .close").on("click",function(){
						setTimeout(function(){
							$(".errorTip").css("diaplay","none");
						},500);
						 dom.attr("value","");
						 $(".password").css("display","none");
						 $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
						 $(".ev-quiLoginBtn").removeClass("activation");//快速登录
						 $(".ev-fidNext").removeClass("activation");//找回密码下一步
						 $(".ev-passSave").removeClass("activation");//重置密码
						 $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
					});
				}else{
					$(".password .close").css("height","0");
					$(this).on("keyup",function(){
						if($(this).val()){
							$(".password").css("display","inline-block");
							$(".close").css("height","");
							$(".password .close").on("click",function(){
								 dom.attr("value","");
								 $(".password").css("display","none");
								 $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
								 $(".ev-quiLoginBtn").removeClass("activation");//快速登录
								 $(".ev-fidNext").removeClass("activation");//找回密码下一步
								 $(".ev-passSave").removeClass("activation");//重置密码
								 $(".ev-bindWeixinLogin").removeClass("activation");//微信绑定
							});
						}else{
							$(".password .close").css("height","0");
						}
					});
				}
			});
			dom.on("blur",function(){
				function isClick(){
					var isClick = false;
					var isPassCli = false;
					$(".password .close").on("click",function(){
						isClick = true;
						return isClick;
					})
					$(".password .eyeClose").on("click",function(){
						isPassCli=true;
					});
					$(".password .eyeOpen").on("click",function(){
						isPassCli=true;
					});
					setTimeout(function(){
						if(isClick){
							setTimeout(function(){
								$(".errorTip").css("diaplay","none");
							},500);
							dom.attr("value","");
							 $(".password").css("display","none");
							 $(".ev-loginBtn").removeClass("activation");//登录按钮不可点击
							 $(".ev-quiLoginBtn").removeClass("activation");//快速登录
							 $(".ev-fidNext").removeClass("activation");//找回密码下一步
							 $(".ev-passSave").removeClass("activation");//重置密码
						}else if(isPassCli){
							$(".password").css("display","inline-block");
						}else{
							$(".password").css("display","none");
						}
					},200);
				}
				isClick();
			})
		},
		//密码的显示隐藏
		eyeOpen:function(){
			$(".eyeOpen").on("click",function(){
				$(".password").css("display","inline-block");
				$(this).css("display","none");
				$(".eyeClose").css("display","inline-block");
				$(".ev-passWord").prop("type","text");
				$(".ev-caosPas").prop("type","text");
			});
			$(".eyeClose").on("click",function(){
				$(".password").css("display","inline-block");
				$(this).css("display","none");
				$(".eyeOpen").css("display","inline-block");
				$(".ev-passWord").prop("type","password");
				$(".ev-caosPas").prop("type","password");
			});
		},
		//历史手机号
		hisPhone:function(){
			var t = this;
			if(localStorage.getItem("phoneNum")){
				var phoneNum = localStorage.getItem("phoneNum").split(",");
				var len = phoneNum.length;
				for(var i = 0;i<len;i++){
					$(".history").css("display","block");
					var html = '<li>'+phoneNum[i]+'</li>';
					$(".history").append(html);
					t.historyNum();
					t.hisCli();
				}
			}
		},
		//历史记录点击事件
		hisCli:function(){
			var t = this;
			$(".history").on("click","li",function(){
				var txt = $(this).text();
				$(".ev-phoneNum").val(txt);
				$(".history").css("display","none");
				t.hisPhone();
			});
		},
		//出现历史账号
		historyNum:function(){
			$(".ev-phoneNum").on("keyup",function(){
				if($(this).val()){
					if(localStorage.getItem("phoneNum")){
						var con = localStorage.getItem("phoneNum").split(",");
						for (var i = 0;i<con.length;i++) {
							if($(this).val()==con[i].substring(0,$(this).val().length)){
								$(".history").show();
								$(".history li").eq(i).css("display","block");
							}else{
								$(".history").hide();
								$(".history li").eq(i).css("display","none");
							}
						}
					}
				}
			});
		},
		//返回上一步
		returnText:function(){
			var t = this;
			//找回密码的返回
			$(".ev-findReturn").on("click",function(){
				$(".ev-login").css("display","block");//登录显示
				$(".ev-findPassword").css("display","none");//找回密码隐藏
				commLog.createBrowse(4, "登录注册-登录页");
			});
			//重置密码的返回
			$(".ev-newReturn").on("click",function(){
				$(".ev-findPassword").css("display","block");//找回密码显示
				$(".ev-newPass").css("display","none");//重置密码隐藏
				commLog.createBrowse(5, "登录注册-找回密码页");
			});
			//手机快捷登录
			$(".ev-quickReturn").on("click",function(){
				$(".ev-login").css("display","block");//登录显示
				$(".ev-quickLogin").css("display","none");
				commLog.createBrowse(4, "登录注册-登录页");
			});
			//绑定唯医
			$(".ev-bindReturn").on("click",function(){
				$(".ev-createBind").css("display","block");//显示
				$(".ev-bindAllin").css("display","none");
				commLog.createBrowse(10, "登录注册-唯医账号登录页");
			});
			//微信返回上一步
			$(".ev-bindWeixinReturn").on("click",function(){
				window.location.href=localStorage.getItem("weiUrl");
				loginAbout.login.exit();
				comm.maskBackground.show("rgba(0,0,0,.6)");
				var iframHtml = "<iframe src=\""+t.path.weixinLogin+"\" class=\"weixinLogin\"'>";
				$(".yd-maskBackground").html(iframHtml);
			});
		},
		/*
		 * dom:发送验证码的节点
		 * phone:输入验证码的input框
		 */
		sendCode:function(dom,phone,typeId){
			var t = this;
			var time = 60;
			dom.off("click").on("click",function(){
				var phoneNum = phone.val();
				t.isValid.fidSendCodeNum = phoneNum;
				t.isValid.quiSendCodeNum = phoneNum;
				t.isValid.sendBinWei = phoneNum;
				t.isValid.bidCaosSend = phoneNum;
				if(phoneNum){
					t.ajaxFn({
						url: t.path.sendCode,
		                async:false,
		                param:{
		                	account: phoneNum,
							typeId:typeId,	//表示快速登录
							codeLength:4,
							createPasswd:1,//传值生成随机码
		                },
		                type:"post",
		                fn: function(data) {
							var codeNum=data.responseObject.responseData.codeNum;	//每日获取的验证码次数
							if(codeNum||codeNum==0){
								t.isValid.fidcodeKey=data.responseObject.responsePk;
								t.isValid.quicodeKey=data.responseObject.responsePk;
								t.isValid.bidcodeKey=data.responseObject.responsePk;//绑定微信主键id
								t.isValid.regcodeKey=data.responseObject.responsePk;
								t.isValid.caosCodeKey=data.responseObject.responsePk;
								t.isValid.quiValidCode=data.responseObject.responseData.validCode;//验证码的信息
								t.isValid.bidValidCode=data.responseObject.responseData.validCode;//验证码的信息
								t.isValid.quiCrePass = data.responseObject.responseData.createPasswd;//生成快登录的随机的密码
								t.isValid.bidWeiPass = data.responseObject.responseData.createPasswd;//微信登录生成随机密码
								t.isValid.bidCaosCodeKey = data.responseObject.responsePk;//绑定caos的主键id
								var timer = setInterval(function () {
									time--;
									$(".validate").text(time + "s后重新获取");
									$(".validate").css("color","#ccc");
									$(".validate").unbind("click");
									if (time == 0) {
										clearTimeout(timer);
										$(".validate").text("点击获取验证码");
										$(".validate").css("color","#73859e");
										t.sendCode(dom,phone,typeId);
									}
									$(".reg-experiencePo").off("click").on("click",function(){
										clearTimeout(timer);
										$(".validate").text("点击获取验证码");
										$(".validate").css("color","#73859e");
										loginAbout.register.exit();
										t.sendCode(dom,phone,typeId);
									})
									$(".log-experiencePo").off("click").on("click",function(){
										clearTimeout(timer);
										$(".validate").text("点击获取验证码");
										$(".validate").css("color","#73859e");
										loginAbout.login.exit();
										t.sendCode(dom,phone,typeId);
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
		//持续校验用户名，密码
		//输入用户名密码点击登录
		
		//找回密码
		finPas:function(){
			var t = this;
			$(".findPassword").off("click").on("click",function(){
				$(".ev-login").css("display","none");
				$(".ev-findPassword").css("display","block");
				commLog.createBrowse(5, "登录注册-找回密码页");
			});
			t.clearNum($(".ev-findNum"));//清除密码
			t.fidCheck();
		},
		/*
		 * 校验找回密码的账号
		 */
		fidCheckPhone:function(){
			var t = this;
			t.isValid.fidPhone = true;
			var phone = $(".ev-findNum");
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phone.val());
			if(isPhone==false){				
				t.isValid.fidPhone = false;
			}else{
				t.ajaxFn({
					url: t.path.isExist,
					type:"get",
	                async:false,
	                param:{
	                	account:phone.val()
	                },
	                fn: function(data) {
	                	var status = data.responseObject.responseStatus;
	                	if(status){ //表示没有注册
	                		t.isValid.fidPhone = false;
	                	}else{
	                		t.isValid.fidCustomerId = data.responseObject.responseData.customerUnite.customerId;
	                		t.isValid.fidPhoneNum = phone.val();
	                	}
	                }
	          	});
	       	}
		},
		/*
		 * 校验找回密码的账号
		 */
		fidCheckPhone2:function(){
			var t = this;
			t.isValid.fidPhone = true;
			var phone = $(".ev-findNum");
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phone.val());
			if(isPhone==false){				
				t.toast("请填写正确手机号", 300,1500);
				t.isValid.fidPhone = false;
			}else{
				t.ajaxFn({
					url: t.path.isExist,
					type:"get",
	                async:false,
	                param:{
	                	account:phone.val()
	                },
	                fn: function(data) {
	                	var status = data.responseObject.responseStatus;
	                	if(status){ //表示没有注册
	                		t.toast("该账号未注册", 300,1500);
	                		t.isValid.fidPhone = false;
	                	}else{
	                		t.isValid.fidCustomerId = data.responseObject.responseData.customerUnite.customerId;
	                		t.sendCode($(".ev-finValidate"),$(".ev-findNum"),1);//只有当账号符合规则时才能获取验证码
							t.isValid.fidPhoneNum = phone.val();
	                	}
	                }
	          	});
	       	}
		},
		/*
		 * 校验找回密码验证码
		 */
		fidCheckCode:function(){
			var t = this;
			t.isValid.fidCode = true;
			if($(".ev-fidCode").val()==null){
				t.isValid.fidCode = false;
			}
		},
		/*
		 * 校验找回密码验证码
		 */
		fidCheckCode2:function(){
			var t = this;
			t.isValid.fidCode = true;
			if($(".ev-fidCode").val()==null){
				t.toast("验证码不能为空", 300,1500);
				t.isValid.fidCode = false;
			}
		},
		//校验找回密码下一步按钮是否可点击
		fidActive:function(){
			var t = this;
			var phoneTxt = $(".ev-findNum").val();
			var passTxt = $(".ev-fidCode").val();
			if(phoneTxt&&passTxt){
				if(t.isValid.fidPhone&&t.isValid.fidCode){
					$(".ev-fidNext").addClass("activation");
					t.fidNextBtn();//用户点击找回密码下一步按钮
				}else{ 
					$(".ev-fidNext").removeClass("activation");
					$(".ev-fidNext").unbind("click");
				}
			}else{
				$(".ev-fidNext").removeClass("activation");
				$(".ev-fidNext").unbind("click");
			}
		},
		//找回密码
		fidCheck:function(){
			var t = this;
			$(".ev-findNum").on("blur",function(){
				t.fidCheckPhone2();
				t.fidActive();
			});
			$(".ev-fidCode").on("blur",function(){
				t.fidCheckCode2();
				t.fidActive();
			});
			$(".ev-findNum").on("keyup",function(){
				t.fidCheckPhone();
				t.fidActive();
			});
			$(".ev-fidCode").on("keyup",function(){
				t.fidCheckCode();
				t.fidActive();
			});
		},
		//设置新密码
		fidNextBtn:function(){
			var t = this;
			$(".ev-fidNext").off("click").on("click",function(){
				if($(this).is(".activation")){
					if(t.isValid.fidPhoneNum!=t.isValid.fidSendCodeNum){
						t.toast("验证码输入错误", 300, 1500);
					}else{
						var code = $(".ev-fidCode").val();
						t.ajaxFn({
							url: t.path.checkCode,
							type:"post",
			                async:false,
			                param:{
			                	validCode:code,
			                	id:t.isValid.fidcodeKey,
			                },
			                fn: function(data) {
			                	var status = data.responseObject.responseStatus;
			                	var code = data.responseObject.responseCode;
			                	if(status==false){ //表示注册
			                		if(code=='1A0002'){
			                			t.toast("验证码错误,请重新获取", 300,1500);
			                			// console.log("错误")
			                		}else if(code=='1A0001'){
			                			t.toast("验证码已经失效,请重新获取", 300,1500);
			                			// console.log("失效")
			                		}
			                	}else{
			            			$(".ev-newPass").css("display","block");
									$(".ev-findPassword").css("display","none");
									t.checkPas();//设置新密码
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
									})
			                	}
			                }
			          	});
					}
				}
			});
			t.clearNum($(".ev-newPas"));//清除密码
			t.clearPass($(".ev-conPas"));//清除密码
		},
		checkPas1:function(){
			var t = this;
			t.isValid.restPass = true;
			var passReg = /^[0-9a-zA-Z]*$/g;
			var pass1 = $(".ev-newPas").val();//新密码
			var len = pass1.length;
			var isPass1 = passReg.test(pass1);
			if(isPass1){
				if(len<6){
					t.isValid.restPass = false;
				}else if(len>20){
					t.isValid.restPass = false;
				}
			}else{
				t.isValid.restPass = false;
			}
		},
		checkPas12:function(){
			var t = this;
			var passReg = /^[0-9a-zA-Z]*$/g;
			var pass1 = $(".ev-newPas").val();//新密码
			var len = pass1.length;
			var isPass1 = passReg.test(pass1);
			if(isPass1){
				if(len<6){
					t.toast("密码长度少于6位", 300,1500);
				}else if(len>20){
					t.toast("密码长度超过20位", 300,1500);
				}
			}else{
				t.toast("密码格式不正确", 300,1500);
			}
		},
		checkPas2:function(){
			var t = this;
			t.isValid.restPass2 = true;
			var passReg = /^[0-9a-zA-Z]*$/g;
			var pass1 = $(".ev-newPas").val();//新密码
			var pass2 = $(".ev-conPas").val();//确认密码
			var isPass2 = passReg.test(pass2);
			var len = pass2.length;
			if(isPass2){
				if(len<6){
					t.isValid.restPass2 = false;
				}else if(len>20){
					t.isValid.restPass2 = false;
				}
			}else{
				t.isValid.restPass2 = false;
			}
		},
		checkPas22:function(){
			var t = this;
			var passReg = /^[0-9a-zA-Z]*$/g;
			var pass1 = $(".ev-newPas").val();//新密码
			var pass2 = $(".ev-conPas").val();//确认密码
			var isPass2 = passReg.test(pass2);
			var len = pass2.length;
			if(isPass2){
				if(len<6){
					t.toast("密码长度不足6位", 300,1500);
				}else if(len>20){
					t.toast("密码长度超过20位", 300,1500);
				}
			}else{
				t.toast("密码格式不正确", 300,1500);
			}
		},
		checkPasActive:function(){
			var t = this;
			var pass1 = $(".ev-newPas").val();//新密码
			var pass2 = $(".ev-conPas").val();//确认密码
			if(pass1&&pass2){
				if(t.isValid.restPass&&t.isValid.restPass2){
					$(".ev-passSave").addClass("activation");
					t.savePass();//重置密码的点击事件
				}else{
					$(".ev-passSave").removeClass("activation");
					$(".ev-passSave").unbind("click");
				}
			}else{
				$(".ev-passSave").removeClass("activation");
				$(".ev-passSave").unbind("click");
			}
		},
		checkPas:function(){
			var t = this;
			$(".ev-newPas").on("blur",function(){
				t.checkPas12();
				t.checkPasActive();
			});
			$(".ev-conPas").on("blur",function(){
				t.checkPas22();
				t.checkPasActive();
			});
			$(".ev-newPas").on("keyup",function(){
				t.checkPas1();
				t.checkPasActive();
			});
			$(".ev-conPas").on("keyup",function(){
				t.checkPas2();
				t.checkPasActive();
			});
		},
		//保存重置密码
		savePass:function(){
			var t = this;
			$(".ev-passSave").off("click").on("click",function(){
				if($(".ev-passSave").is(".activation")){//如果按钮可以点击
					var pass1 = $(".ev-newPas").val();//新密码
					var pass2 = $(".ev-conPas").val();//确认密码
					if(pass1!=pass2){
						t.toast("两次输入密码不一致", 300, 1500);
					}else{
						var passwd = $(".ev-newPas").val();
						t.ajaxFn({
							url: t.path.updataPass,
							type:"post",
			                param:{
			                	customerId:t.isValid.fidCustomerId,
			                	passwd:passwd
			                },
			                fn: function(data) {
			                	var status = data.responseObject.responseStatus;
			                	if(status){
			                		$(".reset").css("display","block");
			                		setTimeout(function(){
			                			$(".reset").css("display","none");
			        				},600);
			                		localStorage.setItem("userId",t.isValid.fidCustomerId);
									localStorage.setItem("userState","true");
			                		loginAbout.login.exit();
		                        	loginAbout.changeHead();
		                        	t.objFn.success&&t.objFn.success();
			                	}
			                }
			          	});
					}
				}else{
					//console.log("按钮不能点击")
				}
			});
			
			
		},
		//手机快捷登录
		quiLog:function(){
			var t = this;
			$(".phoneLogin").off("click").on("click",function(){
				$(".ev-login").css("display","none");
				$(".ev-quickLogin").css("display","block");
				t.quickCheck();//快速登录校验
				commLog.createBrowse(8, "登录注册-手机快捷登录页");
			});
			t.clearNum($(".ev-quiNum"));//清除账户
		},
		/*
		 * 校验账户，用户未注册时为false
		 */
		quiCheckPhone:function(){
			var t = this;
			t.isValid.quiPhone = true;
			var phone = $(".ev-quiNum");
			t.isValid.quiPhoneNum = phone.val();
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phone.val());
			if(isPhone==false){				
				t.isValid.quiPhone = false;
			}
		},
		/*
		 * 校验账户，用户未注册时为false
		 */
		quiCheckPhone2:function(){
			var t = this;
			t.isValid.quiPhone = true;
			var phone = $(".ev-quiNum");
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phone.val());
			if(isPhone==false){				
				t.toast("请填写正确手机号", 300,1500);
				t.isValid.quiPhone = false;
			}else{
				t.ajaxFn({
					url: t.path.isExist,
	                async:false,
	                param:{ 
	                	account:phone.val()
	                },
	                type:"get",
	                fn: function(data) {
	                	var status = data.responseObject.responseStatus;
	                	//console.log(status);
	                	if(status==false){ //表示注册
	                		t.sendCode($(".ev-quickCode"),$(".ev-quiNum"),3);
	                	}else{
	                		t.sendCode($(".ev-quickCode"),$(".ev-quiNum"),2);
	                	}
	                }
	          	});
			}
		},
		
		/*
		 * 校验验证码
		 */
		quiCheckCode:function(){
			var t = this;
			t.isValid.quiCode = true;
			if($(".ev-quiCode").val()==null){
				t.isValid.quiCode = false;
			}
		},
		/*
		 * 校验验证码
		 */
		quiCheckCode2:function(){
			var t = this;
			t.isValid.quiCode = true;
			if($(".ev-quiCode").val()==null){
				t.toast("验证码不能为空", 300,1500);
				t.isValid.quiCode = false;
			}
		},
		//校验注册按钮是否可点击
		quiActive:function(){
			var t = this;
			var phoneTxt = $(".ev-quiNum").val();
			var passTxt = $(".ev-quiCode").val();
			if(phoneTxt&&passTxt){
				if(t.isValid.quiPhone&&t.isValid.quiCode){
					$(".ev-quiLoginBtn").addClass("activation");
					t.quiBtn();//用户点击注册按钮
				}else{ 
					$(".ev-quiLoginBtn").removeClass("activation");
					$(".ev-quiLoginBtn").unbind("click");
				}
			}else{
				$(".ev-quiLoginBtn").removeClass("activation");
				$(".ev-quiLoginBtn").unbind("click");
			}
		},
		/*
		 * 调用方法
		 */
		quickCheck:function(){
			var t = this;
			$(".ev-quiNum").on("blur",function(){
				t.quiCheckPhone2();
				t.quiActive();
			});
			$(".ev-quiCode").on("blur",function(){
				t.quiCheckCode2();
				t.quiActive();
			});
			$(".ev-quiNum").on("keyup",function(){
				t.quiCheckPhone();
				t.quiActive();
			});
			$(".ev-quiCode").on("keyup",function(){
				t.quiCheckCode();
				t.quiActive();
			});
		},
		//快速登录按钮
		quiBtn:function(){
			var t = this;
			$(".ev-quiLoginBtn").off("click").on("click",function(){
				if($(this).is(".activation")){
					if(t.isValid.quiPhoneNum!=t.isValid.quiSendCodeNum){
						t.toast("验证码输入错误", 300, 1500);
					}else{
						t.ajaxFn({
							url: t.path.checkCode,
							type:"post",
			                async:false,
			                param:{
			                	validCode:$(".ev-quiCode").val(),
			                	id:t.isValid.quicodeKey,
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
			                	}else{
			                		//判断账户是否存在
			                		var phone = $(".ev-quiNum").val();
									t.ajaxFn({
										url: t.path.isExist,
										type:"get",
						                async:false,
						                param:{
						                	account:phone
						                },
						                fn: function(data) {
						                	var status = data.responseObject.responseStatus;
						                	t.isValid.quiCustomerId = data.responseObject.responseData.customerUnite.customerId;//找回密码的customerId
						                	t.isValid.userId = data.responseObject.responseData.customerUnite.customerId;
											var code = data.responseObject.responseCode;
						                	if(status){
												if(code=="0B0010"){
													comm.confirmBox({
														"content":"该手机尚未注册<br/>是否直接创建新账号？",
														"cancel":"取消",
														"ensure":"创建账号",
														"ensureCallback":function(){
															t.createNumBtn();//用户用不存在的账号进行快速登录，进行校验验证码
														},
														"cancelCallback":function(){
														},
													})
												}
						                	}else{//如果存在
					            				var phone = $(".ev-quiNum").val();
					            				var code = t.isValid.quiValidCode;
					            				var codeKey = t.isValid.quicodeKey;
					            				t.ajaxFn({
					            					url: t.path.mobLogin,
					            					type:"post",
					            	                async:false,
					            	                param:{
					            	                	loginType:"quickLogin",
					            	                	account:phone,
					            	                	smsId:codeKey,
					            	                	validCode:code,
					            	                },
					            	                fn: function(data) {
					            	                	if(data){
					            							var status = data.responseObject.responseStatus;
					            							if(status){
																if(localStorage.getItem("phoneNum")){
																	var histor = localStorage.getItem("phoneNum").split(",");
																	for (var i = 0;i<histor.length;i++) {
																		if(phone!=histor[i]){
																			localStorage.setItem("phoneNum",phone+','+histor);
																		}
																	}
																}else{
																	localStorage.setItem("phoneNum",phone);
																}
					            								localStorage.setItem("userId",t.isValid.userId);
					        		                        	loginAbout.login.exit();
					        		                        	loginAbout.changeHead();
					        		                        	localStorage.setItem("userState","true");
						                    					t.objFn.success&&t.objFn.success();
					            							}else{
					            								t.objFn.error&&t.objFn.error();
					            							}
					            						}
					            	                }
					            	          	});
						                	}
						                }
									})
			                	}
			                }
						})
					}
				}
			})
		},
		//快速登录产生随机密码后进行登录
		createNumBtn:function(){
			var t = this;
			var code = $(".ev-quiCode").val();
			t.ajaxFn({
				url: t.path.checkCode,
				type:"post",
	            async:false,
	            param:{
	            	validCode:code,
	            	id:t.isValid.quicodeKey,
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
	            	}else{
	            		var phoneNum = $(".ev-quiNum").val();
	            		t.ajaxFn({
                			url: t.path.register,
                			type:"get",
                			param:{
                				account:phoneNum,
                				passwd:t.isValid.quiCrePass,
                			},
                			fn:function(data){
                				var status = data.responseObject.responseStatus;
                				var code = data.responseObject.responseCode;
                				t.isValid.userId = data.responseObject.responsePk;
                				if(status){
                					switch (code) {
											case '0B0004':
												localStorage.setItem("userId",t.isValid.userId);
												if(localStorage.getItem("phoneNum")){
													var histor = localStorage.getItem("phoneNum").split(",");
													for (var i = 0;i<histor.length;i++) {
														if(phoneNum!=histor[i]){
															localStorage.setItem("phoneNum",phoneNum+','+histor);
														}
													}
												}else{
													localStorage.setItem("phoneNum",phoneNum);
												}
												loginAbout.login.exit();
												localStorage.setItem("userState","true");
												loginAbout.changeHead();
												t.objFn.success&&t.objFn.success();
												break;
                					}
                				}else{
                					switch (code) {
           	                         	case '9X0003':
	           	                        	//console.log("用户名或密码为空");
	           	                            break;
           	                         	case '0B0001':
           	                         		//console.log("用户名已存在");
                					}
                				}
                			}
	            		})
	            	}
	            }
			});
		},
		/*
		 * 校验登录账号
		 */
		checkLoginPhone:function(){
			var t = this;
			t.isValid.phone = true;
			var phone = $(".ev-phoneNum");
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phone.val());
			if(isPhone==false){				
				t.isValid.phone = false;
			}else{
				t.ajaxFn({
					url: t.path.isExist,
					type:"get",
	                async:false,
	                param:{
	                	account:phone.val()
	                },
	                fn: function(data) {
	                	var status = data.responseObject.responseStatus;
	                	if(status){ //表示没有注册
	                		t.isValid.phone = false;
	                	}else{
	                		t.isValid.userId = data.responseObject.responseData.customerUnite.customerId;
	                	}
	                }
	          	});
			}
		},
		/*
		 * 校验登录账号
		 */
		checkLoginPhone2:function(){
			var t = this;
			t.isValid.phone = true;
			var phone = $(".ev-phoneNum");
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phone.val());
			if(isPhone==false){				
				t.toast("请填写正确手机号", 300,1500);
				t.isValid.phone = false;
			}else{
				t.ajaxFn({
					url: t.path.isExist,
					type:"get",
	                async:false,
	                param:{
	                	account:phone.val()
	                },
	                fn: function(data) {
	                	var status = data.responseObject.responseStatus;
	                	if(status){ //表示注册
	                		t.toast("该账号未注册", 300,1500);
	                		t.isValid.phone = false;
	                	}else{
	                		t.isValid.userId = data.responseObject.responseData.customerUnite.customerId;
	                	}
	                }
	          	});
			}
		},
		/*
		 * 校验登录密码
		 */
		checkLoginPass:function(){
			var t = this;
			t.isValid.pass = true;
			var passWord = $(".ev-passWord");
			var passReg = /^[0-9a-zA-Z]*$/g;
			var len = passWord.val().length;
			var isPass = passReg.test(passWord.val());
			if(isPass){
				var len = passWord.val().length;
				if(len<6){
					t.isValid.pass = false;
				}else if(len>20){
					t.isValid.pass = false;
				}
			}else{
				t.isValid.pass = false;
			}
		},
		/*
		 * 校验登录密码
		 */
		checkLoginPass2:function(){
			var t = this;
			t.isValid.pass = true;
			var passWord = $(".ev-passWord");
			var passReg = /^[0-9a-zA-Z]*$/g;
			var len = passWord.val().length;
			var isPass = passReg.test(passWord.val());
			if(isPass){
				var len = passWord.val().length;
				if(len<6){
					t.toast("密码长度不足6位", 300,1500);
					t.isValid.pass = false;
				}else if(len>20){
					t.toast("密码长度超过20位", 300,1500);
					t.isValid.pass = false;
				}
			}else{
				t.toast("密码格式不正确", 300,1500);
				t.isValid.pass = false;
			}
		},
		/*
		 * 校验登录按钮可否点击
		 */
		activeLogin:function(){
			var t = this;
			var phoneTxt = $(".ev-phoneNum").val();
			var passTxt = $(".ev-passWord").val();
			if(phoneTxt&&passTxt){
					if(t.isValid.phone&&t.isValid.pass){
					$(".ev-loginBtn").addClass("activation");
					t.loginBtn();
				}else{ 
					$(".ev-loginBtn").removeClass("activation");
					$(".ev-loginBtn").unbind("click");
				}
			}else{
				$(".ev-loginBtn").removeClass("activation");
				$(".ev-loginBtn").unbind("click");
			}
		},
		/*
		 * 调用登录方法
		 */
		checkLogin:function(){
			var t = this;
			//验证手机
			$(".ev-phoneNum").on("blur",function(){
				setTimeout(function(){
					t.checkLoginPhone2();
					$(".history li").css("display","none");
					t.activeLogin();
					t.historyNum();//再次调用历史记录函数
				},200);
			});
			//验证密码
			$(".ev-passWord").on("blur",function(){
				t.checkLoginPass2();
				t.activeLogin();
			});
			//验证手机
			$(".ev-phoneNum").on("keyup",function(){
				t.checkLoginPhone();
				t.activeLogin();
			});
			//验证密码
			$(".ev-passWord").on("keyup",function(){
				t.checkLoginPass();
				t.activeLogin();
			});
		},
		/*
		 * 用户登录
		 */
		loginBtn:function(){
			var t = this;
			$(".ev-loginBtn").off("click").on("click",function(){
				if($(this).is(".activation")){
					var phone = $(".ev-phoneNum").val();
					var pass = $(".ev-passWord").val();
					$.ajax({
						type:"post",
						url:t.path.login,
						data: {
							j_username:"website;"+phone+";"+pass+";mobile",
		                	j_password:pass,
		                	rememberMe:true,
						},
						async:false,
						dataType:"json",
						success:function(data){
							comm.loading.hide(); 
							if(data){
								var status = data.responseObject.responseStatus;
								var userAuth = data.responseObject.responseData.customerAuthState;//获取用户的认证状态
								if(status){
									/*
									 * 将输入的账户存入到本地
									 */
		                        	var num = $(".ev-phoneNum").val();
									var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
									var isPhone = phoneReg.test(num);
									if(localStorage.getItem("phoneNum")){
										var histor = localStorage.getItem("phoneNum").split(",");
										for (var i = 0;i<histor.length;i++) {
											if(num!=histor[i]&&isPhone){
												localStorage.setItem("phoneNum",phone+','+histor);
											}
										}
									}else{
										localStorage.setItem("phoneNum",phone);
									}
									localStorage.setItem("userAuth",userAuth);
									localStorage.setItem("userId",t.isValid.userId);
									loginAbout.login.exit();
									loginAbout.changeHead();
									localStorage.setItem("userState","true");
									t.objFn.success&&t.objFn.success();
								}else{
									t.objFn.error&&t.objFn.error();
									t.isValid.logCliNum++;
									if(t.isValid.logCliNum>=3){
		                    			setTimeout(function(){
		                    				$(".prompt").fadeIn();
			                    			setTimeout(function(){
			                    				$(".prompt").fadeOut();
			                    			},3000);
		                    			},300);
									}
									t.toast("密码错误", 300, 1500);
								}
							}
						},
						error:function(data){
							// console.log("Error...");
						},
						beforeSend:function(){
							comm.loading.show();
						},
					});
				}
				
			})
		},
		//微信登录
		/*
		 * 判断是否绑定医鼎账号：1，绑定（首页）2，绑定要绑定的手机号->是否为医鼎注册账号->
		 */
		weixin:function(){
			var t = this;
			$(".weixin").off("click").on("click",function(){
				t.isValid.weiUrl = window.location.href;
				localStorage.setItem("weiUrl",window.location.href);
				loginAbout.login.exit();
				comm.maskBackground.show("rgba(0,0,0,.6)");
				var iframHtml = "<iframe src=\"//open.weixin.qq.com/connect/qrconnect?appid=wx3b347620d468cd89&redirect_uri=https%3a%2f%2fwww.yi-ding.net.cn%2fcall%2fyiding%2finteract%2fweixinLogin%2f?url="+t.isValid.weiUrl+"&response_type=code&scope=snsapi_login&state=START#wechat_redirect\" class=\"weixinLogin\" >";
				$(".yd-maskBackground").html(iframHtml);
			});
			t.sendCode($(".ev-bindWeixinValidate"),$(".ev-bindWeixinNum"),2);
			var url = window.location.href;
			if((url).substring((url).indexOf("/"),(url).length)=="//www.yi-ding.net.cn/pages/authority/weixinBindLogin.html?isFreeze=1"){
				comm.alertBox({
					"title":"账号已被冻结，请更换账号",
					"ensure":"好的",
					"ensureCallback":function(){
						loginAbout.register.exit();
						loginAbout.login.exit();
						window.location.href = localStorage.getItem("weiUrl");
					},
				});
			}
		},
		bidWeiCheckPhone:function(){
			var t = this;
			t.isValid.bidWeiPhone = true;
			var phone = $(".ev-bindWeixinNum").val();
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phone);
			t.isValid.bidWeiNum = phone;
			if(isPhone==false){				
				t.isValid.bidWeiPhone = false;
			}
		},
		bidWeiCheckPhone2:function(){
			var t = this;
			t.isValid.bidWeiPhone = true;
			var phone = $(".ev-bindWeixinNum").val();
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phone);
			if(isPhone==false){
				t.toast("请输入正确的手机号",300,1500);
				t.isValid.bidWeiPhone = false;
			}else{
				t.ajaxFn({
					url: t.path.weixinBind,
					type: "post",
					async: false,
					param: {
						account: $(".ev-bindWeixinNum").val(),
						isVerify: 1,//表示验证
					},
					fn: function (data) {
						var status = data.responseObject.responseStatus;
						var code = data.responseObject.responseCode;
						if(data.responseObject.responseStatus){
							if(data.responseObject.responseCode=='0B0008'){
								t.toast("绑定的账号已经失效",300,1500);
								t.isValid.bidWeiPhone = false;
							}
						}
					}
				})
			}
		},
		bidWeiCheckCode:function(){
			var t = this;
			t.isValid.bidWeiCode = true;
			if($(".ev-bindWeixinCode").val()==""){
				t.isValid.bidWeiCode = false;
			}
		},
		bidWeiCheckCode2:function(){
			var t = this;
			t.isValid.bidWeiCode = true;
			if($(".ev-bindWeixinCode").val()==""){
				t.toast("验证码为空", 300,1500);
				t.isValid.bidWeiCode = false;
			}
		},
		bidWeiActive:function(){
			var t = this;
			var num = $(".ev-bindWeixinNum").val();
			var code = $(".ev-bindWeixinCode").val();
			if(num&&code){
				if(t.isValid.bidWeiPhone&&t.isValid.bidWeiCode){
					$(".ev-bindWeixinLogin").addClass("activation");
					t.bidWeiBtn();//微信绑定登录
				}else{
					$(".ev-bindWeixinLogin").removeClass("activation");
					$(".ev-bindWeixinLogin").unbind("click");
				}
			}else{
				$(".ev-bindWeixinLogin").removeClass("activation");
				$(".ev-bindWeixinLogin").unbind("click");
			}
		},
		checkBidLogin:function(){
			var t = this;

			$(".ev-bindWeixinNum").on("blur",function(){
				t.bidWeiCheckPhone2();
				t.bidWeiActive();
			});
			$(".ev-bindWeixinCode").on("blur",function(){
				t.bidWeiCheckCode2();
				t.bidWeiActive();
				// console.log(t.isValid.weiUrl);
			});
			$(".ev-bindWeixinNum").on("keyup",function(){
				t.bidWeiCheckPhone(); 
				t.bidWeiActive();
			});
			$(".ev-bindWeixinCode").on("keyup",function(){
				t.bidWeiCheckCode();
				t.bidWeiActive();
			});
		},
		bidWeiBtn:function(){
			var t = this;
			$(".ev-bindWeixinLogin").off("click").on("click",function(){
				commLog.createBrowse(11, "微信登录-账号绑定");
				if($(this).is(".activation")){
					if(t.isValid.bidWeiNum != t.isValid.sendBinWei){
						t.toast("验证码输入错误",300,1500);
					}else{
						t.ajaxFn({
							url: t.path.weixinBind,
							type:"post",
							async:false,
							param:{
								account:$(".ev-bindWeixinNum").val(),
								isVerify:1,//表示验证
							},
							fn: function(data) {
								var status = data.responseObject.responseStatus;
								var code = data.responseObject.responseCode;
								if(status){
									var phone = $(".ev-bindWeixinNum").val();
									//判断验证码是否正确
									t.ajaxFn({
										url: t.path.checkCode,
										type:"post",
										async:false,
										param:{
											validCode:$(".ev-bindWeixinCode").val(),
											id:t.isValid.regcodeKey,
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
											}else{//验证码正确时,进行微信绑定
												t.ajaxFn({
													url: t.path.weixinBind,
													type:"post",
													async:false,
													param:{
														account:phone,
														isVerify:0,
													},
													fn: function(data) {
														var status = data.responseObject.responseStatus;
														var code = data.responseObject.responseCode;
														if(status){
															localStorage.setItem("userState","true");
															localStorage.setItem("userId",t.isValid.fidCustomerId);
															loginAbout.changeHead();
															window.location.href=localStorage.getItem("weiUrl");
														}
													}
												})
											}
										}
									})
								}else{
									switch (code) {
										case '9X0004':
											//console.log("账号不存在,去注册");
											t.weiBtnReg();//微信注册绑定
											break;
										case '0G0001':
											//console.log("手机号已经绑定过其他微信");
											$(".errorTip").addClass("errorTipLong");
											t.toast("绑定失败，账号已经绑定了其他的微信账号(可解除已绑定微信或更换手机号)",600,4000);
									}
								}
							}
						});
					}
				}
			});
		},
		//用户不是医鼎账户,进行注册后绑定.
		sendCodeCre:function(){
			var t = this;
			var time = 60;
			var phoneNum = $(".ev-bindWeixinNum").val();
			var phoneReg = /^(127|128|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
			var isPhone = phoneReg.test(phoneNum);
			//console.log(phoneNum);
			$(".ev-bindWeixinValidate").off("click").on("click",function(){
				if(phoneNum){
					t.ajaxFn({
						url: t.path.sendCode,
		                async:false,
		                param:{
		                	account: phoneNum,
							typeId: 2,	//表示手机号注册
							codeLength:4,
							createPasswd:1,//传值生成随机码
		                },
		                type:"post",
		                fn: function(data) {
							// console.log(data);
							var codeNum=data.responseObject.responseData.codeNum;	//每日获取的验证码次数
							t.isValid.bidcodeKey=data.responseObject.responsePk;//主键id
							t.isValid.bidWeiPass = data.responseObject.responseData.createPasswd;//随机密码
							if(codeNum||codeNum==0){
								var timer = setInterval(function () {
									time--;
									$(".validate").text(time + "s后重新获取");
									$(".validate").css("color","#ccc");
									$(".validate").unbind("click");
									if (time == 0) {
										clearTimeout(timer);
										$(".validate").text("点击获取验证码");
										$(".validate").css("color","#73859e");
									}
									$(".reg-experiencePo").off("click").on("click",function(){
										clearTimeout(timer);
										$(".validate").text("点击获取验证码");
										$(".validate").css("color","#73859e");
										loginAbout.register.exit();
									})
									$(".log-experiencePo").off("click").on("click",function(){
										clearTimeout(timer);
										$(".validate").text("点击获取验证码");
										$(".validate").css("color","#73859e");
										loginAbout.login.exit();

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
		//绑定手机号，注册
		weiBtnReg:function(){
			var t = this;
			var code = $(".ev-bindWeixinCode").val();
			t.ajaxFn({
				url: t.path.checkCode,
				type:"post",
				async:false,
				param:{
					validCode:code,
					id:t.isValid.regcodeKey,
				},
				fn: function(data) {
					// console.log(data)
					var status = data.responseObject.responseStatus;
					var code = data.responseObject.responseCode;
					if(status==false){ //表示验证码验证失败
						if(code=='1A0002'){
							t.toast("验证码错误,请重新获取", 300,1500);
						}else if(code=='1A0001'){
							t.toast("验证码已经失效,请重新获取", 300,1500);
						}
					}else{//验证码正确时,进行微信绑定
						var phoneNum = $(".ev-bindWeixinNum").val();
						t.ajaxFn({
							url: t.path.register,
							type:"get",
							param:{
								account:phoneNum,
								passwd:t.isValid.bidWeiPass,
								registType:2,
							},
							fn:function(data){
								// console.log(data)
								// console.log(t.isValid.bidWeiPass);
								var status = data.responseObject.responseStatus;
								var code = data.responseObject.responseCode;
								if(status){
									switch (code) {
										case '0B0004':
											// console.log("注册成功，进行绑定");
											t.ajaxFn({
												url: t.path.weixinBind,
												type:"post",
												async:false,
												param:{
													account:phoneNum,
													isVerify:0,
												},
												fn: function(data) {
													// console.log(data);
													var status = data.responseObject.responseStatus;
													if(status){
														// console.log("绑定成功");
														localStorage.setItem("userId",t.isValid.fidCustomerId);
														localStorage.setItem("userState","true");
														loginAbout.changeHead();
														window.location.href=localStorage.getItem("weiUrl");
													}else if(code=='0B0008'){
														t.toast("绑定的账号已经失效",300,1500);
														// console.log("绑定失败");
													}
												}
											});
									}
								}else{
									// console.log("注册失败");
								}
							}
						});
					}
				}
			})
		},
		//绑定唯医联合登录
		allinBingLogin:function(){
			var t = this;
			$(".allin").on("click",function(){
				commLog.createBrowse(10, "登录注册-唯医账号登录页");
				localStorage.setItem("allinUrl", window.location.href);
				window.location.href="//www.allinmd.cn/pages/singlePage/user/yiding_authority.html";
			})
		},
		//判断账户是否登录
		isLogin:function(){
			var t = this;
			t.ajaxFn({
				url: t.path.islogin,
				type:"post",
                async:false,
                fn: function(data) {
                	// console.log(data)
                	var status = data.responseObject.responseStatus;
                	// console.log(status);
                	if(status){
                		//t.LoginUserAndHead();
                	}else{
                		$("#notLogin").css("display","inline-block");
	                	$("#isLogin").css("display","none");
                	}
                }
          	});
		},
		//页面关闭按键
		close:function(){
			var t = this;
			$(".log-experiencePo").on("click",function(){
				loginAbout.login.exit();
			});
		},
	};






























