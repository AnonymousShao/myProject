var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function ymd(opt) {
    //出始化年
    var dDate = new Date(),
        dCurYear = dDate.getFullYear(),
        str = "";

    if (opt.default1) {
        opt.year.css(opt.css);

    }
    for (var i = dCurYear; i >= (opt.startYear ? opt.startYear : 1930); i--) {
        if (i == (opt.order ? 1970 : dCurYear)) {
            str = "<option value=" + i + " selected=true>" + i + "</option>";
        } else {
            str = "<option value=" + i + ">" + i + "</option>";
        }
        opt.year.append(str);
        if (opt.defaultYear) {
            opt.year.val(opt.defaultYear)
        }
    }
    //出始化月
    if (opt.defaultMonth) {
        opt.month.css(opt.css);
    }

    if (opt.month) {
        for (var i = (opt.startMonth ? opt.startMonth : 1); i <= (opt.endMonth ? opt.endMonth : 12); i++) {
            if (i == (opt.order ? 7 : (dDate.getMonth() + 1))) {
                str = "<option value=" + (i < 10 ? "0" + i : i) + " selected=true>" + (opt.en ? monthArr[i - 1] : (i < 10 ? "0" + i : i)) + "</option>";
            } else {
                str = "<option value=" + (i < 10 ? "0" + i : i) + ">" + (opt.en ? monthArr[i - 1] : (i < 10 ? "0" + i : i)) + "</option>";
            }
            opt.month.append(str);
        }
    }
    if (opt.defaultMonth) {
        opt.month.val(opt.defaultMonth);
    }
    //调用函数出始化日
    if (opt.day) {
        TUpdateCal(opt);
        opt.year.bind("change", function() {
            if (opt.month.val() != "0") {
              
                TUpdateCal(opt);
            }
        });
        opt.month.bind("change", function() {
            TUpdateCal(opt);

        });
    }
        if (opt.defaultDay) {
        opt.day.val(opt.defaultDay);
    }
    function TGetDaysInMonth(year, month) {
        month = parseInt(month, 10);
        var dPrevDate = new Date(year, month, 0);
        return dPrevDate.getDate();
    }

    function TUpdateCal(opt) {
        var dDate = new Date();
        daysInMonth = TGetDaysInMonth(opt.year.val(), opt.month.val());
        str = "";
        n = "";
        $("option", opt.day).each(function(i, em) {
           
            if ($(em).attr("selected")) {
                n = $(em).val();
                if (n < 10) {
                    n = n.substring(1);
                }
                return;
            }
        })
        // opt.day.empty();
        if (opt.default1) {
            opt.day.css(opt.css);

        }

        for (var d = ((opt.month.val() == 05 && opt.startDay) ? opt.startDay : 1); d <= ((opt.month.val() == 10 && opt.endDay) ? 30 : parseInt(daysInMonth)); d++) {

            if (d == (n ? n : (opt.order ? 1 : dDate.getDate()))) {
                str = "<option value=" + (d < 10 ? "0" + d : d) + " selected=true>" + (d < 10 ? "0" + d : d) + "</option>";
            } else {
                str = "<option value=" + (d < 10 ? "0" + d : d) + ">" + (d < 10 ? "0" + d : d) + "</option>";
            }
            opt.day.append(str);
        }
    }
}


//时间匹配
function gettime(obj, time) {
    if (time) {
        obj.find("option").each(function(i, val) {
            if ($(val).val() == time) {
                $(val).attr("selected", true);
                return;
            }
        });
    }

};
//时间判断
function checkEndTime(startTime, endTime) {
    //var start=new Date(startTime.replace(/\-/g, "\/"));
    //var end=new Date(endTime.replace(/\-/g, "\/"));
    if (endTime) {
        var start = new Date(startTime.substring(0, 4), startTime.substring(5, 7), startTime.substring(8, 10), "", "", "");
        var end = new Date(endTime.substring(0, 4), endTime.substring(5, 7), endTime.substring(8, 10), "", "", "");
        if (end < start) {
            return false;
        }
    }
    return true;
}
//格式化英文的月份
function getEnTime(opt) {
    year = monthEn = day = '';
    if (opt.date) {
        year = opt.date.substring(0, 4);
        month = opt.date.substring(5, 7);
        if (month < 10) {
            monthEn = monthArr[month.substring(1) - 1];
        } else {
            monthEn = monthArr[month - 1];
        }
        day = opt.date.length > 7 ? opt.date.substring(8, 10) : 01;

    }
    return {
        'year': year,
        'month': monthEn,
        'day': day
    }
}
