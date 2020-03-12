(function(){
$("input[name=cepTerceiro]").on("blur", function () {
    let cepTerceiro = $(this).val();
    //console.log("Saiu "+ cep);

		$.ajax({
			url:'http://api.postmon.com.br/v1/cep/'+cepTerceiro,
			type:'GET',
			dataType:'json',
			success:function (json) {
				if(typeof json.logradouro != 'undefined'){
					$("input[name=enderecoTerceiro]").val(json.logradouro);
					$("input[name=bairroTerceiro]").val(json.bairro);
					//$("input[name=cidade]").val(json.cidade);
					//$("input[name=uf]").val(json.estado);
				}
				$("input[name=numero]").focus();
				//console.log(json);

			}
		});

	})
})

(function(){

})