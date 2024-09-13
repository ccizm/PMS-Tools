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
            keys.forEach(function (key) {
                var th = document.createElement("th");
                th.textContent = key;
                th.style.minWidth = "50px";
                tr.appendChild(th);
            });
            tablehead.appendChild(tr);


            var tableBody = document.querySelector("#InfoContent tbody");
            data.forEach(function (item) {
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



document.querySelectorAll("#commenu a").forEach(function (item) {
    item.addEventListener("click", function () {
        var data = chrome.runtime.getURL('project/pages/commonInfo/' + item.getAttribute('json-data') + '.json');
        createTable(data);
        document.querySelector("#TableInfoTitle").textContent = item.textContent
        var li = item.parentNode;
        li.parentNode.querySelectorAll('li').forEach(function (item) {
            item.classList.remove('active');
        })
        li.classList.add('active')
    });
});


document.querySelectorAll("#commenu a")[0].click();
