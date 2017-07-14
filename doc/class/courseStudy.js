/**
 * Created by ALLIN on 2017/3/14.
 */
function courseStudy() {
    var postData = {
        customerId: loginAbout.login.status().userId,
        type: 5,
        tollgateId:course.courseId,
        examId: course.seriesId,
    };
    course.applyData("courseStudy", postData);
}