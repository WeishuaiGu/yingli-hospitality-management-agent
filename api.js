const API_BASE = 'http://localhost:8080/api';

function getToken() {
    return localStorage.getItem('yingli_token');
}

function setToken(token) {
    localStorage.setItem('yingli_token', token);
}

function removeToken() {
    localStorage.removeItem('yingli_token');
}

function checkAuth() {
    if (!getToken()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

async function apiRequest(url, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    const response = await fetch(API_BASE + url, {
        ...options,
        headers
    });

    if (response.status === 401) {
        removeToken();
        window.location.href = 'login.html';
        throw new Error('登录已过期，请重新登录');
    }

    const data = await response.json();
    if (data.code !== 200) {
        throw new Error(data.message || '请求失败');
    }
    return data.data;
}

function yingliAlert(message, title, onConfirm) {
    let overlay = document.getElementById('yingli-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'yingli-modal-overlay';
        document.body.appendChild(overlay);
    }
    overlay.innerHTML = '';
    overlay.className = 'yingli-modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'yingli-modal';
    modal.innerHTML =
        '<div class="yingli-modal-header">' +
            '<span class="yingli-modal-title">' + (title || '提示') + '</span>' +
        '</div>' +
        '<div class="yingli-modal-body">' +
            '<span class="yingli-modal-icon">' +
                '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>' +
            '</span>' +
            '<span class="yingli-modal-message">' + message + '</span>' +
        '</div>' +
        '<div class="yingli-modal-footer">' +
            '<button class="yingli-modal-btn yingli-modal-btn-primary">确定</button>' +
        '</div>';

    overlay.appendChild(modal);

    var btn = modal.querySelector('.yingli-modal-btn-primary');
    btn.onclick = function() {
        overlay.classList.remove('yingli-modal-show');
        setTimeout(function() { overlay.remove(); }, 200);
        if (typeof onConfirm === 'function') onConfirm();
    };

    requestAnimationFrame(function() {
        overlay.classList.add('yingli-modal-show');
    });
}

function yingliConfirm(message, title, onConfirm, onCancel) {
    let overlay = document.getElementById('yingli-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'yingli-modal-overlay';
        document.body.appendChild(overlay);
    }
    overlay.innerHTML = '';
    overlay.className = 'yingli-modal-overlay';

    var modal = document.createElement('div');
    modal.className = 'yingli-modal';
    modal.innerHTML =
        '<div class="yingli-modal-header">' +
            '<span class="yingli-modal-title">' + (title || '确认') + '</span>' +
        '</div>' +
        '<div class="yingli-modal-body">' +
            '<span class="yingli-modal-icon yingli-modal-icon-question">' +
                '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>' +
            '</span>' +
            '<span class="yingli-modal-message">' + message + '</span>' +
        '</div>' +
        '<div class="yingli-modal-footer">' +
            '<button class="yingli-modal-btn yingli-modal-btn-cancel">取消</button>' +
            '<button class="yingli-modal-btn yingli-modal-btn-primary">确定</button>' +
        '</div>';

    overlay.appendChild(modal);

    var confirmBtn = modal.querySelector('.yingli-modal-btn-primary');
    var cancelBtn = modal.querySelector('.yingli-modal-btn-cancel');

    function close() {
        overlay.classList.remove('yingli-modal-show');
        setTimeout(function() { overlay.remove(); }, 200);
    }

    confirmBtn.onclick = function() {
        close();
        if (typeof onConfirm === 'function') onConfirm();
    };

    cancelBtn.onclick = function() {
        close();
        if (typeof onCancel === 'function') onCancel();
    };

    requestAnimationFrame(function() {
        overlay.classList.add('yingli-modal-show');
    });
}

function yingliPrompt(message, title, defaultValue, onConfirm) {
    let overlay = document.getElementById('yingli-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'yingli-modal-overlay';
        document.body.appendChild(overlay);
    }
    overlay.innerHTML = '';
    overlay.className = 'yingli-modal-overlay';

    var modal = document.createElement('div');
    modal.className = 'yingli-modal';
    var inputId = 'yingli-prompt-input-' + Date.now();
    modal.innerHTML =
        '<div class="yingli-modal-header">' +
            '<span class="yingli-modal-title">' + (title || '请输入') + '</span>' +
        '</div>' +
        '<div class="yingli-modal-body" style="flex-direction:column;">' +
            '<span class="yingli-modal-message">' + message + '</span>' +
            '<input type="text" id="' + inputId + '" class="yingli-modal-input" value="' + (defaultValue || '') + '">' +
        '</div>' +
        '<div class="yingli-modal-footer">' +
            '<button class="yingli-modal-btn yingli-modal-btn-cancel">取消</button>' +
            '<button class="yingli-modal-btn yingli-modal-btn-primary">确定</button>' +
        '</div>';

    overlay.appendChild(modal);

    var input = document.getElementById(inputId);
    var confirmBtn = modal.querySelector('.yingli-modal-btn-primary');
    var cancelBtn = modal.querySelector('.yingli-modal-btn-cancel');

    function close() {
        overlay.classList.remove('yingli-modal-show');
        setTimeout(function() { overlay.remove(); }, 200);
    }

    confirmBtn.onclick = function() {
        var val = input.value.trim();
        close();
        if (typeof onConfirm === 'function') onConfirm(val);
    };

    cancelBtn.onclick = function() {
        close();
    };

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') confirmBtn.click();
    });

    requestAnimationFrame(function() {
        overlay.classList.add('yingli-modal-show');
        input.focus();
        input.select();
    });
}
