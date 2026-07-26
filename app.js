// ================= PRODUCTS (for index.html) =================
const products = [
    {
        image: "images/P_item1.png",
        name: "Syltherine",
        text: "Stylish cafe chair",
        show_price: "Rs 2.500.000",
        hide_price: "Rp 3.500.000",
    },
    {
        image: "images/P_item1.png",
        name: "Syltherine",
        text: "Stylish cafe chair",
        show_price: "Rs 2.500.000",
    },
    {
        image: "images/P_item3.png",
        name: "Lolito",
        text: "Luxury big sofa",
        show_price: "Rs 7.00.000",
    },
    {
        image: "images/P_item4.png",
        name: "Respira",
        text: "Outdoor bar table and stool",
        show_price: "Rs 5.00.000",
    },
    {
        image: "images/P_item5.png",
        name: "Grifo",
        text: "Night lamp",
        show_price: "Rs 1.500.000",
    },
    {
        image: "images/P_item6.png",
        name: "Potty",
        text: "Minimalist flower pot",
        show_price: "Rs 5.00.000",
    },
    {
        image: "images/P_item7.png",
        name: "Muggo",
        text: "Small mug",
        show_price: "Rs 150.000",
    },
    {
        image: "images/P_item8.png",
        name: "Pingky",
        text: "Cute bed set",
        show_price: "Rs 7.000.000",
    },
];

// Sirf tab chalega jab page pe id="products" wala element maujood ho
const productContainer = document.getElementById("products");
if (productContainer) {
    products.forEach((product, index) => {
        productContainer.innerHTML += `
        <div class="card" data-index="${index}">
            <div class="product_items">

                <div class="img_wrapper">
                    <img src="${product.image}" alt="" class="item_img">

                    <div class="overlay">
                        <button class="cart_btn">Add to cart</button>

                        <div class="icons_row">
                            <span><i class="fa fa-share-alt"></i> Share</span>
                            <span><i class="fa fa-exchange"></i> Compare</span>
                            <span><i class="fa fa-heart"></i> Like</span>
                        </div>
                    </div>
                </div>

                <h3 class="item_h3">${product.name}</h3>
                <p class="item_p">${product.text}</p>

                <div class="price">
                    <h3 class="show_price">${product.show_price}</h3>
                    <h3 class="hide_price">${product.hide_price || ""}</h3>
                </div>

            </div>
        </div>
        `;
    });

    attachCardClickEvents(productContainer, products);
    attachAddToCartButtons(productContainer, products);
}

// ================= ROOM SLIDER (for index.html) =================
const sliderTrack = document.getElementById("sliderTrack");
const nextBtn = document.getElementById("sliderNextBtn");
const dotsContainer = document.getElementById("sliderDots");

// Sirf tab chalega jab slider ke elements page pe maujood hon
if (sliderTrack && nextBtn && dotsContainer) {
    const slides = sliderTrack.querySelectorAll(".slide");
    const slideWidth = 400; // slide width + gap
    let currentIndex = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateDots();
    }

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    });
}

// ================= SHOP ITEMS (for shop.html) =================
const shop = [
    { image: "images/P_item1.png", name: "Syltherine", text: "Stylish cafe chair", show_price: "Rs 2.500.000", hide_price: "Rp 3.500.000" },
    { image: "images/P_item1.png", name: "Syltherine", text: "Stylish cafe chair", show_price: "Rs 2.500.000" },
    { image: "images/P_item3.png", name: "Lolito", text: "Luxury big sofa", show_price: "Rs 7.00.000" },
    { image: "images/P_item4.png", name: "Respira", text: "Outdoor bar table and stool", show_price: "Rs 5.00.000" },
    { image: "images/P_item5.png", name: "Grifo", text: "Night lamp", show_price: "Rs 1.500.000" },
    { image: "images/P_item6.png", name: "Potty", text: "Minimalist flower pot", show_price: "Rs 5.00.000" },
    { image: "images/P_item7.png", name: "Muggo", text: "Small mug", show_price: "Rs 150.000" },
    { image: "images/P_item8.png", name: "Pingky", text: "Cute bed set", show_price: "Rs 7.000.000" },
    { image: "images/P_item1.png", name: "Syltherine", text: "Stylish cafe chair", show_price: "Rs 2.500.000", hide_price: "Rp 3.500.000" },
    { image: "images/P_item1.png", name: "Syltherine", text: "Stylish cafe chair", show_price: "Rs 2.500.000" },
    { image: "images/P_item3.png", name: "Lolito", text: "Luxury big sofa", show_price: "Rs 7.00.000" },
    { image: "images/P_item4.png", name: "Respira", text: "Outdoor bar table and stool", show_price: "Rs 5.00.000" },
    { image: "images/P_item5.png", name: "Grifo", text: "Night lamp", show_price: "Rs 1.500.000" },
    { image: "images/P_item6.png", name: "Potty", text: "Minimalist flower pot", show_price: "Rs 5.00.000" },
    { image: "images/P_item7.png", name: "Muggo", text: "Small mug", show_price: "Rs 150.000" },
    { image: "images/P_item8.png", name: "Pingky", text: "Cute bed set", show_price: "Rs 7.000.000" },
];

// Sirf tab chalega jab page pe id="shop" wala element maujood ho
const shopContainer = document.getElementById("shop");
if (shopContainer) {
    shop.forEach((product, index) => {
        shopContainer.innerHTML += `
        <div class="card" data-index="${index}">
            <div class="product_items">

                <div class="img_wrapper">
                    <img src="${product.image}" alt="" class="item_img">

                    <div class="overlay">
                        <button class="cart_btn">Add to cart</button>
                        <div class="icons_row">
                            <span><i class="fa fa-share-alt"></i> Share</span>
                            <span><i class="fa fa-exchange"></i> Compare</span>
                            <span><i class="fa fa-heart"></i> Like</span>
                        </div>
                    </div>
                </div>

                <h3 class="item_h3">${product.name}</h3>
                <p class="item_p">${product.text}</p>

                <div class="price">
                    <h3 class="show_price">${product.show_price}</h3>
                    <h3 class="hide_price">${product.hide_price || ""}</h3>
                </div>

            </div>
        </div>
        `;
    });

    attachCardClickEvents(shopContainer, shop);
    attachAddToCartButtons(shopContainer, shop);
}

// ================= SHARED: "Add to cart" overlay button click =================
function attachAddToCartButtons(container, dataArray) {
    const cards = container.querySelectorAll(".card");
    cards.forEach((card) => {
        const btn = card.querySelector(".cart_btn");
        if (!btn) return;

        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // taake card ka apna click (product page pe le jana) na chale
            const index = card.getAttribute("data-index");
            const product = dataArray[index];
            addToCart(product, 1);
            openCartDrawer();
        });
    });
}

// ================= SHARED: card click -> go to product.html =================
function attachCardClickEvents(container, dataArray) {
    const cards = container.querySelectorAll(".card");
    cards.forEach((card) => {
        card.addEventListener("click", (e) => {
            // agar user ne "Add to cart" ya icons pe click kiya hai to product page pe mat jao
            if (e.target.closest(".cart_btn") || e.target.closest(".icons_row")) {
                return;
            }
            const index = card.getAttribute("data-index");
            const selectedProduct = dataArray[index];

            localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
            window.location.href = "product.html";
        });
        card.style.cursor = "pointer";
    });
}