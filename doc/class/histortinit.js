/**
 * Created by ALLIN on 2017/3/15.
 */
function histortinit(){
    var historyData = {
        "courseId": course.courseId,
        "customerId": loginAbout.login.status().userId,
        "videoId": course.videoId,
        "typeId": "1",
        "visitSiteId": "13",
        "isValid": "1",
        "firstResult": "0",
        "maxResult": "10",
        "sortType": "2"
    };
    course.applyData("histroyTime", historyData);
}