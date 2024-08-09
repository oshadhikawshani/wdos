document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('categoryDropdown');

    // Fetch and populate dropdown
    fetch('product.json')
        .then(response => response.json())
        .then(data => {
            data.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.url;
                option.textContent = category.name;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));

    dropdown.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory) {
            fetchProducts(selectedCategory);
        }
    });

    // Fetch and display products based on selected category
    function fetchProducts(categoryUrl) {
        fetch('product.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const category = data.categories.find(cat => cat.url === categoryUrl);
                if (category) {
                    displayProducts(category.products);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Display products in the product list
    function displayProducts(products) {
        const productContainer = document.getElementById('product-list');
        productContainer.innerHTML = ''; // Clear previous products

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product';
            productItem.innerHTML = `
                <h1>${product.name}</h1>
                <p>${product.Description}<br></p>
                <img src="${product.image}" alt="${product.name}" class="daily_product_h_w">
                <p>Price: Rs ${product.price}<br>
                Quantity: <input type="number" id="quantity_${product.productid}" value="1" min="1" max="${product.quantity}"><br>&nbsp;
                `;

            const buttonDiv = document.createElement('div');
            buttonDiv.className = "button-container";

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.className = 'add-to-cart';
            addToCartButton.addEventListener('click', () => addToCart(product));
            buttonDiv.appendChild(addToCartButton);

            productItem.appendChild(buttonDiv);
            productContainer.appendChild(productItem);
        });
    }

    // Add product to the cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const index = cart.findIndex(item => item.name === product.name);
        product.orderQuantity = document.getElementById("quantity_" + product.productid).value;
        if (index !== -1) {
            cart[index] = product;
        } else {
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});


function checkoutLoad() {
  window.location.href = "checkout.html";
}
