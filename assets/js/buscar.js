$(function(){
	
	$(document).ready(function(){
		$("#buscarvalor").on("keyup", function() {
		  var value = $(this).val().toLowerCase();
		  $("#myTable tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		  });
		});
	  });

	$('#buscarvalor').on('focus', function(){ //criar um focus no campo de busca
		$(this).animate({					  // e aumentar o tamnho do campo	
			width:'250px'
		}, 'fast');
	});

	$('#buscarvalor').on('blur', function(){ // e diminuir o tamnho do campo
		if($(this).val() == ""){
			$(this).animate({
				width:'100px'
			}, 'fast');
		}
		setTimeout(function(){
			$('.searchresults').hide();
		}, 500);
	});

	$('#buscarvalor').on('keyup', function(){ //evento de inserir dados na busca
		let datatype = $(this).attr('data-type'); // datatype recebendo tudo que esta no campos buscar
		let vl = $(this).val(); // recebendo valor do objeto para " q "
		//console.log(vl)
		if(datatype != " "){

			$.ajax({
				url: BASE_URL + '/ajax/' + datatype,
				type: 'GET',
				data: {vl,vl},
				dataType:'json',
				success: function(json){
					if( $('.searchresults').length == 0){
						//alert("CERTO")
					    $('#buscarvalor').after('<div class="searchresults"></div>');
					}
					$('.searchresults').css('left',$('#buscarvalor').offset().left+'px');
					$('.searchresults').css('top',$('#buscarvalor').offset().top+$('#buscarvalor').height()+3+'px');
					
					let html = ''; 
					for(let i in json){
						html += '<div class="si"><a href="'+ json[i].link +'">' + json[i].cbonome + '</div>';
					}
					$('.searchresults').html(html);
					$('.searchresults').show();
				}

			});
			
		};
	});

});







