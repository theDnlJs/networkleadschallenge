import store from "../store/index.js";

class CartItem extends HTMLElement {
    constructor(prop) {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }
    get price() {
        return this.getAttribute("price");
    }
    get quantity() {
        return this.getAttribute("quantity");
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
        return ["price", "title", "category", "imgUrl", "id", "quantity"];
    }
    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === "id") {
            store.events.subscribe("stateChange", () => this.render());
            this.render();
        }
    }
    addToCart(e) {
        store.dispatch("addToCart", e.target.id);
        console.log(store.state.cart);
    }
    removeFromCart(e) {
        store.dispatch("removeFromCart", e.target.id);
        console.log(store.state.cart);
    }

    connectedCallback() {
        this.render();

        let addBtns = this.shadow.querySelector(".add");
        addBtns.addEventListener("click", this.addToCart.bind(this));
        let removeBtns = this.shadow.querySelector(".remove");
        removeBtns.addEventListener("click", this.removeFromCart.bind(this));
    }

    render() {
        let template = `
       <style>
       
span.price {
    float: right;
    color: grey;
  }
  img{
      width: 10vw;
  }
       </style>
   
       <img src="${this.imgUrl}" alt="img"/>
        <p>title: ${this.title} <span class="price">price: ${parseFloat(
      this.price.substring(1) * this.quantity
    ).toFixed(2)}
    
    </span><br/><span>quantity: ${this.quantity}</span></p>
        <hr>
        <button id="${this.id}" class="add">+</button>
        <button id="${this.id}" class="remove">-</button>
        `;
        this.shadow.innerHTML = template;
    }
}

customElements.define("cart-item", CartItem);