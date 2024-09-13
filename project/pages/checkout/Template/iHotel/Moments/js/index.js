chrome.storage.sync.get('Checkout', (data) => {
    Object.assign(Checkout, data.Checkout);
    document.querySelector("body > div > div.Print-info > div > div:nth-child(2) > div > span").innerHTML = Math.random().toString().slice(-8); //单号
    document.querySelector("body > div > div.Print-info > div > div:nth-child(1) > div > span").innerHTML = Checkout.CustomerName; //姓名
    document.querySelector("body > div > div.Print-info > div > div:nth-child(3) > div > span").innerHTML = Checkout.RoomNum; //房号
    document.querySelector("body > div > div.Print-info > div > div:nth-child(8) > div > span").innerHTML = Checkout.CheckinTime; //入住时间
    document.querySelector("body > div > div.Print-info > div > div:nth-child(9) > div > span").innerHTML = Checkout.CheckoutTime; //离店时间
    document.querySelector("body > div > div.Print-info > div > div:nth-child(4) > div > span").innerHTML = Checkout.StaffAD; //收款人

    document.querySelector("body > div > div.Print-details > table > tbody > tr.Consumptionfooter > td:nth-child(3)").innerHTML = Number(Checkout.ConsumptionTotal).toFixed(2);
    document.querySelector("body > div > div.Print-details > table > tbody > tr.Consumptionfooter > td:nth-child(4)").innerHTML = Number(Checkout.PaymentTotal).toFixed(2);


    var ConsumptionTablea = $('.Consumptionfooter');
    if (Checkout.CheckoutData[0].Consumption.length > 0) {
        for (var i = 0; i < Checkout.CheckoutData[0].Consumption.length; i++) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            var date = new Date(Checkout.CheckoutData[0].Consumption[i].ConsumptionDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var dateStr = day + '/' + month;

            var money = Number(Checkout.CheckoutData[0].Consumption[i].ConsumptionAmount).toFixed(2);
            td.innerHTML = dateStr;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '[' + Checkout.CheckoutData[0].Consumption[i].ConsumptionRoom + ']' + Checkout.CheckoutData[0].Consumption[i].ConsumptionType;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = money;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '0.00'
            tr.appendChild(td);
            ConsumptionTablea.before(tr);
        }
    } else {
        $('.Consumptionfooter').hide();
    };
    var PaymentTablea = $('.Paymenthead');
    if (Checkout.CheckoutData[0].Payment.length > 0) {
        for (var i = 0; i < Checkout.CheckoutData[0].Payment.length; i++) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            var date = new Date(Checkout.CheckoutData[0].Payment[i].PaymentDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var dateStr = day + '/' + month;
            var money = Number(Checkout.CheckoutData[0].Payment[i].PaymentAmount).toFixed(2);
            td.innerHTML = dateStr;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '[' + Checkout.CheckoutData[0].Consumption[i].ConsumptionRoom + ']' +Checkout.CheckoutData[0].Payment[i].PaymentType;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '0.00'
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = money;
            tr.appendChild(td);
            PaymentTablea.before(tr);
        }
    } else {
        $('.Paymenthead').hide();
    }
});

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    document.querySelector("body > div > div.Print-footer > div > span").innerHTML = options.Hotel[0].HotelAddress;
});