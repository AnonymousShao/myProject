/**
 * Created by 萤火虫 on 2017/1/4.
 */
var talk = {
    "init":function(options){
        this.container = options.container;
        this.postData = options.postData;
        this.success = options.success;
        this.failed = options.failed;
        this.type = options.type;
        this.onOperate = options.onOperate;
        this.noApprove = options.approve;
        this.noLogin = options.login;
        this.noData = options.nothing;
        this.sortType=options.sortType,
        this.initModel = options.initDisscuss;
        this.reviewType = options.reviewType;
        this.refId =  options.refId;
        this.scene = options.scene;
        this.applyData(this.type,this.postData);
        this.approve = options.approve;
        this.about = options.about;
    },
    about:null,
    type:null,
    approve:null,
    "publicModel":"<div class=\"discussPublish pcModule\" style=\'display: block\'>" +
    "<textarea placeholder=\"请输入你想说的话\"></textarea>" +
    "<div class=\"uploadImg\" style=\"display: none;\">" +
    "<ul class=\"uploadImgContainer\"></ul>" +
    "<div class=\"imgNum\">还能添加9张图片</div>" +
    "</div>" +
    "<div class=\"discussPublishImg\">" +
    "<form class=\"uploadIcon uploadPic\"" +
    " method=\"POST\" " +
    "enctype=\"multipart/form-data\">图片" +
    "<input type=\"file\" " +
    "class=\"postPicButton\" " +
    "name=\"file\" style=\"font-size: 12px;" +
    " cursor: pointer; position: absolute;" +
    " left: 0px; opacity: 0; outline: none; " +
    "width: 50px; height: 30px;\">" +
    "</form>" +
    "<div class=\"uploadBut\">" +
    "<button class=\"al-commentCancel evReviewBoxCancel\">取消</button>" +
    "<button class=\"al-commentCommit evReviewBoxSubmit fb_but\"" +
    " >发表</button>" +
    "</div>" +
    "</div>" +
    "</div>",
    "noLogin":"",
    "noApprove":"",
    "noData":"",
    "initModel":"",
    "port":'//www.yi-ding.net.cn/call/customer/review/json_list/',
    "postData":{},
    "container":null,
    "reviewType":"",
    "refId":"",
    "scene":"",
    discussLen:null,
    htmlToString: function (str) {
        var rstStr = (str + '').replace(/[<>&]/g, function (c) {
            return {'<': '&lt;', '>': '&gt;', '&': '&amp;'}[c];
        });
        var tempArr = rstStr.split("\&lt\;\/a\&gt\;&lt\;a");

        if (tempArr.length >= 2) {
            rstStr = tempArr.map(function (d, index) {
                var s = d.replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)/gi, "<a href=\"$1\">$2");
                s = s.replace(/[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)&lt\;\/a\&gt\;/gi, " href=\"$1\">$2</a>");
                return s;
            }).join("</a><a");
        } else {
            rstStr = (rstStr + '').replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)\&lt\;\/a\&gt\;/gi, "<a href=\"$1\">$2</a>");
            /* 恢复文本中的提醒谁看的A链接*/
        }
        rstStr = rstStr.replace(/@@/g, "@");
        return rstStr;
    },
    toWK: function (x) {
        if (isNaN(parseInt(x))) return 0;

        if (parseInt(x) < 10000 && parseInt(x) > 999) {
            return Math.floor(parseInt(x) / 1000) + "千+";
        } else if (parseInt(x) > 9999) {
            return Math.floor(parseInt(x) / 10000) + "万+";
        } else {
            return x;
        }
    },
    "applyData":function(type,data){
        var postData = {"paramJson":$.toJSON(data)};
        $.ajax({
            url: talk.port,    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: postData,    //参数值
            type: "POST",   //请求方式
            beforeSend: function() {
                //请求前的处理
                comm.loading.show();

            },
            success: function(req) {
                //请求成功时处理
                comm.loading.hide();
                talk.spreadDiscuss(type,req);
            },
            complete: function() {
                //请求完成的处理
            },
            error: function() {
                //请求出错处理
            }
        });
    },
    "scrollOnOff":function(obj,onOff,id){
        if(onOff){
            obj.find(".discussAllList").attr("scrollPagination","disabled").off("scroll");

        }else{
            obj.find(".discussAllList").attr("scrollPagination","enabled");

            talk.scrollPage(obj.find(".discussAllList"),id);
        }

    },
    createDiscuss:function(data){
        var realData = data.responseObject.responseData.data_list;
        var realNoData = ((data.responseObject.responseMessage)=="NO DATA")?true:false;
        var realStatus = data.responseObject.responseStatus;
        var listData = realData;
        var dislength = data.responseObject.responseData.total_count;
        talk.discussLen = dislength;
        var discussStr = "";
        var recoStr = "";
        var duringTime = "";
        var timeStr = "<div class=\"time\"></div>";
        var logSrc = "";
        var logStr = "<div class=\"userImg\"><img src=\"\" alt=\"\"></div>";
        var cusId = "";
        var recommendNum = "";
        var customerCompany = "";
        var customerCompanyStr ="<dt></dt>";
        var customerName = "";
        var nameStr = "<dt class=\"list-name\"><i class=\"icon-vip\"></i></dt>";
        var upNum = "";
        var upNumStr = "<div class=\"praise\"><i></i><span></span></div>";
        var reviewContent = "";
        var reviewStr = "<div class=\"discussThink context\"></div>";
        var medicalTitle = "";
        var discussId = "";
        var parentReviewContent="";
        var imgSrcBox = {};
        var imgBoxData = [];
        var discussContainer = $(".discuss-content .discussAllList");
        function checkStr(str){
            return  str.length>0?true:false;
        }
        for(var disNum = 0;disNum<listData.length;disNum++){
            var isValid = listData[disNum].reviewStatus;
            imgSrcBox["imgIte"+disNum] = [];
            imgBoxData[disNum] = {};
            imgBoxData[disNum].imgData = [];
            for(var attachNum = 0;attachNum<listData[disNum].attachment_list.length;attachNum++){
                imgBoxData[disNum].imgData[attachNum] = {};
                imgBoxData[disNum].imgData[attachNum].time = listData[disNum].attachment_list[attachNum].attachment.uploadTime;
                imgBoxData[disNum].imgData[attachNum].name = "";
                imgBoxData[disNum].imgData[attachNum].src =listData[disNum].attachment_list[attachNum].attachment.reviewAttUrl;
                imgSrcBox["imgIte"+disNum][attachNum]=listData[disNum].attachment_list[attachNum].attachment.reviewAttUrl;
            }
            var imgBoxLen = imgSrcBox["imgIte"+disNum].length;
            var innerImgSrc = "";
            if(listData[disNum].reviewContent!="该条评论已被作者删除"){
                switch (imgSrcBox["imgIte"+disNum].length){
                    case 0:
                        break;
                    case 1:
                        innerImgSrc = "<ul class=\"oneAds\" data-imgData=\'"+JSON.stringify(imgBoxData[disNum].imgData)+"\'>"+
                            "<li><img src=\""+imgSrcBox["imgIte"+disNum][0]+"\"> </li>"+
                            "</ul>" ;
                        break;
                    case 2:
                        innerImgSrc = "<ul class=\"moreAds\" data-imgData=\'"+JSON.stringify(imgBoxData[disNum].imgData)+"\'>"+
                            "<li><img src=\""+imgSrcBox["imgIte"+disNum][0]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][1]+"\"></li>"+
                            "</ul>";
                        break;
                    case 3:
                        innerImgSrc = "<ul class=\"moreAds\" data-imgData=\'"+JSON.stringify(imgBoxData[disNum].imgData)+"\'>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][0]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][1]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][2]+"\"></li>" +
                            "</ul>";
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        var resetImg = imgBoxLen-3
                        innerImgSrc = "<ul class=\"moreAds\" data-imgData=\'"+JSON.stringify(imgBoxData[disNum].imgData)+"\'>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][0]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][1]+"\"></li>"+"<li><img src=\""+imgSrcBox["imgIte"+disNum][2]+"\"><div class=\"numImg\"></div><i><span>还有"+resetImg+"张</span></i></li>" +
                            "</ul>";
                        break;
                    default:
                        break;
                }
            }
            if(listData[disNum].id){
                if(checkStr(listData[disNum].id)){
                    discussId = listData[disNum].id;
                }
            }
            if(listData[disNum].createTime){
                if(checkStr(listData[disNum].createTime)){
                    duringTime = comm.date.diffDay_one(listData[disNum].createTime,comm.date.local_time());
                    timeStr = "<div class=\"time\">"+duringTime+"</div>";
                }
            }
            //头像数据有问题
            var defaultLogUrl = "https://www.yi-ding.net.cn/image/authority/login/normalImg.png";
            if(listData[disNum].customerLogoUrl){
                if(checkStr(listData[disNum].customerLogoUrl)){
                    logSrc = listData[disNum].customerLogoUrl ;
                    logStr = "<div class=\"userImg\"><img src=\""+logSrc+"\" alt=\"\"></div>";
                }else{

                    logStr = "<div class=\"userImg\"><img src=\""+defaultLogUrl+"\" alt=\"\"></div>";
                }
            }else{
                logStr = "<div class=\"userImg\"><img src=\""+defaultLogUrl+"\" alt=\"\"></div>";
            }

            if(listData[disNum].customerId){
                if(checkStr(listData[disNum].customerId)){
                    cusId = listData[disNum].customerId ;
                }
            }
            var parentReviewStr ="";
            var checkDiscussStr ="";
            var parentStr1 ="";
            if(listData[disNum].parentCustomerName.length>0){
                parentStr1 = listData[disNum].parentCustomerName+":";
            }
            if(listData[disNum].parentReviewContent=="该条评论已被作者删除"){
                parentStr1 = "";
            }
            if(listData[disNum].parentReviewContent){
                if(checkStr(listData[disNum].parentReviewContent)){
                    parentReviewContent = (listData[disNum].parentReviewContent);
                    var belongId = "";
                    if(listData[disNum].parentId!="0"){
                        belongId = "";
                    }else{
                        belongId = (listData[disNum].refBelongId.length>0)?listData[disNum].refBelongId:"";
                    }
                    if(listData[disNum].parentId=="0"){
                        parentReviewStr="<div class=\"previousDiscuss previousDiscussOverflow\"  data-refBelongId=\'"+belongId+"\' data-review=\""+listData[disNum].id+"\">"+parentStr1+talk.htmlToString(parentReviewContent)+"</div>";
                    }else {
                        parentReviewStr="<div class=\"previousDiscuss previousDiscussOverflow\"  data-refBelongId=\'"+belongId+"\' data-review=\""+listData[disNum].parentId+"\">"+parentStr1+talk.htmlToString(parentReviewContent)+"</div>";
                    }
                    checkDiscussStr="<div class=\"checkDiscuss context\" data-review=\""+discussId+"\">查看讨论</div>";

                }else{
                    if(listData[disNum].parentId==0){
                        parentReviewStr="<div class=\"previousDiscuss  previousDiscussOverflow lucency\"  data-refBelongId=\'"+belongId+"\' data-review=\""+listData[disNum].id+"\" style='display: none'>"+talk.htmlToString(parentReviewContent)+"</div>";
                    }else {
                        parentReviewStr="<div class=\"previousDiscuss  previousDiscussOverflow lucency\"  data-refBelongId=\'"+belongId+"\' data-review=\""+listData[disNum].parentId+"\" style='display: none'>"+talk.htmlToString(parentReviewContent)+"</div>";
                    }
                    checkDiscussStr="<div class=\"checkDiscuss lucency context\" data-review=\""+discussId+"\">查看讨论</div>";
                }
            }else{
                if(listData[disNum].parentId==0){
                    parentReviewStr="<div class=\"previousDiscuss previousDiscussOverflow lucency\"  data-refBelongId=\'"+belongId+"\' data-review=\""+listData[disNum].id+"\" style='display: none'>"+talk.htmlToString(parentReviewContent)+"</div>";
                }else {
                    parentReviewStr="<div class=\"previousDiscuss previousDiscussOverflow lucency\"  data-refBelongId=\'"+belongId+"\' data-review=\""+listData[disNum].parentId+"\" style='display: none'>"+talk.htmlToString(parentReviewContent)+"</div>";
                }
                checkDiscussStr="<div class=\"checkDiscuss lucency context\" data-review=\""+discussId+"\">查看讨论</div>";
            }


            if(listData[disNum].reviewNum){
                if(checkStr(listData[disNum].reviewNum)){
                    recommendNum = listData[disNum].reviewNum;
                    if(recommendNum=="0"){
                        recommendNum="回复";
                    }else{
                        recommendNum = talk.toWK(listData[disNum].reviewNum);
                    }
                }
            }
            if(listData[disNum].customerName){
                if(checkStr(listData[disNum].customerName)){
                    customerName = listData[disNum].customerName ;
                    if(listData[disNum].customerState==2||listData[disNum].customerState==1){
                        nameStr = "<dt class=\"list-name\">"+customerName+"<i class=\"icon-vip\"></i></dt>";
                    }else {
                        nameStr = "<dt class=\"list-name\">"+customerName+"<i></i></dt>";
                    }
                }else{
                    nameStr = "<dt class=\"list-name lucency\">"+"暂未认证"+"<i></i></dt>";
                }
            }else{
                nameStr = "<dt class=\"list-name lucency\">"+"暂未认证"+"<i></i></dt>";
            }

            if(listData[disNum].customerCompany){
                if(checkStr(listData[disNum].customerCompany)){
                    customerCompany = listData[disNum].customerCompany ;
                    customerCompanyStr ="<dt>"+customerCompany+"</dt>";
                }else{
                    customerCompanyStr ="<dt class='lucency'>"+"暂未认证"+"</dt>";
                }
            }else{
                customerCompanyStr ="<dt class='lucency'>"+"暂未认证"+"</dt>";
            }
            var praiseStatus = "";
            if(listData[disNum].isPrefer=="1"){
                praiseStatus = "selected";
            }
            if(listData[disNum].upNum){
                if(checkStr(listData[disNum].upNum)){
                    upNum = listData[disNum].upNum ;
                    if(upNum=="0"){
                        upNum="点赞";
                    }else{
                        upNum=talk.toWK(upNum);
                    }
                    if(listData[disNum].isPrefer=='0'){
                        upNumStr = "<div class=\"praise\"    data-discussid=\'"+discussId+"\'><i></i><span>"+upNum+"</span></div>";
                    }else {
                        if(upNum=="点赞"){
                            upNum=1;
                        }
                        upNumStr = "<div class=\"praise\"    data-discussid=\'"+discussId+"\'><i class='"+praiseStatus+"'  data-praiseid=\'"+listData[disNum].preferId+"\'></i><span>"+upNum+"</span></div>";
                    }
                }
            }
            if(listData[disNum].reviewContent){
                if(checkStr(listData[disNum].reviewContent)){
                    reviewContent = listData[disNum].reviewContent ;
                    reviewStr = "<div class=\"discussThink context\"  data-review=\""+discussId+"\">"+talk.htmlToString(reviewContent)+"</div>";
                }else {
                    reviewStr = "<div class=\"discussThink context\"  data-review=\""+discussId+"\">"+''+"</div>";
                }
            }else {
                reviewStr = "<div class=\"discussThink context\"  data-review=\""+discussId+"\">"+''+"</div>";
            }
            if(listData[disNum].medicalTitle){
                if(checkStr(listData[disNum].medicalTitle)){
                    medicalTitle = listData[disNum].medicalTitle;
                    customerCompanyStr ="<dt>"+customerCompany+"</dt>";
                }
            }
            recoStr+="<li class=\"disscussIteam clear\" data-userId=\'"+cusId+"\' data-isvalid='"+isValid+"'>" +
                "<div class=\"userTime clear\">" +
                "<div class=\"userCont clear\"  data-cusid=\'"+cusId+"\'>" +
                logStr+
                "<dl>" +
                nameStr +
                customerCompanyStr +
                "</div>" +
                timeStr +
                "</div>" +
                parentReviewStr +
                reviewStr +
                "<div class=\"discussAds\"   data-discussid=\'"+discussId+"\'>" +
                innerImgSrc +
                "</div>" +
                "<div class=\"clear\">" +
                "<div class=\"discussDelete none\"     data-discussid=\'"+discussId+"\'>删除</div>" +
                checkDiscussStr +
                "<div class=\"disscussFunction clear\">" +
                "<div class=\"aswer\"    data-discussid=\'"+discussId+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i></i><span>"+recommendNum+"</span></div>" +
                upNumStr +
                "</div>" +
                "</div>" +
                "</li>";
        }
        return recoStr;
    },
    "spreadDiscuss":function(type,data){
        var realData = data.responseObject.responseData.data_list;
        var realNoData = ((data.responseObject.responseMessage)=="NO DATA")?true:false;
        var realStatus = data.responseObject.responseStatus;
        switch (type){
            case "disscuss":
                if(realNoData||!realStatus){
                    if(talk.about=="course"){
                        talk.container.find(".discuss-content .discussAllList").attr({"scrollpagination":"disabled"});
                    }else{
                        talk.container.attr({"scrollpagination":"disabled"});
                    }
                    this.failed&&this.failed();
                }else{
                    if(data.responseObject.responseData.data_list.length>0){
                        this.success&&this.success(talk.createDiscuss(data),data.responseObject.responseData.data_list[0].refId);
                    }
                }
                break;
            case "disscussLine":
                talk.createDiscussLine(data);
                break;
        }


    },
    createDiscussLine:function(data){
        talk.onOperate&&talk.onOperate();
        if(talk.about=="course"){
            commLog.creatEvent({"id":159,"url":window.location.href,"keyword":"课程终端页呼出对划线","browseType":"38","browseTypeSourceUrl":window.location.href});
        }else {
            commLog.creatEvent({"id":76,"url":window.location.href,"keyword":"习题讨论呼出对划线","browseType":"34","browseTypeSourceUrl":window.location.href});
        }
        comm.maskBackground.show("rgba(0,0,0,.6)");
        var outContainer = $(".yd-maskBackground");
        function checkStr(str) {
            return str.length > 0 ? true: false;
        }

        var listData = data.responseObject.responseData.data_list;
        var reviewStr = "";
        var imgSrcBox = {};
        var discussId = "";
        var duringTime = "";
        var timeStr = "";
        var logSrc = "";
        var logStr = "";
        var cusId = "";
        var reviewContent = "";
        var recommendNum = "";
        var customerName = "";
        var nameStr = "";
        var customerCompanyStr = "";
        var upNum = "";
        var upNumStr = "";
        var recommendStr = "";
        var recoStr = "";
        var imgBoxData = [];
        var headerTitleClass = "";
        var quename = "";
        var quedisLock = true;
        if(data.responseObject.responseData.head_message){
            quename = data.responseObject.responseData.head_message.questionName;
            quedisLock = false;
        }
        var titleName = data.responseObject.responseData.belongTitle||quename;
        var coursename = "";
        if(data.responseObject.responseData.head_message){
            coursename = data.responseObject.responseData.head_message.courseTitle;
        }
        var courseTitle = data.responseObject.responseData.title||coursename;
        var courseTitleStr = "";
        if(courseTitle.length>0){
            courseTitleStr+="<header class=\"yd-timelineTitle\"><h2>"+courseTitle+"</h2><a class=\"btn-primary al-timelineFollow\"></a></header>";
        }
        if(titleName.length==0){
            headerTitleClass = "lucency";
        }
        for (var disNum = 0; disNum < listData.length; disNum++) {
            var isValid = listData[disNum].reviewStatus;
            imgSrcBox["imgIte" + disNum] = [];
            imgBoxData[disNum] = {};
            imgBoxData[disNum].imgData = [];
            for (var attachNum = 0; attachNum < listData[disNum].attachment_list.length; attachNum++) {
                imgBoxData[disNum].imgData[attachNum] = {};
                imgBoxData[disNum].imgData[attachNum].time = listData[disNum].attachment_list[attachNum].attachment.uploadTime;
                imgBoxData[disNum].imgData[attachNum].name = "";
                imgBoxData[disNum].imgData[attachNum].src = listData[disNum].attachment_list[attachNum].attachment.reviewAttUrl;
                imgSrcBox["imgIte" + disNum][attachNum] = listData[disNum].attachment_list[attachNum].attachment.reviewAttUrl;
            }
            var innerImgSrc = "";
            var imgBoxLen = imgSrcBox["imgIte" + disNum].length;
            if(listData[disNum].reviewContent!="该条评论已被作者删除") {
                switch (imgSrcBox["imgIte" + disNum].length) {
                    case 0:

                        break;
                    case 1:
                        innerImgSrc = "<section class=\"yd-timelineImgBox\" data-discussid=\'"+listData[disNum].id+"\' data-imgData=\'" + JSON.stringify(imgBoxData[disNum].imgData) + "\'>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][0] + "\" alt=\"\"></figure>" +
                            "</section>";
                        break;
                    case 2:
                        innerImgSrc = "<section class=\"yd-timelineImgBox\" data-discussid=\'"+listData[disNum].id+"\' data-imgData=\'" + JSON.stringify(imgBoxData[disNum].imgData) + "\'>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][0] + "\" alt=\"\"></figure>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][1] + "\" alt=\"\"></figure>" +
                            "</section>";
                        break;
                    case 3:
                        innerImgSrc = "<section class=\"yd-timelineImgBox\" data-discussid=\'"+listData[disNum].id+"\' data-imgData=\'" + JSON.stringify(imgBoxData[disNum].imgData) + "\'>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][0] + "\" alt=\"\"></figure>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][1] + "\" alt=\"\"></figure>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][2] + "\" alt=\"\"></figure>" +
                            "</section>";
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        var resetImg = imgBoxLen - 3;
                        innerImgSrc = "<section class=\"yd-timelineImgBox\" data-discussid=\'"+listData[disNum].id+"\'     data-imgData=\'" + JSON.stringify(imgBoxData[disNum].imgData) + "\'>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][0] + "\" alt=\"\"></figure>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][1] + "\" alt=\"\"></figure>" +
                            "<figure class=\"yd-timelineImg\"><img src=\"" + imgSrcBox["imgIte" + disNum][2] + "\" alt=\"\"><figure class=\"yd-moreImgMask\"><p>还有<span>" + resetImg + "</span>张<i class=\"icon-detailsArrow\"></i></p></figure></figure>" +
                            "</section>";
                        break;
                    default:
                        break;
                }
            }
            if (listData[disNum].id) {
                if (checkStr(listData[disNum].id)) {
                    discussId = listData[disNum].id;
                }
            }
            if (listData[disNum].createTime) {
                if (checkStr(listData[disNum].createTime)) {
                    duringTime = comm.date.diffDay_one(listData[disNum].createTime, comm.date.local_time());
                    timeStr = "<p class=\"yd-timelineTime\">" + duringTime + "</p>";
                }
            }
            //头像数据有问题
            var defaultLogUrl = "//www.yi-ding.net.cn/image/authority/login/normalImg.png";
            var userJumpStr = "";
            if (listData[disNum].customerLogoUrl) {
                if (checkStr(listData[disNum].customerLogoUrl)) {
                    logSrc = listData[disNum].customerLogoUrl;
                    if(loginAbout.login.status().userId==listData[disNum].customerId){
                        userJumpStr = "javascript:void(0)";
                    }else{
                        userJumpStr = "https://www.yi-ding.net.cn//pages/personal/others_index.html?cId="+listData[disNum].customerId;
                    }
                    logStr = "<a href=\""+userJumpStr+"\" target='_blank'><img src=\"" + logSrc + "\" alt=\"\"></a>";
                } else {
                    logStr = "<a href=\""+userJumpStr+"\" target='_blank'><img src=\"" + defaultLogUrl + "\" alt=\"\"></a>";
                }
            } else {
                logStr = "<a href=\""+userJumpStr+"\" target='_blank'><img src=\"" + defaultLogUrl + "\" alt=\"\"></a>";
            }

            if (listData[disNum].customerId) {
                if (checkStr(listData[disNum].customerId)) {
                    cusId = listData[disNum].customerId;
                }
            }
            if (listData[disNum].reviewContent) {
                if (checkStr(listData[disNum].reviewContent)) {
                    var parentName = listData[disNum].parentCustomerName;
                    reviewContent = listData[disNum].reviewContent;
                    if(parentName!=''){
                        reviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">回复给" + parentName + "：</a>" + talk.htmlToString(reviewContent) +  innerImgSrc+"</article>";
                    }else {
                        reviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">" + parentName + "</a>" + talk.htmlToString(reviewContent) +  innerImgSrc+"</article>";
                    }
                }
            }else {
                reviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">" + '' + "</a>" + '' +  innerImgSrc+"</article>";
            }

            if (listData[listData.length-1].reviewNum) {
                if (checkStr(listData[listData.length-1].reviewNum)) {
                    recommendNum = listData[listData.length-1].reviewNum;
                    if (recommendNum == "0") {
                        recommendNum = "回复";
                    }else{
                        recommendNum = talk.toWK(listData[listData.length-1].reviewNum);
                    }
                    if(quedisLock){
                        recommendStr = "<div class=\"aswer\" data-discussid=\'"+listData[disNum].id+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i></i><span>" + recommendNum + "</span></div>";
                    }else{
                        recommendStr = "<div class=\"aswer\" data-discussid=\'"+0+"\' data-refBelongId=\'"+listData[disNum].refBelongId+"\'><i></i><span>" + data.responseObject.responseData.total_count + "</span></div>";
                    }

                }
            }
            if (listData[disNum].customerName) {
                if (checkStr(listData[disNum].customerName)) {
                    customerName = listData[disNum].customerName;
                    if(listData[disNum].customerState==2||listData[disNum].customerState==1){
                        nameStr = "<a href=\"javascript:void(0)\">" + customerName + "<i class=\"yd-vipUser\"></i></a>";
                    }else {
                        nameStr = "<a href=\"javascript:void(0)\">" + customerName + "<i></i></a>";
                    }
                } else {
                    nameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
                }
            } else {
                nameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
            }
            var customerCompany = "";
            if (listData[disNum].customerCompany) {
                if (checkStr(listData[disNum].customerCompany)) {
                    customerCompany = listData[disNum].customerCompany;
                    customerCompanyStr = "<span>" + customerCompany + "</span>";
                } else {
                    customerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                }
            } else {
                customerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
            }
            var preferStatus = "";
            if(quedisLock){
                if(listData[listData.length-1].isPrefer=="1"){
                    preferStatus = "selected";
                }
                if (listData[listData.length-1].upNum) {
                    if (checkStr(listData[listData.length-1].upNum)) {
                        upNum = listData[listData.length-1].upNum;
                        if (upNum == "0") {
                            upNum = "点赞";
                        }else{
                            upNum = talk.toWK(listData[listData.length-1].upNum);
                        }
                        if(listData[disNum].isPrefer=='0'){
                            upNumStr = "<div class=\"praise\"    data-discussid=\'"+discussId+"\'><i class=\'"+preferStatus+"\'  data-praiseid=\'"+listData[listData.length-1].preferId+"\'></i><span>"+upNum+"</span></div>";
                        }else {
                            if(upNum=="点赞"){
                                upNum=1;
                            }
                            upNumStr = "<div class=\"praise\"    data-discussid=\'"+discussId+"\'><i class=\'"+preferStatus+"\'  data-praiseid=\'"+listData[listData.length-1].preferId+"\'></i><span>"+upNum+"</span></div>";
                        }
                    }
                }
            }else{
                if(data.responseObject.responseData.head_message.preferStatus=="1"){
                    preferStatus = "selected";
                }
                if (data.responseObject.responseData.head_message.questionPreferNum) {
                    if (checkStr(data.responseObject.responseData.head_message.questionPreferNum)) {
                        upNum = data.responseObject.responseData.head_message.questionPreferNum;
                        if (upNum == "0") {
                            upNum = "点赞";
                        }else{
                            upNum = talk.toWK(data.responseObject.responseData.head_message.questionPreferNum);
                        }
                        if(listData[disNum].isPrefer=='0'){
                            upNumStr = "<div class=\"praise\"    data-thinkid=\'"+listData[disNum].refBelongId+"\'><i class=\'"+preferStatus+"\'  data-praiseid=\'"+listData[listData.length-1].preferId+"\'></i><span>"+upNum+"</span></div>";
                        }else {
                            if(upNum=="点赞"){
                                upNum=1;
                            }
                            upNumStr = "<div class=\"praise\"    data-thinkid=\'"+listData[disNum].refBelongId+"\'><i class=\'"+preferStatus+"\'  data-praiseid=\'"+listData[listData.length-1].preferId+"\'></i><span>"+upNum+"</span></div>";
                        }
                    }
                }
            }

            recoStr += "<section class=\"yd-timelineContentItemBox\" ><i class=\"yd-timeline\"></i><article class=\"yd-timelineContentItem\"><figure class=\"yd-timelineUserImg\">" + logStr + "</figure><article class=\"yd-timelineContentTextBox\"><header class=\"yd-timelineContentAuthor\">" + nameStr + customerCompanyStr + timeStr + "</header>" + reviewStr + "</article>" + "</article>" +"</section>";

        }
        var crecoStr = "";
        if(listData[listData.length - 1].child_list){
            if (listData[listData.length - 1].child_list.length > 0) {
                var childData = listData[listData.length - 1].child_list;
                var creviewStr = "";
                var cimgSrcBox = {};
                var cdiscussId = "";
                var cduringTime = "";
                var ctimeStr = "";
                var clogSrc = "";
                var clogStr = "";
                var ccusId = "";
                var creviewContent = "";
                var crecommendNum = "";
                var ccustomerName = "";
                var cnameStr = "";
                var ccustomerCompanyStr = "";
                var cupNum = "";
                var cupNumStr = "<div class=\"praise\"><i></i><span></span></div>";
                var cimgBoxData = [];
                for (var childNum = 0; childNum < childData.length; childNum++) {
                    var cisValid = childData[childNum].reviewStatus;
                    cimgSrcBox["imgIte" + childNum] = [];
                    cimgBoxData[childNum] = {};
                    cimgBoxData[childNum].imgData = [];
                    for (var cattachNum = 0; cattachNum < childData[childNum].attachment_list.length; cattachNum++) {
                        cimgBoxData[childNum].imgData[cattachNum] = {};
                        cimgBoxData[childNum].imgData[cattachNum].time = childData[childNum].attachment_list[cattachNum].attachment.uploadTime;
                        cimgBoxData[childNum].imgData[cattachNum].name = "";
                        cimgBoxData[childNum].imgData[cattachNum].src = childData[childNum].attachment_list[cattachNum].attachment.reviewAttUrl;
                        cimgSrcBox["imgIte" + childNum][cattachNum] = childData[childNum].attachment_list[cattachNum].attachment.reviewAttUrl;
                    }
                    var cinnerImgSrc = "";
                    var cimgBoxLen = cimgSrcBox["imgIte" + childNum].length;
                    if(childData[childNum].reviewContent!="该条评论已被作者删除") {
                        switch (cimgSrcBox["imgIte" + childNum].length) {
                            case 0:

                                break;
                            case 1:
                                cinnerImgSrc = "<section class=\"yd-timelineImgBox\"     data-discussid=\'"+childData[childNum].id+"\'  data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                    "</section>";
                                break;
                            case 2:
                                cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'   data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                    "</section>";
                                break;
                            case 3:
                                cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'   data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][2] + "\" alt=\"\"></figure>" +
                                    "</section>";
                                break;
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                                var cresetImg = cimgBoxLen - 3;
                                cinnerImgSrc = "<section class=\"yd-timelineImgBox\"    data-discussid=\'"+childData[childNum].id+"\'  data-imgData=\'" + JSON.stringify(cimgBoxData[childNum].imgData) + "\'>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][0] + "\" alt=\"\"></figure>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][1] + "\" alt=\"\"></figure>" +
                                    "<figure class=\"yd-timelineImg\"><img src=\"" + cimgSrcBox["imgIte" + childNum][2] + "\" alt=\"\"><figure class=\"yd-moreImgMask\"><p>还有<span>" + cresetImg + "</span>张<i class=\"icon-detailsArrow\"></i></p></figure></figure>" +
                                    "</section>";
                                break;
                            default:
                                break;
                        }
                    }
                    if (childData[childNum].id) {
                        if (checkStr(childData[childNum].id)) {
                            cdiscussId = childData[childNum].id;
                        }
                    }
                    if (childData[childNum].createTime) {
                        if (checkStr(childData[childNum].createTime)) {
                            cduringTime = comm.date.diffDay_one(childData[childNum].createTime, comm.date.local_time());
                            ctimeStr = "<p class=\"yd-timelineTime\">" + cduringTime + "</p>";
                        }
                    }
                    //头像数据有问题
                    var cdefaultLogUrl = "//www.yi-ding.net.cn/image/authority/login/normalImg.png";
                    if (childData[childNum].customerLogoUrl) {
                        if (checkStr(childData[childNum].customerLogoUrl)) {
                            clogSrc = childData[childNum].customerLogoUrl;
                            clogStr = "<a href=\"javascript:void(0)\"><img src=\"" + clogSrc + "\" alt=\"\"></a>";
                        } else {
                            logStr = "<a href=\"javascript:void(0)\"><img src=\"" + cdefaultLogUrl + "\" alt=\"\"></a>";
                        }
                    } else {
                        clogStr = "<a href=\"javascript:void(0)\"><img src=\"" + cdefaultLogUrl + "\" alt=\"\"></a>";
                    }

                    if (childData[childNum].customerId) {
                        if (checkStr(childData[childNum].customerId)) {
                            ccusId = childData[childNum].customerId;
                        }
                    }
                    if (childData[childNum].reviewContent) {
                        if (checkStr(childData[childNum].reviewContent)) {
                            var cparentName = childData[childNum].parentCustomerName;
                            creviewContent = childData[childNum].reviewContent;
                            creviewStr = "<article class=\"yd-timelineContentText\"><a href=\"javascript:void(0)\">回复给" + cparentName + "：</a>" + talk.htmlToString(creviewContent) + "</article>";
                        } else {

                        }
                    }
                    /*var crecommendStr = "<div class=\"aswer\" data-discussid=\'"+childData[childNum].parentId+"\' data-refBelongId=\'"+childData[childNum].refBelongId+"\'><i></i><span></span></div>";
                     if (childData[childNum].reviewNum) {
                     if (checkStr(childData[childNum].reviewNum)) {
                     crecommendNum = childData[childNum].reviewNum;
                     if (crecommendNum == "0") {
                     crecommendNum = "回复";
                     }
                     crecommendStr = "<div class=\"aswer\"  data-discussid=\'"+childData[childNum].parentId+"\' data-refBelongId=\'"+childData[childNum].refBelongId+"\'><i></i><span>" + crecommendNum + "</span></div>";
                     } else {

                     }
                     }*/
                    if (childData[childNum].customerName) {
                        if (checkStr(childData[childNum].customerName)) {
                            ccustomerName = childData[childNum].customerName;
                            if(childData[childNum].customerState==2||childData[childNum].customerState==1){
                                cnameStr = "<a href=\"javascript:void(0)\">" + ccustomerName + "<i class=\"yd-vipUser\"></i></a>";
                            }else {
                                cnameStr = "<a href=\"javascript:void(0)\">" + ccustomerName + "<i></i></a>";
                            }
                        } else {
                            cnameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
                        }
                    } else {
                        cnameStr = "<a href=\"javascript:void(0)\" class=' lucency'>" + "暂未认证" + "<i></i></a>";
                    }
                    var ccustomerCompany = "";
                    if (childData[childNum].customerCompany) {
                        if (checkStr(childData[childNum].customerCompany)) {
                            ccustomerCompany = childData[childNum].customerCompany;
                            ccustomerCompanyStr = "<span>" + ccustomerCompany + "</span>";
                        } else {
                            ccustomerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                        }
                    } else {
                        ccustomerCompanyStr = "<span  class='lucency'>" + "暂未认证" + "</span>";
                    }
                    /*if (childData[childNum].upNum) {
                     if (checkStr(childData[childNum].upNum)) {
                     cupNum = childData[childNum].upNum;
                     if (cupNum == "0") {
                     cupNum = "点赞";
                     }
                     if(childData[childNum].isPrefer=='0'){
                     cupNumStr = "<div class=\"praise\"   data-discussid=\'"+discussId+"\'><i></i><span>"+cupNum+"</span></div>";
                     }else {
                     if(cupNum=="点赞"){
                     cupNum=1;
                     }
                     cupNumStr = "<div class=\"praise\"   data-discussid=\'"+discussId+"\'><i class='selected'  data-praiseid=\'"+childData[disNum].preferId+"\'></i><span>"+cupNum+"</span></div>";
                     }
                     } else {

                     }
                     }*/
                    crecoStr += "<section class=\"yd-timelineContentItemBox\"><i class=\"yd-timeline\"></i><article class=\"yd-timelineContentItem\"><figure class=\"yd-timelineUserImg\">" + clogStr + "</figure><article class=\"yd-timelineContentTextBox\"><header class=\"yd-timelineContentAuthor\">" + cnameStr + ccustomerCompanyStr + ctimeStr + "</header>" + creviewStr + cinnerImgSrc+"</article>" + "</article>" + "</section>";
                }
            }
        }
        var discussStr = "";
        if(quedisLock){
            discussStr = "<section class=\"exercise-discuss\">" + "<header class=\"al-commentDetailsTitle ev-title\">讨论<i class=\"al-commentDetailsClose ev-close\"></i></header>" + "<section class=\"yd-timelineContent\">" + courseTitleStr+"<header class=\"yd-timelineTitle "+headerTitleClass+"\"><h2>" + titleName + "</h2><a class=\"btn-primary al-timelineFollow\"></a></header>" + recoStr + "<footer class=\"yd-timelineFooter\"><div class=\"clear\"><div class=\"disscussFunction clear\">"+recommendStr+upNumStr+"</div></div></footer>" + "</section>" + "<section class=\"yd-timelineContent al-replayComment\">" + crecoStr + "</section>"  + "</section>";
            outContainer.html(discussStr);
        }else{
            discussStr = "<section class=\"exercise-discuss\">" + "<header class=\"al-commentDetailsTitle ev-title\">讨论<i class=\"al-commentDetailsClose ev-close\"></i></header>" +"<section class=\"yd-timelineContent\">" + courseTitleStr+"<header class=\"yd-timelineTitle "+headerTitleClass+"\"><h2>" + titleName + "</h2><a class=\"btn-primary al-timelineFollow\"></a></header>" +"<footer class=\"yd-timelineFooter\"><div class=\"clear\"><div class=\"disscussFunction clear\">"+recommendStr+upNumStr+"</div></div></footer>" +  recoStr + "</section>" + "<section class=\"yd-timelineContent al-replayComment\">" + crecoStr + "</section>"  + "</section>";
            outContainer.html(discussStr);
            $(".yd-timeline").each(function(){
                $(this).remove();
            });
        }

        $(".al-commentDetailsTitle").next().addClass("courseTopBg");
        outContainer.find(".yd-timelineFooter").prev().find(".yd-timelineContentTextBox").addClass("discussBorNone");
        $(".al-commentDetailsClose").unbind("click").bind("click",function(){
            outContainer.remove();
        });
        talk.partInDiss();
    },
    "public":function(option){
        $(".discussPublish").remove();
        var discussStr = "<div class=\"discussPublish pcModule\" data-discussid=\"" + option.parentid + "\" style=\'display: block\'>" +
            "<textarea placeholder=\"请输入你想说的话\"></textarea>" +
            "<div class=\"uploadImg\" style=\"display: none;\">" +
            "<ul class=\"uploadImgContainer\"></ul>" +
            "<div class=\"imgNum\">还能添加9张图片</div>" +
            "</div>" +
            "<div class=\"discussPublishImg\">" +
            "<form class=\"uploadIcon uploadPic\"" +
            " method=\"POST\" " +
            "enctype=\"multipart/form-data\">图片" +
            "<input type=\"file\" " +
            "class=\"postPicButton\" " +
            "name=\"file\" style=\"font-size: 12px;" +
            " cursor: pointer; position: absolute;" +
            " left: 0px; opacity: 0; outline: none; " +
            "width: 50px; height: 30px;\">" +
            "</form>" +
            "<div class=\"uploadBut\">" +
            "<button class=\"al-commentCancel evReviewBoxCancel\">取消</button>" +
            "<button class=\"al-commentCommit evReviewBoxSubmit fb_but\"" +
            " >发表</button>" +
            "</div>" +
            "</div>" +
            "</div>";
        switch (option.position){
            case "before":
                option.container.before(discussStr);
                break;
            case "after":
                option.container.after(discussStr);
                break;
            case "append":
                option.container.append(discussStr);
                break;
            case "inner":
                option.container.html(discussStr);
                break;
            default:
                break;
        }

        var obj = option.container.parent().find(".discussPublish");
        var postPicBtn = obj.find(".postPicButton");
        var imgConatiner = obj.find(".uploadImgContainer");
        var imgSide = obj.find(".uploadImg");
        var imgNumLis = obj.find(".imgNum");
        var contentInput = obj.find("textarea");
        var contentStr = "";
        contentInput.unbind("input propertychange").bind("input propertychange", function () {
            if ($(this).val().length > 0) {
                contentStr = $(this).val();
            }
        });
        imgSide.hide();
        /*实现图片本地预览*/
        postPicBtn.unbind("change").bind("change", function () {
            //$(this).attr({"disabled":false});
            $(".discussPublishImg").click(function(){
                return false;
            });
            var isThisChange = $(this);
            var postData = {
                "imageType": "5"
            };
            var isThis = this;
            var checkLen = imgConatiner.find("li").length;
            if (checkLen < 9) {
                obj.find(".uploadNow").removeClass('uploadNow');
                if(!comm.browser.msie){
                    imgConatiner.append("<li class=\"uploadNow\" data-imgid=\'\'><div class='postImgloadingBg'></div><div class='postImgloading'></div><img src=\"\"><button class=\"delePostImg\"></button> </li>");
                    var nowImgObj = obj.find(".uploadNow img");
                    var imgType = ["bmp", "gif", "png", "jpg","jpeg"];
                    if (isThis.value) {
                        if (!RegExp("\.(" + imgType.join("|") + ")$", "i").test(isThis.value.toLowerCase())) {
                            //alert("图片类型必须是" + imgType.join("，") + "中的一种");
                            popup({
                                // "hasImg":false,
                                "text": "图片限于bmp,png,gif,jpg,jpeg格式"
                            });
                            var uploadImgContainer=$('.uploadImgContainer li');
                            for(var i=0;i<uploadImgContainer.length;i++){
                                if(uploadImgContainer.eq(i).attr('data-imgid')==''){
                                    uploadImgContainer.eq(i).remove();
                                }
                            }
                            isThis.value = "";

                        }else {
                            var browser=commLog.getBrowserInfo();
                            var verinfoNum='';
                            var verinfo=''
                            if(browser){
                                verinfoNum = (browser + "").replace(/[^0-9.]/ig, "");
                                verinfo = (browser + "").replace(/[^a-zA-Z]/ig, "")+','+verinfoNum;
                            }
                            if(verinfo=='msie,8.0'){
                                if (!comm.browser.msie) {//判断ie
                                    if ($.browser.version < 7) {
                                        nowImgObj.attr('src', isThis.files.item(0).getAsDataURL());
                                    }
                                    else {
                                        oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                                        oFReader.onload = function (oFREvent) {
                                            nowImgObj.attr({"src": oFREvent.target.result})
                                        };
                                        var oFile = isThis.files[0];
                                        oFReader.readAsDataURL(oFile);
                                    }

                                    obj.find(".uploadNow").removeClass('uploadNow').attr({"data-status": "success"});
                                    var nowLen = parseInt(9 - imgConatiner.find("li").length);
                                    var nowStr = "还能添加" + nowLen + "张图片";
                                    imgNumLis.html(nowStr);
                                    obj.attr({"data-attach": "1"});
                                    imgSide.show();
                                    obj.find(".delePostImg").each(function () {
                                        $(this).unbind("click").bind("click", function () {
                                            var _this=$(this);
                                            comm.confirmBox({
                                                "title": "确认删除已添加的图片吗？",
                                                "cancel": "取消",
                                                "ensure": "删除图片",
                                                "ensureCallback": function () {
                                                    _this.parent().remove();
                                                    var residueLen = imgConatiner.find("li").length;
                                                    var nowNum = parseInt(9 - residueLen);
                                                    var nowStr = "还能添加" + nowNum + "张图片";
                                                    imgNumLis.html(nowStr);
                                                    obj.attr({"data-attach": "1"});
                                                    if (residueLen == 0) {
                                                        imgSide.hide();
                                                        obj.attr({"data-attach": "0"});
                                                        postPicBtn.val("");
                                                    }
                                                },
                                                "cancelCallback": function () {
                                                    $(".yd-confirmModalMask").remove();
                                                }
                                            });
                                        });
                                    });
                                }
                            }else {
                                var fileSize = (isThis.files[0].size)/1048576;
                                if(fileSize>5){
                                    popup({
                                        // "hasImg":false,
                                        "text": "图片不能大于5MB"
                                    });
                                    var uploadImgContainer=$('.uploadImgContainer li');
                                    for(var i=0;i<uploadImgContainer.length;i++){
                                        if(uploadImgContainer.eq(i).attr('data-imgid')==''){
                                            uploadImgContainer.eq(i).remove();
                                        }
                                    }
                                    isThis.value = "";
                                }else {
                                    if (!comm.browser.msie) {//判断ie
                                        if ($.browser.version < 7) {
                                            nowImgObj.attr('src', isThis.files.item(0).getAsDataURL());
                                        }
                                        else {
                                            oFReader = new FileReader(), rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
                                            oFReader.onload = function (oFREvent) {
                                                nowImgObj.attr({"src": oFREvent.target.result})
                                            };
                                            var oFile = isThis.files[0];
                                            oFReader.readAsDataURL(oFile);
                                        }

                                        obj.find(".uploadNow").removeClass('uploadNow').attr({"data-status": "success"});
                                        var nowLen = parseInt(9 - imgConatiner.find("li").length);
                                        var nowStr = "还能添加" + nowLen + "张图片";
                                        imgNumLis.html(nowStr);
                                        obj.attr({"data-attach": "1"});
                                        imgSide.show();
                                        obj.find(".delePostImg").each(function () {
                                            $(this).unbind("click").bind("click", function () {
                                                var _this=$(this);
                                                comm.confirmBox({
                                                    "title": "确认删除已添加的图片吗？",
                                                    "cancel": "取消",
                                                    "ensure": "删除图片",
                                                    "ensureCallback": function () {
                                                        _this.parent().remove();
                                                        var residueLen = imgConatiner.find("li").length;
                                                        var nowNum = parseInt(9 - residueLen);
                                                        var nowStr = "还能添加" + nowNum + "张图片";
                                                        imgNumLis.html(nowStr);
                                                        obj.attr({"data-attach": "1"});
                                                        if (residueLen == 0) {
                                                            imgSide.hide();
                                                            obj.attr({"data-attach": "0"});
                                                            postPicBtn.val("");
                                                        }
                                                    },
                                                    "cancelCallback": function () {
                                                        $(".yd-confirmModalMask").remove();
                                                    }
                                                });
                                            });
                                        });
                                    }
                                }
                            }
                        }

                }

                }
            }else {
                popup({
                    // "hasImg":false,
                    "text": "最多添加9张图片"
                });
            }
            postData = {paramJson: $.toJSON(postData)};
            $(this).parent().ajaxSubmit({//ie上传存在问题
                url: "//www.yi-ding.net.cn/call/yiding/upload/attachment/upload/",
                dataType: 'text',
                data: postData,
                type: "POST",
                clearForm: true,
                success: function (data) {
                    //isThisChange.removeAttr("disabled");
                    $(".postImgloadingBg").remove();
                    $(".postImgloading").remove();
                    /*if(resultStr.responseObject.responseStatus){*/
                    var resultStr = $.parseJSON(data.replace(/<.*?>/ig, ""));
                    var imgSrc = resultStr.responseObject.responseMessage.url;
                    if(resultStr.responseObject.responsePk!=0){
                        var imgId = resultStr.responseObject.responsePk;
                    }
                    var checkLen = imgConatiner.find("li").length;
                    if (checkLen < 10) {
                        if (comm.browser.msie) {//判断ie
                            obj.find(".uploadNow").removeClass('uploadNow');
                            imgConatiner.append("<li class=\"uploadNow\" data-imgid=\'" + imgId + "\'><img src=\"\"><button class=\"delePostImg\"></button> </li>");
                            var nowImgObj = obj.find(".uploadNow img");
                            nowImgObj.attr({"src": imgSrc});
                            obj.find(".uploadNow").removeClass('uploadNow').attr({"data-status": "success"});
                            var nowLen = parseInt(9 - imgConatiner.find("li").length);
                            var nowStr = "还能添加" + nowLen + "张图片";
                            imgNumLis.html(nowStr);
                            obj.attr({"data-attach": "1"});
                            imgSide.show();
                            obj.find(".delePostImg").each(function () {
                                $(this).unbind("click").bind("click", function () {
                                    var _this=$(this);
                                    comm.confirmBox({
                                        "title": "确认删除已添加的图片吗？",
                                        "cancel": "取消",
                                        "ensure": "删除图片",
                                        "ensureCallback": function () {
                                            _this.parent().remove();
                                            var residueLen = imgConatiner.find("li").length;
                                            var nowNum = parseInt(9 - residueLen);
                                            var nowStr = "还能添加" + nowNum + "张图片";
                                            imgNumLis.html(nowStr);
                                            obj.attr({"data-attach": "1"});
                                            if (residueLen == 0) {
                                                imgSide.hide();
                                                obj.attr({"data-attach": "0"});
                                                postPicBtn.val("");
                                            }
                                        },
                                        "cancelCallback": function () {
                                            $(".yd-confirmModalMask").remove();
                                        }
                                    });
                                });
                            });
                        } else {
                            var lastOne = obj.find(".uploadImgContainer li").length - 1;
                            obj.find(".uploadImgContainer li").eq(lastOne).attr({"data-imgid": imgId})
                        }
                    }
                    $(".discussPublishImg").off("click");
                    /*}*/
                }
            });
        });

        function clearData() {
            obj.find("textarea").val("");
            obj.find(".postPicButton").val("");
            obj.find(".uploadImgContainer").html("");
        }

        obj.find(".al-commentCancel").unbind("click").bind("click", function () {
            comm.confirmBox({
                "title": "确定放弃讨论吗?",
                "cancel": "放弃",
                "ensure": "继续编辑",
                "content": "现在退出已编辑内容将会被删除",
                "ensureCallback": function () {

                },
                "cancelCallback": function () {
                    if(talk.about=="course"){
                        commLog.creatEvent({"id":72,"url":window.location.href,"keyword":"取消讨论","browseType":"38","browseTypeSourceUrl":window.location.href});
                    }else {
                        commLog.creatEvent({"id":72,"url":window.location.href,"keyword":"取消讨论","browseType":"34","browseTypeSourceUrl":window.location.href});
                    }
                    if($(".coursePc-coll").css("display")=="none"){
                        $(".coursePc-coll").show();
                    }
                    $(".discussPublish").remove();
                    var nothing = talk.container.find(".disscussIteam").length>0;
                    if(!nothing){
                        if(talk.container.find(".queShiTiDisNothing").length>0){
                            talk.container.find(".queShiTiDisNothing").show();
                        }
                    }
                }
            });

        });
        obj.find(".al-commentCommit").unbind("click").bind("click", function () {
            if(talk.about=="course"){
                commLog.creatEvent({"id":71,"url":window.location.href,"keyword":"发表讨论","browseType":"38","browseTypeSourceUrl":window.location.href});
            }else {
                commLog.creatEvent({"id":71,"url":window.location.href,"keyword":"发表讨论","browseType":"34","browseTypeSourceUrl":window.location.href});
            }

            var uploadImgContainer1=$('.uploadImgContainer li');
            /*for(var i=0;i<uploadImgContainer1.length;i++){
                if(uploadImgContainer1.eq(i).attr('data-imgid')==''){
                    return;
                }
            }*/
            var discussText=$(this).parents('.discussPublish').find('textarea').val();
            var uploadImgLength=$(this).parents('.discussPublish').find('.uploadImgContainer li').length;
            if(discussText==''&&uploadImgLength==0){
                return;
            }
            if(/^[\s]{0,}$/.test(discussText)&&uploadImgLength==0){
                return;
            }
            var refId = option.refId;
            var attachOnOff = parseInt(obj.attr("data-attach"));
            var parentId = option.parentid;
            var postData = {};
            if (attachOnOff == 1) {
                var imgIdList = "";
                obj.find(".uploadImgContainer li").each(function () {
                    imgIdList += $(this).attr("data-imgid") + ",";
                });
                imgIdList = imgIdList.substring(0, imgIdList.length - 1);
                postData = {
                    "customerId": loginAbout.login.status().userId,
                    "isUploadAttachment": attachOnOff,
                    "pictureIds": imgIdList,
                    "reviewContent": obj.find("textarea").val(),
                    "parentId": parentId,
                    "reviewType":talk.reviewType,
                    "refId": refId,
                    "refBelongId": option.refBelongId
                };
            } else {
                attachOnOff = "0";
                postData = {
                    "customerId": loginAbout.login.status().userId,
                    "isUploadAttachment": attachOnOff,
                    "reviewContent": obj.find("textarea").val(),
                    "parentId": parentId,
                    "reviewType": talk.reviewType,
                    "refId": refId,
                    "refBelongId": option.refBelongId
                };
            }
            postData = {paramJson: $.toJSON(postData)};
            $.ajax({
                url: "//www.yi-ding.net.cn/call/customer/review/createReview/",    //请求的url地址
                dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                data: postData,    //参数值
                type: "POST",   //请求方式
                beforeSend: function() {
                    //请求前的处理
                },
                success: function(req) {
                    //请求成功时处理

                    if(req.responseObject.responseStatus){
                        var pageSize = 10;
                        $(".discussPublish").remove();
                        if(talk.about=="course"){
                            talk.container.html("").removeAttr("data-page");
                        }else{
                            talk.container.html("").removeAttr("scrollpagination").removeAttr("data-page");
                        }
                        if($(".courseQution-pc").hasClass("active")){
                            $(".courseQution-pc").removeClass("active");
                            $(".courseQution-pc").parent().show();
                        }
                        var disscussData  = {
                            "reviewType": talk.reviewType,
                            "refId": refId,
                            "sortType": talk.sortType,
                            "scene": talk.scene,
                            "logoUseFlag": "2",
                            "pageIndex": "1",
                            "pageSize": 10,
                            "customerId": "1481115504920",
                            "attUseFlag":"16"
                        };
                        if($(".yd-maskBackground .exercise-discuss").length>0){
                            var pagesiZeLine = parseInt($(".exercise-discuss .yd-timelineContentItemBox").length)+1;
                            var postData = "";
                            if($(".yd-maskBackground .exercise-discuss .aswer").attr("data-discussid")!=0){
                                postData  = {"reviewId":talk.disscussLineId ,"sortType":talk.sortType,"scene":"4","logoUseFlag":"2","pageIndex":"1","pageSize":10,"attUseFlag":"16"};
                            }else{/*data-refbelongid*/
                                postData  = {"visitSiteId":13,"scene":"0","logoUseFlag":"3","customerId":loginAbout.login.status().userId,"refId":talk.refId,"refBelongId":$(".yd-maskBackground .exercise-discuss .aswer").attr("data-refbelongid")};
                            }
                            talk.applyData("disscussLine",postData);
                        }
                        talk.applyData("disscuss",disscussData);
                    }

                },
                complete: function() {
                    //请求完成的处理
                },
                error: function() {
                    //请求出错处理
                }
            });
            var discussText=$(this).parents('.discussPublish').find('textarea').val();
            var uploadImgLength=$(this).parents('.discussPublish').find('.uploadImgContainer li').length;
            if(discussText==''&&uploadImgLength==0){
                $(".discussPublish").remove();
                return;
            }

        });
    },
    disscussLineId:"",
    "scrollPage":function(container,id){
        if(id){
            var refId = id;
            talk.refId = id;
        }


        var scrollOption = {
            /*请求地址*/
            'contentPage': '//www.yi-ding.net.cn/call/customer/review/json_list/',
            /*refid习题id*/
            'contentData': $.extend({"reviewType":talk.reviewType,"refId":talk.refId,"reviewId":"","sortType":talk.sortType,"scene":talk.scene,"logoUseFlag":"2","pageIndex":"1","pageSize":"10","customerId":loginAbout.login.status().userId}, {
                pageIndex: function () {
                    var isPage = parseInt(container.attr("data-page"));
                    isPage++;
                    container.attr({"data-page":isPage});
                    return isPage;
                }
            }),
            'scrollTarget': $(window),
            'heightOffset': 0,
            'delaytime': 1000,
            'type': "post",
            'beforeLoad': function () {
                comm.loading.show();
            },
            'afterLoad': function (elementsLoaded) {
                comm.loading.hide();
            },
            'loader': function (data) {
                talk.spreadDiscuss("disscuss",data);
            }
        };

        $(window).off("scroll");
        container.scrollPagination(scrollOption);
    },
    judge:function(callBack,cp){
        if(talk.about=='course'){
                if(localStorage.getItem('userId')){
                    if(localStorage.getItem('approveInfo')){
                        var approveInfo=JSON.parse(localStorage.getItem('approveInfo'));
                        if(approveInfo.state==1||approveInfo.state==2){
                            callBack&&callBack();
                        }else if(approveInfo.state==-1){
                            if(cp){
                                talk.onOperate&&talk.onOperate();
                            comm.confirmBox({
                                "content":"认证后才能参与课程讨论</br>快去认证，获取完整权限",
                                "cancel":"暂不认证",
                                "ensure":"去认证",
                                "ensureCallback":function(){
                                    commLog.creatEvent({"id":15,"url":window.location.href,"keyword":"去认证","browseType":"38","browseTypeSourceUrl":window.location.href});
                                    authentication.init({"type":"trigger","success":function(){
                                        authentication.exit();
                                    }})
                                },
                                "cancelCallback":function(){
                                    commLog.creatEvent({"id":16,"url":window.location.href,"keyword":"暂不认证","browseType":"38","browseTypeSourceUrl":window.location.href});
                                    $(".yd-confirmModalMask").remove();
                                }
                            });
                            }else{
                                callBack&&callBack();
                            }
                        }else {
                            if(cp){
                                talk.onOperate&&talk.onOperate();
                                authentication.init({"type":"trigger",before:function(){talk.onOperate&&talk.onOperate();},"success":function(){
                                    authentication.exit();
                                }})
                            }else{
                                callBack&&callBack();
                            }
                        }
                    }else {
                        if(cp){
                            talk.onOperate&&talk.onOperate();
                            comm.confirmBox({
                                "content":"认证后才能参与课程讨论</br>快去认证，获取完整权限",
                                "cancel":"暂不认证",
                                "ensure":"去认证",
                                "ensureCallback":function(){
                                    commLog.creatEvent({"id":15,"url":window.location.href,"keyword":"去认证","browseType":"38","browseTypeSourceUrl":window.location.href});
                                    talk.onOperate&&talk.onOperate();
                                    authentication.init({"type":"trigger",before:function(){talk.onOperate&&talk.onOperate();},"success":function(){
                                        authentication.exit();
                                    }})
                                },
                                "cancelCallback":function(){
                                    commLog.creatEvent({"id":16,"url":window.location.href,"keyword":"暂不认证","browseType":"38","browseTypeSourceUrl":window.location.href});
                                    $(".yd-confirmModalMask").remove();
                                }
                            });
                        }else
                        {
                            callBack&&callBack();
                        }
                        //登录未认证提示认证

                    }
                }else {
                    localStorage.setItem("unActive", "1");
                    //游客可以看见思考题和评论总数，但不能，看讨论详情
                    talk.onOperate&&talk.onOperate();
                    loginAbout.login.show({"success":function(){
                        loginAbout.init();
                        talk.onOperate&&talk.onOperate();
                        var disscussData  = {
                            "reviewType": talk.reviewType,
                            "refId": talk.refId,
                            "reviewId": "",
                            "sortType": talk.sortType,
                            "scene": "0",
                            "logoUseFlag": "2",
                            "pageIndex": "1",
                            "pageSize": "10",
                            "customerId": loginAbout.login.status().userId,
                            "attUseFlag":"16"
                        };
                        talk.applyData("disscuss",disscussData);
                        if(cp){
                            talk.onOperate&&talk.onOperate();
                            authentication.init({"type":"trigger",before:function(){talk.onOperate&&talk.onOperate();},"success":function(){
                                authentication.exit();

                            }})
                        }else{
                            callBack&&callBack();
                        }

                    }});
                }


            }
            else{
                if(localStorage.getItem('userId')){
                    callBack&&callBack();
                }else {
                    //游客看不到
                    localStorage.setItem("unActive", "1");
                    loginAbout.login.show({"success":function(){
                        loginAbout.changeHead();
                        talk.onOperate&&talk.onOperate();
                        var disscussData  = {
                            "reviewType": talk.reviewType,
                            "refId": talk.refId,
                            "reviewId": "",
                            "sortType": talk.sortType,
                            "scene": "0",
                            "logoUseFlag": "2",
                            "pageIndex": "1",
                            "pageSize": "10",
                            "customerId": loginAbout.login.status().userId,
                            "attUseFlag":"16"
                        };
                        talk.applyData("disscuss",disscussData);
                        if(cp){
                            talk.onOperate&&talk.onOperate();
                            authentication.init({"type":"trigger",before:function(){talk.onOperate&&talk.onOperate();},"success":function(){
                                authentication.exit();

                            }})
                        }else{
                            callBack&&callBack();
                        }

                    }});
                }
            }

    },
    "partInDiss":function(){
        $(".discussAllLast li").each(function() {
            $(this).unbind("click").bind("click",
                function() {
                    var isThis = $(this);
                    if(loginAbout.login.status().state){
                        $(".discussAllLast").find(".selected").removeClass("selected");
                        isThis.addClass("selected");
                        var orderType =isThis.attr("data-role");
                        var discussContainer = $(".discuss-content .discussAllList");
                        var pageSize = ($(".disscussIteam").length);
                        discussContainer.removeAttr("data-page");
                        var disscussData = {};
                        switch (orderType) {
                            case "recently":
                                if(talk.about=="course"){
                                    commLog.creatEvent({"id":176,"url":window.location.href,"keyword":"课程终端页-讨论最新","browseType":"38","browseTypeSourceUrl":window.location.href});
                                }else {

                                }
                                talk.sortType="7";
                                discussContainer.html("").removeAttr("data-page");
                                disscussData  = {
                                    "reviewType": talk.reviewType,
                                    "refId": talk.refId,
                                    "reviewId": "",
                                    "sortType": talk.sortType,
                                    "scene": "0",
                                    "logoUseFlag": "2",
                                    "pageIndex": "1",
                                    "pageSize": 10,
                                    "customerId": loginAbout.login.status().userId,
                                    "attUseFlag":"16"
                                };
                                talk.applyData("disscuss",disscussData);
                                break;
                            case "oldest":
                                if(talk.about=="course"){
                                    commLog.creatEvent({"id":177,"url":window.location.href,"keyword":"课程终端页-讨论最旧","browseType":"38","browseTypeSourceUrl":window.location.href});
                                }else {

                                }
                                talk.sortType="1";
                                discussContainer.html("").removeAttr("data-page");
                                disscussData  = {
                                    "reviewType": talk.reviewType,
                                    "refId": talk.refId,
                                    "reviewId": "",
                                    "sortType": talk.sortType,
                                    "scene": "0",
                                    "logoUseFlag": "2",
                                    "pageIndex": "1",
                                    "pageSize": 10,
                                    "customerId": loginAbout.login.status().userId,
                                    "attUseFlag":"16"
                                };
                                talk.applyData("disscuss",disscussData);
                                break;
                        }
                    }else{
                        return false;
                    }

                });
        });
        //对评论的回复
        $(".discussAllList .aswer").each(function(){
            $(this).unbind("click").bind("click", function () {
                if(talk.about=="course"){
                    commLog.creatEvent({"id":73,"url":window.location.href,"keyword":"课程讨论列表呼出讨论","browseType":"38","browseTypeSourceUrl":window.location.href});
                }else {
                    commLog.creatEvent({"id":74,"url":window.location.href,"keyword":"习题讨论列表呼出讨论","browseType":"34","browseTypeSourceUrl":window.location.href});
                }
                var isThis = $(this);
                talk.judge(function(){
                    var discussId = isThis.attr("data-discussid");
                    var refBelongId = isThis.attr("data-refBelongId");
                    var options = {
                        container: isThis.parent().parent(),
                        refId: talk.refId,
                        position: "after",
                        parentid: discussId,
                        refBelongId:refBelongId,
                        callBack: function (num,dataDiscussid) {

                        }
                    };
                    talk.public(options);
                },true);

            });
        });
        //对对划线的评论
        $(".yd-maskBackground  .aswer").each(function(){

            $(this).unbind("click").bind("click",function(){
                talk.onOperate&&talk.onOperate();
                if(talk.about=="course"){
                    commLog.creatEvent({"id":73,"url":window.location.href,"keyword":"课程讨论列表呼出讨论","browseType":"38","browseTypeSourceUrl":window.location.href});
                }else {
                    commLog.creatEvent({"id":74,"url":window.location.href,"keyword":"习题讨论列表呼出讨论","browseType":"34","browseTypeSourceUrl":window.location.href});
                }
                var isThis = $(this);
                talk.judge(function(){
                    var discussId = isThis.attr("data-discussid");
                    var belongid = isThis.attr("data-refbelongid");
                    var options = {
                        container: isThis.parent(),
                        refId: talk.refId,
                        position: "after",
                        parentid: discussId,
                        refBelongId:belongid,
                        callBack: function (num,dataDiscussid) {

                        }
                    };
                    talk.public(options);
                },true);
            })
        });
        //点赞功能
        $(".praise").each(function(){

            $(this).unbind("click").bind("click",function(){
                var isThis = $(this);
                talk.judge(function(){
                    var spanText=isThis.find('span');
                    var praiseNum = 0;

                    isThis.find("i").toggleClass("selected");
                    var isThisObj = isThis.find("i");
                    var praiseOnOff = isThis.find("i").hasClass("selected");
                    var refid = "";
                    var preferType = "";
                    if(isThis.attr("data-discussid")){
                        refid = isThis.attr("data-discussid");
                        preferType = "8";
                    }else{
                        refid = isThis.attr("data-thinkid");
                        preferType = "4";
                    }
                    if(praiseOnOff){
                        if(!isNaN(spanText.text())){
                            praiseNum = parseInt(spanText.text());
                            praiseNum++;
                        }else{
                            praiseNum = 1;
                        }
                        spanText.text(praiseNum);
                        var praiseData = {
                            "preferType":preferType,
                            "refId":refid,
                            "customerId":loginAbout.login.status().userId
                        };
                        praiseData = {"paramJson": $.toJSON(praiseData)};
                        $.ajax({
                            url: "//www.yi-ding.net.cn/call/customer/prefer/create/",    //请求的url地址
                            dataType: "json",   //返回格式为json
                            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                            data: praiseData,    //参数值
                            type: "POST",   //请求方式
                            beforeSend: function () {
                                //请求前的处理
                            },
                            success: function (req) {
                                //请求成功时处理

                                if (req.responseObject.responseStatus) {
                                    var praiseId = req.responseObject.responsePk;
                                    isThisObj.attr("data-praiseId",praiseId);
                                    /*if(isThisObj.hasClass('selected')){
                                     if(exerciseCommon.praiseNum=='点赞'){
                                     spanText.text('1')
                                     }else {
                                     exerciseCommon.praiseNum++;
                                     spanText.text(exerciseCommon.praiseNum)
                                     }
                                     }*/
                                }

                            },
                            complete: function () {
                                //请求完成的处理
                            },
                            error: function () {
                                //请求出错处理
                            }
                        });
                    }else{
                        var zanId = isThisObj.attr("data-praiseId");
                        var cancelpraiseData = {
                            "id":zanId
                        };
                        if(!isNaN(spanText.text())){
                            if(parseInt(spanText.text())>0){
                                praiseNum = parseInt(spanText.text());
                                praiseNum--;
                                if(praiseNum<1){
                                    praiseNum = "点赞";
                                }
                            }
                        }
                        spanText.text(praiseNum);
                        cancelpraiseData = {"paramJson": $.toJSON(cancelpraiseData)};
                        $.ajax({
                            url: "//www.yi-ding.net.cn/call/customer/prefer/cancel/",    //请求的url地址
                            dataType: "json",   //返回格式为json
                            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                            data: cancelpraiseData,    //参数值
                            type: "POST",   //请求方式
                            beforeSend: function () {
                                //请求前的处理
                            },
                            success: function (req) {
                                //请求成功时处理

                                if (req.responseObject.responseStatus) {
                                    isThisObj.removeAttr("data-praiseId");
                                }

                            },
                            complete: function () {
                                //请求完成的处理
                            },
                            error: function () {
                                //请求出错处理
                            }
                        });
                    }

                },true);
            });
        });
        //跳转个人主页
        $(".userCont").each(function(){
            $(this).unbind("click").bind("click",function(){
                var deletePOnOff = $(this).attr("data-cusid")==loginAbout.login.status().userId;
                if(deletePOnOff){
                    //window.open("http://www.yi-ding.net.cn//pages/personal/personal_index.html","_blank");
                }else{
                    var hisCustomerId = $(this).attr("data-cusid");
                    window.open("https://www.yi-ding.net.cn//pages/personal/others_index.html?cId="+hisCustomerId+"","_blank");
                }
            })
        });
        //初始讨论页点击查看大图
        $(".discussAds").each(function(){

            $(this).find("li").each(function(){
                $(this).unbind("click").bind("click",function(){
                    talk.onOperate&&talk.onOperate();
                    var nowImdData = JSON.parse($(this).parent().attr("data-imgData"));
                    var nowIndex = parseInt($(this).index())+1;
                    var nowDiscussId = $(this).parent().parent().attr("data-discussid");
                    creatCarousel.creatHtml(nowImdData,nowIndex,nowDiscussId);
                });
            });
        });
        //对划线查看大图
        $(".yd-timelineImgBox .yd-timelineImg").each(function(){
            $(this).unbind("click").bind("click",function(){
                var nowImdData = JSON.parse($(this).parent().attr("data-imgData"));
                var nowIndex = parseInt($(this).index())+1;
                var nowDiscussId = $(this).parent().attr("data-discussid");

                creatCarousel.creatHtml(nowImdData,nowIndex,nowDiscussId);
            })
        });
        $(".discussAllList .previousDiscuss ").each(function(){

            $(this).unbind("click").bind("click",function(){
                var reviewId = "";
                var postData = "";
                var refId = "";
                if($(this).attr("data-refbelongid").length>0){
                    talk.onOperate&&talk.onOperate();
                    //course.video.pause();
                    reviewId = $(this).attr("data-review");
                    refId = $(this).attr("data-refbelongid");
                    talk.disscussLineId = talk.refId;
                    postData  = {"visitSiteId":13,"scene":"0","logoUseFlag":"3","customerId":loginAbout.login.status().userId,"refId":talk.refId,"refBelongId":refId};
                    talk.applyData("disscussLine",postData);
                }else{
                    talk.onOperate&&talk.onOperate();
                    //course.video.pause();
                   reviewId = $(this).attr("data-review");
                    talk.disscussLineId = reviewId;
                    postData  = {"reviewId":reviewId,"sortType":talk.sortType,"scene":"4","logoUseFlag":"2","pageIndex":"1","pageSize":"10","attUseFlag":"16"};
                    talk.applyData("disscussLine",postData);
                }
            })
        });
        $(".context").each(function(){
            $(this).unbind("click").bind("click",function(){
                if(talk.about=="course"){
                    commLog.creatEvent({"id":159,"url":window.location.href,"keyword":"课程终端页呼出对划线","browseType":"38","browseTypeSourceUrl":window.location.href});
                }else {
                    // commLog.creatEvent({"id":74,"url":window.location.href,"keyword":"习题讨论列表呼出讨论","browseType":"35","browseTypeSourceUrl":window.location.href});
                }
                var discussStr = "";
                //course.video.pause();
                var reviewId = $(this).attr("data-review");
                talk.disscussLineId = reviewId;
                var postData  = {"reviewId":reviewId,"sortType":talk.sortType,"scene":"4","logoUseFlag":"2","pageIndex":"1","pageSize":"10","attUseFlag":"16"};
                talk.applyData("disscussLine",postData);
            })
        });
        //删除自己的讨论
        $(".discussAllList").each(function(){

            $(this).find("li").each(function(){
                var isThis = $(this);
                $(this).unbind("mouseover").bind("mouseover",function(){
                    var deletePOneOnOff = $(this).attr("data-userid")==loginAbout.login.status().userId;
                    var deletePTwoOnOff = (isThis.attr("data-isvalid")!=3)?true:false;
                    var deletePOnOff = deletePOneOnOff&&deletePTwoOnOff;
                    if(deletePOnOff){
                        var deleteBtn = $(this).find(".discussDelete");
                        deleteBtn.show().unbind("click").bind("click",function(){
                            var deleteId = $(this).attr("data-discussid");
                            comm.confirmBox({
                                "title": "确认删除该条讨论吗？",
                                "cancel": "放弃",
                                "ensure": "删除",
                                "ensureCallback": function () {
                                    var deleteData = {
                                        "id":deleteId
                                    };
                                    deleteData = {
                                        paramJson: $.toJSON(deleteData)
                                    };
                                    $.ajax({
                                        url: "//www.yi-ding.net.cn/call/customer/review/delete/",    //请求的url地址
                                        dataType: "json",   //返回格式为json
                                        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                                        data: deleteData,    //参数值
                                        type: "POST",   //请求方式
                                        beforeSend: function() {
                                            //请求前的处理
                                            comm.loading.show();
                                        },
                                        success: function(req) {
                                            //请求成功时处理

                                            if(req.responseObject.responseStatus){
                                                var pageSize = ($(".disscussIteam").length)+1;
                                                if(talk.about=="course"){
                                                    talk.container.html("").removeAttr("data-page");
                                                }else{
                                                    talk.container.html("").removeAttr("scrollpagination").removeAttr("data-page");
                                                }
                                                if($(".courseQution-pc").hasClass("active")){
                                                    $(".courseQution-pc").removeClass("active");
                                                    $(".courseQution-pc").parent().show();
                                                }
                                                var disscussData  = {
                                                    "reviewType": talk.reviewType,
                                                    "refId": talk.refId,
                                                    "reviewId": "",
                                                    "sortType": talk.sortType,
                                                    "scene": "0",
                                                    "logoUseFlag": "2",
                                                    "pageIndex": "1",
                                                    "pageSize": 10,
                                                    "customerId": loginAbout.login.status().userId,
                                                    "attUseFlag":"16"
                                                };
                                                talk.applyData("disscuss",disscussData);
                                            }
                                        },
                                        complete: function() {
                                            //请求完成的处理
                                            comm.loading.hide();
                                        },
                                        error: function() {
                                            //请求出错处理
                                        }
                                    });
                                },
                                "cancelCallback": function () {
                                    if(talk.about=="course"){
                                        commLog.creatEvent({"id":72,"url":window.location.href,"keyword":"取消讨论","browseType":"38","browseTypeSourceUrl":window.location.href});
                                    }else {
                                        commLog.creatEvent({"id":72,"url":window.location.href,"keyword":"取消讨论","browseType":"34","browseTypeSourceUrl":window.location.href});
                                    }
                                    $(".yd-confirmModalMask").remove();
                                }
                            });

                        });

                    }
                });
                $(this).unbind("mouseout").bind("mouseout",function(){
                    var deletePOnOff = $(this).attr("data-userid")==loginAbout.login.status().userId;
                    if(deletePOnOff){
                        $(this).find(".discussDelete").hide();
                    }
                });
            });
        });
        $(".queShiTiPart").each(function(){

            $(this).unbind("click").bind("click",function() {
                if(talk.about=="course"){
                   /* commLog.creatEvent({
                        "id": 73,
                        "url": location.href,
                        "keyword": "习题参与讨论呼出讨论",
                        "browseType": "38",
                        "browseTypeSourceUrl":location.href
                    });*/
                }else{
                    commLog.creatEvent({
                        "id": 161,
                        "url": location.href,
                        "keyword": "习题参与讨论呼出讨论",
                        "browseType": "34",
                        "browseTypeSourceUrl":location.href
                    });
                }
                talk.onOperate&&talk.onOperate();
                if ($('.queShiTiDisNothing').length >0) {
                    $('.queShiTiDisNothing').hide();
                }
                var discussId = $(this).attr("data-discussid");
                /* if(loginAbout.approve.status().auState){*/
                var options = {
                    container: $(this).parent().parent(),
                    refId: $(".queIteamActive").attr("data-id")||talk.refId,
                    position: "after",
                    parentid: "0",
                    callBack: function () {
                        /*var pagesize = $(".queAnalysisIteamActive .disscussIteam").length;
                        if ($('.queShiTiDisNothing').length == 1) {
                            pagesize = 10;
                        }
                        var disscussData = {
                            "reviewType": talk.reviewType,
                            "refId": $(".queIteamActive").attr("data-id"),
                            "reviewId": "",
                            "sortType": "7",
                            "scene": "0",
                            "logoUseFlag": "2",
                            "pageIndex": "1",
                            "pageSize": pagesize,
                            "customerId": loginAbout.login.status().userId
                        };
                        $(".queAnalysisIteamActive .discuss-content").remove();
                        index.applyData("disscuss", disscussData);*/
                    }
                }
                talk.public(options);
            });
        });
    }
};
