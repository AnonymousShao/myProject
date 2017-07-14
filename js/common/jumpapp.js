/**
 * Created by ALLIN on 2016/12/12.
 */
/**
 * @example Common.bindCallApp({ios:"",android:"",element});
 * @desc 绑定唤醒APP的按钮
 * @param  options {Object,runAtOnce:true，android,ios,ios9,el} 表示地址。必须至少包含一个属性：ios,或 android,
 * 修改本函数，需连同allin/personal/app/scripts/services/mainService.js 此文件中同名函数一同修改。
 * */
    var  H5scene={};
    H5scene={
        inint:function () {
            var ydAPPHeader=' <header class="mobileModule contentHeader" id="headerAPP">'+
                '        <figure class="contentHeaderItem">'+
                '            <a href="javascript:void(0)">'+
                '                <i class="icon-download"></i>'+
                '            </a>'+
                '        </figure>'+
                '        <figure class="contentHeaderItem">'+
                '            医鼎'+
                '        </figure>'+
                '        <figure class="ydAppDown">打开医鼎APP</figure>'+
                '        <figure class="contentHeaderItem">'+
                '            <a href="javascript:void(0)">'+
                '                <i class="icon-search"></i>'+
                '            </a>'+
                '        </figure>'+
                '    </header>';
            $('body').prepend(ydAPPHeader);
            $('#headerAPP').show();
            $('.mobileModule .ydAppDown').off('click').on('click',function (e) {
                e.stopPropagation();
                e.preventDefault();
                H5scene.openAPP();
            })
        },


        openAPP:function () {
            var callAppOptions = {
                el: "#headerAPP .ydAppDown",
                ios: "yiding://net.yi-ding.ios",
                // ios9: "yiding://net.yi-ding.ios",
                ios9: "https://app.yi-ding.net.cn/applinks.html",
                android: "yiding://cn.net.yiding",
                runAtOnce:true
            },
                config={
                    androidImgPath:"/image/android.png",
                    iosImgPath:"/image/ios.png",
                    androidUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=cn.net.yiding",
                    iosUrl:"https://itunes.apple.com/cn/app/yi-ding/id1127209482?mt=8"
            };

            bindCallApp(callAppOptions,config);
        },
        goApp:function (url,scence) {

            if (navigator.userAgent.indexOf('QQBrowser') !== -1){
                $(".course-video").hide();
            }

            comm.alertBoxClo({
                "mTitle":"<img style=\'height: 80px; width: 152px;\' src=\'//www.yi-ding.net.cn/image/index/bigLogo.png\'/>",
                "title":"该内容需在医鼎APP上查看",
                "ensure":"前往医鼎APP",
                "ensureCallback":function(){
                    $(".course-video").show();
                    H5scene.goOpenAPP(url,scence);
                },
                "cancelCallback":function(){
                    $(".course-video").show();
                }
            });

            $('.yd-alertModalMask').css({
                "z-index": '10000'
            })
        },
        goOpenAPP:function (url,scence) {
            var postData={};
            if(scence){
                postData.ios=url.ios+'?'+scence;
                postData.ios9=url.ios9+'?'+scence;
                postData.android=url.android+'?'+scence;
            }else {
                postData.ios=url.ios;
                postData.ios9=url.ios9;
                postData.android=url.android;
            }
            // postData.ios=url.ios+'?'+JSON.stringify(scence);
            // postData.ios9=url.ios9+'?'+JSON.stringify(scence);
            // postData.android=url.android+'?'+JSON.stringify(scence);
            var callAppOptions = {
                el: "#headerAPP .ydAppDown,.yd-confirmModalEnsureBtn",
                ios: postData.ios,
                ios9: postData.ios9,
                android: postData.android,
                runAtOnce:true
            },
                config={
                    androidImgPath:"/image/android.png",
                    iosImgPath:"/image/ios.png",
                    androidUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=cn.net.yiding",
                    iosUrl:"https://itunes.apple.com/cn/app/yi-ding/id1127209482?mt=8"
                };

            bindCallApp(callAppOptions,config);
        }
    }
    $(function () {
        H5scene.inint();
    })
