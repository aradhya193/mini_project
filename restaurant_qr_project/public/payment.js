document.getElementById('payment-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Simulate payment processing
    alert('Payment successful! Thank you for your order.');

    // Redirect to a thank you page or update order status in the backend
    window.location.href = '/thankyou.html';
});
