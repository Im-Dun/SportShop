$(document).ready(function () {
    const productContainer = $('#product-container');
    const cartCounter = $('#cart-counter');

    // Hàm cập nhật số lượng giỏ hàng
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCounter.text(cart.reduce((total, item) => total + item.quantity, 0));
    }

    // Lấy dữ liệu sản phẩm từ mockAPI
    $.ajax({
        url: 'https://67c66a42351c081993fd1fdb.mockapi.io/api/v1/products',
        method: 'GET',
        success: function (products) {
            products.forEach(product => {
                const productCard = `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.price} VND</p>
                                <a href="products/product-details.html?id=${product.id}" class="btn btn-primary">Xem Chi Tiết</a>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.append(productCard);
            });
        },
        error: function (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
        }
    });

    // Cập nhật số lượng giỏ hàng khi tải trang
    updateCartCounter();
});