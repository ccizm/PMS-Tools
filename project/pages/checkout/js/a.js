chrome.storage.sync.get('Checkout', (data) => {
    Object.assign(Checkout, data.Checkout);
    document.querySelector("body > div > div.Print-info > div:nth-child(1) > span").innerHTML = Checkout.CustomNum; //单号
    document.querySelector("body > div > div.Print-info > div:nth-child(2) > span").innerHTML = Checkout.RoomNum; //房号
    document.querySelector("body > div > div.Print-info > div:nth-child(3) > span").innerHTML = Checkout.CustomerName; //姓名
    document.querySelector("body > div > div.Print-info > div:nth-child(4) > span").innerHTML = Checkout.CheckinTime; //入住时间
    document.querySelector("body > div > div.Print-info > div:nth-child(5) > span").innerHTML = Checkout.CheckoutTime; //离店时间
    document.querySelector("body > div > div.Print-info > div:nth-child(6) > span").innerHTML = Checkout.PrintDate; //打印时间
    document.querySelector("body > div > div.Print-info > div:nth-child(7) > span").innerHTML = Checkout.StaffAD; //收款人

    document.querySelector("body > div > div.Print-details > table > tbody > tr.Consumptionfooter > td:nth-child(3)").innerHTML = Checkout.ConsumptionTotal;
    document.querySelector("body > div > div.Print-details > table > tbody > tr.Paymenthead > td:nth-child(3)").innerHTML = Checkout.PaymentTotal;


    var ConsumptionTablea = $('.Consumptionfooter');
    if (Checkout.CheckoutData[0].Consumption.length > 0) {
        for (var i = 0; i < Checkout.CheckoutData[0].Consumption.length; i++) {
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = Checkout.CheckoutData[0].Consumption[i].ConsumptionDate;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = Checkout.CheckoutData[0].Consumption[i].ConsumptionType + Checkout.CheckoutData[0].Consumption[i].ConsumptionRoom;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = Checkout.CheckoutData[0].Consumption[i].ConsumptionAmount;
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
            td.innerHTML = Checkout.CheckoutData[0].Payment[i].PaymentDate;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = Checkout.CheckoutData[0].Payment[i].PaymentType;
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = Checkout.CheckoutData[0].Payment[i].PaymentAmount;
            tr.appendChild(td);
            PaymentTablea.before(tr);
        }
    } else {
        $('.Paymenthead').hide();
    }
});

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    document.querySelector("body > div > div.Print-header > div.title").innerHTML = options.Hotel[0].HotelName;
    document.querySelector("body > div > div.Print-footer > div:nth-child(1) > span").innerHTML = options.Hotel[0].HotelAddress;
    document.querySelector("body > div > div.Print-footer > div:nth-child(2) > span").innerHTML = options.Hotel[0].HotelPhone;
    document.querySelector("body > div > div.Print-footer > div:nth-child(3) > span").innerHTML = options.Hotel[0].HotelZip;
    document.querySelector("body > div > div.Print-footer > div:nth-child(4) > span").innerHTML = options.Hotel[0].HotelFax;
});