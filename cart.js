// ================= SHARED SHOPPING CART LOGIC =================
// Yeh file index.html, shop.html, aur product.html teenon mein include hogi

const cartOverlay = document.getElementById("cartOverlay");
const cartDrawer = document.getElementById("cartDrawer");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartItemsList = document.getElementById("cartItemsList");
const cartSubtotal = document.getElementById("cartSubtotal");

// cart ko localStorage se load karo
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// price string "Rs. 250.000" ya "Rp 2.500.000" se sirf number nikalna
function parsePrice(priceStr) {
    const numbers = priceStr.replace(/[^0-9]/g, "");
    return parseInt(numbers) || 0;
}

// kisi bhi product ko cart mein add karna (quantity default 1)
function addToCart(product, qty = 1) {
    const cart = getCart();
    const existingIndex = cart.findIndex((item) => item.name === product.name);

    if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
    } else {
        cart.push({ ...product, qty: qty });
    }

    saveCart(cart);
}

function renderCart() {
    if (!cartItemsList) return;

    const cart = getCart();
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p class="cart_empty_msg">Your cart is empty</p>`;
        cartSubtotal.textContent = "Rs. 0";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = parsePrice(item.show_price) * item.qty;
        subtotal += itemTotal;

        cartItemsList.innerHTML += `
        <div class="cart_item_row">
            <img src="${item.image}" alt="${item.name}" class="cart_item_img">
            <div class="cart_item_details">
                <h4>${item.name}</h4>
                <p><span class="cart_qty">${item.qty}</span> &nbsp;X&nbsp; <span class="cart_price">${item.show_price}</span></p>
            </div>
            <button class="cart_remove_btn" data-index="${index}">&#10005;</button>
        </div>
        `;
    });

    cartSubtotal.textContent = "Rs. " + subtotal.toLocaleString("en-IN") + ".00";

    document.querySelectorAll(".cart_remove_btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const cart = getCart();
            cart.splice(btn.dataset.index, 1);
            saveCart(cart);
            renderCart();
        });
    });
}

function openCartDrawer() {
    if (!cartDrawer) return;
    renderCart();
    cartOverlay.classList.add("show");
    cartDrawer.classList.add("open");
}

function closeCartDrawer() {
    if (!cartDrawer) return;
    cartOverlay.classList.remove("show");
    cartDrawer.classList.remove("open");
}

if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartDrawer);
if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);

// "Comparison" button -> comparison.html pe le jao
const comparisonBtn = document.getElementById("comparisonBtn");
if (comparisonBtn) {
    comparisonBtn.addEventListener("click", () => {
        window.location.href = "comparison.html";
    });
}