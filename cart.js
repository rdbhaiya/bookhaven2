// Initialize cart count and items
let cartCount = 0;
let cartItems = [];

// Function to add book to cart and update total price
function addBookC4(bookPrice, bookName) {
    // Retrieve current total price and items from localStorage
    let totalPrice = parseFloat(localStorage.getItem('cartTotalPrice')) || 0;
    cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the book is already in the cart
    const existingItem = cartItems.find(item => item.name === bookName);

    if (existingItem) {
        // If the book exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If the book is new, add it to the cart items
        cartItems.push({ name: bookName, price: bookPrice, quantity: 1 });
        cartCount += 1; // Increment cart count only for new books
    }

    // Update total price by adding the book price
    totalPrice += bookPrice;

    // Update local storage with new total price, cart count, and items
    localStorage.setItem('cartTotalPrice', totalPrice);
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update display
    updateTotalPrice();
    updateCartCount();
}

// Function to update total price on index6.html
function updateTotalPrice() {
    let totalPrice = parseFloat(localStorage.getItem('cartTotalPrice')) || 0;
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

// Function to update cart count near cart icon
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Function to update the cart items on index6.html
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cartItems.forEach(item => {
        const { name, quantity, price } = item;
        const itemHTML = `
            <div class="cart-item">
                <div class="item-details">
                    <span>${name} x ${quantity}</span>
                    <div class="totalPrice">$${(quantity * price).toFixed(2)}</div>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
    });
}

// Call update functions when the page loads
window.addEventListener('load', () => {
    updateTotalPrice();
    updateCartCount();
    updateCartItems();
});
