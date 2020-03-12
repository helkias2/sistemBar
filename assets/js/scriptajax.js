$(function(){

debugger
$('input[name=jornada_trabalho').on('keyup', function(){

	var produto = $(this).val();	
	if(produto != '' && produto.length  > 0) {
		$.ajax({
		url: BASE_URL+'/ajax/searchempresa/',
		type:'POST',
    	data:{produto:produto},
    	async: false,
		}).done(function(data) {
		json = data.replace(/(\r\n|\n|\r)/gm,"");
    	var json = $.parseJSON(json);
		// /json = dat.replace(/\t/,"");	
		console.log(json[0].Codigo);
		//console.log(json);
		//$('#obs').val(json[0].idempresa);	
		$('#obs').val(json[0].Codigo);
		});
	}
});

});







