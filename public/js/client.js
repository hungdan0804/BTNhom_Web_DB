

Pusher.logToConsole = true;

const pusher = new Pusher('3e2e4296dcbf4a8ca5dd', {
    cluster: 'ap1',
    forceTLS: true
});

var commentForm= $("#comment-form");
const addComment=(e)=>{
    e.preventDefault();
    var newComment= $("#comment-content").val();
    var clearComment=$("#comment-content").val("");
    var url = window.location.href;
    var product = [...url.matchAll(/id=\d+/g)][0];
    var product_id=product.toString().replace("id=","");

    fetch("https://sql316324.herokuapp.com/shop/product",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comment:newComment.toString().trim().replace('\n','<br>'),
            product:product_id
        })
    })
        .then(res=>res.json())
        .then(json=>{
            console.log(json.message);
        })
}

commentForm.on("submit",addComment);

const channel = pusher.subscribe('post');
channel.bind('add', function(data) {
    $('#new-comment-box').append('<div class="card" style="margin-bottom: 5px;"> <div class="card-header bg-primary"> <div class="row"> <div class="col-xs-3">' +
        '<img class="img-responsive user-photo avatar rounded-circle" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" style="max-height: 30px; margin-right: 20px; margin-left: 20px;"></div>'+
        '<div class="col-xs-9"><strong>'+data.username+'</strong> </div> </div> </div> <div class="card-body" style="white-space: pre-line;">'+data.content+' </div> </div>');
});