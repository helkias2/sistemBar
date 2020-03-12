 /*------------------------Busca Codico de indentificação de doenças------------------------------------*/
$(function(){
	$("#buscaCertificadoDigital").on('keyup', function(){
		//console.log('teste');
		var busca = $('#buscaCertificadoDigital').val();
		
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEnvioEvento/buscaCertificado',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
		
				
				$("#tbmodalCertificado tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Nome/Apelido</th>";
				cols += "<th>Titular</th>";
				cols += "<th>CNPJ/CPF</th>";
				newRow.append(cols);
				$("#tbmodalCertificado").append(newRow);
			
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idcertificado+' name=idcertificado id=idcertificado></td>';
					cols += '<td>'+json[i].apelido+'</td>';
					cols += '<td>'+json[i].titularcertificado+'</td>';
					cols += '<td>'+json[i].inscricao+'</td>';
					newRow.append(cols);
					$("#tbmodalCertificado").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitCertificadoDigital").on('click', function(){
		
		var idcertificado = $("input[name='idcertificado']:checked").val();
//		console.log(codmtvafast);
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajaxEnvioEvento/getCerificadoEnvio',
			data:{idcertificado:idcertificado},
			success:function(json){

				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);

				
//				$("#codCid").val(json[0].idcertificado);
				$("#arquivoCertificado").val(json.apelido);
				$("#nomeTitulaCertificado").val(json.titularcertificado);
				$("#numeroincricaoCertificado").val(json.inscricao);
				$("#nomeRealCertificado").val(json.nomereal);
				if(json.tpinscricao == 1){
					$("#tipoinscricaoCertificado").val('CNPJ');
				}else if(json.tpinscricao == 2){
					$("#tipoinscricaoCertificado").val('CPF'); 
				}
							}
		});
	});
});
