(function($){
	$.fn.extend({
		
		lenovonew:function(options){
			 //扩展默认配置
			 options = $.extend({
				 url:"",
				 showName:"name",
				 id:""||"id",
				 hiddenId:"",
			 },options);
			 
			 this.autocomplete(options.url,{
				max: 30,    //列表里的条目数
				minChars: 1,    //自动完成激活之前填入的最小字符
				width: 218,     //提示的宽度，溢出隐藏
				scrollHeight: 200,   //提示的高度，溢出显示滚动条
				matchContains: true,    //包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
				autoFill: false,    //自动填充
				dataType: 'json',
				setFocus:false,
				matchCase :true,
				parse: function(data) {
					if(data.responseObject){
						return $.map(data.responseObject, function(row) {  
							return {  
								data: row,  
								value: row[options.id],  
								result: row[options.showName]  
							}  
						});	
					}
					  
				},  
			    formatItem: function (row, i, max) {
					//显示的值
					return row[options.showName];
				}
			}).result(function(event, row){ 
				if(options.hiddenId){
					$(this).attr(options.hiddenId,row[options.id]);//给元素添加自定义属性
				};
				$("#edu_city").val(row.city);
				$("#edu_city").attr("edu_cityid",row.cityId);	
			});
		}
	});
})(jQuery);
