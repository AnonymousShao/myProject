/**
 * Created by zhanghongda on 2017/3/15.
 */
comm.confirmBox = function (options) {
    if ($('.yd-confirmModalMask').length === 0) {
        var template = '<section class="yd-confirmModalMask" style="background-color:rgba(0,0,0,0.3); ">' +
            '<section class="yd-confirmModal">' +
            '<article class="yd-confirmModalContent">' +
            '<article>' +
            (options.title ? ('<h2>' + options.title + '</h2>') : '') +
            (options.content ? ('<p>' + options.content + '</p>') : '') +
            '</article>' +
            '</article>' +
            '<footer class="yd-confirmModalBtns">' +
            '<button class="yd-confirmModalCancelBtn">' + options.cancel + '</button>' +
            '<button class="yd-confirmModalEnsureBtn">' + options.ensure + '</button>' +
            '</footer>' +
            '</section>' +
            '</section>';
        $("body").append(template);

        setTimeout(function (e) {
            $(".yd-confirmModalMask").addClass('show');
        }, 100);

        $("body").off('click').on("click", ".yd-confirmModalEnsureBtn", function () {
            options.ensureCallback && options.ensureCallback();
            $(".yd-confirmModalMask").removeClass('show').remove();
            return false;
        }).on("click", ".yd-confirmModalCancelBtn", function () {
            options.cancelCallback && options.cancelCallback();
            $(".yd-confirmModalMask").removeClass('show').remove();
            return false;
        });
        options.callBack && options.callBack();
    } else {
        $(".yd-confirmModalMask").addClass('show');
    }
};

//调用
comm.confirmBox({
    "title":"确定放弃注册吗?",
    "content":"放弃注册,将无法:<br/>浏览完整系列课程<br/>参与课程讨论",
    "cancel":"放弃",
    "ensure":"继续注册",
    "ensureCallback":function(){
        $(".yd-confirmModalMask").removeClass('show').remove();
    },
    "cancelCallback":function(){
        loginAbout.register.exit();
    }
});