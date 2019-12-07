//below is pagination
buildTable('#comment-wrapper');
function buildTable(container_id) {
    buildTableCommentMain(state.querySet, state.page, state.rows);
}
function buildTableCommentMain(querySet, page, rows) {

    let table = $('#comment-wrapper');

    let data = pagination(querySet, page, rows);
    let myList = data.querySet;
    pageButtons(data.pages, '#comment-wrapper');

    for (let i = 0; i<= myList.length; i++) {
        //Keep in mind we are using "Template Litterals to create rows"
        let each = myList[i];
        let row = `<div class="card" style="margin-bottom: 5px;">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-xs-3">
                                    <img class="img-responsive user-photo avatar rounded-circle" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" style="max-height: 30px; margin-right: 20px; margin-left: 20px;">
                                </div>
                                <div class="col-xs-9">
                                    <strong>${each.username}</strong>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            ${each.content.trim('\n')}
                        </div>
                    </div>
            `
        table.append(row);
    }
}