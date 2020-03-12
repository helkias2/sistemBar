function buscarEmpre(obj){
	let id = $(obj).attr('data-id');
	let name = $(obj).html();
	
	$('.searchresults').hide();
	$('#busca_empres').val(name);
	$('#busca_empres').attr('data-id',id);

};

$(function(){

	$('#busca_empres').on('focus', function(){
		$(this).animate({
			width:'250px'
		}, 'fast');
	});

	$('#busca_empres').on('blur', function(){
		if($(this).val() == '') {
			$(this).animate({
				width:'100px'
			}, 'fast');
		}

		setTimeout(function(){
			$('.searchresults').hide();
		}, 500);
	});

	$('#busca_empres').on('keyup', function(){
		var datatype = $(this).attr('data-type');
		var produto = $(this).val();

		if(datatype != '') {
			$.ajax({
				url:BASE_URL+'/ajax/'+datatype,
				type:'POST',
				data:{produto:produto},
				dataType:'json',
				success:function(json) {
					if( $('.searchresults').length == 0 ) {
						$('#busca_empres').after('<div class="searchresults"></div>');
					}
					$('.searchresults').css('left', $('#busca_empres').offset().left+'px');
					$('.searchresults').css('top', $('#busca_empres').offset().top+$('#busca_empres').height()+3+'px');

					var html = '';

					/*for(var i in json) {
						html += '<div class="si"><a href="javascript:;" onclick="buscarEmpre(this)" data-id="'+json[i].idempresa+'">'+json[i].razaosocial+'</a></div>';
					console.log(json[0]);
					}*/
					
					var url_atual = window.location.href;
					var url_atual = url_atual.split("?");
					var urlatt = url_atual[0];
					for(var i in json) {
						html += '<div class="si"><a href="'+urlatt+'?cod='+json[i].idempresa+' "  "javascript:;" onclick="buscarEmpre(this)" data-id="'+json[i].idempresa+'">'+json[i].razaosocial+'</a></div>';
					}

					$('.searchresults').html(html);
					
					$('.searchresults').show();
				}
			});
		}

	});
});

$(function(){
	
	$('#pagList').on('click', function(){
//		var nrInscEmpre = $('#pagList').val();
		var pg = 2;
		//alert(nrInscEmpre);
		$.ajax({
			type:'GET',
//			url:'../segurancasst/models/ajax.php',
			url:'../segurancasst/s1000',
			data:{pg:pg},
			success:function(msg){
		/*		if(msg.trim() == 'Validou'){
					console.log(msg); 
					document.getElementById('nrInscEmpre').style.borderColor = '#28DC4E';
					document.getElementById('nrInscEmpre').style.background = '#C6EDCB';
				}else if(msg.trim() == 'Incorreto'){
					document.getElementById('nrInscEmpre').style.borderColor = '#DE595B';
					document.getElementById('nrInscEmpre').style.background = '#EEB0B1';
				}*/
			}
		});
	});
});

$(function(){
	$("#buscaFunc").on('keyup', function(){
		var busca = $('#buscaFunc').val();
		var codempresa = $('#idEmpresaEvt').val();

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/funcionario',
			data:{busca, codempresa :busca, codempresa},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				console.log(json);
				
				$("#tbmodl tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>CPF</th>";
				cols += "<th>Nome</th>";
				newRow.append(cols);
				$("#tbmodl").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idfuncionario+' name=idFuncionarioModal id=idFuncionarioModal ></td>';
					cols += '<td>'+json[i].codfuncionario+'</td>';
					cols += '<td>'+json[i].cpf+'</td>';
					cols += '<td>'+json[i].nomefuncionario+'</td>';
					//cols += '<td>'+json[i].dataadmissao+'</td>';
					newRow.append(cols);
					$("#tbmodl").append(newRow);
				}

			}
		});
	});
});
$(function(){
	$("#submitFunc").on('click', function(){
		
		var cpfFunc = $("input[name='idFuncionarioModal']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getFuncionario',
			data:{cpfFunc:cpfFunc},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				console.log(json);
				var json = JSON.parse(json);
				$("#cpfFunc").val(json[0].cpf);
				$("#nomeFunc").val(json[0].nomefuncionario);
				$("#nisFunc").val(json[0].pis);
				$("#codfuncionario").val(json[0].codfuncionario);
				$("#matriculaFunc").val(json[0].matriculaempregador);
				$("#nomeSetorFuncionario").val(json[0].nomesetor);
				$("#funcaoFuncionario").val(json[0].funcao);
				$("#codFuncaoFuncionario").val(json[0].codfuncao);
				$("#codSetorFuncionario").val(json[0].codsetor);
				$("#evtCat_dataadmissao").val(json[0].dataadmissao);
				$("#gfip").val(json[0].codgfip);
				var codfuncionario = json[0].codfuncionario;
				
				$.ajax({
					type:'POST',
					url:BASE_URL+'/ajax/getRiscosFuncionario',
					data:{codfuncionario:codfuncionario},
					success:function(json){
						json = json.replace(/(\r\n|\n|\r)/gm,"");
						json = json.replace(/\t/,"");
						var json = JSON.parse(json);
						console.log(json);
						
						var combobox = $("#riscosFuncionarioAnalise");
						$("#riscosFuncionarioAnalise option").remove();
						for(var i = 0; i < json.length; i++) {
							combobox.append(
									$('<option>', {value: json[i].codrisco, text: json[i].descrisco})
							);
						}
					}
				});				
			}
		});
	});
});


$(function(){
	$("#buscaEmpresaModal").on('keyup', function(){

		var busca = $('#buscaEmpresaModal').val();
		//console.log(busca);
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaEmpresa',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				
				var json = JSON.parse(json);
				//console.log(json);
				
				$("#tbmodalEmpresa tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>ID</th>";
				cols += "<th>CPF/CNPJ</th>";
				cols += "<th>Razão Social</th>";
				newRow.append(cols);
				$("#tbmodalEmpresa").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idempresa+' name=codEmpresa id=codEmpresa></td>';
					cols += '<td>'+json[i].codempresa+'</td>';
					cols += '<td>'+json[i].nrmatricula+'</td>';
					cols += '<td>'+json[i].razaosocial+'</td>';
					newRow.append(cols);
					$("#tbmodalEmpresa").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitEmpresa").on('click', function(){
		
		var codEmpresa = $("input[name='codEmpresa']:checked").val();
//		console.log(codmtvafast);
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getEmpresa',
			data:{codEmpresa:codEmpresa},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				console.log(json);
				$("#idEmpresaEvt").val(json[0].codempresa);
				$("#idEmpresa").val(json[0].idempresa);
				$("#razsocialEvt").val(json[0].razaosocial);
				$("#matriculaEvt").val(json[0].nrmatricula);
				
				
			}
		});
	});
});

$(function(){
	$("#buscaMedico").on('keyup', function(){
		var busca = $('#buscaMedico').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaMedico',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#tbmodlMedico tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Nome</th>";
				cols += "<th>Orgão</th>";
				cols += "<th>Numero</th>";
				newRow.append(cols);
				$("#tbmodlMedico").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idresp+' name=codMedico id=codMedico></td>';
					cols += '<td>'+json[i].nomeresponsavel+'</td>';
					cols += '<td>'+json[i].identprofissional+'</td>';
					cols += '<td>'+json[i].numero+'</td>';
					newRow.append(cols);
					$("#tbmodlMedico").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitMedico").on('click', function(){
		
		var codMedico = $("input[name='codMedico']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getMedico',
			data:{codMedico:codMedico},
			success:function(json){
				console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#idresponsavel").val(json[0].idresp);
				$("#nmMedico").val(json[0].nomeresponsavel);
				$("#nrInsOrg").val(json[0].numero);
				$("#ufMedicoDoc").val(json[0].uf);
				if(json[0].identprofissional == 'CRM'){
				$("#orgMedico").val(1);
				}
				else if(json[0].identprofissional == 'CRO'){
				$("#orgMedico").val(2);
				}
				else if(json[0].identprofissional == 'RMS'){
				$("#orgMedico").val(3);
				}
	
			}
		});
	});
});

$(function(){
	$("#buscaFatorRisco").on('keyup', function(){
		var busca = $('#buscaFatorRisco').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaFatorRisco',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#tbmodalFatorRisco tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Grupo</th>";
				cols += "<th>Descrição</th>";
				newRow.append(cols);
				$("#tbmodalFatorRisco").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idfatriscambtrab+' name=codFatRisc id=codFatRisc></td>';
					cols += '<td>'+json[i].codfatriscambtrab+'</td>';
					cols += '<td>'+json[i].descgrupfatriscambtrab+'</td>';
					cols += '<td>'+json[i].descgpfatriscambtrab+'</td>';
					newRow.append(cols);
					$("#tbmodalFatorRisco").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitFatorRisco").on('click', function(){
		
		var codFatRisc = $("input[name='codFatRisc']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getFatorRisco',
			data:{codFatRisc:codFatRisc},
			success:function(json){

				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);			 
					var cols = "";
					var newRow = $("<tr>");
					var riscos = $("#riscosPontoVirgula").val();
					$("#riscosPontoVirgula").val(riscos+json[0].idfatriscambtrab+';');
					cols += '<td>'+json[0].codfatriscambtrab+'</td>'+'<input type=hidden value='+json[0].idfatriscambtrab+' name=codFatRisc id=codFatRisc>';
					cols += '<td>'+json[0].descgrupfatriscambtrab+'</td>';
					cols += '<td>'+json[0].descgpfatriscambtrab+'</td>';
					cols += '<td><a class="btn btn-danger" style="width: 100%;"><i class="fa fa-edit fa-lg"></i>Excluir</a></td>';
					newRow.append(cols);
					$("#tbAllRiscos").append(newRow);
			}
		});
	});
});

//modal natureza juridica
$(function(){
	$("#buscaNatJuri").on('keyup', function(){
		var busca = $('#buscaNatJuri').val();
		console.log(busca);
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaNatJurid',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#tbmodlNatJuri tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Grupo</th>";
				cols += "<th>Descrição</th>";
				newRow.append(cols);
				$("#tbmodlNatJuri").append(newRow);
			
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idnatjurid+' name=codNatJuri id=codNatJuri></td>';
					cols += '<td>'+json[i].codnatjurid+'</td>';
					cols += '<td>'+json[i].codgrupnatjurid+'</td>';
					cols += '<td>'+json[i].descambrisconatjurid+'</td>';
					newRow.append(cols);
					$("#tbmodlNatJuri").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitNatJuri").on('click', function(){
		
		var codNatJuri = $("input[name='codNatJuri']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getNatJurid',
			data:{codNatJuri:codNatJuri},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				
				$("#natjur").val(json[0].codnatjurid);
				$("#descnatjur").val(json[0].descambrisconatjurid);
			}
		});
	});
});

//modal cod categoria
$(function(){
	$("#buscaCodCategoria").on('keyup', function(){
		//console.log('teste');
		var busca = $('#buscaCodCategoria').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaCodCategoria',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				
				$("#tbmodlCodCategoria tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Descrição</th>";
				newRow.append(cols);
				$("#tbmodlCodCategoria").append(newRow);
			
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].codclasstrib+' name=codCodCategoria id=codCodCategoria></td>';
					cols += '<td>'+json[i].classtrib+'</td>';
					cols += '<td>'+json[i].descricao+'</td>';
					newRow.append(cols);
					$("#tbmodlCodCategoria").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitCodCategoria").on('click', function(){
		
		var codNatJuri = $("input[name='codCodCategoria']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getCodCategoria',
			data:{codNatJuri:codNatJuri},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
	
				$("#classtrib").val(json[0].classtrib);
				$("#descCodCategoria").val(json[0].descricao);
			}
		});
	});
});
$(function(){
	$("#novoRegt").click(function(){
		$("#afastTempEvt").submit();
	});
});

function confimacao(){
	alert("Fixado com Sucesso!");	
}


$(function(){
	$("button[name='protocolo']").on('click', function(){
		var codCid = $(this).val();
		//console.log(codCid);
		$("#protocoloLote").val(codCid);
		
		
	});
});



$("input[name=cpf_Funcionario]").on("blur", function () {
    let cepfunc = $(this).val();

    $.ajax({
        url:'http://api.postmon.com.br/v1/cep/'+cepfunc,
        type:'GET',
        dataType:'json',
        success:function (json) {
            if(typeof json.logradouro != 'undefined'){
                $("input[name=Logradouro]").val(json.logradouro);
                $("input[name=bairro]").val(json.bairro);
                $("input[name=cidade_Funcionario]").val(json.cidade);
                //$("input[name=uf]").val(json.estado);
                //$("input[name=endereco]").val(json.logradouro)
            }
            //$("input[name=numero]").focus();
        }
    });
})


/*CBO*/

$(function(){
	$("#buscaCbo").on('keyup', function(){
		var busca = $('#buscaCbo').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaCbo',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				console.log(json);
				var json = JSON.parse(json);
				$("#tbmodalCbo tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Descrição</th>";
				newRow.append(cols);
				$("#tbmodalCbo").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idcbo+' name=idcbo id=idcbo></td>';
					cols += '<td>'+json[i].codcbo+'</td>';
					cols += '<td>'+json[i].cbonome+'</td>';
					newRow.append(cols);
					$("#tbmodalCbo").append(newRow);
				}

			}
		});
	});
});

$(function(){
	$("#submitCbo").on('click', function(){
		
		var idcbo = $("input[name='idcbo']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getCbo',
			data:{idcbo:idcbo},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);

				$("#codcbo").val(json[0].codcbo);
				$("#cbonome").val(json[0].cbonome);
				//$("#nisFunc").val(json[0].pis);
				//$("#codfuncionario").val(json[0].codfuncionario);
				//$("#matriculaFunc").val(json[0].matriculaempregador);
				
	
			}
		});
	});
});

/*Setor*/

$(function(){
	$("#buscaSetor").on('keyup', function(){
		var busca = $('#buscaSetor').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaSetor',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				
				var json = JSON.parse(json);
				$("#tbmodalSetor tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Nome setor</th>";
				cols += "<th>Razao</th>";
				newRow.append(cols);
				$("#tbmodalSetor").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idsetor+' name=idsetor id=idsetor></td>';
					cols += '<td>'+json[i].codsetor+'</td>';
					cols += '<td>'+json[i].setordesenvolvido+'</td>';
					cols += '<td>'+json[i].razaosocial+'</td>';
					newRow.append(cols);
					$("#tbmodalSetor").append(newRow);
				}

			}
		});
	});
});

$(function(){
	$("#submitSetor").on('click', function(){
		
		var idsetor = $("input[name='idsetor']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getSetor',
			data:{idsetor:idsetor},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);

				$("#codsetor").val(json[0].codsetor);
				$("#setordesenvolvido").val(json[0].setordesenvolvido);
				
				$("#codempresasetor").val(json[0].codempresa);
				$("#razaosocialsetor").val(json[0].razaosocial);
				$("#localtrabalho").val(json[0].localtrabempresa);
				
				
			}
		});
	});
});


/*CNAE*/

$(function(){
	$("#buscaCnae").on('keyup', function(){
		var busca = $('#buscaCnae').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaCnae',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				
				var json = JSON.parse(json);
				$("#tbmodalCnae tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th>Id</th>";
				cols += "<th>Cod CNAE</th>";
				cols += "<th>Descrição</th>";
				newRow.append(cols);
				$("#tbmodalCnae").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idcnae+' name=idcnae id=idcnae></td>';
					cols += '<td>'+json[i].codcnae+'</td>';
					cols += '<td>'+json[i].desccnae+'</td>';
					newRow.append(cols);
					$("#tbmodalCnae").append(newRow);
				}
			}
		});
	});
});

$(function(){
	$("#submitCnae").on('click', function(){
		
		var idcnae = $("input[name='idcnae']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getCnae',
			data:{idcnae:idcnae},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);

				$("#codcnae").val(json[0].codcnae);
				$("#desccnae").val(json[0].desccnae);
				
			}
		});
	});
});

/*busca risco*/

$(function(){
	$("#buscaRisco").on('keyup', function(){
		var busca = $('#buscaRisco').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaRisco',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				
				var json = JSON.parse(json);
				$("#modalRisco tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th>Id</th>";
				cols += "<th>codigo</th>";
				cols += "<th>Cod. Cbo</th>";
				cols += "<th>Descrição</th>";
				cols += "<th>Grupo de Risco</th>";
				cols += "<th>Cód. Risco</th>";
				cols +=	"<th>Dec. do Risco</th>";

				
				newRow.append(cols);
				$("#modalRisco").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idrisco+' name=idrisco id=idrisco></td>';
					cols += '<td>'+json[i].codigo+'</td>';
					cols += '<td>'+json[i].codcbo+'</td>';
					cols += '<td>'+json[i].desccbo+'</td>';
					cols += '<td>'+json[i].gruporisco+'</td>';
					cols += '<td>'+json[i].codrisco+'</td>';
					cols += '<td>'+json[i].descrisco+'</td>';
					newRow.append(cols);
					$("#modalRisco").append(newRow);
				}
			}
		});
	});
});

$(function(){
	$("#submitSetor").on('click', function(){
		
		var idrisco= $("input[name='idrisco']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getIdRisco',
			data:{idrisco:idrisco},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);

				$("#codcbo").val(json[0].codcbo);
				$("#desccbo").val(json[0].desccbo);
				$("#gruporisco").val(json[0].gruporisco);
				$("#codrisco").val(json[0].codrisco);
				$("#descrisco").val(json[0].descrisco);
				
			}
		});
	});
});

/*busca Treinamento*/

$(function(){
	$("#buscaTrein").on('keyup', function(){
		var busca = $('#buscaTrein').val();
		var tabela = $('#tabelaTreinamentoSelect').val();
		
		if(tabela == 29){
			$.ajax({
				type:'POST',
				url:BASE_URL+'/ajax/buscaTreinamento',
				data:{busca:busca},
				success:function(json){
					json = json.replace(/(\r\n|\n|\r)/gm,"");
					json = json.replace(/\t/,"");

					var json = JSON.parse(json);
					$("#tbmodalTrein tr").remove();

					var newRow = $("<tr>");	
					var cols = "";
					cols += "<th>Id</th>";
					cols += "<th>codigo</th>";
					cols += "<th>Descrição</th>";


					newRow.append(cols);
					$("#tbmodalTrein").append(newRow);

					for(var i = 0; i < json.length; i++) {
						var cols = "";
						var newRow = $("<tr>");	
						cols += '<td><input type=radio value='+json[i].idtreicap+' name=idtreinamento id=idtreinamento></td>';
						cols += '<td>'+json[i].codtreicap+'</td>';
						cols += '<td>'+json[i].desctreicap+'</td>';
						newRow.append(cols);
						$("#tbmodalTrein").append(newRow);
					}
				}
			});
		}else if(tabela == 30){
			$.ajax({
				type:'POST',
				url:BASE_URL+'/ajax/buscaAcaoTrein',
				data:{busca:busca},
				success:function(json){
					json = json.replace(/(\r\n|\n|\r)/gm,"");
					json = json.replace(/\t/,"");

					var json = JSON.parse(json);
					$("#tbmodalTrein tr").remove();

					var newRow = $("<tr>");	
					var cols = "";
					cols += "<th>Id</th>";
					cols += "<th>codigo</th>";
					cols += "<th>Descrição</th>";


					newRow.append(cols);
					$("#tbmodalTrein").append(newRow);

					for(var i = 0; i < json.length; i++) {
						var cols = "";
						var newRow = $("<tr>");	
						cols += '<td><input type=radio value='+json[i].idplanodoc+' name=idtreinamento id=idtreinamento></td>';
						cols += '<td>'+json[i].codplandoc+'</td>';
						cols += '<td>'+json[i].descplandoc+'</td>';
						newRow.append(cols);
						$("#tbmodalTrein").append(newRow);
					}
				}
			});
		}
	});
});

$(function(){
	$("#submitTrein").on('click', function(){
		
		var idTrein= $("input[name='idtreinamento']:checked").val();
		var tabela = $('#tabelaTreinamentoSelect').val();
		if(tabela == 29){
		
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getTrein',
			data:{idTrein:idTrein},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);

				$("#codigoTeinamento").val(json[0].codtreicap);
				$("#descTrein").val(json[0].desctreicap);
				
			}
		});
	}else if(tabela == 30){
		
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getAcaoTrein',
			data:{idTrein:idTrein},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);

				$("#codigoTeinamento").val(json.codplandoc);
				$("#descTrein").val(json.descplandoc);
				
			}
		});
	}
	});
});

/*busca Função - CADASTRO DE RISCO*/

$(function(){
	$("#buscaFuncao").on('keyup', function(){
		var busca = $('#buscaFuncao').val();
		var buscaemp = $('#idEmpresaEvt').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaFuncao',
			data:{busca:busca, buscaemp:buscaemp},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				
				console.log(json);
				var json = JSON.parse(json);
				$("#tbmodalFuncao tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Setor</th>";
				cols += "<th>Cod.Cbo</th>";
				//cols += "<th>Cod. Função</th>";
				cols += "<th>Função</th>";

				
				newRow.append(cols);
				$("#tbmodalFuncao").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].codfuncao+' name=idfuncao id=idfuncao></td>';
					//cols += '<td>'+json[i].codcbo+'</td>';
					cols += '<td>'+json[i].nomesetor+'</td>';
					//cols += '<td>'+json[i].cargocbo+'</td>';
					cols += '<td>'+json[i].codcbo+'</td>';
					cols += '<td>'+json[i].cargocbo+'</td>';
					newRow.append(cols);
					$("#tbmodalFuncao").append(newRow);
				}
			}
		});
	});
});

$(function(){
	$("#submitFuncao").on('click', function(){
		
		var codfuncao= $("input[name='idfuncao']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getFuncao',
			data:{codfuncao:codfuncao},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);

				$("#codigoFuncao").val(json[0].codfuncao);
				$("#nomeSetor").val(json[0].nomesetor);
				$("#nomeempresa").val(json[0].nomeempresa);
				$("#funcnome").val(json[0].cargocbo);
				$("#codsetor").val(json[0].codsetor);
				//$("#cargocbo").val(json[0].cargocbo);
				$("#codigocbo").val(json[0].codcbo);
				$("#ghefuncao").val(json[0].ghe);
				
			}
		});
	});
});



$("#riscosFuncionarioAnalise").bind('click', function(){
		var cod = $('#riscosFuncionarioAnalise').val();
		var desc = document.getElementById("riscosFuncionarioAnalise").options[document.getElementById("riscosFuncionarioAnalise").selectedIndex].text
		var codFatRisc = cod;
		console.log(codFatRisc); 
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/getRiscoFuncionarioAnalise',
			data:{codFatRisc:codFatRisc},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);
				console.log(json);
				$('#categoriaRiscFuncionario').val(json[0].descgrupfatriscambtrab);
				

			}
		});
		$('#codigodeRisco').val(cod);
		$('#descRiscoFuncionario').val(desc);
	
	});
/*busca EPI*/

$(function(){
	$("#buscaEPIRisco").on('keyup', function(){
		var busca = $('#buscaEPIRisco').val();
		var codempresa = $('#idEmpresaEvt').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaEpiRisco',
			data:{busca, codempresa:busca ,codempresa},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				
				var json = JSON.parse(json);
				$("#tbmodalEpi tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Codigo</th>";
				cols += "<th>CA</th>";
				cols += "<th>EPI</th>";

				
				newRow.append(cols);
				$("#tbmodalEpi").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idmatepi+' name=idEpiRisco id=idEpiRisco></td>';
					cols += '<td>'+json[i].codmatepi+'</td>';
					cols += '<td>'+json[i].codmatca+'</td>';
					cols += '<td>'+json[i].nomematepi+'</td>';
					newRow.append(cols);
					$("#tbmodalEpi").append(newRow);
				}
			}
		});
	});
});
$(function(){
	$("#submitEpiRisco").on('click', function(){
		
		var idepi = $("input[name='idEpiRisco']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getEpiTabela',
			data:{idepi:idepi},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");

				var json = JSON.parse(json);
				console.log(json);
				

				var count = 1;
				while(document.getElementById("equipepi"+count) != null){
					 
					count += 1;
				}

				
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td>'+json.codmatca+'</td><input type=hidden value='+json.codmatca+' name=caepi'+count+' id=caepi'+count+'> ';
					cols += "<td>"+json.nomematepi+"</td><input type=hidden value='"+json.nomematepi+"' name=equipepi"+count+" id=equipepi"+count+">";
					cols += '<input type=hidden value='+json.codmatepi+' name=codepi'+count+' id=codepi'+count+'></td>';
					newRow.append(cols);
					$("#tabelaEpiRisco").append(newRow);
				
			}
		});
	});
});
$(function(){
	$("#excluirTabelaRisco").on('click', function(){
		$("#tabelaEpiRisco td").remove();
		var count = 1;
			while(document.getElementById("equipepi"+count) != null){
				$("#equipepi"+count).remove();
				$("#caepi"+count).remove();
				$("#codepi"+count).remove();
				count += 1;
			}
		
	});
});

//modal natureza juridica
$(function(){
	$("#buscaAtividadesPericulosas").on('keyup', function(){
		var busca = $('#buscaAtividadesPericulosas').val();
		console.log(busca);
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/buscaAtividadesPericulosas',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#tbmodalAtividadesPericulosas tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Grupo</th>";
				cols += "<th>Atividade</th>";
				newRow.append(cols);
				$("#tbmodalAtividadesPericulosas").append(newRow);
			
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idativ+' name=codAtividadesPericulosas id=codAtividadesPericulosas></td>';
					cols += '<td>'+json[i].codativ+'</td>';
					cols += '<td>'+json[i].descgrupativ+'</td>';
					cols += '<td>'+json[i].descativ+'</td>';
					newRow.append(cols);
					$("#tbmodalAtividadesPericulosas").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitAtividadesPericulosas").on('click', function(){
		
		var codAtividadesPericulosas = $("input[name='codAtividadesPericulosas']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getAtividadesPericulosas',
			data:{codAtividadesPericulosas:codAtividadesPericulosas},
			success:function(json){
				
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				
				$("#codativModal").val(json.codativ);
				$("#descativModal").val(json.descativ);
			}
		});
	});
});


jQuery(function ($) {

 $(".sidebar-dropdown > a").click(function() {
  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
});
});
	
$(function(){

	$('[data-toggle="tooltip"]').tooltip();

});

/* COUNT DO CADCOMPANHIES */

(function($) {
		"use strict";
		function count($this){
		var current = parseInt($this.html(), 10);
		current = current + 1; /* Where 50 is increment */	
		$this.html(++current);
			if(current > $this.data('count')){
				$this.html($this.data('count'));
			} else {    
				setTimeout(function(){count($this)}, 50);
			}
		}        	
		$(".stat-count").each(function() {
		  $(this).data('count', parseInt($(this).html(), 10));
		  $(this).html('0');
		  count($(this));
		});
   })(jQuery);