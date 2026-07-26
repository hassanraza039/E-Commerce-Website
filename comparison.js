// ================= Products available to add for comparison =================
// yeh wahi products hain jo shop.html pe dikhte hain
const allProducts = [
    { image: "images/P_item1.png", name: "Syltherine", text: "Stylish cafe chair", show_price: "Rs 2.500.000", rating: 4.5, reviews: 120 },
    { image: "images/P_item3.png", name: "Lolito", text: "Luxury big sofa", show_price: "Rs 7.00.000", rating: 4.2, reviews: 145 },
    { image: "images/P_item4.png", name: "Respira", text: "Outdoor bar table and stool", show_price: "Rs 5.00.000", rating: 4.0, reviews: 88 },
    { image: "images/P_item5.png", name: "Grifo", text: "Night lamp", show_price: "Rs 1.500.000", rating: 4.6, reviews: 65 },
    { image: "images/P_item6.png", name: "Potty", text: "Minimalist flower pot", show_price: "Rs 5.00.000", rating: 4.3, reviews: 40 },
];

// har product ke sath specs — sections mein organize kiye hain (General / Product / Dimensions)
// asal project mein yeh data aap apne products array mein rakh sakte hain
function getSpecsForProduct(product) {
    return {
        general: {
            "Sales Package": "1 " + product.text,
            "Model Number": "TFCBLIGRBL" + Math.floor(Math.random() * 9000 + 1000),
            "Secondary Material": "Solid Wood",
            "Configuration": product.text,
            "Upholstery Material": "Fabric + Cotton",
            "Upholstery Color": "Bright Grey & Lion",
        },
        product: {
            "Filling Material": "Foam",
            "Finish Type": "Bright Grey & Lion",
            "Adjustable Headrest": "No",
            "Maximum Load Capacity": "280 KG",
            "Origin of Manufacture": "India",
        },
        dimensions: {
            "Width": "265.32 cm",
            "Height": "76 cm",
            "Depth": "167.76 cm",
            "Weight": "45 KG",
            "Seat Height": "41.52 cm",
            "Leg Height": "5.46 cm",
        },
        warranty: {
            "Warranty Summary": "1 Year Manufacturing Warranty",
            "Warranty Service Type": "For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com",
            "Covered in Warranty": "Warranty Against Manufacturing Defect",
            "Not Covered in Warranty": "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
            "Domestic Warranty": "1 Year",
        },
    };
}

// ================= Comparison list localStorage mein rakhi jayegi =================
function getComparisonList() {
    return JSON.parse(localStorage.getItem("comparisonList")) || [];
}

function saveComparisonList(list) {
    localStorage.setItem("comparisonList", JSON.stringify(list));
}

// default: agar comparison list khali hai to pehle 2 products daal do (jaisa design mein hai)
let comparisonList = getComparisonList();
if (comparisonList.length === 0) {
    comparisonList = [allProducts[0], allProducts[1]];
    saveComparisonList(comparisonList);
}

// ================= Render top row (info box + product cards + add product box) =================
const topRow = document.getElementById("comparisonTopRow");

function renderTopRow() {
    topRow.innerHTML = "";

    // Info box
    topRow.innerHTML += `
    <div class="comparison_info_box">
        <h3>Go to Product page for more Products</h3>
        <a href="./shop.html" class="view_more_link">View More</a>
    </div>
    `;

    // Product cards
    comparisonList.forEach((product, index) => {
        topRow.innerHTML += `
        <div class="comparison_card">
            <button class="comparison_remove_btn" data-index="${index}">&#10005;</button>
            <div class="comparison_card_img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h4>${product.name}</h4>
            <p class="comparison_price">${product.show_price}</p>
            <div class="comparison_rating">
                <span class="rating_num">${product.rating}</span>
                <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                <span class="review_count">${product.reviews} Review</span>
            </div>
        </div>
        `;
    });

    // "Add A Product" box (sirf tab dikhao jab 3 se kam products hon)
    if (comparisonList.length < 3) {
        topRow.innerHTML += `
        <div class="add_product_box">
            <h3>Add A Product</h3>
            <div class="add_product_dropdown">
                <select id="addProductSelect">
                    <option value="">Choose a Product</option>
                    ${allProducts
                        .filter((p) => !comparisonList.some((c) => c.name === p.name))
                        .map((p) => `<option value="${p.name}">${p.name}</option>`)
                        .join("")}
                </select>
            </div>
        </div>
        `;
    }

    attachTopRowEvents();
    renderTable();
}

function attachTopRowEvents() {
    // remove product from comparison
    document.querySelectorAll(".comparison_remove_btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            comparisonList.splice(btn.dataset.index, 1);
            saveComparisonList(comparisonList);
            renderTopRow();
        });
    });

    // add product via dropdown
    const selectEl = document.getElementById("addProductSelect");
    if (selectEl) {
        selectEl.addEventListener("change", () => {
            const selectedName = selectEl.value;
            if (!selectedName) return;

            const product = allProducts.find((p) => p.name === selectedName);
            comparisonList.push(product);
            saveComparisonList(comparisonList);
            renderTopRow();
        });
    }
}

// ================= Render specs table =================
const tableContainer = document.getElementById("comparisonTable");

function renderTable() {
    if (comparisonList.length === 0) {
        tableContainer.innerHTML = `<p class="cart_empty_msg">Comparison list is empty. Add products above.</p>`;
        return;
    }

    const specsData = comparisonList.map((p) => getSpecsForProduct(p));

    // sections jo table mein order se dikhengi
    const sections = [
        { title: "General", key: "general" },
        { title: "Product", key: "product" },
        { title: "Dimensions", key: "dimensions" },
        { title: "Warranty", key: "warranty" },
    ];

    // ============ Label column (sab section titles + labels) ============
    let labelColumnHTML = "";
    sections.forEach((section) => {
        const labels = Object.keys(specsData[0][section.key]);
        labelColumnHTML += `<h3 class="section_title">${section.title}</h3>`;
        labels.forEach((label) => {
            labelColumnHTML += `<div class="table_row_label">${label}</div>`;
        });
    });

    let html = `<div class="table_column general_column">${labelColumnHTML}</div>`;

    // ============ Har product ka apna column ============
    comparisonList.forEach((product, i) => {
        let columnHTML = "";
        sections.forEach((section) => {
            const sectionData = specsData[i][section.key];
            columnHTML += `<h3 class="section_title table_column_spacer">&nbsp;</h3>`;
            Object.values(sectionData).forEach((value) => {
                columnHTML += `<div class="table_row_value">${value}</div>`;
            });
        });

        // har product column ke end mein Add To Cart button
        columnHTML += `<button class="comparison_add_cart_btn" data-index="${i}">Add To Cart</button>`;

        html += `<div class="table_column">${columnHTML}</div>`;
    });

    tableContainer.innerHTML = html;

    // Add To Cart buttons ko cart.js ke shared function se jodo
    document.querySelectorAll(".comparison_add_cart_btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            const product = comparisonList[index];
            addToCart(product, 1);
            openCartDrawer();
        });
    });
}

renderTopRow();