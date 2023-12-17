window.onload = function () {
    var div = document.createElement('div');
    div.className = 'PMSTool';
    div.innerHTML =
        '<div class="PMSTool_Box">' +
        '<div class="PMSTool_Header">' +
        '<span class="PMSTool_Header_Title">' + chrome.i18n.getMessage("extName") + '<span>' +
        '<span class="PMSTool_Close" id="PMSTool_Close">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">' +
        '<path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>' +
        '</svg>' +
        '<span>' +
        '</div>' +
        '<div class="PMSTool_Body">' +
        '<iframe anonymous id="PMSTool_Iframe" title="PMSTool" width="300" height="200" src="' + chrome.runtime.getURL('project/pages/checkout.html') + '">' +
        '</iframe>' +
        '</div>' +
        '</div>' +
        '<a href="javascript:;" class="PMSTool_expand_Btn" id="PMSTool_expand_Btn">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">' +
        '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>' +
        '</svg>' +
        '<br>' + chrome.i18n.getMessage("extName") + '</a>';
    document.body.appendChild(div);
    document.body.insertBefore(div, document.body.firstElementChild);

    $("#PMSTool_expand_Btn").click(function () {
        var Pexpand = document.getElementsByClassName('PMSTool_Box')[0];
        var Pexpand_Btn = document.getElementById('PMSTool_expand_Btn');
        if (Pexpand.style.top == '20px') {
            Pexpand.style.top = 'calc(-100% - 10px)'
            Pexpand_Btn.style.right = '0';
        } else {
            Pexpand.style.top = '20px';
            Pexpand_Btn.style.right = '-100px';
        }
    })

    $("#PMSTool_Close").click(function () {
        var Pexpand = document.getElementsByClassName('PMSTool_Box')[0];
        var Pexpand_Btn = document.getElementById('PMSTool_expand_Btn');
        if (Pexpand.style.top == '20px') {
            Pexpand.style.top = 'calc(-100% - 10px)'
            Pexpand_Btn.style.right = '0';

        } else {
            Pexpand.style.top = '20px';
            Pexpand_Btn.style.right = '-100px';
        }
    })

}