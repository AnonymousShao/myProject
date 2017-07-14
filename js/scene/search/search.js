/**
 * Created by ALLIN on 2016/11/25.
 */
var ydSearch = {};
    ydSearch.config = {};
    ydSearch.method = {};
var ydGloVar = ydSearch.config;
var ydSfn = ydSearch.method;
ydSfn.configAjax = function(type){
    var config = {};
    var postData = "";
    switch (type){
        case "hot":
            config.port = "//www.yi-ding.net.cn/call/log/yiding/customer/keyword/redis/getHotList/";
            postData = {
                firstResult:'0',
                maxResult:'8',
                groupByFlag:'1'
            };
            break;
        case "history":
            config.port = "//www.yi-ding.net.cn/call/log/yiding/customer/keyword/info/getMapList/";
            postData = {
                customerId:ydSfn.customerId,
                isRepeat:'0',
                firstResult:'0',
                maxResult:'15',
            };
            break;
        case "lenovo":
            config.port = "//www.yi-ding.net.cn/call/yiding/search/associational/word/getMapList/";
            postData = {
                "searchParam":ydGloVar.keyVal,
                firstResult:'0',
                maxResult:'10'
            };
            break;
        case "course":
            config.port = "//www.yi-ding.net.cn/call/yiding/all/search/getMapList/";
            postData = {
                customerId:ydSfn.customerId||0,
                searchParam:ydGloVar.keyVal,
                seriesFirstResult:'0',
                seriesMaxResult:'5',
                courseFirstResult:'0',
                courseMaxResult:'5',
                logoUseFlag:'1'
            };
            break;
        case "add":
            config.port = "//www.yi-ding.net.cn/call/log/yiding/customer/keyword/info/create/";
            postData = {
                customerId:ydSfn.customerId||0,
                "keyWord":ydGloVar.keyVal
            };
            break;
        default:
            break;
    }
    config.postData ={paramJson: $.toJSON(postData)};
    return config;
};
ydSfn.deleteHistory = function(){
    var deleteTarget = $(".clear-history");
    var jsonText={
        customerId:ydSfn.customerId,
        isValid:'0'
    }
    var postData={paramJson: $.toJSON(jsonText)};
    deleteTarget.unbind("click").bind("click",function(){
        comm.loading.show();
        $.ajax({
            url: '//www.yi-ding.net.cn/call/log/yiding/customer/keyword/info/update/',    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data:postData,    //参数值
            type: "post",   //请求方式
            beforeSend: function() {
                //请求前的处理
            },
            success: function(req) {
                comm.loading.hide();
                //请求成功时处理
                if(req.responseObject.responseStatus){
                    comm.confirmBox({
                        "title":"确定清空历史记录吗？",
                        "content":"清空后将无法恢复",
                        "cancel":"取消",
                        "ensure":"清空",
                        "ensureCallback":function(){
                            var historyContainer = $("#historyContainer");
                            historyContainer.html("");
                            $('#historyOutContainer').hide();
                        },
                        "cancelCallback":function(){

                        }
                    });
                    $('.yd-confirmModalContent article p').html("删除后将无法恢复");
                }

            },
            complete: function() {
                //请求完成的处理
            },
            error: function() {
                //请求出错处理
            }
        });
    });
};
ydSfn.dealData = function(type,data,lennovoIsStr){
    var hotOutContainer = $("#hotSearchOutContainer");
    var hotContainer = $(".al-hotSearchContent");
    var historyContainer = $("#historyContainer");
    var historyOutContainer = $("#historyOutContainer");
    var lenovoContainer = $("#searchResultContainer");
    var seriesCoursesContainer = $(".seriesCoursesContent");
    var eliteSearchContainer = $(".eliteSearchContent");
    var searchmedicalContainer=$(".searchmedical");
    switch (type){
        case "hot":
            // console.log(data)
            var req=data.responseObject.responseData;
            var hotStr = "";
            for(var hotNum = 0;hotNum<req["data_list"].length;hotNum++){
                //
                hotStr+="<span class=\"al-hotSearchWord\" keyword=\""+req["data_list"][hotNum]["keyWord"]+"\">"+req["data_list"][hotNum]["keyWord"]+"</span>";
            }
            hotContainer.html(hotStr);
            break;
        case "history":
            // console.log(data)
             var req=data.responseObject.responseData;
            if(req["data_list"].length>0){
                $('#historyOutContainer').show();
            }else {
                $('#historyOutContainer').hide();
            }
            var searchTool = $("#searchTool");
            var historyStr = "";
            for(var historyNum = 0;historyNum<req["data_list"].length;historyNum++){
                //
                historyStr+="<li>"+req["data_list"][historyNum]["keyWord"]+"</li>";
            }
            historyContainer.html(historyStr);
            $("#historyContainer li").each(function(){
                $(this).unbind("click").bind("click",function(){
                    // console.log('history')
                    var isStr = $(this).text();
                    commLog.creatEvent({"id":175,"url":window.location.href,"keyword":"搜索-历史搜索"+isStr,"browseType":"26"});
                    searchTool.val(isStr);
                    ydGloVar.keyVal = isStr;
                    if(ydSfn.customerId!=null){
                        ydSfn.ajax("add",'',"post");
                    }
                    ydSfn.ajax("course",'',"post");
                    ydSfn.medicalResources(ydGloVar.keyVal);
                });
            });
            ydSfn.deleteHistory();
            break;
        case "lenovo":
            var req=data.responseObject.responseData;
            var lenovoStr = "";
            for(var lenovoNum = 0;lenovoNum<req["data_list"].length;lenovoNum++){
                var lennovoIsStrLen=lennovoIsStr.length;
                var dataIndex=req["data_list"][lenovoNum]["keyword"].indexOf(lennovoIsStr);
                if(dataIndex!=-1){
                    var dataBefore=req["data_list"][lenovoNum]["keyword"].slice(0,dataIndex);
                    var dataActive=req["data_list"][lenovoNum]["keyword"].substr(dataIndex,lennovoIsStrLen);
                    var dataAfter=req["data_list"][lenovoNum]["keyword"].slice(dataIndex+lennovoIsStrLen);
                    lenovoStr+="<article class=\"yd-searchResultItem\">"+dataBefore+"<span>"+dataActive+"</span>"+dataAfter+"</article>";
                }
            }
            lenovoContainer.html(lenovoStr);
            break;
        case "course":
            ydSfn.ydSearchIndex=0;
            // console.log(data)
            var req=data.responseObject.responseData;
            ydSfn.jumpAllinmd=req.allin_h5_url;
            var seriesData = req.series_data_list;
            var eliteData = req.course_data_list;
            var seriesDataTotal=req.series_data_total;
            var courseData=req.course_data_total;
            if(seriesDataTotal==0&&courseData==0){
                $('.seriesCoursesContent').hide();
            }else {
                $('.searchInexistence').hide();
                // $('#seriesNoResult').hide();
                $('#seriesNoResult').hide();
                $('.seriesCoursesContent').show();
                seriesCoursesContainer.show();
            }
            var seriesStr = "";
            var eliteStr = "";
            var seriesContainer = $("#contentArea");
            var eliteContainer = $("#quality");
            for(var seriesNum = 0;seriesNum<seriesData.length;seriesNum++){
                var sePath = seriesData[seriesNum].pageStoragePath;
                var name = seriesData[seriesNum].seriesTitle;
                var imgSrc = seriesData[seriesNum].courseMainPicUrl;
                var status = seriesData[seriesNum].isJoin;
                var amount = seriesData[seriesNum].courseNum;
                var id=seriesData[seriesNum].seriesId;
                var statusStr = "";
                if(status=="1"){
                    statusStr = "<article class=\"addClassActive\">" +
                        "<i class=\"icon-addClass\"></i>" +
                        "<p>添加</p>" +
                        "</article>" +
                        "<article class=\"addClass\">" +
                        "<p>已添加</p>" +
                        "</article>" ;
                }else{
                    statusStr = "<article class=\"addClass\">" +
                        "<i class=\"icon-addClass\"></i>" +
                        "<p>添加</p>" +
                        "</article>" +
                        "<article class=\"addClassActive\">" +
                        "<p>已添加</p>" +
                        "</article>";
                }

                seriesStr+="<article class=\"bestItem\" data-seid=\""+sePath+"\">" +
                    "<figure class=\"bestItemImg\">" +
                    "<img src=\""+imgSrc+"\" alt=\"\">" +
                    "</figure>" +
                    "<figcaption class=\"bestItemMsg\" tagID=\""+id+"\">" +
                    "<a href=\"javascript:void(0)\">"+name+"</a>" +
                    "<p>共<b>"+amount+"</b>课时</p>" +
                    "</figcaption>" +
                    statusStr+
                    "</article>"
            }
            if(eliteData.length>0){
                for(var elitNum = 0;elitNum<eliteData.length;elitNum++){
                    if(eliteData[elitNum].courseAuthorList.length>0){
                        var  author=eliteData[elitNum].courseAuthorList[0].authorName;
                        var   hospital=eliteData[elitNum].courseAuthorList[0].company;
                    }else {
                        var  author='';
                        var   hospital='';
                    }
                    var title = eliteData[elitNum].courseTitle;
                    var   office=eliteData[elitNum].seriesTitle;
                    var   reply=eliteData[elitNum].reviewNum;
                    var   logUrl=eliteData[elitNum].videoAttUrl;
                    var   url=eliteData[elitNum].storagePath;
                    var id1=eliteData[elitNum].courseId;
                    eliteStr+= "<section class=\"contentInnerItem\" data-elitId=\'"+url+"\'>" +
                        "<article class=\"contentInnerContext\" tagId=\'"+id1+"\'>" +
                        "<h2>"+title+"</h2>" +
                        "<p><span class=\"user\">"+author+"</span><span class=\"hospital\">"+hospital+"</span></p>" +
                        "<article class=\"contentOtherMsg\"><span class=\"resourceType\">"+office+"</span><i class=\"icon-comment\"></i>"           +"<span>"+reply+"</span>"+
                        "</article></article>" +
                        "<figure class=\"contentInnerImg\">" +
                        "<img src=\""+logUrl+"\" alt=\"\">" +
                        "</figure></section>"
                }
                $('.eliteSearchContent .search-series').show();
                $('#moreQuality').show();
            }else {
                $('.eliteSearchContent .search-series').hide();
                $('#moreQuality').hide();
            }
            hotOutContainer.hide();
            historyOutContainer.hide();
            lenovoContainer.hide();
            $('.eliteSearchContent .al-searchTitle span').html('('+courseData+')');
            $('.contentItemHeader h2 span').html('('+seriesDataTotal+')');
            eliteContainer.html(eliteStr);
            eliteSearchContainer.show();
            seriesContainer.html(seriesStr);
            searchmedicalContainer.show();
            if(seriesData.length>=5){
                $('#moreQualityContent').show();
            }else {
                $('#moreQualityContent').hide();
            }
            if(seriesDataTotal==0){
                $('#seriesCoursesContent').hide();
            }else {
                $('#seriesCoursesContent').show();
            }
            if(eliteData.length>=5){
                $('#moreQuality').show();
            }else {
                $('#moreQuality').hide();
            }
            if(ydSfn.locationHref.indexOf('niceClass.html')!=-1){
                $('#seriesCoursesContent').hide();
                $('.medicalResources').hide();
            }
            $('#moreQualityContent').off('click').on('click',function () {
                ydSfn.viewMore(seriesDataTotal);
            });
            var addClass=$("#contentArea").find('.bestItem .addClass');
            addClass.off('click').on('click',function (e) {
                e.stopPropagation();
                e.preventDefault();
              ydSfn.addClass($(this));

            })
            $("#contentArea .bestItem").off('click').on('click',function () {
                var openUrl=$(this).attr('data-seid');
                window.open('https://'+openUrl+'?sourceType=26');
            })
            $('#quality .contentInnerItem ').off('click').on('click',function () {
                var openUrl=$(this).attr('data-elitId');
                window.open('https://'+openUrl+'?sourceType=26');
            })
            $('#moreQuality').off('click').on('click',function () {
                ydSfn.viewMoreCourse(courseData);
                ydSfn.ydSearchIndex++;
            })
            break;
        default:
            break;
    }
    ydSfn.clickSearch(type);
};
ydSfn.addClass=function (container) {
    var tagID=container.parents('.bestItem').find('.bestItemMsg').attr('tagId');
    var refName=container.parents('.bestItem').find('.bestItemMsg a').text();
    if(container.find('p').text()=='添加'){
        commLog.creatEvent({"id":56,"url":window.location.href,"keyword":"搜索结果页加入系列课程","browseType":"26"});
        if(ydSfn.customerId!=null){
            var Data = {
                customerId:ydSfn.customerId,
                joinType:'1',
                refId:tagID,
                refName:refName,
            };
            var postData ={paramJson: $.toJSON(Data)};
            // console.log(postData)
            $.ajax({
                url: "//www.yi-ding.net.cn/call/yiding/customer/join/create/",    //请求的url地址
                dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                data: postData,    //参数值
                type: "post",   //请求方式
                beforeSend: function() {
                    //请求前的处理
                },
                success: function(data) {
                    // console.log(data)
                    //请求成功时处理
                    if(data.responseObject.responseStatus){
                        if(data.responseObject.responseMessage==''){
                            var addClassActive=container.parent().find('.addClassActive');
                            var addClassDisplay=container.parent().find('.addClass');
                            addClassActive.show();
                            addClassDisplay.hide();
                            addClassActive.find('p').css({
                                color:'#ffc554'
                            })
                            addClassActive.css({
                                borderColor:'#ffc554'
                            })
                            // console.log(container.parent().find('.addClassActive p').text())
                        }
                    }else {
                    }

                },
                complete: function() {
                    //请求完成的处理
                },
                error: function() {
                    //请求出错处理
                }
            });
        }else {
            loginAbout.login.show();
        }

    }
};
ydSfn.creatItem=function (data,index) {
        var req=data.responseObject.responseData;
        var eliteData = req.course_data_list;
        var courseData=req.course_data_total;
        // console.log(courseData)
        var eliteStr = "";
        var eliteSearchContainer = $(".eliteSearchContent");
        var eliteContainer = $("#quality");
        if(eliteData.length>0){
            for(var elitNum = 0;elitNum<eliteData.length;elitNum++){
                if(eliteData[elitNum].courseAuthorList.length>0){
                    var  author=eliteData[elitNum].courseAuthorList[0].authorName;
                    var   hospital=eliteData[elitNum].courseAuthorList[0].company;
                }else {
                    var  author='';
                    var   hospital='';
                }
                var title = eliteData[elitNum].courseTitle;
                var   office=eliteData[elitNum].subMajorName;
                var   reply=eliteData[elitNum].reviewNum;
                var   logUrl=eliteData[elitNum].videoAttUrl;
                var   url=eliteData[elitNum].storagePath;
                var id1=eliteData[elitNum].courseId;
                eliteStr+= "<section class=\"contentInnerItem\" data-elitId=\'"+url+"\'>" +
                    "<article class=\"contentInnerContext\" tagId=\'"+id1+"\'>" +
                    "<h2>"+title+"</h2>" +
                    "<p><span class=\"user\">"+author+"</span><span class=\"hospital\">"+hospital+"</span></p>" +
                    "<article class=\"contentOtherMsg\"><span class=\"resourceType\">"+office+"</span><i class=\"icon-comment\"></i>"           +"<span>"+reply+"</span>"+
                    "</article></article>" +
                    "<figure class=\"contentInnerImg\">" +
                    "<img src=\""+logUrl+"\" alt=\"\">" +
                    "</figure></section>"
            }
            $('.eliteSearchContent .search-series').show();
            if(index<10){
                $('#moreQuality').hide();
            }else {
                $('#moreQuality').show();
            }
        }else {
            $('.eliteSearchContent .search-series').hide();
            $('#moreQuality').hide();
        }
        eliteContainer.append(eliteStr);
        eliteSearchContainer.show();
        $('#quality .contentInnerItem ').off('click').on('click',function () {
            var openUrl=$(this).attr('data-elitId');
            window.open('https://'+openUrl+'?sourceType=26');
        })
}
ydSfn.ydSearchIndex=0;
ydSfn.viewMoreCourse=function (num) {
    if(5+ydSfn.ydSearchIndex*10<num){
        var indexNum=num-(5+ydSfn.ydSearchIndex*10);
        var seachData= $('#searchTool').val();
        var Data = {
            customerId:ydSfn.customerId||0,
            searchParam:seachData,
            seriesFirstResult:'0',
            seriesMaxResult:'5',
            courseFirstResult:5+ydSfn.ydSearchIndex*10,
            courseMaxResult:15+ydSfn.ydSearchIndex*10,
            logoUseFlag:'1'
        };
        var postData ={paramJson: $.toJSON(Data)};
        // console.log(postData)
        $.ajax({
            url: "//www.yi-ding.net.cn/call/yiding/all/search/getMapList/",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: postData,    //参数值
            type: "post",   //请求方式
            beforeSend: function() {
                //请求前的处理
            },
            success: function(data) {
                // console.log(data)
                //请求成功时处理
                if(data.responseObject.responseStatus){
                    ydSfn.creatItem(data,indexNum);
                }

            },
            complete: function() {
                //请求完成的处理
            },
            error: function() {
                //请求出错处理
            }
        });
    }
};
ydSfn.viewMore=function (num) {
    var seachData= $('#searchTool').val();
    var Data = {
        customerId:ydSfn.customerId||0,
        searchParam:seachData,
        seriesFirstResult:'5',
        seriesMaxResult:num,
        courseFirstResult:'0',
        courseMaxResult:'5',
        logoUseFlag:'1'
    };
    var postData ={paramJson: $.toJSON(Data)};
    $.ajax({
        url: "//www.yi-ding.net.cn/call/yiding/all/search/getMapList/",    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: postData,    //参数值
        type: "post",   //请求方式
        beforeSend: function() {
            //请求前的处理
        },
        success: function(data) {
            // console.log(data)
            //请求成功时处理
            if(data.responseObject.responseStatus){
                var req=data.responseObject.responseData;
                var seriesData = req.series_data_list;
                var seriesStr = "";
                var seriesContainer = $("#contentArea");
                for(var seriesNum = 0;seriesNum<seriesData.length;seriesNum++){
                    var sePath = seriesData[seriesNum].pageStoragePath;
                    var name = seriesData[seriesNum].seriesTitle;
                    var imgSrc = seriesData[seriesNum].courseMainPicUrl;
                    var status = seriesData[seriesNum].isJoin;
                    var amount = seriesData[seriesNum].courseNum;
                    var id=seriesData[seriesNum].id;
                    var statusStr = "";
                    if(status=="1"){
                        statusStr = "<article class=\"addClassActive\">" +
                            "<i class=\"icon-addClass\"></i>" +
                            "<p>添加</p>" +
                            "</article>" +
                            "<article class=\"addClass\">" +
                            "<p>已添加</p>" +
                            "</article>" ;
                    }else{
                        statusStr = "<article class=\"addClass\">" +
                            "<i class=\"icon-addClass\"></i>" +
                            "<p>添加</p>" +
                            "</article>" +
                            "<article class=\"addClassActive\">" +
                            "<p>已添加</p>" +
                            "</article>";
                    }

                    seriesStr+="<article class=\"bestItem\" data-seid=\""+sePath+"\">" +
                        "<figure class=\"bestItemImg\">" +
                        "<img src=\""+imgSrc+"\" alt=\"\">" +
                        "</figure>" +
                        "<figcaption class=\"bestItemMsg\" tagID=\""+id+"\">" +
                        "<a href=\"javascript:void(0)\">"+name+"</a>" +
                        "<p>共<b>"+amount+"</b>课时</p>" +
                        "</figcaption>" +
                        statusStr+
                        "</article>"
                }
                seriesContainer.append(seriesStr);
                $('#moreQualityContent').hide();
                var addClass=$("#contentArea").find('.bestItem .addClass');
                addClass.off('click').on('click',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    ydSfn.addClass($(this));

                })
                $("#contentArea .bestItem").off('click').on('click',function () {
                    var openUrl=$(this).attr('data-seid');
                    window.open('https://'+openUrl+'?sourceType=26');
                })
            }else {
                $('#moreQualityContent').show();
            }

        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
};
ydSfn.clickSearch = function(type){
    var searchTool = $("#searchTool");
    switch (type){
        case "hot":
        case "lenovo":
            $(".al-hotSearchWord").each(function(){
            $(this).unbind("click").bind("click",function(){
                var isStr = $(this).html();
                commLog.creatEvent({"id":174,"url":window.location.href,"keyword":"搜索-热门搜索"+isStr,"browseType":"26"});
                searchTool.val(isStr);
                // console.log('lenovo')
                ydGloVar.keyVal = isStr;
                if(ydSfn.customerId!=null){
                    ydSfn.ajax("add",'',"post");
                }
                ydSfn.ajax("course",'',"post");
                ydSfn.medicalResources(ydGloVar.keyVal);
            });
        });
            $(".yd-searchResultItem").each(function(){
                $(this).unbind("click").bind("click",function(){
                    // commLog.creatEvent({"id":173,"url":window.location.href,"keyword":"搜索-搜索输入框","browseType":"26"});
                    var isStr = $(this).text();
                    searchTool.val(isStr);
                    // console.log('lenovo1')
                    ydGloVar.keyVal = isStr;
                    if(ydSfn.customerId!=null){
                        ydSfn.ajax("add",'',"post");
                    }
                    ydSfn.ajax("course",'',"post");
                    ydSfn.medicalResources(ydGloVar.keyVal);
                });
            });
            break;
        case "course":

            break;
        default:
            break;
    }
};
ydSfn.dealNoData = function(type){
    var historyOutContainer = $("#historyOutContainer");
    var terminalSearchContainer = $(".terminalSearchContent");
    var medicalResourcesContainer=$(".medicalResources");
    switch (type){
        case "history":
            historyOutContainer.hide();
            break;
        case "course":
            terminalSearchContainer.hide();
            medicalResourcesContainer.hide();
            var display=$(".medicalResources").css('display');
            if(display=='none'){
                // console.log('none')
                $('.searchInexistence').show();
            }else {
                $('#seriesNoResult').show();
                $('.searchInexistence').hide();
            }
            break;
        default:
            break;
    }
};
ydSfn.ajax = function(type,isStr,typeList){
    var ajaxConfig = ydSfn.configAjax(type);
    $.ajax({
        url: ajaxConfig.port,    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: ajaxConfig.postData,    //参数值
        type: typeList,   //请求方式
        beforeSend: function() {
            //请求前的处理
        },
        success: function(req) {
            //请求成功时处理
            if(req.responseObject.responseStatus){
                // $('.searchInexistence').hide();
                // $('#seriesNoResult').hide();
                ydSfn.dealData(type,req,isStr);
            }else{
                ydSfn.dealNoData(type,isStr);
            }

        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
};
ydSfn.lenovoSearch = function(){
    var searchTool = $("#searchTool");
    var lenovoContainer = $("#searchResultContainer");
    searchTool.unbind("keyup").bind("keyup",function(e){
        var isStr = $(this).val();
        lenovoContainer.show();
        if(isStr.length>0){
            ydGloVar.keyVal = isStr;
            ydSfn.ajax("lenovo",isStr,"post");
            lenovoContainer.show ();
            var hotOutContainer = $("#hotSearchOutContainer");
            var historyOutContainer = $("#historyOutContainer");
            hotOutContainer.hide();
            historyOutContainer.hide();
            if(e.which==13){
                // commLog.creatEvent({"id":173,"url":window.location.href,"keyword":"搜索-搜索输入框","browseType":"26"});
                if(ydSfn.customerId!=null){
                    ydSfn.ajax("add",'',"post");
                }
                ydSfn.ajax("course",'',"post");
                ydSfn.medicalResources(ydGloVar.keyVal);
            }
            $(".al-search").off('click').on('click',function () {
                // console.log('al-search')
                // commLog.creatEvent({"id":173,"url":window.location.href,"keyword":"搜索-搜索输入框","browseType":"26"});
                if(ydSfn.customerId!=null){
                    ydSfn.ajax("add",'',"post");
                }
                ydSfn.ajax("course",'',"post");
                ydSfn.medicalResources(ydGloVar.keyVal);
            });
        }else{
            $(".al-search").off('click');
            lenovoContainer.hide();
            var display=$(".medicalResources").css('display');
            var eliteSearchContentDisplay=$('.eliteSearchContent').css('display');
            var seriesCoursesContentDisplay=$('.seriesCoursesContent').css('display');
            var hotOutContainer = $("#hotSearchOutContainer");
            var historyOutContainer = $("#historyOutContainer");
            if(display=='none'&&eliteSearchContentDisplay=='none'&&seriesCoursesContentDisplay=='none'){
                hotOutContainer.show();
                // console.log(historyOutContainer.find('li').length)
                if(historyOutContainer.find('li').length==0){
                    historyOutContainer.hide();
                }else {
                    historyOutContainer.show();
                }
            }
        }
    });
};
ydSfn.customerId=null;
ydSfn.medicalResources=function (keyWord) {
    var isData = {
        pageIndex: 1,
        pageSize: 5,
        searchParam: keyWord,
        logoUseFlag: 3,
        useFlag: 2,  //--登录传入2，不登录传入1
        attUseFlag: 3,
        sortType: 1,
        scene:1,
        "searchType":2,
        "platformId":"1",
        "sessionCustomerId":ydSfn.customerId
    };
    isData = {"paramJson": $.toJSON(isData)};
    // console.log(isData);
    $.ajax({
        url: "//www.yi-ding.net.cn/call/allin/all/search/getMapList/",    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
        data: isData,    //参数值
        type:"post",   //请求方式
        beforeSend: function() {
            //请求前的处理
        },
        success: function(data) {
            //请求成功时处理
            $("#recource").html('');
            if(data.responseObject.responseStatus){
                var resourceCount=data.responseObject.responseData.resource_count+data.responseObject.responseData.customer_count;
                $('.medicalResources .search-series .al-searchTitle span').text('('+resourceCount+')');
                $('.medicalResources').show();
                var xhrData = {
                    /*这个地方有改动*/
                    "listCustomer": data.responseObject.responseData.customer_list,
                    "listResource": data.responseObject.responseData.resource_list
                };
                var docstr = '';
                var endNum = 2;
                for (var t = 0; t < xhrData.listCustomer.length; t++) {
                    if (t == endNum) {
                        break;
                    }

                    var customerH5PageUrl="//m.allinmd.cn/pages/personal/others_contribution.html?"+xhrData.listCustomer[t].customer_h5_page_url.split('?')[1];
                    docstr +='<section class="contentInnerItem searchYDnone allinDoc" data-url="'+customerH5PageUrl+'">'+
                        '							<article class="allinPersonal">'+
                        '								<figure class="allinUserImg"><img src="'+xhrData.listCustomer[t].customer_att.logoUrl+'" alt=""></figure>'+
                        '								<figure class="allinUserSynopsis">'+
                        '									<span class="name">'+xhrData.listCustomer[t].customer_auth.lastName + xhrData.listCustomer[t].customer_auth.firstName+'</span>'+
                        '									<span class="hospital">'+xhrData.listCustomer[t].customer_auth.company+'</span>'+
                        '								</figure>'+
                        '							</article>'+
                        '						</section>';

                }
                var sourceStr = "";
                var listResourceend=5;
                if(xhrData.listCustomer.length>=2){
                    listResourceend=listResourceend-2;
                }else {
                    listResourceend=listResourceend-xhrData.listCustomer.length;
                }
                if (xhrData.listResource) {

                    for (var m = 0; m < xhrData.listResource.length; m++) {
                        /*typeId  1-视频 2-文库  4-话题 7- 病例 3会议
                         */
                        if (m == listResourceend) {
                            break;
                        }
                        var imgHtml='';
                        var hasImgClass='';
                        if(xhrData.listResource[m].picUrl){
                            if(xhrData.listResource[m].typeId==1){
                                imgHtml='<figure class="contentInnerImg">'+
                                    '<a href="'+xhrData.listResource[m].resourceUrl+'"target="_blank">'+
                                    '								<div class="playIcon"></div>'+
                                    '								<img src="'+xhrData.listResource[m].picUrl.split('|')[0]+'" alt="">'+
                                    '								<div class="timeNum">'+xhrData.listResource[m].playTime+'</div>'+
                                    '</a>'+
                                    '</figure>';

                            }else{
                                imgHtml='<figure class="contentInnerImg">'+
                                    '<a  href="'+xhrData.listResource[m].resourceUrl+'">'+
                                    '	<img src="'+xhrData.listResource[m].picUrl.split('|')[0]+'" alt="">'+
                                    '</a>'+
                                    '							</figure>';

                            }

                            hasImgClass="";
                        }else{
                            imgHtml="";
                            hasImgClass="al-contentUpTitleDownImg";
                        }
                        if(xhrData.listResource[m].typeId==1){
                            sourceStr+='<section class="contentInnerItem searchYDnone">'+
                                '							<article class="contentInnerContext">'+
                                '								<a  href="'+xhrData.listResource[m].resourceUrl+'"target="_blank">'+xhrData.listResource[m].resourceName+'</a>'+
                                '								<article class="contentOtherMsg">'+
                                '									<figure class="personalName"><i></i><span>'+xhrData.listResource[m].customerName+'</span></figure>'+
                                '									<figure class="watchNum"><i></i><span>'+xhrData.listResource[m].browseNum+'</span></figure>'+
                                '								</article>'+
                                '							</article>'+
                                imgHtml+
                                '						</section>';
                        }else if(xhrData.listResource[m].typeId==2){
                            sourceStr+='<section class="contentInnerItem searchYDnone allinDoc">'+
                                '							<article class="contentInnerContext">'+
                                '								<a href="'+xhrData.listResource[m].resourceUrl+'" >'+xhrData.listResource[m].resourceName+'</a>'+
                                '								<article class="contentOtherMsg">'+
                                '									<figure class="allinDocIcon">PDF</figure>'+
                                '									<figure class="personalName"><i></i><span>'+xhrData.listResource[m].customerName+'</span></figure>'+
                                '									<figure class="watchNum"><i></i><span>'+xhrData.listResource[m].browseNum+'</span></figure>'+
                                '								</article>'+
                                '							</article>'+
                                '						</section>';
                        }else if(xhrData.listResource[m].typeId==3){
                            sourceStr +='<section class="al-contentPartModule al-contentUpTitleDownImg">' +
                                '<article class="al-contentText">' +
                                '<a href="//m.allinmd.cn/pages/conference/meeting-place.html?conId='+xhrData.listResource[m].resourceId+'&conName='+xhrData.listResource[m].resourceName+'" class="al-contentTitle" target="_blank">' +
                                '<span>'+xhrData.listResource[m].resourceName+'</span>' +
                                '</a>' +
                                '<p class="al-contentOtherMsg">' +
                                '<span class="al-contentSeminarTime icon-contentSeminarTime"><i></i>'+comm.date.dateJoint(xhrData.listResource[m].startTime,xhrData.listResource[m].endTime,'/','-')+'</span>' +
                                '<span class="icon-contentSeminarPlace"><i></i>'+xhrData.listResource[m].conLocation+'</span>' +
                                '</p></article></section>';
                        }else if(xhrData.listResource[m].typeId==4){
                            sourceStr+='<section class="contentInnerItem searchYDnone">'+
                                '							<article class="contentInnerContext">'+
                                '								<a  href="'+xhrData.listResource[m].resourceUrl+'"  target="_blank">'+xhrData.listResource[m].resourceName+'</a>'+
                                '								<article class="contentOtherMsg">'+
                                '									<figure class="personalName"><i></i><span>'+xhrData.listResource[m].customerName+'</span></figure>'+
                                '									<figure class="watchNum"><i></i><span>'+xhrData.listResource[m].browseNum+'</span></figure>'+
                                '								</article>'+
                                '<figure class="topicIcon"></figure>'+
                                '							</article>'+
                                imgHtml+
                                '						</section>';
                        }else{
                            sourceStr+='<section class="contentInnerItem searchYDnone">'+
                                '							<article class="contentInnerContext">'+
                                '								<a  href="'+xhrData.listResource[m].resourceUrl+'" target="_blank">'+xhrData.listResource[m].resourceName+'</a>'+
                                '								<article class="contentOtherMsg">'+
                                '									<figure class="personalName"><i></i><span>'+xhrData.listResource[m].customerName+'</span></figure>'+
                                '									<figure class="watchNum"><i></i><span>'+xhrData.listResource[m].browseNum+'</span></figure>'+
                                '								</article>'+
                                '							</article>'+
                                imgHtml+
                                '						</section>';
                        }

                    }
                }
                $("#hotSearchOutContainer").hide();
                $("#historyOutContainer").hide();
                // console.log(sourceStr);
                if(docstr!=""){
                    $("#recource").html(docstr+sourceStr);
                    // allinmdH5Search.config.allBox.allDoctor.html(docstr).show(10);
                }else {
                    $("#recource").html(sourceStr);
                }

                if(resourceCount>5){
                    $('#moreRecource').show();
                    if(listResourceend<=xhrData.listResource.length){
                        $('#moreRecource').show();
                    }else {
                        $('#moreRecource').hide();
                    }
                }else {
                    $('#moreRecource').hide();
                }
                var text=$('.eliteSearchContent .al-searchTitle span').text();
                var text1=$('.contentItemHeader h2 span').text();
                if(text=='(0)'&&text1=='(0)'){
                    $('#seriesNoResult').show();
                    $('.eliteSearchContent .search-series').show();
                }
                $('#recource .contentInnerContext a').off('click').on('click',function (e) {
                    e.preventDefault();
                })
                $('#recource .contentInnerItem').off('click').on('click',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var allinmdurl=$(this).find('a').attr('href');
                    window.open(allinmdurl)
                })
                $('.allinPersonal').off('click').on('click',function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var allinmdurl=$(this).parent().attr('data-url');
                    window.open("https://"+allinmdurl);
                })
                var keyWord=$('#searchTool').val();
                $('#moreRecource').off('click').on('click',function () {
                    window.open(ydSfn.jumpAllinmd);
                })
                if(ydSfn.locationHref.indexOf('niceClass.html')!=-1){
                    $('#seriesCoursesContent').hide();
                    $('.medicalResources').hide();
                }
                $('.searchInexistence').hide();
            }else {
                $('.medicalResources').hide();
                // var ydsearch=$('#seriesCoursesContent').css('display');
                // var ydsearch1= $('.eliteSearchContent .search-series').css('display');
                // var ydsearch2= $('#seriesCoursesContent').css('display');
                var text=$('.eliteSearchContent .al-searchTitle span').text();
                var text1=$('.contentItemHeader h2 span').text();
                if(text=='(0)'&&text1=='(0)'){
                    $('.searchInexistence').show();
                    $('#seriesNoResult').hide();
                }else {
                    $('.searchInexistence').hide();
                }
                // console.log(ydsearch+ydsearch1+ydsearch2)
                // if(ydsearch=='none'&&ydsearch1=='none'&&ydsearch2=='none'){
                //     $('.searchInexistence').show();
                //     $('#seriesNoResult').hide();
                // }else {
                //     $('.searchInexistence').hide();
                // }
                if(ydSfn.locationHref.indexOf('niceClass.html')!=-1){
                    $('#seriesCoursesContent').hide();
                    $('.medicalResources').hide();
                }
            }


        },
        complete: function() {
            //请求完成的处理
        },
        error: function() {
            //请求出错处理
        }
    });
}
ydSfn.enterSearch=function () {
    var searchToolval=$("#searchTool").val();
    if(searchToolval.length>0){
        $("#searchTool").keyup(function (event) {
            if(event.which==13){
                // console.log('keyup')
                if(ydSfn.customerId!=null){
                    ydSfn.ajax("add",'',"post");
                }
                ydSfn.ajax("course",'',"post");
                ydSfn.medicalResources(searchToolval);
                // console.log('dfj')
            }
        })
    }
};
ydSfn.locationHref=null;
ydSfn.jumpAllinmd=null;
ydSfn.init = function(){
    window.onload=new function(){
        commLog.createBrowse(26,'搜索-(输入、结果页)',window.location.href)
    }
    comm.pcSideModule([{
        item: "首页",
        href: "//www.yi-ding.net.cn",
        active:false,
    }, {
        item: "课程",
        href: "//www.yi-ding.net.cn/pages/curriculum/curriculum.html",
        active:false,
    }, {
        item: "习题",
        href: "//www.yi-ding.net.cn/pages/category/question.html",
        active:true,
    }]);
    ydSfn.customerId=localStorage.getItem('userId');
    ydSfn.locationHref=document.referrer
    $("#al-headerTopNav").html("");
    $(".al-se-lo-re .al-search").remove();
    $('#searchTool').focus(function (e) {
        e.preventDefault();
        e.stopPropagation();
    })
    $(".al-mainSidebarList li").removeClass('active');
    this.ajax("hot",'',"GET");
    if(ydSfn.customerId!=null){
        this.ajax("history",'',"GET");
    }
    ydGloVar.keyVal = null;
    this.lenovoSearch();
    $(".medicalResources").hide();
    $('.icon-searchreturn').off('click').on('click',function () {
       window.history.back();
    });
    $("#searchTool").off('focus').on('focus',function () {
        commLog.creatEvent({"id":173,"url":window.location.href,"keyword":"搜索-搜索输入框","browseType":"26"});
    })
};
$(document).ready(function(){
    // console.log(ydSearch);
    ydSfn.init();
    window.onbeforeunload=function (evt) {
        commLog.updateLeave();
    };
});

