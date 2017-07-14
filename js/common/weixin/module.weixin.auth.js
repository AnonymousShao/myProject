/* 微信认证提交，手机提交照片 */
module.weixinAuth=function(){
	 var data=comm.customer.execute("getWebUser",{});
	 var responseMsg=data.responseMessage;
	 var customerID=responseMsg.userId;
     var param={customerId:customerID};
     var responseData=comm.customer.execute("getCustomerUniteAuth",param);  // TODO: 提交
	 var responsedata=responseData.responseData;
	 if(responseData.responseStatus){
		 return  true; //绑定成功
	 }else if(responseData.responseStatus===false && responsedata.flag==2 ){
		//将flag标志改为2
		 comm.customer.execute("updateWeixinFlag",param);
		 return 2;	// 绑定失败
	 }else if(responseData.responseStatus===false && responsedata.flag==4 ) {
		 //将flag标志改为3
		 // 唯医账号已绑定过其他微信号
		 comm.customer.execute("updateWeixinFlag", param);
		 return 4;	// 绑定失败
	 }
	 else{
		 return null; 
	 }
};

