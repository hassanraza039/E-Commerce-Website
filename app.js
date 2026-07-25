const products=[
    {
        image:"images/P_item1.png",
        name:"Syltherine",
        text:"Stylish cafe chair",
        show_price:"Rs 2.500.000",
        hide_price:"Rp 3.500.000",
    },
    {
        image:"images/P_item1.png",
        name :"Syltherine",
        text:"Stylish cafe chair",
        show_price:"Rs 2.500.000",
    },
    {
        image:"images/P_item3.png",
        name:"Lolito",
        text:"Luxury big sofa",
        show_price:"Rs 7.00.000",
    },
    {
        image:"images/P_item4.png",
        name:"Respira",
        text :"Outdoor bar table and stool",
        show_price:"Rs 5.00.000",
    },
    {
        image:"images/P_item5.png",
        name : "Grifo",
        text :"Night lamp",
        show_price: "Rs 1.500.000",
    },
    {
        image:"images/P_item6.png",
        name : "Potty",
        text :"Minimalist flower pot",
        show_price: "Rs 5.00.000",
    },
    {
        image:"images/P_item7.png",
        name : "Muggo",
        text :"Small mug",
        show_price: "Rs 150.000",
    },
    {
        image:"images/P_item8.png",
        name: "Pingky",
        text :"Cute bed set",
        show_price: "Rs 7.000.000",
    }
    
]
const productContainer = document.getElementById("products");
products.forEach((product) => {
    productContainer.innerHTML += `
    <div class="card">
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
// room section
const sliderTrack = document.getElementById("sliderTrack");
const nextBtn = document.getElementById("sliderNextBtn");
const dotsContainer = document.getElementById("sliderDots");

const slides = sliderTrack.querySelectorAll(".slide");
const slideWidth = 400; // slide width + gap
let currentIndex = 0;

// dots generate karo
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