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
    }],
    "OpenSourceProject": [{
        "Name": "Bootstrap",
        "Version": "3.4.1",
        "Url": "https://getbootstrap.com/",
        "license": "https://github.com/twbs/bootstrap/blob/main/LICENSE"
    }, {
        "Name": "jQuery",
        "Version": "3.6.0",
        "Url": "https://jquery.com/",
        "license": "http://jquery.org/license/"
    }, {
        "Name": "layDate",
        "Version": "5.3.1",
        "Url": "https://github.com/layui/layui",
        "license": "https://github.com/layui/layui/blob/main/LICENSE"
    }, {
        "Name": "Table-to-JSON",
        "Version": "1.0.0",
        "Url": "https://www.github.developerdan.com/table-to-json/",
        "license": "http://www.apache.org/licenses/LICENSE-2.0"
    }, {
        "Name": "Font Awesome",
        "Version": "4.7.0",
        "Url": "https://github.com/FortAwesome/Font-Awesome/",
        "license": "http://fontawesome.io/license"
    }, {
        "Name": "Tippy.js",
        "Version": "6.3.7",
        "Url": "https://atomiks.github.io/tippyjs/",
        "license": "https://github.com/atomiks/tippyjs/blob/master/LICENSE"
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

tippy('.navbar-brand', {
    content: '好好学习，天天向上！',
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