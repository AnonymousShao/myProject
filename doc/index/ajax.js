/**
 * Created by zhanghongda on 2017/3/14.
 */
//获取数据
function ajaxFn(opt) {
    $.ajax({
        type: opt.type?opt.type:post,//请求方式
        url: opt.url,//请求地址
        data: {paramJson: $.toJSON(opt.param)},//将所有的参数数据转换成json，并且用paramJson包裹。
        async: opt.async?opt.async:true,//传值则为所传的值，不串则默认为异步的。
        dataType: "jsonp",
        jsonp: "callback",
        cache:false,//在IE8中首页加入系列课程时，因读取缓存中数据导致数据不能时时更新显示，加上此句，意思为不读取缓存中数据。
        beforeSend: function () {
            comm.loading.show();//发送数据时进行loading图显示
        },
        success: function (data) {
            comm.loading.hide();//loading图隐藏
            if (data) {
                opt.fn(data);//具体执行的方法
            }
        },
        error: function (data) {
            // console.log("Error...");
        },

    });
}

//调用方法
t.ajaxFn({
    url: url,
    type: "get",
    param: {
        customerId: 1,
        visitSiteId: 2,
    },
    fn: function (data) {

    }
})





