$(function(){
//debugger	
$("#botaosuporte").on('blur', function(event){
	event.preventDefault();

	var nome = $('#nome_usuario').val()
	var email = $('#email_usuario').val()
	var motivo = $('#motivo_contato').val()
	var descricao = $('#descricao').val()

	$.ajax({
		url:BASE_URL+'/suporte/suportEnvia',
		type:'GET',
		datatype:'json',
		async: false,
		data:{nome:nome, email:email, motivo:motivo, descricao:descricao},
		success: function(data){
			//console.log(data);
			
			if(data == "true"){
				alert('Mensagem enviada com sucesso!');
				
			}else{
				
				alert('ocoreu um erro na transmissão de sua mensagem, por favor tente novamente!');
			
		}
		}
	});
	
	limparCampos();
	return false;
})

function limparCampos(){
	
	$('#nome_usuario').val('')
	$('#email_usuario').val('')
	$('#motivo_contato').val('')
	$('#descricao').val('')		
}	

})