const menuItemsData = {
    Meals: [
        {
            name: 'Mutton Biryani With Gravy',
            price: 380,
            image: 'hyah.jpg' // Replace with actual image path
        },
        {
            name: 'Mutton Dum Biryani With Gravy',
            price: 380,
            image: 'dum-biryani.jpg' // Replace with actual image path
        }
    ],
    'Express Combos': [
        {
            name: 'Veg Chinese Combo',
            price: 250,
            image: 'veg-combo.jpg' // Replace with actual image path
        }
    ],
    Soups: [
        {
            name: 'Tomato Soup',
            price: 150,
            image: 'tomato-soup.jpg' // Replace with actual image path
        }
    ]
};

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems('Meals'); // Default category

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            document.getElementById('selected-category').textContent = category;
            displayMenuItems(category);
        });
    });

    // Target the checkout button (make sure the ID matches your HTML)
    const checkoutButton = document.getElementById('checkout-button'); 
    if (checkoutButton) {
        checkoutButton.addEventListener('click', goToCheckout);
    }
});

function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before proceeding to checkout.");
        return; 
    }

    // Use this line for the redirect:
    window.location.href = '/checkout'; 
}
function displayMenuItems(category) {
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = '';

    const items = menuItemsData[category];
    items.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');
        menuItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <button class="add-to-cart-btn" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        `;
        menuItemsContainer.appendChild(menuItemDiv);
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const name = event.target.getAttribute('data-name');
    const price = event.target.getAttribute('data-price');

    const cartItem = { name, price: parseFloat(price) };
    cart.push(cartItem);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemLi = document.createElement('li');
        cartItemLi.textContent = `${item.name} - ₹${item.price}`;
        cartItemsContainer.appendChild(cartItemLi);
    });

    document.getElementById('cart-count').textContent = cart.length;
}