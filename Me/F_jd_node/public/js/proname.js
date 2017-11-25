$(function(){
		$(".show_addr").mouseover(function(){
			// var params ={
   //  			username: $("#username").val(),
   //  			password: $("#password").val()
   //  		};
    		$.ajax({
    			type: "GET",
    			url: 'http://localhost:3000/json/jdtopcity.json',
    			dataType: 'json',
    			// timeout: 5000,
    			success: function(data){
    				// var data = $.parseJSON(data);
    				console.log(data.provinces);
    			},
    			// error: function(jqXHR, textStatus, errorThrown){
    			// 	alert('error ' + textStatus + " " + errorThrown);  
    			// }
    		});
		});
		
	});



