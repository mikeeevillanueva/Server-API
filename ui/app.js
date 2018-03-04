function rowtask(description, done, title)
{
   return '<div class="col-lg-12">' +
          '<h4>'+title+'</h4>' +
          '<p>'+description+' </br> Status: '+done+'</p> ' +
	  // '<button class="btn btn-primary" onclick="deletetasks();">Delete Tasks</button>' +
	   '</div>';

}

function loadtasks()
{

$.ajax({
    		url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#tasks").html("");
				if (resp.status  == 'ok') {
				   for (i = 0; i < resp.count; i++)
                                  {
                                       description = resp.entries[i].description;
                                       done = resp.entries[i].done;
                                       title = resp.entries[i].title;
                                       $("#tasks").append(rowtask(description, done, title));
                                       
	                          }
				} else
				{
                                       $("#tasks").html("");
					alert(resp.message);
				}
    		},
		}); 
}

function inserttasks(){

    alert("hello");
    $("#newtasks").append(textbox());
}

function textbox(){
    {
   return '<form class="form-inline">' +
  '<div class="form-group">' +
          '     <label for="exampleFormControlInput1">Email address</label>' +
   ' <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">' +
    '<label for="disabledTextInput">Disabled input</label>' +
   ' <input type="password" id="input" class="form-control mx-sm-3" >' +
  '  </small>' +
  '</div>' +
'</form>' ;

}


}

function submit() {
    $.ajax(
        {
            url: 'http://127.0.0.1:5000/newtask',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                title: $("#title").val,
                description: $("#description").val,
                done: $("#done").val,
            }),
            type: "POST",
			dataType: "json",
			error: function (e) {
			},
			success: function (resp) {
				if (resp.status == 'ok') {
					window.location.replace('profile.html?username='+resp.message+'/');
				}
				else {
					alert(resp.message)
				}

			}
		});
}
