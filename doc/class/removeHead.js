/**
 * Created by ALLIN on 2017/3/15.
 */
function removeHead() {
    $(".al-headerTopNav").html("");
    $(".al-mainSidebarList .active").each(function () {
        $(this).removeClass("active");
    });
}