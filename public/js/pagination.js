function pagination(querySet, page, rows) {

    let trimStart = (page - 1) * rows;
    let trimEnd = trimStart + rows;

    let trimmedData = querySet.slice(trimStart, trimEnd);

    let pages = Math.ceil(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}
function pageButtons(pages, container_id) {
    let wrapper = document.getElementById('pagination-wrapper');

    wrapper.innerHTML = ``;

    let maxLeft = (state.page - Math.floor(state.window / 2));
    let maxRight = (state.page + Math.floor(state.window / 2));

    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.window;
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1);

        if (maxLeft < 1){
            maxLeft = 1;
        }
        maxRight = pages;
    }



    for (let page = maxLeft; page <= maxRight; page++) {
        if (page != state.page) {
            wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-outline-info">${page}</button>`;
        }
        else {
            wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`;
        }
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-outline-info">&#171; First</button>` + wrapper.innerHTML;
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-outline-info">Last &#187;</button>`;
    }

    $('.page').on('click', function() {
        $(container_id).empty();

        state.page = Number($(this).val());

        buildTable(container_id);
    })

}