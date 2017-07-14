/**
 * Created by zhanghongda on 2017/3/14.
 */
comm.alertBoxClo = function (options) {
    if ($('.yd-alertModalMask').length === 0) {
        var template = '<section class="yd-confirmModalMask yd-alertModalMask">' +
            '<section class="yd-confirmModal">' +
            '<article class="yd-confirmModalContent">' +
            '<article style="position:relative">' +
            '<h2>' + (options.mTitle || '') + '</h2>' +
            '<p>' + (options.title || '') + '</p>' +
            '<span><img class="yd-closeBtn" style=" position:absolute; top:-30px; right:-55px; " src="/image/classes/department/login_close.png"/></span>' +
            '</article>' +
            '</article>' +
            '<footer class="yd-confirmModalBtns">' +
            '<button class="yd-confirmModalEnsureBtn" style="width:100%">' + (options.ensure || '') + '</button>' +
            '</footer>' +
            '</section>' +
            '</section>';
        $("body").append(template);

        setTimeout(function (e) {
            $(".yd-alertModalMask").addClass('show');
        }, 50);

        $("body").on("click", ".yd-confirmModalEnsureBtn", function () {
            options.ensureCallback && options.ensureCallback();
            $(".yd-alertModalMask").removeClass('show');
            return false;
        });
        $("body").on("click", ".yd-closeBtn", function () {
            options.cancelCallback && options.cancelCallback();
            $(".yd-alertModalMask").removeClass('show');
            return false;
        });
    } else {
        $(".yd-alertModalMask").addClass('show');
    }
};