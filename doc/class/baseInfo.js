/**
 * Created by ALLIN on 2017/3/14.
 */
 function baseInfo() {
    var postData = {
        "courseId": course.courseId,
        "sessionCustomerId": localStorage.getItem('userId'),
        "attUseFlag": "",
        "isValid": "",
        "visitSiteId": "13",
        "firstResult": 0,
        "maxResult": 10
    };
    this.applyData("point", postData);//初始化加载视频锚点
}