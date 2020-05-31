import store from "../store/index.js";

class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    get price() {
        return this.getAttribute("price");
    }

    get title() {
        return this.getAttribute("title");
    }
    get category() {
        return this.getAttribute("category");
    }
    get imgUrl() {
        return this.getAttribute("imgUrl");
    }
    get id() {
        return this.getAttribute("id");
    }
    static get observedAttributes() {
        return ["price", "title", "category", "imgUrl", "id"];
    }
    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === "price") {
            this.render();
        }
    }

    addToCart(e) {
        store.dispatch("addToCart", e.target.id);
        console.log(store.state.cart);
    }
    removeFromCart(e) {
        store.dispatch("removeFromCart", e.target.id);
    }

    connectedCallback() {
        this.render();
        let addBtns = this.shadow.querySelector(".add-to-cart-btn");
        addBtns.addEventListener("click", this.addToCart.bind(this));
    }

    render() {
        this.shadow.innerHTML = `
        <style>
        .product-item {
            border: 1px solid var(--lightBlueGrey);
            border-radius: 1vh;
            display: flex;
            flex-direction: column;
            background-color: var(--whiteBlueGrey);
            transition: 0.7s;
            padding: 1em;
            margin: 2em 2em;
        }
        button {

        }
        .product-item:hover {
            box-shadow: 2px 2px var(--lightSecondary);
            transform: translateY(-4px, -4px);
        }
        
        .product-image-container {
            width: 100%;
            padding-top: 56.25%;
            overflow: hidden;
            position: relative;
        }
        
        .product-image-container img {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        
        .product-title {
            font-weight: 900;
        }
        .add-to-cart-btn {
            color: white;
            background-color: var(--lightPrimary);
            width: 80%;
            margin: 0.75em 0;
        }
        .remove-from-cart-btn {
            color: white;
            background-color: var(--secondary);
            width: 80%;
            margin: 0.75em 0;
        }
        
button {
    margin-top: 1em;
    outline: none;
    width: 100%;
    padding: 0.75em;
    border: none;
    border-radius: 0.5rem;
    transition: 0.7s;
}

button:hover {
    box-shadow: 3px 3px var(--lightBlueGrey);
}

button:active {
    box-shadow: 1px 1px var(--lightPrimary);
    transform: translateY(4px);
}
        </style>
  <div class="product-item">
  <div class="product-image-container">
    <img src="${this.imgUrl}" alt="image"/>
  </div>
  <div class="product-content">
    <p class="product-title text-md">
      ${this.title}
    </p>
    <p class="product-category text-md">
      ${this.category}
    </p>
    <p class="product-price text-md">
      price ${this.price}
    </p>
    <button id="${this.id}" data-action="ADD_TO_CART" class="add-to-cart-btn">
      Add ${this.title}
    </button>
    </div>
  </div>
        `;
    }
}

customElements.define("product-card", ProductCard);