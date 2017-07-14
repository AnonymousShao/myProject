module.welcomeAuth=function (Obj){
	var size = 150;
	
	if(Obj !== undefined && Obj.size!==undefined) size = Obj.size;
	
//    var name=Common.getpara().name; 
//    $("#name").html(name);
    comm.customer.asyncExecute("getWebUser","",function(data){
		 var responseMsg=data.responseMessage;
		 var customerID=responseMsg.userId;
	     var param={customerId:customerID};
	     comm.customer.asyncExecute("generateAuthTicket",param,function(data){
		      var thisURL = document.URL; 
		      var ticket=data.responseData.ticket;
		      var nickName=data.responseData.nickName;
		      strwrite = "<img src='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+ticket+"&cht=qr&chs=150x150&choe=UTF-8&chld=L|4&chl=" + thisURL + "' width='"+size+"' height='"+size+"' alt='La_Clover提示您：用手机扫一扫二维码，轻松分享' />";
              $(".weixin_erweima").html(strwrite);
		}); 
    });	
};
