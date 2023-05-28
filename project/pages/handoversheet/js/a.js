chrome.storage.sync.get('HandoverSheet', (data) => {
    Object.assign(HandoverSheet, data.HandoverSheet);
    document.querySelector("body > div > div.Print-header > div").innerHTML = HandoverSheet.Sheet[0].HotelName
    document.querySelector("body > div > div.Print-info > div:nth-child(1) > span").innerHTML = HandoverSheet.Sheet[0].date
    document.querySelector("body > div > div.Print-info > div:nth-child(7) > span").innerHTML = HandoverSheet.Sheet[0].PMSUM
    document.querySelector("body > div > div.Print-info > div:nth-child(8) > span").innerHTML = HandoverSheet.Sheet[0].POSUM
    document.querySelector("body > div > div.Print-info > div:nth-child(11) > span").innerHTML = HandoverSheet.Sheet[0].Difference
    document.querySelector("body > div > div.Print-signature > div").innerHTML = HandoverSheet.Sheet[0].DifferenceDESC
})