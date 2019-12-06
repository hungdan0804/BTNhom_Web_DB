

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

    fetch("http://localhost:3000/product",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comment:newComment,
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
    $('#comment-box').append('<div class="row"><div class="col-sm-2"> <div class="thumbnail"><img class="img-responsive user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"></div></div>' +
        '<div class="col-sm-10"><div class="panel panel-default"><div class="panel-heading"> <strong>'+data.username+'</strong></div><div class="panel-body">'+data.content+'</div></div></div>' +'</div><br>');
});