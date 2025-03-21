$(document).ready(function () {
    const adminProductList = $('#admin-product-list');
    const addProductForm = $('#add-product-form');
    const editProductForm = $('#edit-product-form');
    const logoutButton = $('#logout-button');
    let currentEditProductId = null;

    // Hàm hiển thị danh sách sản phẩm
    function renderProducts() {
        $.ajax({
            url: 'https://67c66a42351c081993fd1fdb.mockapi.io/api/v1/products',
            method: 'GET',
            success: function (products) {
                adminProductList.html('');
                products.forEach(product => {
                    const productRow = `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.price} VND</td>
                            <td>
                                <button class="btn btn-warning btn-sm edit-button" data-id="${product.id}">Sửa</button>
                                <button class="btn btn-danger btn-sm delete-button" data-id="${product.id}">Xóa</button>
                            </td>
                        </tr>
                    `;
                    adminProductList.append(productRow);
                });
            },
            error: function (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            }
        });
    }

    // Event delegation cho nút sửa
    adminProductList.on('click', '.edit-button', function () {
        const productId = $(this).data('id');
        editProduct(productId);
    });

    // Hàm sửa sản phẩm
    function editProduct(productId) {
        $.ajax({
            url: `https://67c66a42351c081993fd1fdb.mockapi.io/api/v1/products/${productId}`,
            method: 'GET',
            success: function (product) {
                $('#edit-product-name').val(product.name);
                $('#edit-product-price').val(product.price);
                $('#edit-product-image').val(product.image);
                $('#edit-product-description').val(product.description);
                currentEditProductId = productId;
                $('#editProductModal').modal('show');
            },
            error: function (error) {
                console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            }
        });
    }

    // Xử lý gửi form sửa sản phẩm
    editProductForm.on('submit', function (event) {
        event.preventDefault();
        const updatedProduct = {
            name: $('#edit-product-name').val(),
            price: $('#edit-product-price').val(),
            image: $('#edit-product-image').val(),
            description: $('#edit-product-description').val()
        };

        $.ajax({
            url: `https://67c66a42351c081993fd1fdb.mockapi.io/api/v1/products/${currentEditProductId}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedProduct),
            success: function () {
                alert('Sản phẩm đã được cập nhật thành công');
                $('#editProductModal').modal('hide');
                renderProducts();
            },
            error: function (error) {
                console.error('Lỗi khi cập nhật sản phẩm:', error);
            }
        });
    });

    // Hàm xóa sản phẩm
    window.deleteProduct = function (productId) {
        $.ajax({
            url: `https://67c66a42351c081993fd1fdb.mockapi.io/api/v1/products/${productId}`,
            method: 'DELETE',
            success: function () {
                alert('Sản phẩm đã được xóa thành công');
                renderProducts();
            },
            error: function (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
            }
        });
    };

    // Xử lý gửi form thêm sản phẩm
    addProductForm.on('submit', function (event) {
        event.preventDefault();
        const newProduct = {
            name: $('#product-name').val(),
            price: $('#product-price').val(),
            image: $('#product-image').val(),
            description: $('#product-description').val()
        };

        $.ajax({
            url: 'https://67c66a42351c081993fd1fdb.mockapi.io/api/v1/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newProduct),
            success: function () {
                alert('Sản phẩm đã được thêm thành công');
                addProductForm[0].reset();
                renderProducts();
            },
            error: function (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
            }
        });
    });

    // Xử lý sự kiện click nút đăng xuất
    logoutButton.on('click', function () {
        localStorage.removeItem('isAdmin');
        alert('Đăng xuất thành công');
        window.location.href = 'login.html';
    });

    // Kiểm tra quyền admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
        alert('Truy cập bị từ chối. Vui lòng đăng nhập với quyền admin.');
        window.location.href = 'login.html';
    }

    // Hiển thị danh sách sản phẩm khi tải trang
    renderProducts();
});