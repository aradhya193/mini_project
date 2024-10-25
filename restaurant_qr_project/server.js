const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const path = require('path'); // Import path module for serving static files

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Replace with your MySQL username
    password: 'aradhya',   // Replace with your MySQL password
    database: 'ScanandDine' // Name of your database
});


// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('MySQL connected successfully...');
});


// Serve static files from the "public" directory
app.use(express.static('public')); // Ensure "public" folder contains your static files

// Basic Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html
});

// Generate QR Code
app.get('/qr-code', async (req, res) => {
    const url = 'http://192.168.0.105:5000'; // Change this to your desired URL
    try {
        const qrCode = await QRCode.toDataURL(url);
        res.send(`<img src="${qrCode}" alt="QR Code"/>`);
    } catch (err) {
        console.error('Error generating QR Code:', err);
        res.status(500).send('Error generating QR Code');
    }
});

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// Cart storage (could also be in session or database)
let cartItems = [];

// Add to Cart Endpoint
app.post('/cart/add', (req, res) => {
    const { itemId, quantity } = req.body;
    cartItems.push({ itemId, quantity }); // Add item to cart
    res.json({ message: 'Item added to cart', itemId, quantity });
});

// Get Cart Items Endpoint
app.get('/cart', (req, res) => {
    res.json(cartItems); // Return current cart items
});

// Checkout Endpoint
app.post('/checkout', (req, res) => {
    const { cartItems } = req.body; // Array of cart items
    let totalPrice = 0;

    // Example logic to calculate total price
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity; // Assume item has price and quantity
    });

    // Here you can add logic to save the order in the database
    res.json({ message: 'Checkout successful', totalPrice });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
