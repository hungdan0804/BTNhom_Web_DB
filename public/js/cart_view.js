function CartLoad() {
    InitCart();
    let cartStorage = window.localStorage.getItem('cart');
    let cart = JSON.parse(cartStorage);
    $('#table_cart_content').empty();
    let i=0;
    let total = 0;
    cart.products.forEach(n => {
        i++;
        total += parseInt(n.amount) * parseInt(n.price);
        let price = FormatMoney(n.price);
        AppendProduct(i,n.id,n.name,price,n.amount);
    });

    document.getElementById('price_total').innerText = FormatMoney(total);
    document.getElementById('total_price').innerText = FormatMoney(total);
}
document.addEventListener('DOMContentLoaded', CartLoad, false);
function OnPlus(id, name, price, amount) {
    let element_id = 'qty_' + id;
    let effect = document.getElementById(element_id); let qty = effect.value; if( !isNaN( qty )) effect.value++;
    amount = effect.value;
    EditInCart(id, name, price, amount);
}
function OnMinus(id, name, price, amount) {
    let element_id = 'qty_' + id;
    let effect = document.getElementById(element_id); let qty = effect.value; if( !isNaN( qty ) && qty > 1 ) effect.value--;
    amount = effect.value;
    EditInCart(id, name, price, amount);
}
function AppendProduct(order, id, name, price, amount) {
    let product = `
        <tr>
                            <td class="cart_product_img">
                                ${order}
                            </td>
                            <td class="cart_product_desc">
                                <h5>${name}</h5>
                            </td>
                            <td class="price">
                                <span>${price}</span>
                            </td>
                            <td class="qty">
                                <div class="qty-btn d-flex">
                                    <div class="quantity">
                                        <span class="qty-minus" onclick="OnMinus(${id},'${name}',${price}, ${amount}); return false;"><i class="fa fa-minus" aria-hidden="true"></i></span>
                                        <input type="number" class="qty-text" id="qty_${id}" step="1" min="1" max="300" name="quantity" value="${amount}">
                                        <span class="qty-plus" onclick="OnPlus(${id},'${name}',${price}, ${amount}); return false;"><i class="fa fa-plus" aria-hidden="true"></i></span>
                                    </div> &nbsp;&nbsp;&nbsp;
<span class="fa fa-times" style="color: red; font-size: 1rem; align-self: center" onclick="DeleteFromCart(${id}); CartLoad();"> </span>
                                </div>
                            </td>

                        </tr>
        `
    let table = $('#table_cart_content');
    table.append(product);
}