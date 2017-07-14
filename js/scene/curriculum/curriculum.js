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
	var controller={
		init:function(){
			var t = this;
			commLog.createBrowse(2,"分类-课程（9大系列课)");
			t.curIte();//课程内容
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
					// console.log("XHR Error...");
				},
				beforeSend:function(){
					comm.loading.show();
				},
			});
		},
		//课程内容
		curIte:function(){
			var t = this;
			var text = '';
			t.ajaxFn({
				url:"//www.yi-ding.net.cn/call/cms/series/baseInfo/getMapClassifying/",
				type:"post",
				fn:function(data){
					var list = data.responseObject.responseData.data_list;
				    $.each(list,function(i,v){
				    	var seriesObj = $("[seriesid='"+v.seriesId+"']");
				    	var contentObj = seriesObj.find(".curriculumItemCont");
				    	var nameObj = seriesObj.find(".curriculumItemCont .className");
				    	if(contentObj.find(".classTime").length==0){
                            nameObj.after("<span class=\"classTime\">"+v.courseNum+"课时</span>");
						}
					});
					/*for(var i = 0;i<list.length;i++){
						text  = '<span class="classTime">'+list[i].courseNum+'课时</span>';
						//console.log($('.ev-curriculumAll li').length);
						for(var j = 0;j<list.length;j++){
							if(i==j){
								$('.ev-curriculumItem[data-index='+i+'] div').append(text);
								var nam = $('.ev-curriculumItem[data-index='+i+'] .className');
								if(nam.text().length>7){
									nam.text(nam.text().substring(0,7));
								}
							}
						}
					}*/
				},
			});

		},
	}
	controller.init();
})