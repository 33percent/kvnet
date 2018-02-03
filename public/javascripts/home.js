let exist = '';
function emailsubs() {
        let emailid = $("#emailid").val();
        let name = emailid.split('@');
        let obj = {
            email: emailid,
            name: name[0]
        };
        console.log(exist);

        $.ajax({
            url: "/emailsub",
            method: "post",
            data: obj,
            success: function (data) {
                if (data.response === 1) {
                    swal("Great " + name[0], "Thanks for subscribing", "success");
                    exist = name[0];
                } else if(data.response === 2){
                    swal("Thumbs up " + name[0], "It shows how interested you are, but you're already subscribed", "success");
                    exist = name[0];
                }
            }
        });

}
