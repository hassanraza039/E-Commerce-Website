// ================= HEADER SEARCH (har page pe kaam karta hai) =================

// Master product catalog — taake search kisi bhi page (contact, blog, cart waghera) se bhi kaam kare
const searchCatalog = [
    { image: "images/P_item1.png", name: "Syltherine", text: "Stylish cafe chair", show_price: "Rs 2.500.000" },
    { image: "images/P_item3.png", name: "Lolito", text: "Luxury big sofa", show_price: "Rs 7.00.000" },
    { image: "images/P_item4.png", name: "Respira", text: "Outdoor bar table and stool", show_price: "Rs 5.00.000" },
    { image: "images/P_item5.png", name: "Grifo", text: "Night lamp", show_price: "Rs 1.500.000" },
    { image: "images/P_item6.png", name: "Potty", text: "Minimalist flower pot", show_price: "Rs 5.00.000" },
    { image: "images/P_item7.png", name: "Muggo", text: "Small mug", show_price: "Rs 150.000" },
    { image: "images/P_item8.png", name: "Pingky", text: "Cute bed set", show_price: "Rs 7.000.000" },
    { image: "images/P_item2.png", name: "Leviosa", text: "Stylish cafe chair", show_price: "Rp 2.500.000" },
];

const headerSearchIcon = document.getElementById("headerSearchIcon");
const headerSearchBox = document.getElementById("headerSearchBox");
const headerSearchInput = document.getElementById("headerSearchInput");
const headerSearchResults = document.getElementById("headerSearchResults");

// ================= Toggle search box open/close =================
if (headerSearchIcon && headerSearchBox) {
    headerSearchIcon.style.cursor = "pointer";

    headerSearchIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        headerSearchBox.classList.toggle("show");
        if (headerSearchBox.classList.contains("show") && headerSearchInput) {
            headerSearchInput.focus();
        }
    });

    // search box ke bahar click karne pe band ho jaye
    document.addEventListener("click", (e) => {
        if (!headerSearchBox.contains(e.target) && e.target !== headerSearchIcon) {
            headerSearchBox.classList.remove("show");
        }
    });

    headerSearchBox.addEventListener("click", (e) => e.stopPropagation());
}

// ================= Is page pe already rendered product grid ko live filter karo =================
function filterVisibleProductGrid(query) {
    const containers = [document.getElementById("products"), document.getElementById("shop")].filter(Boolean);
    const q = query.toLowerCase();

    containers.forEach((container) => {
        const cards = container.querySelectorAll(".card");
        cards.forEach((card) => {
            const nameEl = card.querySelector(".item_h3");
            const name = nameEl ? nameEl.textContent.toLowerCase() : "";
            const match = q === "" || name.includes(q);
            card.style.display = match ? "" : "none";
        });
    });
}

// ================= Dropdown suggestions (kisi bhi page se product dhoondh kar product.html khole) =================
function renderSearchResults(query) {
    if (!headerSearchResults) return;

    if (!query) {
        headerSearchResults.innerHTML = "";
        headerSearchResults.classList.remove("show");
        return;
    }

    const q = query.toLowerCase();
    const matches = searchCatalog.filter((p) => p.name.toLowerCase().includes(q));

    if (matches.length === 0) {
        headerSearchResults.innerHTML = `<div class="search_no_result">No products found</div>`;
        headerSearchResults.classList.add("show");
        return;
    }

    headerSearchResults.innerHTML = matches
        .map(
            (p, i) => `
        <div class="search_result_item" data-index="${i}">
            <img src="${p.image}" alt="${p.name}">
            <div>
                <p class="search_result_name">${p.name}</p>
                <p class="search_result_price">${p.show_price}</p>
            </div>
        </div>
        `
        )
        .join("");

    headerSearchResults.classList.add("show");

    headerSearchResults.querySelectorAll(".search_result_item").forEach((item) => {
        item.addEventListener("click", () => {
            const product = matches[item.dataset.index];
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "product.html";
        });
    });
}

if (headerSearchInput) {
    headerSearchInput.addEventListener("input", () => {
        const query = headerSearchInput.value.trim();
        filterVisibleProductGrid(query);
        renderSearchResults(query);
    });
}