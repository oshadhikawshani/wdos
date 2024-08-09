// JavaScript show shopping Cart
function loadCart() {
  const cartTable = document.getElementById('cart-table');
  const cartBody = cartTable.getElementsByTagName('tbody')[0];

  while (cartBody.firstChild) {
      cartBody.removeChild(cartBody.firstChild);
  }

  let total = 0;
  const savedCart = localStorage.getItem('cart');
  let cart = [];

  if (savedCart) {
      cart = JSON.parse(savedCart);
  }

  cart.forEach(item => {
      const row = document.createElement('tr');
      const productCell = document.createElement('td');
      const quantityCell = document.createElement('td');
      const priceCell = document.createElement('td');
      const totalCell = document.createElement('td');
      const actionCell = document.createElement('td');

      const quantityInput = document.createElement('input');
      const deleteButton = document.createElement('button');

      productCell.textContent = item.name;
      productCell.setAttribute('data-label', 'Product');
      priceCell.textContent = item.price;
      priceCell.setAttribute('data-label', 'Price');
      totalCell.textContent = item.price * item.orderQuantity;
      totalCell.setAttribute('data-label', 'Total');
      total = total + (item.price * item.orderQuantity);

      quantityInput.textContent = "orderQuantity";
      quantityInput.value = item.orderQuantity;
      quantityInput.min = 0;
      quantityInput.max = item.quantity;
      quantityInput.id = "quantity_" + item.productid;
      quantityCell.appendChild(quantityInput);
      quantityCell.setAttribute('data-label', 'Quantity');

      deleteButton.textContent = "X";
      deleteButton.addEventListener('click', () => removeCartItem(item.productid));
      actionCell.appendChild(deleteButton);
      actionCell.setAttribute('data-label', 'Action');

      row.appendChild(productCell);
      row.appendChild(quantityCell);
      row.appendChild(priceCell);
      row.appendChild(totalCell);
      row.appendChild(actionCell);
      cartBody.appendChild(row);
  });

  document.getElementById("orderTotal").textContent = total;
}

// Remove a shopping cart item
function removeCartItem(itemId) {
  let cartString = localStorage.getItem('cart');
  let cart = JSON.parse(cartString) || [];

  const index = cart.findIndex(item => item.productid === itemId);

  if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));

      console.log('Product removed from cart:', itemId);
      loadCart();
  }
}

// Save the cart as a favorite
function saveFavorites() {
  const cartString = localStorage.getItem('cart');
  if (cartString) {
      localStorage.setItem('favoriteCart', cartString);
      alert('Cart saved as favorite!');
  }
}

// Apply the favorite cart to the current cart
function applyFavorites() {
  const favoriteCartString = localStorage.getItem('favoriteCart');
  if (favoriteCartString) {
      localStorage.setItem('cart', favoriteCartString);
      loadCart();
      alert('Favorite cart applied!');
  } else {
      alert('No favorite cart found!');
  }
}

// Show cart when page starts
document.addEventListener('DOMContentLoaded', function () {
  loadCart();

  document.getElementById('add-to-favorites-btn').addEventListener('click', saveFavorites);
  document.getElementById('apply-favorites-btn').addEventListener('click', applyFavorites);

  setInterval(loadCart, 1000);
});