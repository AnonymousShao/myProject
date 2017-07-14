/**
 * 功能描述：科室终端页
 * 使用方法:
 * 注意事件：
 * 引入来源：
 * 作用：
 *
 * Created by ZhangHongda on 2016/12/01.
 */
$(function(){

	comm.pcSideModule([{
		item: "首页",
		href: "//www.yi-ding.net.cn",
		active:false,
	}, {
		item: "课程",
		href: "//www.yi-ding.net.cn/pages/curriculum/curriculum.html",
		active:true,
	}, {
		item: "习题",
		href: "//www.yi-ding.net.cn/pages/category/question.html",
		active:false,
	}]);
	var control = {
		param:{
			heightmD:0,
			heightmB:0
		},
		config:{
			pageIndex:1,
			pageSize:20,
			seriesId:$(".depart_head").attr("seriesId"),//从页面中获取科室id
			customerId:'',
			responsePk:0,//用于取消加入课程
			isAdd:0,
		},
		path:{
			contentInner:"//www.yi-ding.net.cn/call/cms/series/baseinfo/getMapList/",//内容部分
			teacher:"//www.yi-ding.net.cn/call/cms/series/course/auth/getMapList/",//获取教师
			catalog:"//www.yi-ding.net.cn/call/cms/series/dir/getMapList/",//科室目录
			cancleAdd:"//www.yi-ding.net.cn/call/yiding/customer/join/update/",//取消加入系列课程
			addSerise:"//www.yi-ding.net.cn/call/yiding/customer/join/json_list/",//获取加入系列课
			addClass:"//www.yi-ding.net.cn/call/yiding/customer/join/create/",//添加系列课程
		},
		init:function(){
			var t = this;
			commLog.createBrowse(36,"系列课-系列课简介页",window.location.href+"?/"+$('.depart_head').attr('seriesId')+"/"+1);
			t.share();
			t.isLogin();
			t.tabCli();//tab切换
			t.inTop();//滑轮的滚动事件
			t.inner();//内容获取
			t.text();//内容去空格
			t.point();//搜索页面埋点
		},
		//获取数据
		ajaxFn:function(opt){
			$.ajax({
				type:"post",
				url:opt.url,
				data: {paramJson: $.toJSON(opt.param)},
				async:true, 
				dataType:"json",
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
		//分享
		share:function(){
			var postData = {
				"sceneType":3,
				"resourceType":1,
				"refId":$(".depart_head").attr("seriesId"),//科室id
				"visitSiteId":13,
				"shareSence":"3"
			};
			postData = {paramJson: $.toJSON(postData)};
			$.ajax({
				url: "//www.yi-ding.net.cn/call/yiding/comm/data/share/getMapList/",
				dataType: "json",
				async: true,
				data: postData,
				type: "GET",
				beforeSend: function () {
					comm.loading.show();
				},
				success: function (req) {
					comm.loading.hide();
					if (req.responseObject.responseStatus) {
						var imgUrl = req.responseObject.responseData.data_list[0].share_channel[0].shareImageUrl;
						var h5Url = req.responseObject.responseData.data_list[0].share_channel[0].shareUrl;
						var qqZoneTitle = req.responseObject.responseData.data_list[0].share_channel[2].shareTitle;
						var qqZoneSummary = req.responseObject.responseData.data_list[0].share_channel[2].shareDesc;
						var qqTitle = req.responseObject.responseData.data_list[0].share_channel[3].shareTitle;
						var qqSummary = req.responseObject.responseData.data_list[0].share_channel[3].shareDesc;
						var sinaTitle = req.responseObject.responseData.data_list[0].share_channel[4].shareTitle;
						var sinaSummary = req.responseObject.responseData.data_list[0].share_channel[4].shareDesc;
						var hrefStr='<div class="share rightNav" id="share">' +
							'<i class="icon-share" style="display: block;"></i>' +
							'<p class="shareTxt" style="display: none;">分享</p>' +
							'<article class="sharePic ev-shareBox" id="yd-shareBox">' +
							'<b class="yd-weixin ev-tweixin"><i class="icon-weixin"></i><em>微信</em></b>'  +
							'<section class="Ev-shareWeixinCode" style="display: none;position: absolute;bottom: 100%;">' +
							'<h3>使用微信扫描二维码</h3>' +
							'</section>' +
							'<b class="yd-qqFriends ev-tqq">' +
							'<i class="icon-qq"></i>' +
							'<em>QQ</em>' +
							'</b>' +
							'<b class="yd-qZone ev-tqzone">' +
							'<i class="icon-zone"></i>' +
							'<em>QQ空间</em>' +
							'</b>' +
							'<b class="yd-weibo ev-tsina">' +
							'<i class="icon-weibo"></i>' +
							'<em>微博</em>' +
							'</b>' +
							'</article>' +
							'</div>';
						pcShare({
							container:$(".al-rightNav"),//存放分享组件的父级
							type:6,//默认为1  1：社交分享  2：页面左下角全站分享,3.终端页面的固定分享,4.终端评论区分享，消息的评论我的，只分享到唯医朋友圈, 5:直播分享 ，6:自定义dom结构
							hrefTemplate:hrefStr,//自定义dom结构
							h5Url:h5Url,//微信分享生成二维码的链接
							shareTrend:0,//0:不需要站内动态分享  1：需要站内动态分享
							url: h5Url,
							qqTitle: qqTitle,
							qqZoneSummary: qqZoneSummary,
							sinaTitle: sinaTitle+sinaSummary,
							sinaSummary: sinaTitle+sinaSummary,
							qqZoneTitle: qqZoneTitle,
							qqSummary: qqSummary,
							hasH5: true,
							pic:imgUrl,
							hasWeiboImg: false,
							hasQzoneImg: false,
							shareQQSuc: function () {
								//qq分享成功回调
								commLog.creatEvent({"id":102,"url":window.location.href,"keyword":"QQ分享"});
							},
							shareQzoneSuc: function () {
								//qq空间分享成功回调
								commLog.creatEvent({"id":103,"url":window.location.href,"keyword":"QQ空间分享"});
							},
							shareSinaSuc: function () {
								//微博分享成功回调
								commLog.creatEvent({"id":104,"url":window.location.href,"keyword":"微博分享"});
							},
							shareWeixinSuc:function(){
								//微信分享成功回调
								commLog.creatEvent({"id":100,"url":window.location.href,"keyword":"微信分享"});
							},
							clickCallback:function(){
								commLog.creatEvent({"id":96,"url":window.location.href,"keyword":"科室课程页分享","browseType":"36"});
							}
						});
					}
				},
				complete: function () {
					//请求完成的处理
				}
			})
		},
		//获取加入系列课，判断是否已经加入并返回一个用来取消加入系列课程时用的id=responsePk;
		addSerise:function(){
			var t = this;
			t.ajaxFn({
				url:t.path.addSerise,
				param:{
					customerId:t.config.customerId,//用户id，从本地获取
					joinType:1,
					refId:t.config.seriesId,//课程id，从url中获取
				},
				fn:function(data){
					var status = data.responseObject.responseStatus;
					if(status){
						var responsePk = data.responseObject.responsePk;
					}else{
						//console.log("没有加入系列课程");
					}
				}
			})
		},
		//是否登录
		isLogin:function(){
			var t = this;
			var userId = localStorage.getItem("userId");
			if(localStorage.getItem("vedioMaxTime")){
				localStorage.removeItem("vedioMaxTime");
			}
			if(userId){
				t.config.customerId = userId;
				$(".ev-notLogin").css("display","none");
				$(".ev-isLogin").css("display","block");
			}else{
				$(".ev-notLogin").css("display","block");
				$(".ev-isLogin").css("display","none");
			}
		},
		//目录页点击收起展开
		//cliUpDown:function(){
		//	var t = this;
		//	var cat = $(".catalog_cont").find("aside");
		//	var btn = $(".ev-boneBasis_title");
		//	var list = $(".boneBasis_list");
		//	cat.on("click",".boneBasisTitleNav",function(e){
		//		e=e||window.event;
		//		if($(e.target).next("ul").attr("flag")==1){
		//			$(e.target).next("ul").attr("flag",0);
		//			$(e.target).next("ul").hide();
		//			$(e.target).find("div").eq(1).removeClass("boneBasis_packUp");
		//			$(e.target).find("div").eq(1).addClass("boneBasis_packDown");
		//		}else{
		//			$(e.target).next("ul").attr("flag",1);
		//			$(this).next("ul").css("display","none");
		//			$(e.target).next("ul").css("display","block");
		//			$(e.target).find("div").eq(1).removeClass("boneBasis_packDown");
		//			$(e.target).find("div").eq(1).addClass("boneBasis_packUp");
		//		}
		//	});
		//},
		cliUpDown:function(){
			var t = this;
			var cat = $(".catalog_cont").find("aside");
			var btn = $(".ev-boneBasis_title");
			var list = $(".boneBasis_list");
			cat.on("click",".boneBasisTitleNav",function(e){
				e=e||window.event;
				if($(this).next("ul").attr("flag")==1){
					$(this).next("ul").attr("flag",0);
					$(this).next("ul").hide();
					$(this).find("div").eq(1).removeClass("boneBasis_packUp");
					$(this).find("div").eq(1).addClass("boneBasis_packDown");
				}else{
					$(this).next("ul").attr("flag",1);
					$(this).next("ul").css("display","none");
					$(this).next("ul").css("display","block");
					$(this).find("div").eq(1).removeClass("boneBasis_packDown");
					$(this).find("div").eq(1).addClass("boneBasis_packUp");
				}
			});
		},
		//显示更多教师
		teaMore:function(){
			var t = this;
			var mor = $(".ev-lookMore");
			var flag = 1;//判断是否是第一次点击
			var num = $(".ev-teacher_ranking").find("li").length;
			var tea = $(".ev-teacher_ranking");
			var n = 0;
			mor.on("click",function(){
				//if(flag==1){//默认显示4条数据,第一次点击显示4条数据
				//	flag = 0;
				//	tea.find("li").slice(0,10).css("display","block");
				//	if(n>=num){
				//		mor.css("display","none");
				//	}
				//}else{
				//	n+=10;//10为第二次请求的时候每次显示的条数
				//	tea.find("li").slice(0,10+n).css("display","block");
				//	if(n>=num-10){
				//		mor.css("display","none");
				//	}
				//}
				tea.find("li").css("display","block");
				mor.css("display","none");
			})
		},
		//点击展开
		cliOpe:function(){
			var t = this;
			var con = $(".ev-trTarget_cont");
			var cli = $(".ev-icon-upMore");
			var flag = 1;
			$(".ev-icon-upMore").on("click",function(){
				if(flag==1){
					flag = 0;
					$(this).find("span").text("收起");
					$(this).removeClass("icon-upMore");
					$(this).prev().removeClass("line2");
					$(this).addClass("icon-downHid");
					$(this).parent().next(".reFloor_cont").css("display","block");
					if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
						if($('.mD .ev-trTarget_cont').height()>80){
							$('.mD .ev-trTarget_cont').css("height", t.param.heightmD);
							$('.mD .ev-trTarget_cont').css("overflow","inherit");
						}
						if($('.mB .ev-trTarget_cont').height()>80){
							$('.mD .ev-trTarget_cont').css("height", t.param.heightmB);
							$('.mD .ev-trTarget_cont').css("overflow","inherit");
						}
					}
				}else{
					flag = 1;
					$(this).find("span").text("展开");
					$(this).removeClass("icon-downHid");
					$(this).prev().addClass("line2");
					$(this).addClass("icon-upMore");
					$(this).parent().next(".reFloor_cont").css("display","none");
					if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
						if($('.mD .ev-trTarget_cont').height()>80){
							$('.mD .ev-trTarget_cont').css("height","94px");
							$('.mD .ev-trTarget_cont').css("overflow","hidden");
						}
						if($('.mB .ev-trTarget_cont').height()>80){
							$('.mD .ev-trTarget_cont').css("height", "94px");
							$('.mD .ev-trTarget_cont').css("overflow","hidden");
						}
					}
				}
			})
		},
		//目录与简介的tab切换
		tabCli:function(){
			var t = this;
			$(".de_dire_nav li").on("click",function(){
				$(this).addClass("current").siblings().removeClass("current");
				var index = $(this).attr("data-role");
				$(".departmentTab div[data-role='"+index+"']").show().siblings().hide();
				if($(this).text()=="目录"){
					$(".teachers").css("display","none");
					$(".baseRequire").css("display","none");
				}else{
					$(".teachers").css("display","block");
					$(".baseRequire").css("display","block");
				}
			})
		},
		//简介和目录的吸顶效果
		inTop:function(){
			var t = this;
			$(".line_df").css("zIndex","1");
			var h = $(".tab_box")[0].offsetTop;//吸顶元素距离顶部距离
			$(window).on("scroll",function(){
				var H = $(document).scrollTop();//滑轮滚动的高度
				var inTop = $(".de_dire_nav");
				if(comm.isPC()){
					if(H>=h){
						$(".de_dire_nav").addClass("toTop");
					}else{
						$(".de_dire_nav").removeClass("toTop");
					}
				}else{
					if(H>h){
						$(".de_dire_nav").css("position","fixed");
						$(".de_dire_nav").css("top","0");
						$(".de_dire_nav").css("background","#fff");
					}else{
						$(".de_dire_nav").css("position","absolute");
						$(".de_dire_nav").css("top","");
					}
				}

			})
		},
		//简介的展开收起显示隐藏
		hideShow:function(){
			var t = this;
			var len1 = $.trim($(".mB .ev-trTarget_cont").text()).length;
			var len2 = $.trim($(".mD .ev-trTarget_cont").text()).length;
			if(comm.isPC()){
				if(len1<=160){
					$(".mB").children(".icon-upMore").css("display","none");
					$(".mB").css("paddingBottom","25px");
				}else{
					$(".mB").children(".icon-upMore").css("display","block");
					$(".mB").css("paddingBottom","0");
				}
				if(len2<=160){
					$(".mD").children(".icon-upMore").css("display","none");
					$(".mD").css("paddingBottom","25px");
				}else{
					$(".mD").children(".icon-upMore").css("display","block");
					$(".mD").css("paddingBottom","0");
				}
				if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
					if($('.mD .ev-trTarget_cont').height()>80){
						t.param.heightmD = $('.mD .ev-trTarget_cont').height();
						$('.mD .ev-trTarget_cont').css("height","94px");
						$('.mD .ev-trTarget_cont').css("overflow","hidden");
					}
					if($('.mB .ev-trTarget_cont').height()>80){
						t.param.heightmB = $('.mB .ev-trTarget_cont').height();
						$('.mB .ev-trTarget_cont').css("height","94px");
						$('.mB .ev-trTarget_cont').css("overflow","hidden");
					}
				}
			}else{
				if($(".ev-trTarget_cont_md").height()>=185){
					$(".mD").children(".icon-upMore").css("display","block");
					$(".mD").css("paddingBottom","0");
				}else{
					$(".mD").children(".icon-upMore").css("display","none");
					$(".mD").css("paddingBottom","25px");
				}
				if($(".ev-trTarget_cont_mb").height()>=185){
					$(".mB").children(".icon-upMore").css("display","block");
					$(".mB").css("paddingBottom","25px");
				}else{
					$(".mB").children(".icon-upMore").css("display","none");
					$(".mB").css("paddingBottom","0");
				}
			}
		},
		text: function () {
			$('.ev-trTarget_cont_md').text($('.ev-trTarget_cont_md').text().trim());
			$('.ev-trTarget_cont_mb').text($('.ev-trTarget_cont_mb').text().trim());
		},
		/*
		 * 培训目标和轮转目的内容
		 * 1，获取到原始数据中的内容和长度
		 *,2，将长度存放在cli函数的len中进行显示
		 */
		//兼容ie8的超出隐藏
		/*hidIE:function(){
			var t = this;
			var txt1 = $(".ev-trTarget_cont").text();
			var len1 = $(".ev-trTarget_cont").text().length;
			if(len1>78){
				$(".ev-trTarget_cont").text(txt.substring(0,78) + '...');
			};
			(function cliOpe(){
				var cli = $(".ev-icon-upMore");
				var flag = true;
				cli.on("click",function(){
					var t = this;
					var txt = $(this).prev().text();
					var len = $(this).prev().text().length;
					if(flag){
						flag = false;
						$(this).find("span").text("收起");
						$(this).prev().text(txt.substring(0,len));
						$(this).parent().next(".reFloor_cont").css("display","block");
					}else{
						flag = true;
						$(this).find("span").text("展开");
						$(this).prev().text(txt.substring(0,78) + '...');
						$(this).parent().next(".reFloor_cont").css("display","none");
					}
				});
			}());
		},*/
		//课程页的内容展示
		inner:function(){
			var t = this;
			if(comm.isPC()){
				t.path.contentInner = t.path.contentInner;
			}else{
				t.path.contentInner = domain.changeUrl(t.path.contentInner);
			}
			t.ajaxFn({
				url: t.path.contentInner,
				param:{
					pageIndex:1,
					pageSize:20,
					seriesId:t.config.seriesId,
					customerId:t.config.customerId,
				},
				fn:function(data){
					var status = data.responseObject.responseStatus;
					var list = data.responseObject.responseData.customer_info;
					if(status){
						var list = data.responseObject.responseData.series_info;
						var listCus = data.responseObject.responseData.customer_info;
						var listCou = listCus.courseInfo;
						var pcJumpCourse = listCus.courseInfo.pageStoragePath;//课程的pc跳转路径
						var h5JumpCourse = listCus.courseInfo.webStoragePath;
						var courseTitle = listCus.courseInfo.courseTitle;//课程的标题
						t.config.responsePk = listCus.collectionId;//取消加入系列课程时的id
						var isAddtxt = listCus.isJoinContent;
						var isAdd = listCus.isJoin;//是否加入系列课程0为未加入1为已加入,没有学习记录，2.已加入有学习记录。
						t.config.isAdd = listCus.isJoin;
						$(".chart_zj").text(list.chapterNum);	//章节数
						$(".chart_nr").text(list.courseNum);	//内容数
						$(".chart_cs").text(list.subjectNum);	//练习数
						if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
							document.title=list.seriesTitle+'-医鼎';
						}else{
							$("title").html(list.seriesTitle+'-医鼎');//在title中显示课程名称
						}
						if(isAdd==1||isAdd==2){//用户已经加入了系列课程
							$(".ev-addCourse").css("display","none");
							$(".ev-finCourse").css("display","block");
							$(".de_finclasstext").text('开始学习');
							$(".ev-quitClass").css("display","block");
							$(".ev-finCourse a").text("开始学习");
							$(".ev-finCourse").off("click").on("click",function(){//加入系列课程之后，点击进入课程详情页。
								if(comm.isPC()){
									window.open("//"+pcJumpCourse+"?sourceType=36");
								}else{
									window.open("//"+h5JumpCourse+"?sourceType=36");
								}
							});
							$(".catalog_text").show();
							$(".catalog_text").addClass("current");
							$(".introduction_text").removeClass("current");
							$(".departmentTab div[data-role='b']").show().siblings().hide();
							$(".teachers").css("display","none");
							$(".baseRequire").css("display","none");
						}else{
							//未加入系列课程
							function add(){
								$(".ev-de_addclass").off("click").on("click",function(){
									if(t.config.customerId){
										commLog.creatEvent({"id":54,"url":window.location.href,"keyword":"科室课程页顶部加入系列课程","browseType":"36"});
										if(comm.isPC()){
											t.path.addClass = t.path.addClass;
										}else{
											t.path.addClass = domain.changeUrl(t.path.addClass);
										}
										t.ajaxFn({
											url: t.path.addClass,
											type:"post",
											param:{
												customerId:t.config.customerId,
												joinType:1,
												refId:t.config.seriesId,//课程的id从url中获取
											},
											fn: function(data) {
												var status=data.responseObject.responseStatus;
												if(status){
													$(".ev-addCourse").css("display","none");
													$(".ev-finCourse").css("display","block");
													$(".ev-quitClass").css("display","block");
													$(".ev-finCourse a").text("开始学习");
													$(".catalog_text").show();
													$(".catalog_text").addClass("current");
													$(".introduction_text").removeClass("current");
													$(".departmentTab div[data-role='b']").show().siblings().hide();
													$(".teachers").css("display","none");
													$(".baseRequire").css("display","none");
													add();
												}
											}
										});
										$(".ev-finCourse").off("click").on("click",function(){//加入系列课程之后，点击进入课程详情页。
											if(comm.isPC()){
												window.open("//"+pcJumpCourse+"?sourceType=36");
											}else{
												window.open("//"+h5JumpCourse+"?sourceType=36");
											}
										});
									}else{
										localStorage.setItem("unActive",1);
										commLog.creatEvent({"id":142,"url":window.location.href,"keyword":"加入系列课程去登录","browseType":"36"});
										loginAbout.login.show({
											success: function () {
												loginAbout.login.exit();
												location.reload();
											}
										});
									}
								});
							}
							add();
						}
						if(t.config.customerId){
							$(".ev-quitClass").on("click",function(){
								$(".yd-confirmModalMask.yd-alertModalMask").remove();
								comm.confirmBox({
								    "title":"确定退出系列课程吗?",
								    "content":"退出课程将丢失已有学习进度",
								    "cancel":"退出系列课程",
								    "ensure":"继续学习",
								    "ensureCallback":function(){
								    },
								    "cancelCallback":function(){
								    	t.ajaxFn({
											url:t.path.cancleAdd,
											param:{
												id:t.config.responsePk,//取消加入系列课程的id
												isValid:0,
											},
											fn:function(data){
												var status = data.responseObject.responseStatus;
												if(status){
													add();
												}
											}
								    	})
								    	$(".ev-quitClass").css("display","none");
								    	$(".ev-addBtnH5").css("display","block");
										$(".ev-finBtnH5").css("display","none");
										$(".learnStart").css("display","none");
										if(comm.isPC()==false){
											$(".mlbileAddClass").css("display","block");
										}else{
											$(".mlbileAddClass").css("display","none");
											$(".ev-finCourse").css("display","none");
											$(".ev-addCourse").css("display","inline-block");
											$(".ev-addCourse").css("backgroundImage","url(/image/classes/department/course_list_add.png) no-repeat rem(20px)");
										}
								    }
								});
							})
						}else{
							$(".ev-quitClass").css("display","none");
						}
					}
				},
			});
			t.cliUpDown();//收起展开
			t.tea();//教师
			t.teaMore();//更多教师
			t.cliOpe();//课程简介点击展开
			t.catalog();//目录页
			t.hideShow();
			t.down();//弹层
		},
		//弹层
		down:function(){
			var t = this;
			$(".mlbileAddClass").on("click",function(){
				commLog.creatEvent({"id":55,"url":window.location.href,"keyword":"科室课程页底部加入系列课程","browseType":"36"});
				var url={
					el: $(this),
					ios: "yiding://net.yi-ding.ios",
					ios9: "https://app.yi-ding.net.cn/applinks.html",
					android: "yiding://cn.net.yiding"
				};
				var appData = "data={scene:2,type:2,resourceId:"+$(".depart_head").attr("seriesId")+"}";
				H5scene.goApp(url,appData);
			});
			$(".ev-addBtnH5").on("click",function(){
				commLog.creatEvent({"id":54,"url":window.location.href,"keyword":"科室课程页顶部加入系列课程","browseType":"36"});
				var url={
					el: $(this),
					ios: "yiding://net.yi-ding.ios",
					ios9: "https://app.yi-ding.net.cn/applinks.html",
					android: "yiding://cn.net.yiding"
				};
				var appData = "data={scene:2,type:2,resourceId:"+$(".depart_head").attr("seriesId")+"}";
				H5scene.goApp(url,appData);
			});
		},
		//加入系列课程
		addClass:function(){
			t = this;
			if(comm.isPC()){
				$(".ev-addBtn").off("click").on("click",function(){
					commLog.creatEvent({"id":54,"url":window.location.href,"keyword":"科室课程页顶部加入系列课程","browseType":"36"});
					t.ajaxFn({
        				url: t.path.addClass,
        				type:"post",
        				param:{
        					customerId:t.config.customerId,
        					joinType:1,
        					refId:t.config.seriesId,//课程的id从url中获取
        				},
                        fn: function(data) {
                        	var courseTitle = listCus.courseTitle;//课程的标题
                        	var status=data.responseObject.responseStatus;
                        	if(status){
								$(".ev-addCourse").css("display","none");
								$(".ev-finCourse").css("display","block");
								$(".ev-quitClass").css("display","block");
								$(".ev-finCourse a").text(courseTitle);
                        	}
                        }
                	});
				})
			}
		},
		//获取教师数据
		tea:function(){
			var t = this;
			var tea = $(".ev-teacher_ranking");
			if(comm.isPC()){
				t.path.teacher = t.path.teacher;
			}else{
				t.path.teacher = domain.changeUrl(t.path.teacher);
			}
			t.ajaxFn({
				url:t.path.teacher,
				param:{
					pageIndex:1,
					pageSize:50,
					seriesId:t.config.seriesId,
				},
				fn:function(data){
					var status = data.responseObject.responseStatus;
					if(status){
						var tea = $(".ev-teacher_ranking");
						var list = data.responseObject.responseData.data_list;
						if(list){
							var len = list.length;
							for(var i = 0;i<len;i++){
								var text = '<li class="clear teaIte" cId="'+list[i].refCustomerId+'">'+
							                    '<div class="teacherImg"><img src="'+list[i].authorLogoUrl+'" /></div>'+
							                    '<div class="teacherIntroduction">'+
							                        '<div class="teacherName">'+list[i].authorName+'</div>'+
							                        '<div class="teacherText"><span>'+list[i].medicalTitle+'</span>'+list[i].company+'</div>'+
							                    '</div>'+
							                '</li>'
							    tea.append(text);
							}
							if(len<=4){
								$(".ev-lookMore").css("display","none");
							}else{
								$(".ev-lookMore").css("display","block");
							}
							tea.find("li").eq(0).css("display","block"),
							tea.find("li").eq(1).css("display","block"),
							tea.find("li").eq(2).css("display","block"),
							tea.find("li").eq(3).css("display","block")
						}else{
							$('.ev-lookMore').css('display','none');
						}
					}
				},
			});
		},
		//教师点击PC进入他人主页h5弹层
		teaCli:function(){
			var t = this;
			var teaAll = $(".ev-teacher_ranking");
			teaAll.on("click",".teaIte",function(){
				var autoId = $(this).attr("cId");
				if(comm.isPC()==true){
					window.location.href="//www.yi-ding.net.cn/pages/personal/others_index.html?cId="+autoId;
				}else{
					comm.alertBoxClo({
					    "mTitle":'<img style="height: 80px; width: 152px;" src="/image/index/bigLogo.png"/>',
					    "title":"该内容需在医鼎APP上查看",
					    "ensure":"前往医鼎APP",
					    "ensureCallback":function(){
					    	//console.log("to app");
					    },
					});
				}
			})
		},
		//科室目录页
		catalog:function(){
			var t = this;
			if(comm.isPC()){
				t.path.catalog = t.path.catalog;
			}else{
				t.path.catalog = domain.changeUrl(t.path.catalog);
			}
			t.ajaxFn({
				url:t.path.catalog,
				param:{
					seriesId:t.config.seriesId,
					customerId:t.config.customerId,
				},
				fn:function(data){
					var inner = $(".catalog_cont").find("aside");
					var status = data.responseObject.responseStatus;
					if(status){
						var list = data.responseObject.responseData.data_list;
						var con = $(".catalog_cont").find("aside");
						var len1 = list.length;
						var position = data.responseObject.responseData.position.seriesDirId;
						var asideStr = "";
						for(var i = 0;i<list.length;i++){
							var name = list[i].seriesDirTitle;
							var serId = list[i].seriesDirId;
							asideStr+="<aside data-index='"+i+"' class=\"boneBasis_title ev-boneBasis_title\"><aside class=\'boneBasisTitleNav clear\' data-serid=\'"+serId+"\'><div class=\'boneBasis_titleText\'>"+name+"</div><div class=\'boneBasis_packDown UpDown\'></div></aside>";
							var innerStr = "";
							for(var chiNum = 0;chiNum<list[i].child_map.length;chiNum++){
								var innerName = list[i].child_map[chiNum].seriesDirTitle;
								var innerId = list[i].child_map[chiNum].seriesDirId;
								var serId = list[i].child_map[chiNum].seriesDirId;
								if(comm.isPC()){
									var urlHtmlPc = list[i].child_map[chiNum].refPcUrl;
								}else{
									var urlHtmlH5 = list[i].child_map[chiNum].refH5Url;
								}
								var syuStr = "";
								if(list[i].child_map[chiNum].customer_info){
									var isFinish = list[i].child_map[chiNum].customer_info.isFinish;
									var time = list[i].child_map[chiNum].customer_info.restTime;
									if(isFinish){
										if(isFinish==0){//有观看记录
											if(list[i].child_map[chiNum].customer_info.playTime<60){
												syuStr = "<span class=\"finish\">观看不足1分钟</span>";
											}else{
												syuStr = "<span class=\"finish\">还剩"+time+"</span>";
											}
										}else if(isFinish=='-1'){//没有观看记录
											syuStr = "<span ></span>";
										}else{//已经看完
											syuStr = "<span class=\"finish\">已看完</span>";
										}
									}else{
										syuStr = "<span ></span>";
									}
								}else{
									syuStr = "<span ></span>";
								}
								innerStr+="<li data-inSerId='"+innerId+"' serid='"+serId+"' open='0' jumpurlPc=\'"+urlHtmlPc+"\' jumpurlH5=\'"+urlHtmlH5+"\' ><a href=\'javaScript:;\'>"+innerName+"</a>"+syuStr+"</li>";
							}
							innerStr="<ul class=\"boneBasis_list\" data-index=\""+i+"\" style=\'display: none\' flag=\'0\'>"+innerStr+"</ul></aside>";
							asideStr+=innerStr;
						}
						$(".catalog_cont .clear").append(asideStr);
						t.jumpPage();
						var flag1 = 0;
						for(var z = 0;z<$(".boneBasis_list li").length;z++ ){
							if(localStorage.getItem('userId')) {
								if ($(".boneBasis_list[data-index='" + z + "'] li").attr("serid") == position) {
									flag1 = 1;
									$(".boneBasis_list[data-index='" + z + "']").attr("flag",1);
								}
							}
						}
						for(var z = 0;z<$(".boneBasis_list li").length;z++ ){
							if(localStorage.getItem('userId')){
								if(flag1==1){
									if($(".boneBasis_list[data-index='" + z + "']").attr("flag") == "1"){
										$(".boneBasis_list[data-index='"+ z +"']").show();
										$(".boneBasis_list[data-index='"+z+"']").prev().find("div").eq(1).removeClass("boneBasis_packDown");
										$(".boneBasis_list[data-index='"+z+"']").prev().find("div").eq(1).addClass("boneBasis_packUp");
										return;
									}
								}else{
									$(".boneBasis_list[data-index=0]").show();
									$(".boneBasis_list[data-index=0]").prev().find("div").eq(1).removeClass("boneBasis_packDown");
									$(".boneBasis_list[data-index=0]").prev().find("div").eq(1).addClass("boneBasis_packUp");
									return;
								}
							}else{
								$(".boneBasis_list[data-index=0]").show();
								$(".boneBasis_list[data-index=0]").prev().find("div").eq(1).removeClass("boneBasis_packDown");
								$(".boneBasis_list[data-index=0]").prev().find("div").eq(1).addClass("boneBasis_packUp");
								$(".boneBasis_list[data-index=0]").attr("flag",1);
								return;
							}
						}
					}
				},
			});
		},
		//目录页跳转
		jumpPage:function(){
			var t = this;
			$(".catalog_cont").on("click","li",function(){
				if(comm.isPC()){
					var jumpurlPc = $(this).attr("jumpurlPc");
					window.open('//'+jumpurlPc+'?class=true'+'&sourceType=36');
				}else{
					var jumpurlH5 = $(this).attr("jumpurlH5");
					window.open('//'+jumpurlH5+'?class=true'+'&sourceType=36');
				}
			});
		},
		point:function(){
			var t = this;
			$(".al-search").on("click",function(){
				commLog.creatEvent({"id":32,"url":window.location.href,"keyword":"系列课程点击搜索",browseType:"36"});
			})
		},
	};
	control.init();
})
