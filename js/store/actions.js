export default {
    addToCart(context, payload) {
        context.commit("addToCart", payload);
    },
    removeFromCart(context, payload) {
        context.commit("removeFromCart", payload);
    },
};