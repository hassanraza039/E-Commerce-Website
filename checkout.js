// ================= CHECKOUT PAGE (checkout.html) =================
// cart.js already defines: getCart(), saveCart(), parsePrice(), openCartDrawer()

const orderItemsList = document.getElementById("orderItemsList");
const orderSubtotalEl = document.getElementById("orderSubtotal");
const orderTotalEl = document.getElementById("orderTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const bankDesc = document.getElementById("bankDesc");

function renderOrderSummary() {
    if (!orderItemsList) return;

    const cart = getCart();

    if (cart.length === 0) {
        orderItemsList.innerHTML = `<p class="cart_empty_msg">Your cart is empty. <a href="./shop.html">Go shopping</a></p>`;
        orderSubtotalEl.textContent = "Rs. 0";
        orderTotalEl.textContent = "Rs. 0";
        return;
    }

    let subtotal = 0;
    orderItemsList.innerHTML = "";

    cart.forEach((item) => {
        const itemSubtotal = parsePrice(item.show_price) * item.qty;
        subtotal += itemSubtotal;

        orderItemsList.innerHTML += `
        <div class="order_item_row">
            <span class="order_item_name">${item.name} <span class="order_item_qty">x ${item.qty}</span></span>
            <span class="order_item_subtotal">Rs. ${itemSubtotal.toLocaleString("en-IN")}.00</span>
        </div>
        `;
    });

    const formattedTotal = "Rs. " + subtotal.toLocaleString("en-IN") + ".00";
    orderSubtotalEl.textContent = formattedTotal;
    orderTotalEl.textContent = formattedTotal;
}

// ================= Payment method: show description only under selected bank option =================
const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
paymentRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
        if (!bankDesc) return;
        bankDesc.style.display = radio.value === "bank" && radio.checked ? "block" : "none";
    });
});

// ================= Place order =================
if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
        const cart = getCart();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const firstName = document.getElementById("billFirstName").value.trim();
        const lastName = document.getElementById("billLastName").value.trim();
        const street = document.getElementById("billStreet").value.trim();
        const city = document.getElementById("billCity").value.trim();
        const phone = document.getElementById("billPhone").value.trim();
        const email = document.getElementById("billEmail").value.trim();

        if (!firstName || !lastName || !street || !city || !phone || !email) {
            alert("Please fill in all required billing details.");
            return;
        }

        // order place hone ke baad cart khali kar do
        saveCart([]);
        alert("Thank you, " + firstName + "! Your order has been placed successfully.");
        window.location.href = "index.html";
    });
}

renderOrderSummary();