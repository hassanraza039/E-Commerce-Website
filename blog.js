// ================= BLOG PAGE (blog.html) =================

// Blog posts data (real project mein ye kisi CMS/API se aayega)
const blogPosts = [
    {
        image: "images/b1.png",
        title: "Going all-in with millennial design",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "14 Oct 2022",
        category: "Wood",
    },
    {
        image: "images/b2.png",
        title: "Exploring new ways of decorating",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "14 Oct 2022",
        category: "Handmade",
    },
    {
        image: "images/b3.png",
        title: "Handmade pieces that took time to make",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "14 Oct 2022",
        category: "Wood",
    },
    {
        image: "images/b4.png",
        title: "Modern home in Milan",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "10 Sep 2022",
        category: "Interior",
    },
    {
        image: "images/b5.png",
        title: "Colorful office redesign",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "03 Aug 2022",
        category: "Design",
    },
    {
        image: "images/b6.png",
        title: "Small space, big style ideas",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "22 Jul 2022",
        category: "Design",
    },
    {
        image: "images/b7.png",
        title: "Crafts that bring warmth home",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "05 Jul 2022",
        category: "Crafts",
    },
    {
        image: "images/8",
        title: "Choosing the right lighting",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "18 Jun 2022",
        category: "Interior",
    },
    {
        image: "images/b9.png",
        title: "Furniture care 101",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        author: "Admin",
        date: "02 Jun 2022",
        category: "Handmade",
    },
];

const categories = [
    { name: "Crafts", count: 2 },
    { name: "Design", count: 8 },
    { name: "Handmade", count: 7 },
    { name: "Interior", count: 1 },
    { name: "Wood", count: 6 },
];

// Recent posts sidebar mein sirf pehle 5 posts (title + date) dikhao
const recentPosts = blogPosts.slice(0, 5);

const POSTS_PER_PAGE = 3;
let currentPage = 1;
const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

const blogPostsCol = document.getElementById("blogPostsCol");
const blogCategoryList = document.getElementById("blogCategoryList");
const blogRecentList = document.getElementById("blogRecentList");
const blogPagination = document.getElementById("blogPagination");

function renderBlogPosts() {
    if (!blogPostsCol) return;

    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const pagePosts = blogPosts.slice(start, start + POSTS_PER_PAGE);

    blogPostsCol.innerHTML = "";

    pagePosts.forEach((post) => {
        blogPostsCol.innerHTML += `
        <article class="blog_post_card">
            <div class="blog_post_img">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog_post_meta">
                <span><i class="fa fa-user"></i> ${post.author}</span>
                <span><i class="fa fa-calendar"></i> ${post.date}</span>
                <span><i class="fa fa-tag"></i> ${post.category}</span>
            </div>
            <h3 class="blog_post_title">${post.title}</h3>
            <p class="blog_post_excerpt">${post.excerpt}</p>
            <a href="#" class="blog_read_more">Read more</a>
        </article>
        `;
    });

    window.scrollTo({ top: document.querySelector(".blog_page").offsetTop - 100, behavior: "smooth" });
}

function renderCategories() {
    if (!blogCategoryList) return;
    blogCategoryList.innerHTML = categories
        .map((cat) => `<li><span>${cat.name}</span><span class="cat_count">${cat.count}</span></li>`)
        .join("");
}

function renderRecentPosts() {
    if (!blogRecentList) return;
    blogRecentList.innerHTML = recentPosts
        .map(
            (post) => `
        <div class="recent_post_item">
            <img src="${post.image}" alt="${post.title}">
            <div class="recent_post_info">
                <h5>${post.title}</h5>
                <span class="recent_post_date">${post.date}</span>
            </div>
        </div>
        `
        )
        .join("");
}

function renderPagination() {
    if (!blogPagination) return;

    let html = "";
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
    }
    html += `<button class="page-btn next-btn" id="blogNextBtn">Next</button>`;

    blogPagination.innerHTML = html;

    blogPagination.querySelectorAll(".page-btn[data-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            currentPage = parseInt(btn.dataset.page);
            renderBlogPosts();
            renderPagination();
        });
    });

    const nextBtn = document.getElementById("blogNextBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderBlogPosts();
                renderPagination();
            }
        });
    }
}

renderBlogPosts();
renderCategories();
renderRecentPosts();
renderPagination();