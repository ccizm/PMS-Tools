chrome.storage.sync.get('Checkout', (data) => {
    Object.assign(Checkout, data.Checkout);
});

$('#PrintDate').val(nowDate());
$('#ConsumptionDate').val(nowDate());
$('#PaymentDate').val(nowDate());

//初始化酒店信息
chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    $('#StaffAD').val(options.Staff[0].StaffName);
    for (let i = 0; i < options.Consumption.length; i++) {
        $('#ConsumptionType').append(`<option value="${options.Consumption[i]}">${options.Consumption[i]}</option>`);
    }
    for (let i = 0; i < options.Payment.length; i++) {
        $('#PaymentType').append(`<option value="${options.Payment[i]}">${options.Payment[i]}</option>`);
    }
});

//消费账项添加行
$("#ConsumptionOperate").click(function () {
    //判断多个元素是否为空
    if ($("#ConsumptionDate").val() != "" && $("#ConsumptionType").val() != "" && $("#ConsumptionRoom").val() != "" && $("#ConsumptionAmount").val() != "") {
        $("#ConsumptionTable tbody").append("<tr><td>" +
            $('#ConsumptionDate').val() + "</td><td>" +
            $('#ConsumptionType').val() + "</td><td>" +
            $('#ConsumptionRoom').val() + "</td><td>" +
            $('#ConsumptionAmount').val() + "</td><td><button class='btn btn-link btn-xs del-link'>删除</button></td></tr>"
        );
        if ($('#ConsumptionDateLock').hasClass('btn-danger')) {

        } else {
            $("#ConsumptionDate").val(addDay($("#ConsumptionDate").val(), 1));
            $("#PrintDate").val($("#ConsumptionDate").val());
        }

    } else {
        $('#DefaultModalLabel').text('提示');
        $('#DefaultModalText').text('请填写完整信息！');
        $('#DefaultModal').modal('toggle');
    }
});

//付款账项添加行
$('#PaymentOperate').click(function () {
    //判断多个元素是否为空
    if ($("#PaymentDate").val() != "" && $("#PaymentType").val() != "" && $("#PaymentAmount").val() != "") {
        $("#PaymentTable tbody").append("<tr><td>" +
            $('#PaymentDate').val() + "</td><td>" +
            $('#PaymentType').val() + "</td><td>" +
            $('#PaymentAmount').val() + "</td><td><button class='btn btn-link btn-xs del-link'>删除</button></td></tr>"
        );

        if ($('#PaymentDateLock').hasClass('btn-danger')) {

        } else {
            $("#PaymentDate").val(addDay($("#PaymentDate").val(), 1));
        }

    } else {
        $('#DefaultModalLabel').text('提示');
        $('#DefaultModalText').text('请填写完整信息！');
        $('#DefaultModal').modal('toggle');
    }
});

//预览
$('#PrintPreview').click(function () {
    if ($('#CustomerName').val() != "" && $('#StaffAD').val() != "" && $('#ConsumptionTable tbody tr').length != 0) {
        CheckoutDataSet();
        var dateOne = new Date($('#PrintDate').val()); //Year, Month, Date    
        var dateTwo = new Date(Checkout.CheckoutTime); //Year, Month, Date 
        if (dateOne < dateTwo) {
            $('#DefaultModalLabel').text('提示');
            $('#DefaultModalText').text('打印日期小于退房日期，请检查打印日期！');
            $('#DefaultModal').modal('toggle');
        } else {
            $('#PreviewModal').modal({
                backdrop: "static", //点击空白处不关闭对话框
                show: true,
                keyboard: false
            });
            createIframe(document.getElementById('previewCheckout'), './checkout/b.html');
            if ($('#PaymentTable tbody tr').length != 0) {
                $('#PrintModal').modal('toggle');
            } else {
                $('#TopAlert').html('<div class="alert alert-info alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>提示：</strong>如需<b>自定义单号</b>和<b>付款账项</b>，请不要忘了添加！</div>');
            };
        };
    } else {
        $('#DefaultModalLabel').text('提示');
        $('#DefaultModalText').html('请检查并填写完整信息：<br><b>1.客人姓名<br>2.收款人AD<br>3.消费账项</b><br>是否有数据？');
        $('#DefaultModal').modal('toggle');
    }
});

//选择结账单类型
$('input[type="radio"][name="Checkoutradio"]').on("change", function () {
    document.getElementById('previewCheckout').innerHTML = "";
    createIframe(document.getElementById('previewCheckout'), './checkout/' + this.value + '.html');
});

$('#PrintThis').click(function () {
    document.getElementById('previewCheckout').getElementsByTagName('iframe')[0].contentWindow.print();
})


$('#PreviewModal .Print-close').click(function () {
    destroyIframe(document.getElementById('previewCheckout').getElementsByTagName('iframe')[0])
});
$(document).ready(function () {
    lay('.Date-item').each(function () {
        laydate.render({
            elem: this
            , trigger: 'click'
        });
    });

    /*
        创建删除函数
    */
    function del(x) {
        var tr = x.parentNode.parentNode;
        tr.parentNode.removeChild(tr);
    };

    $(document).on("click", ".del-link", function () {
        $(this).hide(200, function () {
            del(this)
        });
    });
});

function CheckoutDataSet() {
    ConsumptionTbaleObj = document.getElementById('ConsumptionTable');
    let CheckoutConsumptiondata = '';
    Checkout.CustomNum = '';
    if ($('#CustomNum').val('')) {
        Checkout.CustomNum = 'B' + options.Hotel[0].HotelNumber + Math.random().toString().slice(-8) + '001';
    } else {
        Checkout.CustomNum = options.Hotel[0].HotelNumber + $('#CustomNum').val();
    } //订单号
    Checkout.CustomerName = $('#CustomerName').val(); //入住人姓名
    Checkout.PrintDate = $('#PrintDate').val(); //打印时间
    Checkout.StaffAD = $('#StaffAD').val(); //操作人AD


    var CheckoutTime = new Date();
    //表格转Json，原生写法
    ConsumptionTbaleToJSON = '';


    Checkout.CheckinTime = ConsumptionTbaleObj.rows[1].cells[0].innerText;


    var ConsumptionTotal = 0;
    for (var i = 1; i < ConsumptionTbaleObj.rows.length; i++) {

        ConsumptionTbaleToJSON += '{"ConsumptionDate":"' + ConsumptionTbaleObj.rows[i].cells[0].innerText +
            '","ConsumptionType":"' + ConsumptionTbaleObj.rows[i].cells[1].innerText +
            '","ConsumptionRoom":"' + ConsumptionTbaleObj.rows[i].cells[2].innerText +
            '","ConsumptionAmount":"' + ConsumptionTbaleObj.rows[i].cells[3].innerText +
            '"},';
        CheckoutTime = ConsumptionTbaleObj.rows[i].cells[0].innerText;
        Checkout.RoomNum = ConsumptionTbaleObj.rows[i].cells[2].innerText; //房间号
        ConsumptionTotal = ConsumptionTotal + Number(ConsumptionTbaleObj.rows[i].cells[3].innerText);
    }

    Checkout.CheckoutTime = addDay(CheckoutTime, 1);


    ConsumptionTbaleToJSON = ConsumptionTbaleToJSON.substring(0, ConsumptionTbaleToJSON.lastIndexOf(','));
    CheckoutConsumptiondata = '"Consumption":[' + ConsumptionTbaleToJSON + ']';

    //表格转Json，原生写法
    let CheckoutPaymentdata = '';
    PaymentTbaleToJSON = '';
    PaymentTbaleObj = document.getElementById('PaymentTable');


    var PaymentTotal = 0;
    for (var i = 1; i < PaymentTbaleObj.rows.length; i++) {

        PaymentTbaleToJSON += '{"PaymentDate":"' + PaymentTbaleObj.rows[i].cells[0].innerText +
            '","PaymentType":"' + PaymentTbaleObj.rows[i].cells[1].innerText +
            '","PaymentAmount":"' + PaymentTbaleObj.rows[i].cells[2].innerText +
            '"},';
        PaymentTotal = PaymentTotal + Number(PaymentTbaleObj.rows[i].cells[2].innerText);
    }
    PaymentTbaleToJSON = PaymentTbaleToJSON.substring(0, PaymentTbaleToJSON.lastIndexOf(','));
    CheckoutPaymentdata = '"Payment":[' + PaymentTbaleToJSON + ']';
    Checkout.CheckoutData = [];



    Checkout.CheckoutData = JSON.parse('[{' + CheckoutConsumptiondata + ',' + CheckoutPaymentdata + '}]');
    Checkout.ConsumptionTotal = ConsumptionTotal; //消费总额
    Checkout.PaymentTotal = PaymentTotal; //支付总额

    //保存
    chrome.storage.sync.set({
        Checkout: Checkout
    });
}

$('#ClearPrintFrom').click(function () {
    $('#CustomerName').val('');
    $('#CustomNum').val('');
    $('#ConsumptionRoom').val('');
    $('#ConsumptionAmount').val('');
    $('#PrintDate').val(nowDate());
    $('#ConsumptionDate').val(nowDate());
    $('#PaymentDate').val(nowDate());
    $('#ConsumptionTable tbody').empty();
    $('#PaymentTable tbody').empty();
    $("#ConsumptionType option:first").prop("selected", 'selected');
    $("#PaymentDateLock").removeClass("btn-danger");
    $("#PaymentDateLock").addClass("btn-default");
    if ($('#ConsumptionDateLock').hasClass('btn-danger')) {
        $("#ConsumptionDateLock").removeClass("btn-danger");
        $("#ConsumptionDateLock").addClass("btn-default");
    }
    if ($('#PaymentDateLock').hasClass('btn-danger')) {
        $("#PaymentDateLock").removeClass("btn-danger");
        $("#PaymentDateLock").addClass("btn-default");
    }
})

$('#ConsumptionDateLock').click(function () {
    if ($('#ConsumptionDateLock').hasClass('btn-danger')) {
        $("#ConsumptionDateLock").removeClass("btn-danger");
        $("#ConsumptionDateLock").addClass("btn-default");
    } else {
        $("#ConsumptionDateLock").addClass("btn-danger");
        $("#ConsumptionDateLock").removeClass("btn-default");
    }
})

$('#PaymentDateLock').click(function () {
    if ($('#PaymentDateLock').hasClass('btn-danger')) {
        $("#PaymentDateLock").removeClass("btn-danger");
        $("#PaymentDateLock").addClass("btn-default");
    } else {
        $("#PaymentDateLock").addClass("btn-danger");
        $("#PaymentDateLock").removeClass("btn-default");
    }
})