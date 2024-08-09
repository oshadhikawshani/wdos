function loadCart() {
    const cartTable = document.getElementById('cart-table');
    const cartBody = cartTable.getElementsByTagName('tbody')[0];

    // Clear the table body
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
        const totalCell = document.createElement('td');

        const quantityInput = document.createElement('input');

        productCell.textContent = item.name;
        totalCell.textContent = `Rs ${(item.price * item.orderQuantity).toFixed(2)}`;
        total = total + (item.price * item.orderQuantity);

        quantityInput.type = "number";
        quantityInput.value = item.orderQuantity;
        quantityInput.min = 0;
        quantityInput.max = item.quantity;
        quantityInput.id = "quantity_" + item.productid;
        quantityInput.disabled = true; // Make it read-only
        quantityCell.appendChild(quantityInput);

        row.appendChild(productCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        cartBody.appendChild(row);
    });

    document.getElementById("orderTotal").textContent = `Total: Rs ${total.toFixed(2)}`;
}

// Function to calculate the delivery date
function calculateDeliveryDate() {
    const currentDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(currentDate.getDate() + 3); // Assuming 3 days for delivery
    return deliveryDate.toDateString();
}

// Function to validate the form and display a thank you message
function placeOrder() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const tel = document.getElementById('tel').value;
    const gmail = document.getElementById('gmail').value;
    const address = document.getElementById('address').value;
    const zipcode = document.getElementById('zipcode').value;
    const cardnumber = document.getElementById('cardnumber').value;
    const expireDate = document.getElementById('expire-date').value;
    const password = document.getElementById('password').value;

    if (fname && lname && tel && gmail && address && zipcode && cardnumber && expireDate && password) {
        const deliveryDate = calculateDeliveryDate();
        alert(`Thank you for your purchase! Your order will be delivered by ${deliveryDate}.`);
    } else {
        alert('Please fill in all the required fields.');
    }
}

// Call loadCart to display the cart when the page loads
document.addEventListener('DOMContentLoaded', loadCart);

// Add event listener to the "Place The Order" button
document.getElementById('placeOrderButton').addEventListener('click', placeOrder);
