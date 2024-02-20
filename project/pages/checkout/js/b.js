chrome.storage.sync.get('Checkout', (data) => {
    Object.assign(Checkout, data.Checkout);
    document.querySelector("#checkout > div > div:nth-child(2) > div:nth-child(1) > div > div.diana-print-content").innerHTML = Checkout.CustomNum; //单号
    document.querySelector("#checkout > div > div:nth-child(2) > div:nth-child(3) > div > div.diana-print-content").innerHTML = Checkout.RoomNum; //房号
    document.querySelector("#checkout > div > div:nth-child(2) > div:nth-child(2) > div > div.diana-print-content").innerHTML = Checkout.CustomerName; //姓名
    document.querySelector("#checkout > div > div:nth-child(2) > div:nth-child(4) > div > div.diana-print-content").innerHTML = Checkout.CheckinTime; //入住时间
    document.querySelector("#checkout > div > div:nth-child(2) > div:nth-child(5) > div > div.diana-print-content").innerHTML = Checkout.CheckoutTime; //离店时间
    document.querySelector("#checkout > div > div:nth-child(2) > div:nth-child(6) > div > div.diana-print-content").innerHTML = Checkout.PrintDate; //打印时间
    document.querySelector("#checkout > div > div:nth-child(2) > div:nth-child(7) > div > div.diana-print-content").innerHTML = Checkout.StaffAD; //收款人

    document.querySelector("#checkout > div > div:nth-child(4) > div.el-table__footer-wrapper > table > tbody > tr > td.el-table_44_column_192.is-leaf > div").innerHTML = Checkout.ConsumptionTotal;
    document.querySelector("#checkout > div > div:nth-child(3) > div.el-table__footer-wrapper > table > tbody > tr > td.el-table_43_column_189.is-leaf > div").innerHTML = Checkout.PaymentTotal;


    var ConsumptionTablea = $('.PrintConsumption');
    if (Checkout.CheckoutData[0].Consumption.length > 0) {
        for (var i = 0; i < Checkout.CheckoutData[0].Consumption.length; i++) {
            var tr = document.createElement('tr');
            tr.setAttribute('class', 'el-table__row');
            var td = document.createElement('td');
            td.setAttribute('class', 'el-table_43_column_187');
            td.innerHTML = '<div class="cell">' + Checkout.CheckoutData[0].Consumption[i].ConsumptionDate + '</div>';
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'el-table_43_column_188');
            td.innerHTML = '<div class="cell">' + Checkout.CheckoutData[0].Consumption[i].ConsumptionType + Checkout.CheckoutData[0].Consumption[i].ConsumptionRoom + '</div>';
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'el-table_43_column_189');
            td.innerHTML = '<div class="cell">' + Checkout.CheckoutData[0].Consumption[i].ConsumptionAmount + '</div>';
            tr.appendChild(td);
            ConsumptionTablea.append(tr);
        }
    } else {
        $('.PrintConsumption').hide();
        $('#PrintConsumptionFooter').hide();
    };
    var PaymentTablea = $('.PrintPayment');
    if (Checkout.CheckoutData[0].Payment.length > 0) {
        for (var i = 0; i < Checkout.CheckoutData[0].Payment.length; i++) {
            var tr = document.createElement('tr');
            tr.setAttribute('class', 'el-table__row');
            var td = document.createElement('td');
            td.setAttribute('class', 'el-table_43_column_187');
            td.innerHTML = '<div class="cell">' + Checkout.CheckoutData[0].Payment[i].PaymentDate + '</div>';
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'el-table_43_column_188');
            td.innerHTML = '<div class="cell">' + Checkout.CheckoutData[0].Payment[i].PaymentType + '</div>';
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('class', 'el-table_43_column_189');
            td.innerHTML = '<div class="cell">' + Checkout.CheckoutData[0].Payment[i].PaymentAmount + '</div>';
            tr.appendChild(td);
            PaymentTablea.append(tr);
        }
    } else {
        $('.PrintPayment').hide();
        $('#PrintPaymentFooter').hide();
    }
});

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    document.querySelector("#checkout > div > div.header.el-row > div.header-hotel").innerHTML = options.Hotel[0].HotelName;
    document.querySelector("#checkout > div > div:nth-child(7) > div > div:nth-child(1) > span").innerHTML = '地址:' + options.Hotel[0].HotelAddress;
    document.querySelector("#checkout > div > div:nth-child(7) > div > div:nth-child(2) > span").innerHTML = '电话:' + options.Hotel[0].HotelPhone;
    document.querySelector("#checkout > div > div:nth-child(7) > div > div:nth-child(3) > span").innerHTML = '邮编:' + options.Hotel[0].HotelZip;
    document.querySelector("#checkout > div > div:nth-child(7) > div > div:nth-child(4) > span").innerHTML = '传真:' + options.Hotel[0].HotelFax;
});