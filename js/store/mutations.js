export default {
    addToCart(state, payload) {
        const temp = state.cart.find((item) => item.id === payload);
        const obj = state.items.find((item) => item.id.$oid === payload);
        if (!temp) {
            state.cart.push({
                id: obj.id.$oid,
                title: obj.title,
                price: obj.price,
                imgUrl: obj.imgUrl,
                category: obj.category,
                quantity: 1,
            });
        } else {
            temp.quantity++;
        }
        state.totalPrice += parseFloat(obj.price.substring(1));
        ++state.totalItems;
        return state;
    },
    removeFromCart(state, payload) {
        const cartItem = state.cart.find((item) => item.id === payload);
        if (!cartItem) {
            return;
        }
        if (cartItem.quantity >= 1) {
            --cartItem.quantity;
            --state.totalItems;
            state.totalPrice -= parseFloat(cartItem.price.substring(1));
        }
        if (cartItem.quantity === 0) {
            let cartItem = state.cart.filter((item) => item.id !== payload);
            state.cart = cartItem;
        }
        if (state.totalItems === 0) {
            state.totalPrice = 0;
        }
        return state;
    },
};