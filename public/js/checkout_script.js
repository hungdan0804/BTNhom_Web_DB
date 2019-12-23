let cartStr = window.localStorage.getItem('cart');
let cart = JSON.parse(cartStr);
document.getElementById('price').innerHTML = FormatMoney(cart.total_price);
document.getElementById('total').innerHTML = FormatMoney(cart.total_price);
$('#checkout_form').submit(function() {
    let localCart = window.localStorage.getItem('cart');
    localCart = CryptoJS.AES.encrypt(localCart,'checkout');
    let data = `<input type="text" class="form-control" id="cart" placeholder="Cart" value="${localCart}" name="cart" hidden>`;
    $('#checkout_form').append(data);
});