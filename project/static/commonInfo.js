const Monthabbr = chrome.runtime.getURL('project/pages/commonInfo/Monthabbr.json');
const Visa_free = chrome.runtime.getURL('project/pages/commonInfo/Visa-free.json');

createTable(Monthabbr);
document.getElementById("TableInfoTitle").innerHTML = "月份英文缩写对照表";

//生成表格函数 
function createTable(data) {
    //清空表格
    document.querySelector("#InfoContent thead").innerHTML = "";
    document.querySelector("#InfoContent tbody").innerHTML = "";
    fetch(data)
    .then(response => response.json())
    .then(data => {
        var tablehead = document.querySelector("#InfoContent thead");

        //获取json key值
        var keys = Object.keys(data[0]);
        //创建表头
        var tr = document.createElement("tr");
        keys.forEach(function(key) {
            var th = document.createElement("th");
            th.textContent = key;
            th.style.minWidth = "50px";
            tr.appendChild(th);
        });
        tablehead.appendChild(tr);


        var tableBody = document.querySelector("#InfoContent tbody");
        data.forEach(function(item) {
            var tr = document.createElement("tr");
            for (var key in item) {
                var td = document.createElement("td");
                td.textContent = item[key] || ""; // 如果值为undefined或null，则显示为空字符串
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('获取JSON数据时出错:', error);
    });
}

//点击id为Monthabbr的按钮，调用createTable函数
document.querySelector("#Monthabbr a").addEventListener("click", function() {
    document.getElementById("TableInfoTitle").innerHTML = "月份英文缩写对照表";
    createTable(Monthabbr);
    document.querySelector("#Monthabbr").classList.add("active");
    document.querySelector("#Visa_free").classList.remove("active")
});

//点击id为Visa_free的按钮，调用createTable函数
document.querySelector("#Visa_free a").addEventListener("click", function() {
    document.getElementById("TableInfoTitle").innerHTML = '<a href="http://cs.mfa.gov.cn/zlbg/bgzl/lhqz/202110/t20211029_10403855.shtml" target="_blank" title="点击跳转至原发布页">中外互免签证协定一览表</a> 2024.5';
    createTable(Visa_free);
    document.querySelector("#Monthabbr").classList.remove("active");
    document.querySelector("#Visa_free").classList.add("active")
});