module.weixin = function() {
    // var data = comm.customer.execute("getWebUser", {});
    // var responseMsg = data.responseMessage;
    // var customerID = responseMsg.userId;
    var param = { 
    	customerId: localStorage.getItem('userId')
    };
    var responseData = comm.customer.execute("getCustomerUnites", param);
    var responsedata = responseData.responseData;
    if (responseData.responseStatus) {
        return true; //绑定成功
    } else if (responseData.responseStatus === false && responsedata.flag == 2) {
        //将flag标志改为3
        comm.customer.execute("updateWeixinFlag", param);
        return false; // 绑定失败
    } else {
        return null;
    }
};
