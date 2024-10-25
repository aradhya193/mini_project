document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the usual way

    // Collect form data
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // You can retrieve cart items from localStorage or sessionStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Send order details to backend
    fetch('/submit-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, address, phone, items: cartItems })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Order placed successfully!');
            window.location.href = 'payment.html'; // Redirect to payment page
        } else {
            alert('Error placing order: ' + data.error);
        }
    })
    .catch(err => console.error('Error:', err));
});
