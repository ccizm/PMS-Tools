//// options.js ////


chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    HotelInfo.SetHotelName.value = options.Hotel[0].HotelName;
    HotelInfo.SetHotelAddress.value = options.Hotel[0].HotelAddress;
    HotelInfo.SetStaffAD.value = options.Staff[0].StaffName;
    HotelInfo.SetHotelPhone.value = options.Hotel[0].HotelPhone;
    HotelInfo.SetHotelNum.value = options.Hotel[0].HotelNumber;
    HotelInfo.SetHotelZip.value = options.Hotel[0].HotelZip;
    HotelInfo.SetHotelFax.value = options.Hotel[0].HotelFax;
    //初始化消费类型

    var ConsumptionTable = $('#ConsumptionTable');

    for (var i = 0; i < options.Consumption.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td_del = document.createElement('td');
        td_del.innerHTML = '<button type="button" class="btn btn-link btn-xs del-link">删除</button>';
        td.innerHTML = options.Consumption[i];
        tr.appendChild(td);
        tr.appendChild(td_del);
        ConsumptionTable.append(tr);
    }


    //初始化付款方式
    var PaymentTable = $('#PaymentTable');

    for (var i = 0; i < options.Payment.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td_del = document.createElement('td');
        td_del.innerHTML = '<button type="button" class="btn btn-link btn-xs del-link">删除</button>';
        td.innerHTML = options.Payment[i];
        tr.appendChild(td);
        tr.appendChild(td_del);
        PaymentTable.append(tr);
    }

    //初始化会员计划
    var RoomTypeTable = $('#VipTable');

    for (var i = 0; i < options.Vip.length; i++) {
        var tr = document.createElement('tr');
        var td_del = document.createElement('td');
        var VipType = document.createElement('td');
        var VipDiscount = document.createElement('td');

        VipType.innerHTML = options.Vip[i].VipType;
        VipDiscount.innerHTML = options.Vip[i].VipDiscount;
        td_del.innerHTML = '<button type="button" class="btn btn-link btn-xs del-link">删除</button>';

        tr.appendChild(VipType);
        tr.appendChild(VipDiscount);
        tr.appendChild(td_del);
        RoomTypeTable.append(tr);
    };


    var LinksTable = $('#LinksTable');

    for (var i = 0; i < options.links.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td_del = document.createElement('td');
        var td_Url = document.createElement('td');
        td_del.innerHTML = '<button type="button" class="btn btn-link btn-xs del-link">删除</button>';
        td.innerHTML = options.links[i].name;
        td_Url.innerHTML = options.links[i].link;
        tr.appendChild(td);
        tr.appendChild(td_Url);
        tr.appendChild(td_del);
        LinksTable.append(tr);

    }


    //初始化已测试打印机
    var PrinterTable = $('#PrinterTable');
    for (var i = 0; i < options.PrinterTested.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        td.innerHTML = options.PrinterTested[i].PrinterBrand;
        td2.innerHTML = options.PrinterTested[i].PrinterModel;
        tr.appendChild(td);
        tr.appendChild(td2);
        PrinterTable.append(tr);
    }


    //初始化开源项目
    var OpenSourceProjectTable = $('#OpenSourceProject');
    for (var i = 0; i < options.OpenSourceProject.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        td.innerHTML = options.OpenSourceProject[i].Name;
        tr.appendChild(td);
        td2.innerHTML = options.OpenSourceProject[i].Version;
        tr.appendChild(td2);
        td3.innerHTML = '<a href="' + options.OpenSourceProject[i].license + '" target="_blank">LICENSE</a>';
        tr.appendChild(td3);
        td4.innerHTML = '<a href="' + options.OpenSourceProject[i].Url + '" target="_blank">Website</a>';
        tr.appendChild(td4);
        OpenSourceProjectTable.append(tr);
    }


});


//添加消费类型
$("#AddConsumptionType").click(function () {
    if ($("#SetConsumptionType").val() != "") {
        if (options.Consumption.indexOf($("#SetConsumptionType").val()) == -1) {
            $("#ConsumptionTable tbody").append("<tr><td>" +
                $('#SetConsumptionType').val() + "</td><td><button  type='button' class='btn btn-link btn-xs del-link'>删除</button></td></tr>"
            );
        } else {
            $('#DefaultModalLabel').text('提示');
            $('#DefaultModalText').text('已存在该消费类型！');
            $('#DefaultModal').modal('toggle');

        }
    } else {


        $('#DefaultModalLabel').text('提示');
        $('#DefaultModalText').text('请填写消费类型！');
        $('#DefaultModal').modal('toggle');
    }

});

//添加付款方式
$("#AddPaymentType").click(function () {
    if ($("#SetPaymentType").val() != "") {
        if (options.Payment.indexOf($("#SetPaymentType").val()) == -1) {
            $("#PaymentTable tbody").append("<tr><td>" +
                $('#SetPaymentType').val() + "</td><td><button  type='button' class='btn btn-link btn-xs del-link'>删除</button></td></tr>"
            );
        } else {
            $('#DefaultModalLabel').text('提示');
            $('#DefaultModalText').text('已存在该付款方式！');
            $('#DefaultModal').modal('toggle');

        }
    } else {


        $('#DefaultModalLabel').text('提示');
        $('#DefaultModalText').text('请填写付款方式！');
        $('#DefaultModal').modal('toggle');
    }

});

//添加会员计划
$("#AddVip").click(function () {
    if ($("#AddVipLevel").val() != "" && $("#AddVipDiscount").val() != "" && $("#AddVipPrice").val() != "") {
        for (var i = 0; i < options.Vip.length; i++) {
            if (options.Vip[i].VipType == $("#AddVipLevel").val()) {
                $('#DefaultModalLabel').text('提示');
                $('#DefaultModalText').text('已存在该会员等级！');
                $('#DefaultModal').modal('toggle');
                return;
            } else {
                if (i == options.Vip.length - 1) {
                    $("#VipTable tbody").append("<tr><td>" +
                        $('#AddVipLevel').val() + "</td><td>" +
                        $('#AddVipDiscount').val() + "</td><td><button  type='button' class='btn btn-link btn-xs del-link'>删除</button></td></tr>"
                    );
                }
            }
        }
    } else {
        $('#DefaultModalLabel').text('提示');
        $('#DefaultModalText').text('请填写完整会员计划！');
        $('#DefaultModal').modal('toggle');
    }
});





//保存酒店信息
$("#SaveHotelInfo").click(function () {
    options.Hotel[0].HotelName = String(HotelInfo.SetHotelName.value);
    options.Hotel[0].HotelAddress = String(HotelInfo.SetHotelAddress.value);
    options.Staff[0].StaffName = String(HotelInfo.SetStaffAD.value);
    options.Hotel[0].HotelPhone = String(HotelInfo.SetHotelPhone.value);
    options.Hotel[0].HotelNumber = String(HotelInfo.SetHotelNum.value);
    options.Hotel[0].HotelZip = String(HotelInfo.SetHotelZip.value);
    options.Hotel[0].HotelFax = String(HotelInfo.SetHotelFax.value);
    chrome.storage.sync.set({
        options: options
    });
    $('#DefaultModalLabel').text('提示');
    $('#DefaultModalText').text('保存成功！');
    $('#DefaultModal').modal('toggle');
});

//保存消费类型
$("#SaveConsumptionType").click(function () {
    options.Consumption = [];
    var table = $('#ConsumptionTable').tableToJSON();
    for (var i = 0; i < table.length; i++) {
        options.Consumption = options.Consumption.concat(table[i].消费类型);
    }


    chrome.storage.sync.set({
        options: options
    });

    $('#DefaultModalLabel').text('提示');
    $('#DefaultModalText').text('保存成功！');
    $('#DefaultModal').modal('toggle');
});

//保存付款方式
$("#SavePaymentType").click(function () {
    options.Payment = [];
    var table = $('#PaymentTable').tableToJSON();
    for (var i = 0; i < table.length; i++) {
        options.Payment = options.Payment.concat(table[i].付款方式);
    }
    chrome.storage.sync.set({
        options: options
    });

    $('#DefaultModalLabel').text('提示');
    $('#DefaultModalText').text('保存成功！');
    $('#DefaultModal').modal('toggle');
});


//保存会员计划
$("#SaveVip").click(function () {
    options.Vip = [];

    let tableData = '';
    var tableDataToJSON = '';
    var tableDataObj = document.getElementById('VipTable');
    for (var i = 1; i < tableDataObj.rows.length; i++) {
        tableDataToJSON += '{"VipType":"' + tableDataObj.rows[i].cells[0].innerText +
            '","VipDiscount":"' + tableDataObj.rows[i].cells[1].innerText +
            '","VipPrice":"' + tableDataObj.rows[i].cells[2].innerText +
            '"},';
    }
    console.log(tableDataToJSON);
    tableDataToJSON = tableDataToJSON.substring(0, tableDataToJSON.lastIndexOf(','));
    tableData = JSON.parse('[' + tableDataToJSON + ']');
    options.Vip = tableData;

    chrome.storage.sync.set({
        options: options
    });
    $('#DefaultModalLabel').text('提示');
    $('#DefaultModalText').text('保存成功！');
    $('#DefaultModal').modal('toggle');
});

//插件修复

$('#ResetDefault').click(function () {
    chrome.storage.sync.clear();
    $('#DefaultModalLabel').text('提示');
    $('#DefaultModalText').html('重置成功！<br>请刷新页面重新载入默认设置！');
    $('#DefaultModal').modal('toggle');
    $('.modal-footer').html('<a href="./options.html" class="btn btn-success">刷新</a>');
});

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

    $('[data-toggle="popover"]').popover();
});


AboutExtensions.innerHTML = '<p>名称：' + chrome.runtime.getManifest().name +
    '</p><p>版本：' + chrome.runtime.getManifest().version +
    '</p><p>作者：' + chrome.runtime.getManifest().author +
    '</p><p>网址：<a href="https://pmstool.beida.xyz" target="_blank">https://pmstool.beida.xyz</a></p>';