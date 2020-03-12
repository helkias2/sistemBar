/*-----------------------VALIDAÇÃO CNPJ----------------------*/
$(function(){
	$("#companies_cnpj").on('keyup', function(){
		
		var busca_cnpj = $('#companies_cnpj').val();
		console.log(busca_cnpj);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxCadCompanies/valCnpj',
			data:{busca_cnpj:busca_cnpj},
			success:function(retorno){

				if (retorno == 'true') {

					alert("ESTE CNPJ JÁ EXISTE NA BASE DE DADOS!");
					//console.log("esse cnpj já existe!");
					
				}else{
					//console.log("cnpj inexistente!");
				}

				//console.log(retorno);			
			}
		});
	});
});

/*-----------------------VALIDAÇÃO CPF----------------------*/
$(function(){
	$("#companies_cpf").on('keyup', function(){
		
		var busca_cpf = $('#companies_cpf').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxCadCompanies/valCpf',
			data:{busca_cpf:busca_cpf},
			success:function(retorno){

				if (retorno == 'true') {

					alert("ESTE CPF JÁ EXISTE NA BASE DE DADOS!");
					//console.log("esse cnpj já existe!");
					
				}else{
					//console.log("cnpj inexistente!");
				}

				//console.log(retorno);			
			}
		});
	});
});

/*-----------------------VALIDAÇÃO EMIAL----------------------*/
$(function(){
	$("#companies_email").on('keyup', function(){
		
		var busca_email = $('#companies_email').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxCadCompanies/valEmail',
			data:{busca_email:busca_email},
			success:function(retorno){

				if (retorno == 'true') {

					alert("ESTE EMAIL JÁ EXISTE NA BASE DE DADOS!");
					//console.log("esse cnpj já existe!");
					
				}else{
					//console.log("cnpj inexistente!");
				}

				//console.log(retorno);			
			}
		});
	});
});