chrome.storage.sync.get('options', (data) => {
    //初始化会员等级
    Object.assign(options, data.options);
    for (let i = 0; i < options.Vip.length; i++) {
        $('#VipType').append(`<option value="${options.Vip[i].VipDiscount}">${options.Vip[i].VipType}</option>`);
    }
});

//添加消费选项
$("#addCalcOptions").click(function () {
    //判断是否填写价格
    if ($("#RoomPrice").val() != "") {
        //判断是否折上折
        if ($("#additionalDiscount").val() == "") {
            $("#priceTable tbody").append("<tr><td discount='" + $('#VipType').val() + "'>" +
                $("#VipType").find("option:selected").text() + "</td><td>" +//会员类型
                $('#todayDate').val() + "</td><td>" +//当天日期
                $('#RoomPrice').val() + "</td><td>" +//房价
                $("#additionalDiscount").val() + "</td><td>" +//折上折
                $("#couponAmount").val() + "</td><td>" +//优惠券立减
                $("#additionalFees").val() + "</td><td><button class='btn btn-link btn-xs del-link'>删除</button></td></tr>"
            );

            if ($('#todayDateLock').hasClass('btn-danger')) {

            } else {
                $("#todayDate").val(addDay($("#todayDate").val(), 1));
            }

        } else {
            if ($("#couponAmount").val() == "") {
                $("#priceTable tbody").append("<tr><td discount='" + $('#VipType').val() + "'>" +
                    $("#VipType").find("option:selected").text() + "</td><td>" +//会员类型
                    $('#todayDate').val() + "</td><td>" +//当天日期
                    $('#RoomPrice').val() + "</td><td>" +//房价
                    $("#additionalDiscount").val() + "</td><td>" +//折上折
                    $("#couponAmount").val() + "</td><td>" +//优惠券立减
                    $("#additionalFees").val() + "</td><td><button class='btn btn-link btn-xs del-link'>删除</button></td></tr>"
                );
                if ($('#todayDateLock').hasClass('btn-danger')) {

                } else {
                    $("#todayDate").val(addDay($("#todayDate").val(), 1));
                }
            } else {
                $('#DefaultModalLabel').text('提示');
                $('#DefaultModalText').text('折上折与优惠券无法同享！');
                $('#DefaultModal').modal('toggle');
            }
        }
    } else {
        $('#DefaultModalLabel').text('提示');
        $('#DefaultModalText').text('请填写房型门市价！');
        $('#DefaultModal').modal('toggle');
    }
});

$("#priceCalcSubmit").click(function () {
    if ($('#priceTable tbody tr').length != 0) {
        $('#resultTable tbody').empty();
        console.log(getTableJson())
        var json = getTableJson();
        var resultTable = $('#resultTable');
        var totalMoney2 = 0;
        for (var i = 0; i < json.length; i++) {
            var tr = document.createElement('tr');
            var Date = document.createElement('td');
            var Price = document.createElement('td');

            Date.innerHTML = json[i].Date;
            Price.innerHTML = json[i].Price;

            tr.appendChild(Date);
            tr.appendChild(Price);
            resultTable.append(tr);
            totalMoney2 += Number(json[i].Price);
        };

        $("#totalMoney2").text(totalMoney2);

    } else {
        $('#DefaultModalLabel').text('提示');
        $('#DefaultModalText').html('请检查表格内是否有数据？');
        $('#DefaultModal').modal('toggle');
    }

});

$("#ClearCalcFrom").click(function () {
    $("#VipType option:first").prop("selected", 'selected');
    $('#todayDate').val(nowDate());
    $('#RoomPrice').val('');
    $('#additionalDiscount').val('');
    $('#couponAmount').val('');
    $('#additionalFees').val('');
    $('#priceTable tbody').empty();
    $('#resultTable tbody').empty();
    $("#totalMoney1").text("/");
    $("#totalMoney2").text("/");
    if ($('#todayDateLock').hasClass('btn-danger')) {
        $("#todayDateLock").removeClass("btn-danger");
        $("#todayDateLock").addClass("btn-default");
    }
});


//获取表格数据
function getTableJson() {
    let tableData = '';
    var tableDataToJSON = '';
    var tableDataObj = document.getElementById('priceTable');
    var totalMoney1 = 0;
    for (var i = 1; i < tableDataObj.rows.length; i++) {
        totalMoney1 += Number(tableDataObj.rows[i].cells[2].innerText);
        $("#totalMoney1").text(totalMoney1);
        tableDataToJSON += '{"VipDiscount":"' + tableDataObj.rows[i].cells[0].getAttribute('discount') +
            '","todayDate":"' + tableDataObj.rows[i].cells[1].innerText +
            '","RoomPrice":"' + tableDataObj.rows[i].cells[2].innerText +
            '","additionalDiscount":"' + tableDataObj.rows[i].cells[3].innerText +
            '","couponAmount":"' + tableDataObj.rows[i].cells[4].innerText +
            '","additionalFees":"' + tableDataObj.rows[i].cells[5].innerText +
            '"},';
    }

    tableDataToJSON = tableDataToJSON.substring(0, tableDataToJSON.lastIndexOf(','));
    tableData = JSON.parse('[' + tableDataToJSON + ']');

    var CalcJson = tableData;
    var Calcdata = "";
    var tableData2;
    for (var i = 0; i < CalcJson.length; i++) {
        if (CalcJson[i].additionalDiscount == '') {
            Calcdata += '{"Date":"' + CalcJson[i].todayDate +
                '","Price":"' + Math.round((Number(CalcJson[i].RoomPrice) * Number(CalcJson[i].VipDiscount / 100) - Number(CalcJson[i].couponAmount) + Number(CalcJson[i].additionalFees))) +
                '"},';
        } else {
            Calcdata += '{"Date":"' + CalcJson[i].todayDate +
                '","Price":"' + Math.round((Number(CalcJson[i].RoomPrice) * Number(CalcJson[i].VipDiscount * Number(CalcJson[i].additionalDiscount) / 10000) + Number(CalcJson[i].additionalFees))) +
                '"},';
        }
    }
    Calcdata = Calcdata.substring(0, Calcdata.lastIndexOf(','));
    tableData2 = JSON.parse('[' + Calcdata + ']');
    return tableData2;
}

$(document).ready(function () {

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
    $('#todayDate').val(nowDate());

    $(document).ready(function () {
        laydate.render({
            elem: '#todayDate' //指定元素
        });
    });

});

$('#todayDateLock').click(function () {
    if ($('#todayDateLock').hasClass('btn-danger')) {
        $("#todayDateLock").removeClass("btn-danger");
        $("#todayDateLock").addClass("btn-default");
    } else {
        $("#todayDateLock").addClass("btn-danger");
        $("#todayDateLock").removeClass("btn-default");
    }
})