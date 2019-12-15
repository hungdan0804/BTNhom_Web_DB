InitCart();
EditCartBadge();
function InitCart() {
    let cart = window.localStorage.getItem('cart');
    if (cart !== null)
        return;
    let cartObj = {
        "products": [],
    };
    let cartObjStr = JSON.stringify(cartObj);
    window.localStorage.setItem('cart', cartObjStr);
}
function CartProducts(id, name, price, amount) {
    return {
        "id" : id,
        "name": name,
        "price": price,
        "amount" : amount
    }
}
function AddToCart(id, name, price, amount) {
    InitCart();
    let cartStorage = window.localStorage.getItem('cart');
    let cart = JSON.parse(cartStorage);
    let exists = false;
    if (cart.products.length > 0) {
        for (let i=0;i<cart.products.length; i++) {
            let n = cart.products[i];
            if (n.id == id) {
                n.amount = parseInt(n.amount) + amount;
                exists = true;
                break;
            }
        }
    }
    if (exists === false) {
        cart.products.push(CartProducts(id, name, price,amount));
    }
    window.localStorage.removeItem('cart');
    window.localStorage.setItem('cart', JSON.stringify(cart));
    EditCartBadge();
}
function EditInCart(id, name, price, amount) {
    InitCart();
    let cartStorage = window.localStorage.getItem('cart');
    let cart = JSON.parse(cartStorage);
    if (cart.products.length > 0) {
        for (let i=0;i<cart.products.length; i++) {
            let n = cart.products[i];
            if (n.id == id) {
                n.amount = parseInt(amount);
                break;
            }
        }
    }
    window.localStorage.removeItem('cart');
    window.localStorage.setItem('cart', JSON.stringify(cart));
    EditCartBadge();
}
function DeleteFromCart(id) {
    InitCart();
    let cartStorage = window.localStorage.getItem('cart');
    let cart = JSON.parse(cartStorage);
    if (cart.products.length > 0) {
        const index = cart.products.findIndex(n => n.id === id);
        if (index !== undefined) cart.products.splice(index, 1);
    }
    window.localStorage.removeItem('cart');
    window.localStorage.setItem('cart', JSON.stringify(cart));
    EditCartBadge();
}
function DeleteCart() {
    window.localStorage.removeItem('cart');
    InitCart();
}
function EditCartBadge() {
    InitCart();
    let cartStorage = window.localStorage.getItem('cart');
    let cart = JSON.parse(cartStorage);
    let total = 0;
    cart.products.forEach(n => total += parseInt(n.amount));
    let badge = document.getElementById('cart_span_icon');
    badge.innerHTML = total;
}
function MoveToSession() {
}