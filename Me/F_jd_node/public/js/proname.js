$(function(){
		// $(".show_addr").mouseover(function(){
			// var params ={
   //  			username: $("#username").val(),
   //  			password: $("#password").val()
   //  		};
		// });

// <p class="item"><a href="javascript:void(0)">上海</a></p>

		$.ajax({
    			type: "GET",
    			url: 'http://localhost:3000/json/jdtopcity.json',
    			dataType: 'json',
    			// timeout: 5000,
    			async:false, 
    			success: function(data){
    				// var data = $.parseJSON(data);
    				// console.log(data.provinces);
    				$.each(data, function(index, item){
    					// console.log(data.provinces);
    					var html = '';
    					for (var i = 0; i<this.length; i++) {
    						html += "<p class='item'><a href='javascript:viod(0)>'"+ item[i].proname +"</a></p>";
    						console.log(item[i].proname);
    					}
    					console.log(html);
    					//$("#o_dropdown").html(html);
    					$("#o_dropdown").append(html);
    					$("#o_dropdown").html("123123123");
    					alert(html)
    				});
    			},
    			// error: function(jqXHR, textStatus, errorThrown){
    			// 	alert('error ' + textStatus + " " + errorThrown);  
    			// }
    		});



});



