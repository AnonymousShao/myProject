/**
 * Created by ALLIN on 2017/3/15.
 */
function eventDefault() {
    if(!window.name){
        window.name = 'test';
        if(localStorage.getItem('vedioMaxTime')){
            localStorage.removeItem('vedioMaxTime');
        }
    }
    $('.course-video .courseVideoPupop').remove();
    if ($(".classDown .maxWidth li").length > 3) {
        course.swipe($(".classDown"), $(".classDown .clear"), $(".classDown .downIcon")[0].clientWidth + 'px', $(".classDown .clear li"), "247px");
    };
}