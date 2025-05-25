// // script.js

// // ------------------- Image Gallery Function (About Section) -------------------
// function functio(small) {
//     var full = document.getElementById("imagebox");
//     if (full) {
//         full.src = small.src;
//     }
// }

// // ------------------- Smooth Scrolling for Navigation Links -------------------
// document.querySelectorAll('nav ul li a').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         const targetHref = this.getAttribute('href');
//         const isInternalLink = targetHref.startsWith('#') || targetHref.includes('index.html#');

//         if (isInternalLink) {
//             e.preventDefault();

//             let targetId = targetHref.split('#')[1];
//             if (!targetId) {
//                 targetId = 'Home';
//             }
//             const targetElement = document.getElementById(targetId);

//             if (targetElement) {
//                 if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
//                     targetElement.scrollIntoView({
//                         behavior: 'smooth'
//                     });
//                 } else {
//                     window.location.href = `index.html#${targetId}`;
//                 }
//             } else {
//                 window.location.href = targetHref;
//             }
//         }
//     });
// });

// // ------------------- Basic Form Validation (Login Form) -------------------
// const loginForm = document.querySelector('.login_form form');
// if (loginForm) {
//     loginForm.addEventListener('submit', function(e) {
//         const usernameInput = this.querySelector('.username');
//         const passwordInput = this.querySelector('input[name="password"]');

//         if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
//             e.preventDefault();
//             alert('Please enter both username and password.');
//         }
//     });
// }

// // ------------------- Cart Core Functions (using localStorage) -------------------

// /**
//  * Retrieves the cart data from localStorage.
//  * @returns {Array} The cart array, or an empty array if none exists or is invalid.
//  */
// function getCart() {
//     const cartData = localStorage.getItem('urbanSoleCart');
//     try {
//         const parsedCart = JSON.parse(cartData);
//         // Ensure that parsedCart is an array; if localStorage had something else, reset it.
//         return Array.isArray(parsedCart) ? parsedCart : [];
//     } catch (e) {
//         console.error("Error parsing cart data from localStorage:", e);
//         return []; // Return an empty array on error
//     }
// }

// /**
//  * Saves the given cart array to localStorage and triggers UI updates.
//  * This is the central function to call after any cart modification.
//  * @param {Array} cart - The cart array to save.
//  */
// function saveCart(cart) {
//     localStorage.setItem('urbanSoleCart', JSON.stringify(cart));
//     console.log("Cart saved:", cart); // Debugging: log cart state

//     updateCartIconQuantity(); // Update the header icon (number bubble)
//     updateCartPreview();      // Update the hover preview content

//     // If on the cart page, re-render the full cart display to ensure all numbers are consistent
//     if (window.location.pathname.endsWith('cart.html')) {
//         renderCartItems();
//     }
// }

// // ------------------- Cart Icon Quantity & Preview Display -------------------

// /**
//  * Updates the numerical quantity displayed next to the cart icon.
//  */
// function updateCartIconQuantity() {
//     const cartIconSpan = document.getElementById('cart-quantity');
//     if (cartIconSpan) {
//         const currentCart = getCart();
//         const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);

//         if (totalItems > 0) {
//             cartIconSpan.textContent = totalItems;
//             cartIconSpan.style.display = 'inline-block'; // Show the quantity
//         } else {
//             cartIconSpan.style.display = 'none'; // Hide if cart is empty
//         }
//     }
// }

// /**
//  * Updates the content of the cart preview (tooltip/dropdown) when hovering over the cart icon.
//  */
// function updateCartPreview() {
//     const cartPreview = document.getElementById('cart-preview');
//     if (!cartPreview) {
//         console.log("Cart preview element not found. Skipping update.");
//         return; // Exit if no cart preview element (e.g., if HTML isn't loaded yet)
//     }

//     const currentCart = getCart();
//     const previewItemsContainer = cartPreview.querySelector('.cart-preview-items');
//     const previewTotalSpan = cartPreview.querySelector('.cart-preview-total-price');
//     const previewCountSpan = cartPreview.querySelector('.cart-preview-item-count');

//     if (!previewItemsContainer || !previewTotalSpan || !previewCountSpan) {
//         console.error("Missing elements within cart preview. Check HTML structure.");
//         return;
//     }

//     previewItemsContainer.innerHTML = ''; // Clear previous items

//     let previewTotal = 0;
//     let totalItemCount = 0;

//     if (currentCart.length === 0) {
//         previewItemsContainer.innerHTML = '<p class="empty-preview">Your cart is empty.</p>';
//         previewTotalSpan.textContent = '0.00';
//         previewCountSpan.textContent = '0 items';
//     } else {
//         // Show up to 3 items in the preview (you can adjust this limit)
//         currentCart.slice(0, 3).forEach(item => {
//             const itemDiv = document.createElement('div');
//             itemDiv.classList.add('cart-preview-item');
//             itemDiv.innerHTML = `
//                 <span>${item.name} x ${item.quantity}</span>
//                 <span>$${(item.price * item.quantity).toFixed(2)}</span>
//             `;
//             previewItemsContainer.appendChild(itemDiv);
//             previewTotal += item.price * item.quantity;
//             totalItemCount += item.quantity;
//         });

//         if (currentCart.length > 3) {
//             const moreItemsDiv = document.createElement('div');
//             moreItemsDiv.classList.add('cart-preview-more');
//             moreItemsDiv.textContent = `... and ${currentCart.length - 3} more items`;
//             previewItemsContainer.appendChild(moreItemsDiv);
//         }

//         previewTotalSpan.textContent = previewTotal.toFixed(2);
//         previewCountSpan.textContent = `${totalItemCount} items`;
//     }
// }

// // Event listeners for showing/hiding cart preview on hover
// const cartIconLink = document.querySelector('.icons a[href="cart.html"]');
// const cartPreview = document.getElementById('cart-preview');

// if (cartIconLink && cartPreview) {
//     let hideTimeout;

//     cartIconLink.addEventListener('mouseenter', () => {
//         clearTimeout(hideTimeout);
//         updateCartPreview();
//         cartPreview.style.display = 'block';
//         cartPreview.style.opacity = '1';
//         cartPreview.style.visibility = 'visible';
//     });

//     cartIconLink.addEventListener('mouseleave', () => {
//         hideTimeout = setTimeout(() => {
//             cartPreview.style.opacity = '0';
//             cartPreview.style.visibility = 'hidden';
//             cartPreview.style.display = 'none';
//         }, 300);
//     });

//     cartPreview.addEventListener('mouseenter', () => {
//         clearTimeout(hideTimeout);
//         cartPreview.style.display = 'block';
//         cartPreview.style.opacity = '1';
//         cartPreview.style.visibility = 'visible';
//     });

//     cartPreview.addEventListener('mouseleave', () => {
//         hideTimeout = setTimeout(() => {
//             cartPreview.style.opacity = '0';
//             cartPreview.style.visibility = 'hidden';
//             cartPreview.style.display = 'none';
//         }, 300);
//     });
// }


// // ------------------- Add to Cart Functionality (on index.html) -------------------

// // This block ensures 'Add to Cart' buttons only work on the main product page.
// if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
//     const addToCartButtons = document.querySelectorAll('.products .card .btn');

//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', function(event) {
//             event.preventDefault();

//             const productCard = this.closest('.card');
//             const productNameElement = productCard.querySelector('.products_text h2');
//             const productPriceElement = productCard.querySelector('.products_text h3');

//             if (!productNameElement || !productPriceElement) {
//                 console.error("Could not find product name or price elements within the card.");
//                 return;
//             }

//             const productName = productNameElement.textContent.trim();
//             const productPriceText = productPriceElement.textContent.trim();
//             const productPrice = parseFloat(productPriceText.replace('$', ''));

//             if (isNaN(productPrice)) {
//                 console.error(`Invalid price for product: ${productName}. Price text: ${productPriceText}`);
//                 return;
//             }

//             let currentCart = getCart();

//             const existingProductIndex = currentCart.findIndex(item => item.name === productName);

//             if (existingProductIndex > -1) {
//                 currentCart[existingProductIndex].quantity++;
//                 console.log(`Updated quantity for ${productName}: ${currentCart[existingProductIndex].quantity}`);
//             } else {
//                 currentCart.push({
//                     name: productName,
//                     price: productPrice,
//                     quantity: 1
//                 });
//                 console.log(`Added new product to cart: ${productName}`);
//             }

//             saveCart(currentCart); // Saves to localStorage and updates all UI elements
//         });
//     });
// }

// // ------------------- Cart Page Specific Functionality (on cart.html) -------------------

// /**
//  * Renders the full list of cart items on the cart.html page.
//  * This function clears and rebuilds the cart display to ensure consistency.
//  */
// function renderCartItems() {
//     const cartItemsContainer = document.getElementById('cart-items-container');
//     const emptyCartMessage = document.getElementById('empty-cart-message');
//     const cartTotalItemsSpan = document.getElementById('cart-total-items');
//     const cartTotalPriceSpan = document.getElementById('cart-total-price');

//     if (!cartItemsContainer || !emptyCartMessage || !cartTotalItemsSpan || !cartTotalPriceSpan) {
//         console.log("Not on cart.html or missing cart elements. Skipping render.");
//         return;
//     }

//     const currentCart = getCart();
//     cartItemsContainer.innerHTML = ''; // Clear existing content (removes old event listeners too)
//     console.log("Rendering cart items. Current cart state:", currentCart); // Debugging

//     let totalItems = 0;
//     let totalPrice = 0;

//     if (currentCart.length === 0) {
//         emptyCartMessage.style.display = 'block';
//     } else {
//         emptyCartMessage.style.display = 'none';
//         currentCart.forEach(item => {
//             const cartItemDiv = document.createElement('div');
//             cartItemDiv.classList.add('cart-item');

//             // Constructing the HTML for each cart item. Ensure data-product-name matches item.name EXACTLY.
//             cartItemDiv.innerHTML = `
//                 <div class="item-details">
//                     <h3>${item.name}</h3>
//                     <p>Price: $${item.price.toFixed(2)}</p>
//                     <div class="quantity-controls">
//                         <button class="quantity-decrease" data-product-name="${item.name}">-</button>
//                         <span>${item.quantity}</span>
//                         <button class="quantity-increase" data-product-name="${item.name}">+</button>
//                     </div>
//                     <p>Subtotal: $<span>${(item.price * item.quantity).toFixed(2)}</span></p>
//                 </div>
//                 <button class="remove-item-btn" data-product-name="${item.name}">Remove</button>
//             `;
//             cartItemsContainer.appendChild(cartItemDiv);

//             totalItems += item.quantity;
//             totalPrice += item.price * item.quantity;
//         });
//     }

//     cartTotalItemsSpan.textContent = totalItems;
//     cartTotalPriceSpan.textContent = totalPrice.toFixed(2);
//     console.log(`Cart Summary - Total Items: ${totalItems}, Total Price: ${totalPrice.toFixed(2)}`); // Debugging

//     // IMPORTANT: Re-attach event listeners for newly created elements.
//     addCartItemEventListeners();
// }

// /**
//  * Attaches event listeners to quantity change buttons and remove buttons on the cart page.
//  * This must be called after `renderCartItems()` as elements are dynamically created.
//  */
// function addCartItemEventListeners() {
//     const removeButtons = document.querySelectorAll('#cart-items-container .remove-item-btn');
//     const increaseQuantityButtons = document.querySelectorAll('#cart-items-container .quantity-increase');
//     const decreaseQuantityButtons = document.querySelectorAll('#cart-items-container .quantity-decrease');

//     // Debugging: confirm buttons are found
//     console.log("Attaching event listeners. Found:",
//         removeButtons.length, "remove buttons,",
//         increaseQuantityButtons.length, "increase buttons,",
//         decreaseQuantityButtons.length, "decrease buttons.");

//     removeButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const productName = this.dataset.productName;
//             console.log(`Remove button clicked for: ${productName}`); // Debugging
//             removeItemFromCart(productName);
//         });
//     });

//     increaseQuantityButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const productName = this.dataset.productName;
//             console.log(`Increase button clicked for: ${productName}`); // Debugging
//             updateItemQuantity(productName, 1); // Increase by 1
//         });
//     });

//     decreaseQuantityButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const productName = this.dataset.productName;
//             console.log(`Decrease button clicked for: ${productName}`); // Debugging
//             updateItemQuantity(productName, -1); // Decrease by 1
//         });
//     });
// }

// /**
//  * Removes an item from the cart based on its product name.
//  * @param {string} productName - The name of the product to remove.
//  */
// function removeItemFromCart(productName) {
//     let currentCart = getCart();
//     // Filter out the item to be removed
//     const initialLength = currentCart.length;
//     currentCart = currentCart.filter(item => item.name !== productName);

//     if (currentCart.length < initialLength) {
//         console.log(`Product "${productName}" removed.`); // Debugging
//         saveCart(currentCart); // Save changes, which triggers re-render and icon/preview updates
//     } else {
//         console.warn(`Attempted to remove product "${productName}" but it was not found in cart.`);
//     }
// }

// /**
//  * Updates the quantity of a specific item in the cart.
//  * @param {string} productName - The name of the product to update.
//  * @param {number} change - The amount to change the quantity by (e.g., 1 for increase, -1 for decrease).
//  */
// function updateItemQuantity(productName, change) {
//     let currentCart = getCart();
//     const productIndex = currentCart.findIndex(item => item.name === productName);

//     if (productIndex > -1) {
//         currentCart[productIndex].quantity += change;

//         // If quantity drops to 0 or below, remove the item entirely
//         if (currentCart[productIndex].quantity <= 0) {
//             console.log(`Quantity for "${productName}" dropped to 0 or less. Removing item.`);
//             currentCart = currentCart.filter(item => item.name !== productName);
//         } else {
//             console.log(`Quantity for "${productName}" updated to: ${currentCart[productIndex].quantity}`);
//         }
//         saveCart(currentCart); // Save changes, which triggers re-render and icon/preview updates
//     } else {
//         console.warn(`Attempted to update quantity for product "${productName}" but it was not found in cart.`);
//     }
// }

// // ------------------- Initial Page Load Setup -------------------

// document.addEventListener('DOMContentLoaded', () => {
//     console.log("DOM Content Loaded. Initializing cart functions.");

//     // These functions run on page load for any page that includes this script
//     updateCartIconQuantity(); // Ensure the cart icon bubble is correct
//     updateCartPreview();      // Ensure the cart preview content is up-to-date (initially hidden by CSS)

//     // Specific logic only for the cart.html page
//     if (window.location.pathname.endsWith('cart.html')) {
//         console.log("On cart.html page. Rendering cart items.");
//         renderCartItems(); // Display full cart items on the cart page

//         const checkoutButton = document.getElementById('checkout-button');
//         if (checkoutButton) {
//             checkoutButton.addEventListener('click', () => {
//                 const currentCart = getCart();
//                 if (currentCart.length > 0) {
//                     alert('Proceeding to checkout! Your cart items:\n' + JSON.stringify(currentCart, null, 2));
//                     // In a real application, you would send this cart data to a server,
//                     // handle payment, and then typically clear the cart:
//                     // saveCart([]); // Uncomment this to clear cart after "checkout"
//                 } else {
//                     alert('Your cart is empty. Add some items before checking out!');
//                 }
//             });
//         }
//     }
// });


// script.js

// ------------------- Image Gallery Function (About Section) -------------------
function functio(small) {
    var full = document.getElementById("imagebox");
    if (full) {
        full.src = small.src;
        console.log(`Image gallery: Changed main image to ${small.src}`);
    } else {
        console.warn("Image gallery: Main image box (id='imagebox') not found.");
    }
}

// ------------------- Smooth Scrolling for Navigation Links -------------------
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetHref = this.getAttribute('href');
        const isInternalLink = targetHref.startsWith('#') || targetHref.includes('index.html#');

        console.log(`Nav click: Target href = ${targetHref}, isInternalLink = ${isInternalLink}`);

        if (isInternalLink) {
            e.preventDefault(); // Prevent default link behavior for smooth scroll

            let targetId = targetHref.split('#')[1];
            if (!targetId) {
                targetId = 'Home'; // Default to 'Home' if just 'index.html' or '/'
                console.log("Nav click: No specific ID, defaulting to 'Home'.");
            }
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                    console.log(`Nav click: Scrolling to #${targetId} on current page.`);
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.log(`Nav click: Redirecting to index.html#${targetId}.`);
                    window.location.href = `index.html#${targetId}`;
                }
            } else {
                console.warn(`Nav click: Target element with ID '${targetId}' not found. Redirecting to full href.`);
                window.location.href = targetHref; // Fallback for full page navigation
            }
        }
    });
});

// ------------------- Basic Form Validation (Login Form) -------------------
const loginForm = document.querySelector('.login_form form');
if (loginForm) {
    console.log("Login form found. Attaching submit listener.");
    loginForm.addEventListener('submit', function(e) {
        const usernameInput = this.querySelector('.username');
        const passwordInput = this.querySelector('input[name="password"]');

        if (!usernameInput || !passwordInput) {
            console.error("Login form: Username or password input not found.");
            return;
        }

        if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
            e.preventDefault(); // Stop form submission
            alert('Please enter both username and password.');
            console.warn("Login form: Validation failed - username or password empty.");
        } else {
            console.log("Login form: Validation successful. Form submitting (or would submit).");
            // In a real app, you'd send data to server here
        }
    });
} else {
    console.log("Login form not found on this page.");
}

// ------------------- Cart Core Functions (using localStorage) -------------------

/**
 * Retrieves the cart data from localStorage.
 * @returns {Array} The cart array, or an empty array if none exists or is invalid.
 */
function getCart() {
    const cartData = localStorage.getItem('urbanSoleCart');
    if (cartData === null) {
        console.log("getCart: 'urbanSoleCart' not found in localStorage. Returning empty array.");
        return [];
    }
    try {
        const parsedCart = JSON.parse(cartData);
        if (!Array.isArray(parsedCart)) {
            console.error("getCart: Parsed cart data is not an array. Resetting cart. Data:", parsedCart);
            return [];
        }
        console.log("getCart: Successfully retrieved cart from localStorage.", parsedCart);
        return parsedCart;
    } catch (e) {
        console.error("getCart: Error parsing cart data from localStorage. Resetting cart.", e);
        return []; // Return an empty array on error
    }
}

/**
 * Saves the given cart array to localStorage and triggers UI updates.
 * This is the central function to call after any cart modification.
 * @param {Array} cart - The cart array to save.
 */
function saveCart(cart) {
    try {
        localStorage.setItem('urbanSoleCart', JSON.stringify(cart));
        console.log("saveCart: Cart successfully saved to localStorage.", cart);

        updateCartIconQuantity(); // Update the header icon (number bubble)
        updateCartPreview();      // Update the hover preview content

        // If on the cart page, re-render the full cart display
        if (window.location.pathname.endsWith('cart.html')) {
            console.log("saveCart: On cart.html, calling renderCartItems to refresh display.");
            renderCartItems();
        } else {
            console.log("saveCart: Not on cart.html, skipping full cart re-render.");
        }
    } catch (e) {
        console.error("saveCart: Error saving cart to localStorage.", e);
    }
}

// ------------------- Cart Icon Quantity & Preview Display -------------------

/**
 * Updates the numerical quantity displayed next to the cart icon.
 */
function updateCartIconQuantity() {
    const cartIconSpan = document.getElementById('cart-quantity');
    if (cartIconSpan) {
        const currentCart = getCart(); // This calls getCart() to ensure latest data
        const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
            cartIconSpan.textContent = totalItems;
            cartIconSpan.style.display = 'inline-block';
            console.log(`updateCartIconQuantity: Cart icon updated to ${totalItems} items.`);
        } else {
            cartIconSpan.textContent = ''; // Clear text if 0
            cartIconSpan.style.display = 'none';
            console.log("updateCartIconQuantity: Cart is empty, hiding icon quantity.");
        }
    } else {
        console.warn("updateCartIconQuantity: Element with ID 'cart-quantity' not found.");
    }
}

/**
 * Updates the content of the cart preview (tooltip/dropdown) when hovering over the cart icon.
 */
function updateCartPreview() {
    const cartPreview = document.getElementById('cart-preview');
    if (!cartPreview) {
        console.log("updateCartPreview: Cart preview element (id='cart-preview') not found. Skipping update.");
        return;
    }

    const currentCart = getCart(); // Fresh cart data
    const previewItemsContainer = cartPreview.querySelector('.cart-preview-items');
    const previewTotalSpan = cartPreview.querySelector('.cart-preview-total-price');
    const previewCountSpan = cartPreview.querySelector('.cart-preview-item-count');

    if (!previewItemsContainer || !previewTotalSpan || !previewCountSpan) {
        console.error("updateCartPreview: Missing required elements within cart preview container. Check HTML structure.");
        return;
    }

    previewItemsContainer.innerHTML = ''; // Clear previous items

    let previewTotal = 0;
    let totalItemCount = 0;

    if (currentCart.length === 0) {
        previewItemsContainer.innerHTML = '<p class="empty-preview">Your cart is empty.</p>';
        previewTotalSpan.textContent = '0.00';
        previewCountSpan.textContent = '0 items';
        console.log("updateCartPreview: Cart is empty, preview updated to show empty message.");
    } else {
        currentCart.slice(0, 3).forEach(item => { // Show up to 3 items
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-preview-item');
            itemDiv.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            previewItemsContainer.appendChild(itemDiv);
            previewTotal += item.price * item.quantity;
            totalItemCount += item.quantity;
        });

        if (currentCart.length > 3) {
            const moreItemsDiv = document.createElement('div');
            moreItemsDiv.classList.add('cart-preview-more');
            moreItemsDiv.textContent = `... and ${currentCart.length - 3} more items`;
            previewItemsContainer.appendChild(moreItemsDiv);
        }

        previewTotalSpan.textContent = previewTotal.toFixed(2);
        previewCountSpan.textContent = `${totalItemCount} items`;
        console.log(`updateCartPreview: Cart preview updated with ${totalItemCount} items, total $${previewTotal.toFixed(2)}.`);
    }
}

// Event listeners for showing/hiding cart preview on hover
const cartIconLink = document.querySelector('.icons a[href="cart.html"]');
const cartPreview = document.getElementById('cart-preview');

if (cartIconLink && cartPreview) {
    console.log("Cart icon and preview elements found. Attaching hover listeners.");
    let hideTimeout;

    cartIconLink.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        updateCartPreview(); // Ensure content is fresh before showing
        cartPreview.style.display = 'block';
        cartPreview.style.opacity = '1';
        cartPreview.style.visibility = 'visible';
        console.log("Cart preview: Mouse entered cart icon, showing preview.");
    });

    cartIconLink.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            cartPreview.style.opacity = '0';
            cartPreview.style.visibility = 'hidden';
            cartPreview.style.display = 'none';
            console.log("Cart preview: Mouse left cart icon, hiding preview (delayed).");
        }, 300);
    });

    cartPreview.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout); // Prevent hiding if mouse moves from icon to preview
        cartPreview.style.display = 'block'; // Ensure it stays visible
        cartPreview.style.opacity = '1';
        cartPreview.style.visibility = 'visible';
        console.log("Cart preview: Mouse entered preview area, keeping visible.");
    });

    cartPreview.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            cartPreview.style.opacity = '0';
            cartPreview.style.visibility = 'hidden';
            cartPreview.style.display = 'none';
            console.log("Cart preview: Mouse left preview area, hiding preview (delayed).");
        }, 300);
    });
} else {
    console.log("Cart icon link or cart preview element not found. Skipping hover listeners.");
}

// ------------------- Add to Cart Functionality (on index.html) -------------------

// This block ensures 'Add to Cart' buttons only work on the main product page.
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    const addToCartButtons = document.querySelectorAll('.products .card .btn');
    if (addToCartButtons.length > 0) {
        console.log(`Found ${addToCartButtons.length} 'Add To Cart' buttons. Attaching click listeners.`);
    } else {
        console.warn("No 'Add To Cart' buttons found on this page.");
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Stop the default link behavior

            const productCard = this.closest('.card');
            if (!productCard) {
                console.error("Add To Cart: Could not find parent '.card' element.");
                return;
            }

            const productNameElement = productCard.querySelector('.products_text h2');
            const productPriceElement = productCard.querySelector('.products_text h3');

            if (!productNameElement || !productPriceElement) {
                console.error("Add To Cart: Could not find product name (h2) or price (h3) elements within the card.");
                return;
            }

            const productName = productNameElement.textContent.trim();
            const productPriceText = productPriceElement.textContent.trim();
            const productPrice = parseFloat(productPriceText.replace('$', ''));

            if (isNaN(productPrice)) {
                console.error(`Add To Cart: Invalid price for product: "${productName}". Price text found: "${productPriceText}"`);
                return;
            }

            let currentCart = getCart(); // Get current cart state

            const existingProductIndex = currentCart.findIndex(item => item.name === productName);

            if (existingProductIndex > -1) {
                currentCart[existingProductIndex].quantity++;
                console.log(`Add To Cart: Updated quantity for existing product "${productName}" to ${currentCart[existingProductIndex].quantity}.`);
            } else {
                currentCart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
                console.log(`Add To Cart: Added new product "${productName}" to cart.`);
            }

            saveCart(currentCart); // Save changes and trigger UI updates
        });
    });
} else {
    console.log("Not on index.html, skipping 'Add To Cart' button listeners.");
}

// ------------------- Cart Page Specific Functionality (on cart.html) -------------------

/**
 * Renders the full list of cart items on the cart.html page.
 * This function clears and rebuilds the cart display to ensure consistency.
 */
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotalItemsSpan = document.getElementById('cart-total-items');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');

    if (!cartItemsContainer || !emptyCartMessage || !cartTotalItemsSpan || !cartTotalPriceSpan) {
        console.warn("renderCartItems: Missing one or more required cart elements (container, message, totals). This function might be called on a page without the full cart structure.");
        return; // Exit if elements are not found (e.g., if on index.html)
    }

    const currentCart = getCart(); // Get latest cart data for rendering
    cartItemsContainer.innerHTML = ''; // Clear existing content (removes old event listeners)
    console.log("renderCartItems: Cart container cleared. Starting re-render with cart state:", currentCart);

    let totalItems = 0;
    let totalPrice = 0;

    if (currentCart.length === 0) {
        emptyCartMessage.style.display = 'block';
        console.log("renderCartItems: Cart is empty, showing empty message.");
    } else {
        emptyCartMessage.style.display = 'none';
        currentCart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            // IMPORTANT: The `data-product-name` attribute value here must EXACTLY match `item.name`.
            // This is crucial for the quantity/remove buttons to work correctly.
            cartItemDiv.innerHTML = `
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-decrease" data-product-name="${item.name}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-increase" data-product-name="${item.name}">+</button>
                    </div>
                    <p>Subtotal: $<span>${(item.price * item.quantity).toFixed(2)}</span></p>
                </div>
                <button class="remove-item-btn" data-product-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
            console.log(`renderCartItems: Added item "${item.name}" (Qty: ${item.quantity}, Subtotal: $${(item.price * item.quantity).toFixed(2)})`);
        });
    }

    cartTotalItemsSpan.textContent = totalItems;
    cartTotalPriceSpan.textContent = totalPrice.toFixed(2);
    console.log(`renderCartItems: Cart Summary Updated - Total Items: ${totalItems}, Total Price: $${totalPrice.toFixed(2)}`);

    // VERY IMPORTANT: Re-attach event listeners for newly created elements after innerHTML is updated.
    addCartItemEventListeners();
    console.log("renderCartItems: addCartItemEventListeners called after rendering.");
}

/**
 * Attaches event listeners to quantity change buttons and remove buttons on the cart page.
 * This must be called after `renderCartItems()` as elements are dynamically created.
 */
function addCartItemEventListeners() {
    // Select all buttons within the dynamically generated #cart-items-container
    const removeButtons = document.querySelectorAll('#cart-items-container .remove-item-btn');
    const increaseQuantityButtons = document.querySelectorAll('#cart-items-container .quantity-increase');
    const decreaseQuantityButtons = document.querySelectorAll('#cart-items-container .quantity-decrease');

    console.log(`addCartItemEventListeners: Found ${removeButtons.length} remove, ${increaseQuantityButtons.length} increase, ${decreaseQuantityButtons.length} decrease buttons.`);

    // Attach listeners
    removeButtons.forEach(button => {
        // Using an anonymous function or a named handler to prevent re-attaching duplicates if needed
        // For renderCartItems's innerHTML = '' approach, old listeners are gone, so direct attach is fine.
        button.addEventListener('click', function() {
            const productName = this.dataset.productName;
            console.log(`Event: Remove button clicked for "${productName}"`);
            removeItemFromCart(productName);
        });
    });

    increaseQuantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.productName;
            console.log(`Event: Increase button clicked for "${productName}"`);
            updateItemQuantity(productName, 1); // Increase by 1
        });
    });

    decreaseQuantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.productName;
            console.log(`Event: Decrease button clicked for "${productName}"`);
            updateItemQuantity(productName, -1); // Decrease by 1
        });
    });
}

/**
 * Removes an item from the cart based on its product name.
 * @param {string} productName - The name of the product to remove.
 */
function removeItemFromCart(productName) {
    console.log(`removeItemFromCart: Attempting to remove "${productName}".`);
    let currentCart = getCart();
    const initialLength = currentCart.length;
    currentCart = currentCart.filter(item => item.name !== productName);

    if (currentCart.length < initialLength) {
        console.log(`removeItemFromCart: Product "${productName}" successfully filtered out.`);
        saveCart(currentCart); // Save updated cart, which triggers re-render
    } else {
        console.warn(`removeItemFromCart: Product "${productName}" not found in cart.`);
    }
}

/**
 * Updates the quantity of a specific item in the cart.
 * @param {string} productName - The name of the product to update.
 * @param {number} change - The amount to change the quantity by (e.g., 1 for increase, -1 for decrease).
 */
function updateItemQuantity(productName, change) {
    console.log(`updateItemQuantity: Attempting to change quantity for "${productName}" by ${change}.`);
    let currentCart = getCart();
    const productIndex = currentCart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        currentCart[productIndex].quantity += change;
        console.log(`updateItemQuantity: New quantity for "${productName}" is ${currentCart[productIndex].quantity}.`);

        // If quantity drops to 0 or below, remove the item entirely
        if (currentCart[productIndex].quantity <= 0) {
            console.log(`updateItemQuantity: Quantity for "${productName}" reached zero or less. Removing item from cart.`);
            currentCart = currentCart.filter(item => item.name !== productName);
        }
        saveCart(currentCart); // Save changes, which triggers re-render
    } else {
        console.warn(`updateItemQuantity: Product "${productName}" not found in cart for quantity update.`);
    }
}

// ------------------- Initial Page Load Setup -------------------

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded. Starting initial script setup.");

    // These functions run on page load for any page that includes this script
    updateCartIconQuantity(); // Ensures the cart icon bubble is correct from the start
    updateCartPreview();      // Ensures the cart preview content is up-to-date (initially hidden by CSS)
    console.log("Initial cart icon and preview updates completed.");

    // Specific logic only for the cart.html page
    if (window.location.pathname.endsWith('cart.html')) {
        console.log("Detected cart.html page. Calling renderCartItems.");
        renderCartItems(); // Display full cart items on the cart page

        const checkoutButton = document.getElementById('checkout-button');
        if (checkoutButton) {
            console.log("Checkout button found. Attaching click listener.");
            checkoutButton.addEventListener('click', () => {
                const currentCart = getCart();
                if (currentCart.length > 0) {
                    alert('Proceeding to checkout! Your cart items:\n' + JSON.stringify(currentCart, null, 2));
                    console.log("Checkout clicked: Cart content:", currentCart);
                    // In a real application, you would send this cart data to a server,
                    // handle payment, and then typically clear the cart:
                    // saveCart([]); // Uncomment this to clear cart after "checkout"
                } else {
                    alert('Your cart is empty. Add some items before checking out!');
                    console.warn("Checkout clicked: Cart is empty.");
                }
            });
        } else {
            console.warn("Checkout button (id='checkout-button') not found on cart.html.");
        }
    } else {
        console.log("Not on cart.html.");
    }
});