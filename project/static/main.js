const options = {
    "Hotel": [{
        "HotelName": "橙子上海徐家汇虚拟酒店",
        "HotelAddress": "上海市徐汇区橙子江路",
        "HotelPhone": "021-12345678",
        "HotelNumber": "2152003",
        "HotelZip": "123456",
        "HotelFax": "12345678"
    }],
    "Staff": [{
        "StaffName": "TEST001"
    }],
    "Payment": [
        "支付宝支付",
        "支付宝原生支付",
        "微信支付",
        "微信原生支付",
        "京东支付",
        "现金支付",
        "芝麻信用支付",
        "AR账",
        "Unionpay 银联卡支付",
        "数字人民币支付"
    ],
    "Consumption": [
        "房费",
        "早餐",
        "损毁费",
        "会议场地租赁"
    ],
    "Vip": [{
        "VipType": "星会员",
        "VipDiscount": "98"
    },
    {
        "VipType": "银会员",
        "VipDiscount": "92"
    },
    {
        "VipType": "金会员",
        "VipDiscount": "88"
    },
    {
        "VipType": "铂金会员",
        "VipDiscount": "85"
    }
    ],
    "links": [],
    "PrinterTested": [{
        "PrinterBrand": "佳博",
        "PrinterModel": "GP-L80160 Series"
    },{
        "PrinterBrand": "佳博",
        "PrinterModel": "GP-L80180 Series"
    }]
};

const Checkout = {
    "CustomNum": "1",
    "RoomNum": "1",
    "CustomerName": "一个数据库例子",
    "CheckinTime": "2019-01-01",
    "CheckoutTime": "2019-01-02",
    "PrintDate": "2017-01-01",
    "StaffAD": "21",
    "CheckoutData": [{
        "Consumption": [{
            "ConsumptionDate": "01.01.2019",
            "ConsumptionType": "Food",
            "ConsumptionRoom": "Kitchen",
            "ConsumptionAmount": "2"
        }],
        "ConsumptionTotal": "2",
        "Payment": [{
            "PaymentDate": "01.01.2019",
            "PaymentType": "Cash",
            "PaymentAmount": "100"
        }],
        "PaymentTotal": "100",
    }]
};

const PriceCalc = {
    "PriceCalcItem": [{
        "VipType": "铂金会员",
        "VipDiscount": "85",
        "date": "2019-01-01",
        "Price": "-",
        "RetailPrice": "-",
        "FoldOnFold": "-",
        "Minus": "-",
        "Add": "-"
    }]
};

const HandoverSheet = {
    "Sheet": [{
        "HotelName": "",
        "date": "",
        "PMSUM": "",
        "POSUM": "",
        "Difference": "",
        "DifferenceDESC": ""
    }]
};
//初始化日期
function nowDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var dateTime = year + "-" + month + "-" + day;
    return dateTime;
}

/*
 
    日期增加
 
*/
function addDay(datetime, days) {
    var old_time = new Date(datetime.replace(/-/g, "/")); //替换字符，js不认2013-01-31,只认2013/01/31
    var fd = new Date(old_time.valueOf() + days * 24 * 60 * 60 * 1000); //日期加上指定的天数
    var new_time = fd.getFullYear() + "-";
    var month = fd.getMonth() + 1;
    if (month >= 10) {
        new_time += month + "-";
    } else {
        //在小于10的月份上补0
        new_time += "0" + month + "-";
    }
    if (fd.getDate() >= 10) {
        new_time += fd.getDate();
    } else {
        //在小于10的日期上补0
        new_time += "0" + fd.getDate();
    }
    return new_time; //输出格式：2013-01-02
};

var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
    try {
        return window.getComputedStyle
            ? window.getComputedStyle(el)[attr]
            : el.currentStyle[attr];
    } catch (e) { }
    return "";
};

function getQuote() {
    var quoteArr = [
        '天可补，海可填，南山可移。日月既往，不可复追。',
        '山不让尘，川不辞盈。',
        '只有流过血的手指，才能弹出世间的绝唱。',
        '当我们真正热爱这世界时，我们才真正生活在这世上。',
        '幸福比傲慢更容易蒙住人的眼睛。',
        '不傲才以骄人，不以宠而作威。',
        '老年人常思既往，少年人常思将来。惟思既往也，故生留恋心；惟思将来也，故生希望心。',
        '追逐影子的人，自己就是影子。',
        '月缺不改光，剑折不改刚。',
        '人生有两出悲剧：一是万念俱灰，另一是踌躇满志。',
        '好运总是要先捉弄一番，然后才向着坚忍不拔者微笑的。',
        '不必行色匆匆，不必光芒四射，不必成为别人，只需做自己。',
        '立志欲坚不欲锐，成功在久不在速。',
        '既然今天，没人识得星星一颗，那么明日，何妨做皓月一轮。',
        '接受每一个人的批评，可是保留你自己的判断。',
        '真正打动人的感情总是朴实无华的，它不出声，不张扬，埋得很深。',
        '聪明人只要能认识自己，便什么也不会失去。',
        '人应尊敬自己，并应自视能配得上最高尚的东西。',
        '孤独是所有杰出人物的命运。',
        '君子欲讷于言而敏于行。',
        '永远年轻，永远热泪盈眶，永远在路上。',
        '既然选择了远方，便只顾风雨兼程；既然目标是地平线，留给世界的就只能是背影。',
        '卓越的天才不屑走一条人家走过的路。他寻找迄今没有开拓过的地区。',
        '未来不足惧，过往不须泣。',
        '黑夜无论怎样悠长，白昼总会到来。',
        '人生需要准备的，不是昂贵的茶，而是喝茶的心情。',
        '先相信你自己，然后别人才会相信你。',
        '辛苦是获得一切的定律。',
        '想一下子全知道，就意味着什么也不知道。',
        '最好不要在西下的时候去幻想什么，而要在旭日初升的时候即投入工作。',
        '最聪明的人是最不愿浪费时间的人。',
        '通向荣誉的路上，并不铺满鲜花。',
        '天才出于勤奋。',
        '伟大的事业，需要决心，能力，组织和责任感。',
        '伟大人物最明显的标志，就是他坚强的意志。',
        '耐心是一切聪明才智的基础。',
        '你热爱生命吗?那么别浪费时间，因为时间是组成生命的材料。',
        '你若要喜爱你自己的价值，你就得给世界创造价值。',
        '完成工作的方法，是爱惜每一分钟。',
        '灵感——这是一个不喜欢采访懒汉的客人。',
        '越学习，越发现自己的无知。',
        '幸福永远存在于人类不安的追求中，而不存在于和谐与稳定之中。',
        '差若毫厘，谬以千里。',
        '独学而无友，则孤陋而寡闻。',
        '得道多助，失道寡助。',
        '尺有所短，寸有所长；物有所不足，智有所不明。',
        '独学而无友，则孤陋而寡闻。',
        '高岸为谷，深谷为陵。',
        '工欲善其事，必先利其器。',
        '蛋已经下了，就不要去问母鸡是怎么下的。',
        '失去的东西，其实从来未曾真正地属于你，也不必惋惜。'
    ] // 可以通过改变数组内容，对名言或诗词进行增删
    return quoteArr[Math.floor(Math.random() * quoteArr.length)] // 数组中随机取一个元素
}

tippy('.navbar-brand', {
    content: getQuote(),
});

tippy('#CustomNum', {
    content: '自定义填写，8位随机数',
});

tippy('#ResetDefault', {
    content: '点了可不许反悔哦~',
});

tippy('.checkDateStop', {
    content: '日期递增锁',
});

/**
 * 动态创建iframe
 * @param dom 创建iframe的容器，即在dom中创建iframe。dom能够是div、span或者其它标签。
 * @param src iframe中打开的网页路径
 * @param onload iframe载入完后触发该事件。能够为空
 * @return 返回创建的iframe对象
 */
function createIframe(dom, src, onload) {
    //在document中创建iframe
    var iframe = document.createElement("iframe");

    //绑定iframe的onload事件
    if (onload && Object.prototype.toString.call(onload) === '[object Function]') {
        if (iframe.attachEvent) {
            iframe.attachEvent('onload', onload);
        } else if (iframe.addEventListener) {
            iframe.addEventListener('load', onload);
        } else {
            iframe.onload = onload;
        }
    }

    iframe.src = src;
    //把iframe载入到dom以下
    dom.appendChild(iframe);
    return iframe;
}

/**
 * 销毁iframe，释放iframe所占用的内存。

 * @param iframe 须要销毁的iframe对象
*/
function destroyIframe(iframe) {
    //把iframe指向空白页面，这样能够释放大部分内存。
    iframe.src = 'about:blank';
    try {
        iframe.contentWindow.document.write('');
        iframe.contentWindow.document.clear();
    } catch (e) { }
    //把iframe从页面移除
    iframe.parentNode.removeChild(iframe);
}