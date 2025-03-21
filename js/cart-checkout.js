$(document).ready(function () {
    const cartItemsContainer = $('#cart-items');
    const checkoutItemsContainer = $('#checkout-items');
    const checkoutTotal = $('#checkout-total');
    const placeOrderButton = $('#place-order');
    const cartCounter = $('#cart-counter');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Hàm cập nhật số lượng giỏ hàng
    function updateCartCounter() {
        cartCounter.text(cart.reduce((total, item) => total + item.quantity, 0));
    }

    // Hàm hiển thị giỏ hàng
    function renderCart() {
        cartItemsContainer.html('');
        cart.forEach(item => {
            const cartItem = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price} VND</td>
                    <td>${item.quantity}</td>
                    <td>${(item.price * item.quantity)}.000 VND</td>
                </tr>
            `;
            cartItemsContainer.append(cartItem);
        });
    }

    // Hàm hiển thị thông tin thanh toán
    function renderCheckout() {
        checkoutItemsContainer.html('');
        let total = 0;
        cart.forEach(item => {
            const checkoutItem = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price} VND</td>
                    <td>${item.quantity}</td>
                    <td>${(item.price * item.quantity)}.000 VND</td>
                </tr>
            `;
            checkoutItemsContainer.append(checkoutItem);
            total += item.price * item.quantity;
        });
        checkoutTotal.text(total + '.000 VND');
    }

    // Xử lý sự kiện click nút đặt hàng
    placeOrderButton.on('click', function () {
        if (cart.length > 0) {
            localStorage.removeItem('cart');
            alert('Đặt hàng thành công!');
            window.location.href = 'index.html';
        } else {
            alert('Giỏ hàng của bạn đang trống.');
        }
    });

    // Hiển thị thông tin thanh toán khi tải trang
    renderCheckout();
    updateCartCounter();
});