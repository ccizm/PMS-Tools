//初始化酒店信息
chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
});

//初始化交接单
chrome.storage.sync.get('HandoverSheet', (data) => {
    Object.assign(HandoverSheet, data.HandoverSheet);
});

$(document).ready(function () {
    $('#todayDate').val(nowDate());

    $(document).ready(function () {
        laydate.render({
            elem: '#todayDate' //指定元素
        });
    });

});


$("#HandoverSheetSubmit").on("click", function () {
    HandoverSheet.Sheet[0].HotelName = options.Hotel[0].HotelName;
    HandoverSheet.Sheet[0].date = $("#todayDate").val();
    HandoverSheet.Sheet[0].PMSUM = $("#PMSUM").val();
    HandoverSheet.Sheet[0].POSUM = $("#POSUM").val();
    HandoverSheet.Sheet[0].Difference = $("#Difference").val();
    HandoverSheet.Sheet[0].DifferenceDESC = $("#DifferenceDESC").val();
    //保存
    chrome.storage.sync.set({
        HandoverSheet: HandoverSheet
    });
})

$('#HandoverSheetSubmit').click(function () {
    $('#PreviewModal').modal({
        backdrop: "static", //点击空白处不关闭对话框
        show: true,
        keyboard: false
    });
    createIframe(document.getElementById('previewCheckout'), './handoversheet/a.html');
});

$('#PreviewModal .Print-close').click(function () {
    destroyIframe(document.getElementById('previewCheckout').getElementsByTagName('iframe')[0])
});

$('#PrintThis').click(function () {
    document.getElementById('previewCheckout').getElementsByTagName('iframe')[0].contentWindow.print();
})

$("#ClearHandoverSheetFrom").click(function () {
    $("#todayDate").val(nowDate());
    $("#PMSUM").val('');
    $("#POSUM").val('');
    $("#Difference").val('');
    $("#DifferenceDESC").val('');
})