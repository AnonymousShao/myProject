
$(function(){
    comm.twoFilterController();//二级菜单
    var controller={
        valid:{
            sortType:4,
            pageIndex:1,
            customerId:'',
            seriesId:0,
            pageSize:10,
        },
        path:{
            content:"//www.yi-ding.net.cn/call/cms/series/course/baseinfo/getFineMapList/",//系列课程内容
            serCourse:"//www.yi-ding.net.cn/call/cms/series/baseinfo/getMapSerachList/",//系列课程标题
        },
        init:function(){
            var t = this;
            comm.pcSideModule([{
                item: "首页",
                href: "//www.yi-ding.net.cn/",
                active: false
            }, {
                item: "课程",
                href: "//www.yi-ding.net.cn/pages/curriculum/curriculum.html",
                active: false
            }, {
                item: "习题",
                href: "//www.yi-ding.net.cn/pages/category/question.html",
                active: false
            }, {
                item: "进阶课程",
                href: "//www.yi-ding.net.cn/pages/index/advancedClass.html",
                active: true
            }]);
            commLog.createBrowse(25,"首页-精品课程列表页");
            t.filCon();//课程内容
            t.sorCon();//排序内容
            t.series();//系列课程
            t.content();//默认加载课程内容
            t.clear();
            t.down();//点击下载
        },
        clear: function () {
            if(localStorage.getItem("vedioMaxTime")){
                localStorage.removeItem("vedioMaxTime");
            }
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
                    ///console.log("XHR Error...");
                },
                beforeSend:function(){
                    comm.loading.show();
                },
            });
        },
        //获取本地customerId
        customer:function(){
            var t =this;
            t.valid.customerId = localStorage.getItem("userId");
        },
        //精品课程内容
        series: function() {
            var t = this;
            t.ajaxFn({
                url: t.path.serCourse,
                async:false,
                param:{
                    pageIndex:1,
                    pageSize:10,
                },
                type:"get",
                fn: function(data) {
                    var status = data.responseObject.responseStatus;
                    var list = data.responseObject.responseData.data_list;
                    if(status){
                        var list = data.responseObject.responseData.data_list;
                        var len = list.length;
                        //$(".yd-typeFilterNavbarItem[data-role='filter'] span").text(list[0].seriesTitle);
                        for (var i = 0; i < len; i++) {
                            var ev = $(".yd-typeFilterMainMask[data-role='filter'] .yd-twoFloorFilter");
                            var text = '<article class="yd-oneFloorFilterItem" data-role="filter" seriesId="'+list[i].seriesId+'">'+list[i].seriesTitle+'</article>'
                            ev.append(text);
                            /*if(i == 0){
                             $(".yd-oneFloorFilterItem[data-role='filter']").addClass("active");
                             t.valid.seriesId = list[0].seriesId;
                             console.log(t.valid.seriesId);
                             }*/
                        }

                    }
                }
            });
            t.claCli();//点击进入课程终端页
        },
        judge: function (callBack) {
            var approveInfo = JSON.parse(localStorage.getItem('approveInfo'));
            if (loginAbout.login.status().state) {
                if (approveInfo.state=='1'||approveInfo.state=='2') {
                    callBack && callBack();
                } else {
                        if (approveInfo.state == "0" || approveInfo.state == "4") {
                            $(".yd-confirmModalMask.yd-alertModalMask").remove();
                            comm.alertBox({
                                "title": "很抱歉！我们正在加紧审核您的认证信息，请耐心等待...",
                                "ensure": "好的",
                                "ensureCallback": function () {

                                }
                            });
                        } else {
                            $(".yd-confirmModalMask.yd-alertModalMask").remove();
                            if($('.authentication-out').length==0) {
                                if(approveInfo.state == "3"){
                                    authentication.init({
                                        "type": "trigger", "success": function () {
                                            authentication.exit();
                                        }
                                    })
                                }else {
                                    comm.confirmBox({
                                        "content": "认证后才能下载课程</br>快去认证，获取完整权限",
                                        "cancel": "暂不认证",
                                        "ensure": "去认证",
                                        "ensureCallback": function () {
                                            authentication.init({
                                                "type": "trigger", "success": function () {
                                                    authentication.exit();
                                                }
                                            })
                                        },
                                        "cancelCallback": function () {

                                        }
                                    });
                                }
                            }
                        }
                }
            } else {
                localStorage.setItem("unActive", "1");
                loginAbout.login.show({"success":function(){
                    localStorage.setItem("userState","true");
                    loginAbout.changeHead();
                    loginAbout.login.exit();
                    /*authentication.init({
                        "type": "trigger", "success": function () {
                            authentication.exit();
                            localStorage.setItem("unActive", 0);
                        }
                    })*/
                }});
            }
        },
        //精品课程的点击进入课程终端页
        claCli:function(){
            var t = this;
            var qua = $("#quality");
            qua.delegate(".contentInnerItem","click",function(e){
                e.stopPropagation();
                var that=$(this);
                t.judge(function () {
                    var jumpurl = that.attr("jumpurl");
                    window.open('//'+jumpurl);
                })
            });
        },
        //点击加载更多课程
        MoreCli:function(){
            var t = this;
            $(".ev-contentInnerMore").off("click").on("click",function(){
                t.valid.pageIndex+=1;//每次增加一页数据
                t.valid.pageSize+=10;
                t.content();
            });
        },
        //filter点击加载内容
        filCon:function(){
            var t = this;
            $(".yd-typeFilterNavbar").on("click",".yd-typeFilterNavbarItem[data-role='filter']",function(){
                if($(".yd-typeFilterMainMask[data-role='filter']").hasClass("active")){
                    commLog.creatEvent({"id":85,"url":window.location.href,"keyword":"列表页筛选呼出","browseType":"25"});
                }
            })
            $(".EV-sortFilter").on("click",".yd-oneFloorFilterItem[data-role='filter']",function(){
                $(".contentItem .contentInnerItem").remove();
                t.valid.seriesId = $(this).attr("seriesId");
                if(t.valid.seriesId==undefined){
                    commLog.creatEvent({"id":86,"url":window.location.href,"keyword":"列表页筛选全部系列课程","browseType":"25"});
                }else{
                    commLog.creatEvent({"id":87,"url":window.location.href,"keyword":"列表页筛选单个课程","browseType":"25"});
                }
                $(".ev-contentInnerMore").show();
                t.valid.pageIndex = 1;
                t.content();//获取列表内容
            });
        },
        //sort点击加载内容
        sorCon:function(){
            var t = this;
            $(".yd-typeFilterNavbar").on("click",".yd-typeFilterNavbarItem[data-role='sort']",function(){
                if($(".yd-typeFilterMainMask[data-role='sort']").hasClass("active")){
                    commLog.creatEvent({"id":88,"url":window.location.href,"keyword":"列表页排序呼出","browseType":"25"});
                }
            });
            $(".EV-sortFilter").on("click",".yd-oneFloorFilterItem[data-role='sort']",function(){
                $(".contentItem .contentInnerItem").remove();
                t.valid.sortType = $(this).attr("sortType");
                switch (t.valid.sortType) {
                    case '4':
                        commLog.creatEvent({"id":89,"url":window.location.href,"keyword":"列表页排序智能排序","browseType":"25"});
                        break;
                    case '5':
                        commLog.creatEvent({"id":90,"url":window.location.href,"keyword":"列表页排序最多评论","browseType":"25"});
                        break;
                    case '1':
                        commLog.creatEvent({"id":91,"url":window.location.href,"keyword":"列表页排序最新发布","browseType":"25"});
                        break;
                }
                t.softCont();
            });
        },

        //获取列表内容
        content:function(){
            var t = this;
            t.ajaxFn({
                url: t.path.content,
                type:"get",
                ansync:false,
                param:{
                    customerId: t.valid.customerId,
                    visitSiteId:13,
                    pageIndex:t.valid.pageIndex,
                    pageSize:10,
                    attUseFlag:3,
                    sortType:t.valid.sortType,
                    seriesId:t.valid.seriesId,//课程id
                },
                fn: function(data) {
                    // console.log(data);
                    var status = data.responseObject.responseStatus;
                    if(status){
                        var obj = data.responseObject.responseData.data_list;
                        var quality = $("#quality");
                        var len = obj.length;
                        for(var i = 0;i<len;i++){
                            if(comm.isPC()){
                                jumpUrl = obj[i].pageStoragePath;
                            }else{
                                jumpUrl = obj[i].webStoragePath;
                            }
                            var text = '<section class="contentInnerItem" jumpUrl="'+jumpUrl+'" seriesId="'+obj[i].courseId+'">'+
                                '<article class="contentInnerContext">'+
                                '<h2>'+obj[i].courseTitle+'</h2>'+
                                '<p><span class="user">'+obj[i].courseAuth.authorName+'</span><span class="hospital">'+obj[i].courseAuth.company+'</span></p>'+
                                '<article class="contentOtherMsg">'+
                                '<span class="resourceType">'+obj[i].seriesTitle+'</span>'+
                                '<i class="icon-comment"></i>'+
                                '<span>'+obj[i].reviewNum+'</span>'+
                                '<div class="iconLoad ev-down">'+
                                '<i class="icon-load"></i>'+
                                '<span>下载</span>'+
                                '</div>'+
                                '</article>'+
                                '</article>'+
                                '<figure class="contentInnerImg">'+
                                '<img src="'+obj[i].videoAttUrl+'" alt="">'+
                                '</figure>'+
                                '</section>'
                            quality.append(text);
                        }
                        if(len<10){
                            $(".ev-contentInnerMore").css("display","none");
                        }
                    }else{
                        t.valid.pageSize-=10;
                        // console.log("已无更多数据");
                        $(".ev-contentInnerMore").hide();
                        // console.log(t.valid.pageSize);
                    }
                }
            });
            t.MoreCli();//加载更多
        },
        //softtype对数据排序
        softCont:function(){
            var t = this;
            t.ajaxFn({
                url: t.path.content,
                type:"get",
                ansync:false,
                param:{
                    customerId: t.valid.customerId,
                    visitSiteId:13,
                    pageIndex:1,
                    pageSize:t.valid.pageSize,
                    attUseFlag:3,
                    sortType:t.valid.sortType,
                    seriesId:t.valid.seriesId,//课程id
                },
                fn: function(data) {
                    var status = data.responseObject.responseStatus;
                    if(status){
                        var obj = data.responseObject.responseData.data_list;
                        var quality = $("#quality");
                        var len = obj.length;
                        for(var i = 0;i<len;i++){
                            if(comm.isPC()){
                                jumpUrl = obj[i].pageStoragePath;
                            }else{
                                jumpUrl = obj[i].webStoragePath;
                            }
                            var text = '<section class="contentInnerItem" jumpUrl="'+jumpUrl+'" seriesId="'+obj[i].courseId+'">'+
                                '<article class="contentInnerContext">'+
                                '<h2>'+obj[i].courseTitle+'</h2>'+
                                '<p><span class="user">'+obj[i].courseAuth.authorName+'</span><span class="hospital">'+obj[i].courseAuth.company+'</span></p>'+
                                '<article class="contentOtherMsg">'+
                                '<span class="resourceType">'+obj[i].courseSubMajorName+'</span>'+
                                '<i class="icon-comment"></i>'+
                                '<span>'+obj[i].reviewNum+'</span>'+
                                '</article>'+
                                '</article>'+
                                '<figure class="contentInnerImg">'+
                                '<img src="'+obj[i].videoAttUrl+'" alt="">'+
                                '</figure>'+
                                '</section>'
                            quality.append(text);
                        }
                        if(len%10!=0){
                            $(".ev-contentInnerMore").css("display","none");
                        }
                    }else{
                        $(".ev-contentInnerMore").css("display","none");
                    }
                }
            });
            t.MoreCli();//加载更多
        },
        //点击下载
        down:function(){
            var t = this;
            $("#quality").on("click",".ev-down",function(e){
                e.stopPropagation();
                t.judge(function () {
                    comm.confirmBox({
                        "title":"",
                        "content":"本视频下载需支付资源费:2元！",
                        "cancel":"取消",
                        "ensure":"确定付费",
                        "ensureCallback":function(){
                            if(localStorage.getItem('userId')){
                                window.location.href="//www.yi-ding.net.cn/pages/pay/pay.html"
                            }else{
                                localStorage.setItem("unActive", "1");
                                loginAbout.login.show({
                                    success: function () {
                                        loginAbout.login.exit();
                                        location.reload();
                                    }
                                });
                            }
                        },
                        "cancelCallback":function(){
                            $(".yd-confirmModalMask").removeClass('show').remove();
                        }
                    });
                })

            })
        },
    }
    controller.init();
});