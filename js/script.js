// Load products for given cateory

fetch('product.json')
  .then(response => response.json())
  .then(data => {

    // Category name set in the page using this element
    const categoryName = document.getElementById('category');

    const prodCategory = data.categories.find(category => category.name === categoryName.innerText);
    const productsList = prodCategory.products;

    const productContainer = document.getElementById('product-list');

    productsList.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product';
      productItem.innerHTML = innerHTML = `

      <h1>${product.name}</h1>
      <p>${product.Description}<br></p>
      <img src="${product.image}" alt="${product.productid}" class="daily_product_h_w">
      <p>Price: Rs ${product.price}<br>
      <label for="quantity_${product.productid}">Quantity</label> : <input type="number" id="quantity_${product.productid}" value="1" min="1" max="${product.quantity}"><br>&nbsp;
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
  })
  .catch(error => console.error('Error fetching data:', error));

  // Add product to the cart
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the index of the product in the cart
    const index = cart.findIndex(item => item.name === product.name);

    // Quantity entered by the customer
    product.orderQuantity = document.getElementById("quantity_" + product.productid).value;

    if (index !== -1) {
      // If the product exists, overwrite it
      cart[index] = product;
      console.log('Product updated to cart:', product);
      alert('Product updated to cart');

    } else {
      // If the product doesn't exist, add it to the cart
      cart.push(product);
      console.log('Product added to cart:', product);
      alert('Product updated to cart');
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }



