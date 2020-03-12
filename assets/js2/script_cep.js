(function(){
$("input[name=cep]").on("blur", function () {
    let cep = $(this).val();
    //console.log("Saiu "+ cep);

		$.ajax({
			url:'http://api.postmon.com.br/v1/cep/'+cep,
			type:'GET',
			dataType:'json',
			success:function (json) {
				if(typeof json.logradouro != 'undefined'){
					$("input[name=endereco]").val(json.logradouro);
					$("input[name=bairro]").val(json.bairro);
					//console.log(json.bairro);
					//$("input[name=cidade]").val(json.cidade);
					//$("input[name=uf]").val(json.estado);
					//$("input[name=endereco]").val(json.logradouro)
				}
				$("input[name=numero]").focus();
				//console.log(json);

			}
		});

	})
})


(function(){
	debugger
$("input[name=cpf_Funcionario]").on("blur", function () {
    let cepfunc = $(this).val();
    console.log("Saiu "+ cepfunc);

		$.ajax({
			url:'http://api.postmon.com.br/v1/cep/'+cepfunc,
			type:'GET',
			dataType:'json',
			success:function (json) {
				if(typeof json.logradouro != 'undefined'){
					$("input[name=Logradouro]").val(json.logradouro);
					$("input[name=bairro]").val(json.bairro);
					//console.log(json.bairro);
					$("input[name=cidade_Funcionario]").val(json.cidade);
					//$("input[name=uf]").val(json.estado);
					//$("input[name=endereco]").val(json.logradouro)
				}
				$("input[name=numero]").focus();
				console.log(json);

			}
		});

	})
})