import store from "./store/index.js";

//DOM Elements Variables
const productListContainer = document.getElementById("ProductListingContanier");
const searchBarElement = document.getElementById("search-bar");
const categoriesSelector = document.getElementById("categories");
const cartInfo = document.getElementById("cart-info");
const cartList = document.getElementById("cartList");
const totalPriceLabel = document.getElementById("cart-total-price");
const totalItemLabel = document.getElementById("cart-total-items");
const pill = document.getElementById("pill");
const doneBtn = document.getElementById("doneBtn");
const startOverBtn = document.getElementById("startOverBtn");

let products = [...store.state.items];
let currentPage = 1;
let itemsPerPage = 12;
startOverBtn.addEventListener("click", (e) => {
    location.reload();
});
cartInfo.addEventListener("click", (e) => {
    window.scrollTo(0, 3000);
});
doneBtn.addEventListener("click", (e) => {
    console.log({
        items: store.state.cart,
        totalPrice: store.state.totalPrice,
        totalItems: store.state.totalItems,
    });
});

document.addEventListener("click", (e) => {
    cartList.innerHTML = store.state.cart
        .map((item) => {
            return `<cart-item category="${item.category}" quantity="${item.quantity}" price="${item.price}" title="${item.title}" imgUrl="${item.imgUrl}" category="${item.category}" id="${item.id}"></cart-item>`;
        })
        .join("");
    totalPriceLabel.innerHTML = store.state.totalPrice.toFixed(2) + "$";
    totalItemLabel.innerHTML = store.state.totalItems;
    pill.innerHTML = store.state.totalItems;
});

//  Filter products by category name
categoriesSelector.addEventListener("click", (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "all") {
        displayProductList(products);
    } else {
        const filteredProducts = products.filter((item) => {
            return item.category === selectedCategory;
        });
        displayProductList(filteredProducts);
    }
});

searchBarElement.addEventListener("keyup", (e) => {
    const inputString = e.target.value.toLowerCase();
    const filteredProducts = products.filter((item) => {
        return (
            item.title.toLowerCase().includes(inputString) ||
            item.category.toLowerCase().includes(inputString)
        );
    });
    displayProductList(filteredProducts);
});

const generateCategories = (products) => {
    let mySet = new Set();
    products.forEach((element) => mySet.add(element.category));
    mySet.forEach((element) => {
        var option = document.createElement("option");
        option.value = element;
        option.text = element;
        categoriesSelector.add(option);
    });
};

const generateProductCard = (title, category, price, imgUrl, id) => {
    return `<product-card title="${title}" category="${category}" imgUrl="${imgUrl}" id="${id}" price="${price}"></product-card>`;
};

function displayProductList(
    items = products,
    wrapper = productListContainer,
    itemsPerPage = 12,
    page = 1
) {
    // "cleaning to container"
    wrapper.innerHTML = "";
    // getting the products paginated
    page--;
    let loopStart = itemsPerPage * page;
    let paginatedItems = items.slice(loopStart, loopStart + itemsPerPage);
    let format = paginatedItems
        .map((item) => {
            return generateProductCard(
                item.title,
                item.category,
                item.price,
                item.imgUrl,
                item.id.$oid
            );
        })
        .join("");
    productListContainer.innerHTML = format;
    setUpPagination(items, document.getElementById("pages"), itemsPerPage);
}

// pagination helper function
function setUpPagination(items, wrapper, itemsPerPage) {
    // "cleaning to container"
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / itemsPerPage);
    for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

function paginationButton(page, items) {
    let button = document.createElement("button");
    button.innerText = page;
    if (currentPage === page) button.classList.add("active");
    button.addEventListener("click", () => {
        currentPage = page;
        displayProductList(items, productListContainer, itemsPerPage, page);
    });
    return button;
}

function initialLoad() {
    displayProductList(products, productListContainer, itemsPerPage, currentPage);
    generateCategories(products);
}
initialLoad();