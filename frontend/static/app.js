// static/app.js
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCart();
    initThemeToggle();
    
    // Only fetch products if we are on the home page (where product-grid exists)
    if (document.getElementById('product-grid')) {
        fetchProducts();
    }
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
        }
        localStorage.setItem('theme', theme);
    });
}

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initCart() {
    const cartIcon = document.getElementById('cart-icon');
    const closeCartBtn = document.getElementById('close-cart');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartIcon.addEventListener('click', () => {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('active');
    });
    
    closeCartBtn.addEventListener('click', () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('active');
    });
    
    cartOverlay.addEventListener('click', () => {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('active');
    });

    updateCartUI();
}

async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(product).replace(/'/g, "&#39;")})'>Add to Cart</button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

function getCart() {
    return JSON.parse(localStorage.getItem('luxuryCart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('luxuryCart', JSON.stringify(cart));
}

window.addToCart = function(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(cart);
    updateCartUI();
    
    // Open drawer to show the user it was added
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-overlay').classList.add('active');
};

window.removeFromCart = function(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartUI();
};

function updateCartUI() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update items
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price} x ${item.quantity}</p>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; margin-top:2rem;">Your cart is empty.</p>';
    }
    
    // Update total
    cartTotalAmount.textContent = `$${total}`;
}
