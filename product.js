// localStorage se wo product uthao jo shop/index page pe click kiya gaya tha
const savedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

if (savedProduct) {

    document.getElementById("productName").textContent = savedProduct.name;
    document.getElementById("crumbProductName").textContent = savedProduct.name;
    document.getElementById("productPrice").textContent = savedProduct.show_price;

    if (savedProduct.text) {
        document.getElementById("productDesc").textContent = savedProduct.text;
    }

    document.getElementById("mainProductImg").src = savedProduct.image;
    document.getElementById("mainProductImg").alt = savedProduct.name;

    // description tab ki 2 chhoti images bhi same product image se bharna
    document.getElementById("descImg1").style.backgroundImage = `url(${savedProduct.image})`;
    document.getElementById("descImg2").style.backgroundImage = `url(${savedProduct.image})`;

    // Thumbnails (same image 4 dafa; agar aapke paas har product ki multiple images hon
    // to yahan array use kar sakte hain)
    const thumbList = document.getElementById("thumbList");
    for (let i = 0; i < 4; i++) {
        const thumb = document.createElement("img");
        thumb.src = savedProduct.image;
        thumb.alt = savedProduct.name;
        thumb.addEventListener("click", () => {
            document.getElementById("mainProductImg").src = savedProduct.image;
        });
        thumbList.appendChild(thumb);
    }

} else {
    // agar koi product save nahi (direct URL se page khola gaya) to shop pe wapas bhej do
    window.location.href = "shop.html";
}

// ================= Quantity buttons =================
const qtyValue = document.getElementById("qtyValue");
const qtyMinus = document.getElementById("qtyMinus");
const qtyPlus = document.getElementById("qtyPlus");
let qty = 1;

qtyMinus.addEventListener("click", () => {
    if (qty > 1) {
        qty--;
        qtyValue.textContent = qty;
    }
});

qtyPlus.addEventListener("click", () => {
    qty++;
    qtyValue.textContent = qty;
});

// ================= Size buttons =================
const sizeButtons = document.querySelectorAll(".size_btn");
sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        sizeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// ================= Color dots =================
const colorDots = document.querySelectorAll(".color_dot");
colorDots.forEach((dot) => {
    dot.addEventListener("click", () => {
        colorDots.forEach((d) => (d.style.outline = "none"));
        dot.style.outline = "2px solid #1a1a1a";
        dot.style.outlineOffset = "3px";
    });
});

// ================= Description / Additional / Reviews Tabs =================
const tabItems = document.querySelectorAll(".tab_item");
const tabContents = document.querySelectorAll(".tab_content");

tabItems.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabItems.forEach((t) => t.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
    });
});

// ================= Related Products =================
// Yahan hum kuch hardcoded related products dikha rahe hain (jaise design mein hai).
// Agar aap chahen to shop.html wale "shop" array se dynamic bhi bana sakte hain.
const relatedProducts = [
    {
        image: "images/P_item1.png",
        name: "Syltherine",
        text: "Stylish cafe chair",
        show_price: "Rp 2.500.000",
        hide_price: "Rp 3.500.000",
        badge: "-30%",
        badgeType: "discount",
    },
    {
        image: "images/P_item2.png",
        name: "Leviosa",
        text: "Stylish cafe chair",
        show_price: "Rp 2.500.000",
        badge: null,
    },
    {
        image: "images/P_item3.png",
        name: "Lolito",
        text: "Luxury big sofa",
        show_price: "Rp 7.000.000",
        hide_price: "Rp 14.000.000",
        badge: "-50%",
        badgeType: "discount",
    },
    {
        image: "images/P_item4.png",
        name: "Respira",
        text: "Outdoor bar table and stool",
        show_price: "Rp 500.000",
        badge: "New",
        badgeType: "new",
    },
];

const relatedContainer = document.getElementById("relatedProducts");
if (relatedContainer) {
    relatedProducts.forEach((item) => {
        let badgeHTML = "";
        if (item.badge) {
            const badgeClass = item.badgeType === "new" ? "new" : "discount";
            badgeHTML = `<span class="related_badge ${badgeClass}">${item.badge}</span>`;
        }

        relatedContainer.innerHTML += `
        <div class="related_card">
            <div class="related_img_wrapper">
                <img src="${item.image}" alt="${item.name}">
                ${badgeHTML}
            </div>
            <div class="related_info">
                <h3>${item.name}</h3>
                <p>${item.text}</p>
                <div class="related_price">
                    <span class="r_show_price">${item.show_price}</span>
                    ${item.hide_price ? `<span class="r_hide_price">${item.hide_price}</span>` : ""}
                </div>
            </div>
        </div>
        `;
    });

    // click karne pe us related product ki detail dikhana
    const relatedCards = relatedContainer.querySelectorAll(".related_card");
    relatedCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            localStorage.setItem("selectedProduct", JSON.stringify(relatedProducts[index]));
            window.location.reload();
        });
    });
}

// ================= "Add To Cart" button on product page =================
const addCartBtn = document.querySelector(".add_cart_btn");

if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
        if (!savedProduct) return;
        const currentQty = parseInt(document.getElementById("qtyValue").textContent);
        addToCart(savedProduct, currentQty);
        openCartDrawer();
    });
}