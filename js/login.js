$(document).ready(function () {
    const loginForm = $('#login-form');

    // Xử lý gửi form đăng nhập
    loginForm.on('submit', function (event) {
        event.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        // Kiểm tra tên đăng nhập và mật khẩu
        if (username === 'admin' && password === '123456') {
            localStorage.setItem('isAdmin', 'true');
            alert('Đăng nhập thành công!');
            window.location.href = 'admin.html';
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    });
});