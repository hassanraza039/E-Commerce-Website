// ================= CART PAGE (cart.html) =================
// cart.js already defines: getCart(), saveCart(), parsePrice(), addToCart(), openCartDrawer()
// yeh file sirf cart.html ke bade table + totals box ko render karti hai

const cartRowsContainer = document.getElementById("cartPageRows");
const cartPageSubtotalEl = document.getElementById("cartPageSubtotal");
const cartPageTotalEl = document.getElementById("cartPageTotal");
const cartCheckoutBtn = document.getElementById("cartCheckoutBtn");

function renderCartPage() {
    if (!cartRowsContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartRowsContainer.innerHTML = `<p class="cart_empty_msg">Your cart is empty. <a href="./shop.html">Go shopping</a></p>`;
        cartPageSubtotalEl.textContent = "Rs. 0";
        cartPageTotalEl.textContent = "Rs. 0";
        return;
    }

    let subtotal = 0;
    cartRowsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const unitPrice = parsePrice(item.show_price);
        const itemSubtotal = unitPrice * item.qty;
        subtotal += itemSubtotal;

        cartRowsContainer.innerHTML += `
        <div class="cart_table_row" data-index="${index}">
            <div class="ct_product">
                <img src="${item.image}" alt="${item.name}" class="ct_product_img">
                <span class="ct_product_name">${item.name}</span>
            </div>

            <div class="ct_price">Rs. ${unitPrice.toLocaleString("en-IN")}.00</div>

            <div class="ct_qty">
                <button class="ct_qty_btn ct_qty_minus" data-index="${index}">-</button>
                <span class="ct_qty_value">${item.qty}</span>
                <button class="ct_qty_btn ct_qty_plus" data-index="${index}">+</button>
            </div>

            <div class="ct_subtotal">Rs. ${itemSubtotal.toLocaleString("en-IN")}.00</div>

            <button class="ct_remove_btn" data-index="${index}">&#10005;</button>
        </div>
        `;
    });

    cartPageSubtotalEl.textContent = "Rs. " + subtotal.toLocaleString("en-IN") + ".00";
    cartPageTotalEl.textContent = "Rs. " + subtotal.toLocaleString("en-IN") + ".00";

    attachCartPageEvents();
}

function attachCartPageEvents() {
    // quantity ++
    document.querySelectorAll(".ct_qty_plus").forEach((btn) => {
        btn.addEventListener("click", () => {
            const cart = getCart();
            cart[btn.dataset.index].qty += 1;
            saveCart(cart);
            renderCartPage();
        });
    });

    // quantity --
    document.querySelectorAll(".ct_qty_minus").forEach((btn) => {
        btn.addEventListener("click", () => {
            const cart = getCart();
            if (cart[btn.dataset.index].qty > 1) {
                cart[btn.dataset.index].qty -= 1;
                saveCart(cart);
                renderCartPage();
            }
        });
    });

    // remove item
    document.querySelectorAll(".ct_remove_btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const cart = getCart();
            cart.splice(btn.dataset.index, 1);
            saveCart(cart);
            renderCartPage();
        });
    });
}

// Check Out button -> checkout.html
if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener("click", () => {
        const cart = getCart();
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        window.location.href = "checkout.html";
    });
}

renderCartPage();