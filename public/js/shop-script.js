function setUrlQuery(url, field, value) {
    let newUrl = url;
    if (newUrl.indexOf("?") == -1) {
        newUrl = newUrl + "?" + field +"=" + value;
    }
    else {
        newUrl = newUrl + "&" + field +"=" + value;
    }
    return newUrl;
}
function ProducerSearch() {
    const checkboxes = document.getElementsByName("producer_checkbox");
    let oldUrl = window.location.href;
    let newUrl = oldUrl.replace(/(&?)producer=\d+(&?)/gi, "").replace(/\?$/,"");
    for (let i = 0; i< checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            let value = checkboxes[i].value;
            newUrl = setUrlQuery(newUrl, "producer", value);
        }
    }
    //slider range_price
    newUrl = newUrl.replace(/(&?)from=\d+(&?)/gi, "").replace(/\?$/,"");
    newUrl = newUrl.replace(/(&?)to=\d+(&?)/gi, "").replace(/\?$/,"");
    const range = document.getElementById("range_price").innerText;
    let range_value = range.split(" - ");
    if (range_value[0] != 100000) {
        let value = parseInt(range_value[0]);
        newUrl = setUrlQuery(newUrl,"from", value);
    }
    if (range_value[1] != 50000000) {
        let value = parseInt(range_value[1]);
        newUrl = setUrlQuery(newUrl, "to", value);
    }
    window.location.href = newUrl;
}
function sortAscDate(a,b) {
    let aDate = new Date(a.CREATED_DATE);
    let bDate = new Date(b.CREATED_DATE);
    return aDate - bDate;
}
function sortDescDate(a,b) {
    let aDate = new Date(a.CREATED_DATE);
    let bDate = new Date(b.CREATED_DATE);
    return bDate - aDate;
}
function sortAscPrice(a,b) {
    let numA = Number(a.PRICE);
    let numB = Number(b.PRICE);
    return numA - numB;
}
function sortDescPrice(a,b) {
    let numA = Number(a.PRICE);
    let numB = Number(b.PRICE);
    return numB - numA;
}
function PageLoaded() {
    let url = window.location.href.toLowerCase();
    let checkboxes = document.getElementsByName("producer_checkbox");
    let producers = [...url.matchAll(/producer=\d+/g)];
    producers.forEach(producer => {
        const producer_id = producer[0].replace("producer=","");
        for (let i=0; i<checkboxes.length; i++) {
            if (checkboxes[i].value==producer_id) {
                checkboxes[i].checked = true;
                break;
            }
        }
    });
    //
    let rangeValue = " - ";
    let background = document.getElementsByClassName("ui-slider-range");
    if (background.length === 1) background = background[0]; else background = background[1];
    let fromValue = [...url.matchAll(/from=\d+/g)];
    let left = document.getElementById("slider_left");
    let percent_left = 0;
    if (fromValue.length === 0) {
        left.style.left = "0%";
        rangeValue = "100000" + rangeValue;
    }
    else {
        let value = fromValue[0].toString();
        value = value.replace("from=","");
        percent_left = ((parseInt(value) - 100000) / 50000000)*100;
        left.style.left = percent_left.toString() +"%";
        background.style.left = percent_left.toString() +"%";
        rangeValue = value + rangeValue;
    }
    let toValue = [...url.matchAll(/to=\d+/g)];
    let right = document.getElementById("slider_right");
    if (toValue.length === 0) {
        right.style.left = "100%";
        background.style.width = (100 - percent_left).toString() + "%";
        rangeValue = rangeValue + "50000000";
    }
    else {
        let value = toValue[0].toString();
        value = value.replace("to=","");
        let percent_right = ((parseInt(value) - 100000) / 50000000)*100;
        right.style.left = percent_right.toString() +"%";
        background.style.width = (percent_right - percent_left).toString() + "%";
        rangeValue = rangeValue + value;
    }
    document.getElementById("range_price").innerHTML = rangeValue;
    buildTable('#list_product');
}
document.addEventListener("DOMContentLoaded", PageLoaded);
function PageMaxObject() {
    let sort_selector = document.getElementById("viewProduct");
    let value = sort_selector.options[sort_selector.selectedIndex].value;
    if (value !== undefined) {
        state.rows = parseInt(value);
    }
    $('#list_product').empty();
    buildTable('#list_product');
}
function SortFilter() {
    let sort_selector = document.getElementById("sortBydate");
    let value = sort_selector.options[sort_selector.selectedIndex].value;
    let querySet = state.querySet;
    if (value !== undefined) {
        switch (value.toLowerCase()) {
            case "newest":
                querySet.sort(sortAscDate);
                break;
            case "oldest":
                querySet.sort(sortDescDate);
                break;
            case "lowest":
                querySet.sort(sortAscPrice);
                break;
            case "highest":
                querySet.sort(sortDescPrice);
        }
    }
    state.querySet = querySet;
    $('#list_product').empty();
    buildTable('#list_product');
}
//below is pagination
function buildTable(container_id) {
    buildTableProductMain(state.querySet, state.page, state.rows);
}
function buildTableQuerySet(querySet) {
    buildTableProductMain(querySet, state.page, state.rows);
}
function buildTableProductMain(querySet, page, rows) {

    let table = $('#list_product');

    let data = pagination(querySet, page, rows);
    let myList = data.querySet;
    pageButtons(data.pages, '#list_product', state.querySet);

    for (let i = 0; i<= myList.length; i++) {
        //Keep in mind we are using "Template Litterals to create rows"
        let each = myList[i];
        let price = FormatMoney(each.PRICE);
        let row = `<div class="col-12 col-sm-6 col-md-12 col-xl-6">
                <div class="single-product-wrapper">
            <a href="/shop/product?id=${each.ID}">
            <div class="product-img">
            <img style='height: 500px; width: 100%; object-fit: cover' src="../${each.PHOTO_LINK}" alt="">
            <img class="hover-img" style='height: 500px; width: 100%; object-fit: cover' src="../img/product-img/product${each.ID}.jpg" alt="">
            </div>
            </a>
            <div class="product-description d-flex align-items-center justify-content-between">
            <div class="product-meta-data">
            <div class="line"></div>
            <p class="product-price">${price} VNĐ</p>
            <a href="/shop/product?id=${each.ID}">
            <h6>${each.NAME}</h6>
            </a>
            </div>
            <div class="ratings-cart text-right">
            <div class="ratings">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            </div>
            <div class="cart">
            <a data-toggle="tooltip" data-placement="left" title="Thêm vào giỏ" onclick="AddToCart(${each.ID},'${each.NAME}',${each.PRICE}, 1)"><img src="img/core-img/cart.png" alt=""></a>
            </div>
            </div>
            </div>
            </div>
            </div>
            `;
        table.append(row);
    }
}
function Search() {
    let keyword = document.getElementById("search_input").value.toLowerCase();
    if (keyword != null && keyword !== '') {
        let querySet = state.querySet;
        querySet = querySet.filter(n => n.NAME.toLowerCase().includes(keyword));
        $('#list_product').empty();
        buildTableQuerySet(querySet);
    }
    else {
        $('#list_product').empty();
        buildTableQuerySet(state.querySet);
    }
}