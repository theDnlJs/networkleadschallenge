export default {
    addItem(context, payload) {
        context.commit("addItem", payload);
    },
    clearItem(context, payload) {
        context.commit("clearItem", payload);
    },
    addToCart(context, payload) {
        context.commit("addToCart", payload);
    },
    removeFromCart(context, payload) {
        context.commit("removeFromCart", payload);
    },
};