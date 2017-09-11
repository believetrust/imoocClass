/**
 * 将核心数据渲染到静态结构中
 * Created by shuqing on 2017/9/8.
 */

(function () {
    //先拿到核心方法呢
    var datepicker = window.datepicker;
    var monthData;
    var $wrapper;
    //给它一个方法啦--渲染函数呢,参数是哪一年/月的日期UI呢
    datepicker.buildUi = function (year,month) {
        //拿到核心数据了  //一般来说,在业务中,我们将数据渲染到结构中,会使用一个模板引擎。但我们就使用拼接字符串的方式即可。
        monthData = datepicker.getMonthDate(year,month);
        var html =
            '<div class="ui-datepicker-header">'+
                '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn" >&lt;</a>'+
                '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'+
                '<span class="ui-datepicker-curr-month">'+monthData.year + '-' +monthData.month + '</span>'+
            '</div>'+
        '<div class="ui-datepicker-body">'+
            '<table>'+
               '<thead>'+
                   '<tr>'+
                       '<th>一</th>'+
                       '<th>二</th>'+
                       '<th>三</th>'+
                       '<th>四</th>'+
                       '<th>五</th>'+
                       '<th>六</th>'+
                       '<th>日</th>'+
                   '</tr>'+
               '</thead>'+
                '<tbody>';
                    for(var i=0;i<monthData.days.length;i++){
                        var date = monthData.days[i];
                        if(i%7 == 0){ html += '<tr>' }
                        html += '<td data-date="'+ date.date + '">' + date.showDate + '</td>';
                        if(i%7 ==6 ){  html += '</tr>' }
                    }
                html += '</tbody>'+
            '</table>'+
        '</div>';
        return html;
    }

    datepicker.render = function (direction) {
        var year,month;
        if(monthData){
            year = monthData.year;
            month = monthData.month;
        }
        if(direction == 'prev') month --;
        if(direction == 'next') month ++;

        var html = datepicker.buildUi(year,month);

        if(!$wrapper){
            $wrapper = document.createElement('div');
            $wrapper.className = 'ui-datepicker-wrapper';
            document.body.appendChild($wrapper);
        }

        $wrapper.innerHTML = html;

        // $dom.innerHTML = html;
        
    }

    datepicker.init = function(input){
        //拿到HTML,并将HTML放在包裹元素中
        //但现在从 包裹元素 变成了 输入框,组件自己写数据,并在页面里找位置。
        // 通过一个样式
        datepicker.render();

        var $input = document.querySelector('input');
        var isOpen = false;
        //    日期组件的展开与收起
        $input.addEventListener('click',function () {
            if(isOpen){
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            }else{
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 9 +'px';
                $wrapper.style.left = left + 'px';
                isOpen = true;
            }
        },false);

        $wrapper.addEventListener('click',function (e) {
            var $target = e.target;
            // console.log(e)
            if(!$target.classList.contains('ui-datepicker-btn')) return;
            if($target.classList.contains('ui-datepicker-prev-btn')){
                datepicker.render('prev');

            }else if($target.classList.contains('ui-datepicker-next-btn')){
                datepicker.render('next');

            }
        });

        $wrapper.addEventListener('click',function (e) {
            var $target = e.target;
            if($target.tagName.toLowerCase() != 'td') return;
            var date = new Date(monthData.year,monthData.month-1,$target.dataset.date);
            //日期格式化呈现
            $input.value = format(date);
            if(isOpen){
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            }

        })
    }

    function format(date) {
        var ret = '';
        //日期格式的处理
        var padding = function (num) {
            if(num <=9){
                return '0'+num;
            }
            //js有隐士类型转换
            return num;
        }
        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());

        return ret;
    }
    
})();