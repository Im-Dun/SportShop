$(document).ready(function () {
    const productDetailsContainer = $('#product-details');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const cartCounter = $('#cart-counter');

    // Hàm cập nhật số lượng giỏ hàng
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCounter.text(cart.reduce((total, item) => total + item.quantity, 0));
    }

    // Lấy chi tiết sản phẩm dựa trên ID sản phẩm từ URL
    if (productId) {
        $.ajax({
            url: `https://67c66a42351c081993fd1fdb.mockapi.io/api/v1/products/${productId}`,
            method: 'GET',
            success: function (product) {
                const productDetails = `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${product.image}" class="img-fluid" alt="${product.name}">
                        </div>
                        <div class="col-md-6">
                            <h1>${product.name}</h1>
                            <p>${product.price} VND</p>
                            <p>${product.description}</p>
                            <button class="btn btn-primary" id="add-to-cart">Thêm vào giỏ</button>
                        </div>
                    </div>
                `;
                productDetailsContainer.html(productDetails);

                // Sự kiện click nút Thêm vào giỏ
                $('#add-to-cart').on('click', function () {
                    addToCart(product);
                });
            },
            error: function (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            }
        });
    } else {
        productDetailsContainer.html('<p>Không tìm thấy sản phẩm.</p>');
    }

    // Thêm sản phẩm vào giỏ hàng
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.id === product.id);

        if (productIndex === -1) {
            cart.push({ ...product, quantity: 1 });
        } else {
            cart[productIndex].quantity += 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
        updateCartCounter();
    }

    // Tải bình luận khi tải trang
    loadComments();

    // Lấy và hiển thị bình luận cho sản phẩm
    function loadComments() {
        const commentsList = $('#comments-list');
        const comments = JSON.parse(localStorage.getItem(`comments-${productId}`)) || [];

        commentsList.html('');
        comments.forEach(comment => {
            const commentElement = $('<div>').addClass('comment').html(`
                <p><strong>${comment.user}</strong>: ${comment.text}</p>
            `);
            commentsList.append(commentElement);
        });
    }

    // Thêm comment cho sản phẩm
    function addComment(user, text) {
        const comments = JSON.parse(localStorage.getItem(`comments-${productId}`)) || [];
        comments.push({ user, text });
        localStorage.setItem(`comments-${productId}`, JSON.stringify(comments));
        loadComments();
    }

    // Xử lý gửi form bình luận
    const commentForm = $('#comment-form');
    commentForm.on('submit', function (event) {
        event.preventDefault();
        const user = $('#comment-user').val();
        const text = $('#comment-text').val();
        addComment(user, text);
        commentForm[0].reset();
    });

    // Cập nhật số lượng giỏ hàng khi tải trang
    updateCartCounter();
});