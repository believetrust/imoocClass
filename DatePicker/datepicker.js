/**
 * 获取日历 -- 核心数据
 * Created by shuqing on 2017/9/8.
 */

/**
 * 1. 闭包-匿名函数中-不污染外部环境
 * 2. 定义一个对象变量,然后整个 js 暴露的对象就只有这个对象
 * 3. 真正的编写将内容挂在对象上
*/
(function () {
    var datepicker = {};
    /* 获取一个月的数据,这个方法有两个参数:年份和月份 */
    datepicker.getMonthDate = function (year,month) {
        //定义一个数组用来存储返回的结果,数组中的每一个元素都是当前月份的一个日期
        var ret = [];

        //如果用户没有传 年份 或者 月份时,就返回当前的日期
        if(!year && !month){
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth()+1;
        }

        //我们需要拿到当前月的第一天是周几,因它决定了它前面有几个上一个月的日期呢
        //先拿到日期对象,再取得星期几呢,因我们操作的都是日期对象哦~~
        var firstDay = new Date(year,month-1,1);
        var firstDayWeekDay = firstDay.getDay();

        if (firstDayWeekDay === 0) firstDayWeekDay = 7;

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        //我们需要拿到上一个月最后一天的日期对象,也就是当月的第0天,得到它是几号
        var lastDayOfLastMonth = new Date(year,month-1,0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
        // 如果是周一,那前面就只有0天;如果是周天,那就是 7-1 =6 天呢
        var preMonthDayCount = firstDayWeekDay -1;


        //我们需要拿到当前月的最后一天是几号,因我们的日期会越界,我们需要知道,什么时候,它越界了。
        var lastDay = new Date(year,month,0);
        var lastDate = lastDay.getDate();

        //一般来说,每一个月正常有5周,但也有特殊的,比如只有4周的二月份,但也有六周的月份
        for(var i=0;i<7*6;i++){
            //先算一下,每一个月的真实数据
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;
            if (date <=0){
                //上一月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            }else if(date > lastDate){
                //下个月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if (thisMonth == 0 ) thisMonth = 12;
            if (thisMonth == 13) thisMonth = 1;

            ret.push({
                month:thisMonth,
                date:date,
                showDate:showDate,
            });

        }

        return {
            year:year,
            month:month,
            days:ret,
        };

    }
    window.datepicker = datepicker;

})();