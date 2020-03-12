/*------------------------Busca Codico de indentificação de doenças------------------------------------*/
$(function(){
	$("#buscaCodigoCid").on('keyup', function(){
		//console.log('teste');
		var busca = $('#buscaCodigoCid').val();
		
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/buscaCid',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
		
				
				$("#tbmodalCodigoCid tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Descrição</th>";
				newRow.append(cols);
				$("#tbmodalCodigoCid").append(newRow);
			
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idCid+' name=codCid id=codCid></td>';
					cols += '<td>'+json[i].idCid+'</td>';
					cols += '<td>'+json[i].descricaoCid+'</td>';
					newRow.append(cols);
					$("#tbmodalCodigoCid").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitCodigoCid").on('click', function(){
		
		var codCid = $("input[name='codCid']:checked").val();
//		console.log(codmtvafast);
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/getCid',
			data:{codCid:codCid},
			success:function(json){

				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);

				$("#codCid").val(json[0].idCid);
				$("#descricaoCid").val(json[0].descricaoCid);
			}
		});
	});
});



/*---------------------Motivo Afastamento------------------------------*/
$(function(){
	$("#buscaMtvAfast").on('keyup', function(){
		//console.log('teste');
		var busca = $('#buscaMtvAfast').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/buscaMtvAfast',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				
				$("#tbmodalMtvAfst tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Descrição</th>";
				newRow.append(cols);
				$("#tbmodalMtvAfst").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idmotivafast+' name=mtvAfast id=mtvAfast></td>';
					cols += '<td>'+json[i].codmotivafast+'</td>';
					cols += '<td>'+json[i].descmotivafast+'</td>';
					newRow.append(cols);
					$("#tbmodalMtvAfst").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitMtvAfast").on('click', function(){
		
		var codmtvafast = $("input[name='mtvAfast']:checked").val();
		//console.log(codmtvafast);
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/getMtvAfast',
			data:{codmtvafast:codmtvafast},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#codMtvAfst").val(json[0].codmotivafast);
				$("#descMtvAfast").val(json[0].descmotivafast);
	
			}
		});
	});
});

/*---------------------Categoria Funcionario------------------------------*/
$(function(){
	$("#buscaCategoriaFuncModalEvtAfast").on('keyup', function(){
		//console.log('teste');
		var busca = $('#buscaCategoriaFuncModalEvtAfast').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/buscaCategoriaFunc',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#tbmodalCategoriaFunc tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Código</th>";
				cols += "<th>Descrição</th>";
				newRow.append(cols);
				$("#tbmodalCategoriaFunc").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idempreg+' name=catFuncEvt id=catFuncEvt></td>';
					cols += '<td>'+json[i].codigoempreg+'</td>';
					cols += '<td>'+json[i].descempreg+'</td>';
					newRow.append(cols);
					$("#tbmodalCategoriaFunc").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitCategoriaFuncEvtAfast").on('click', function(){
		
		var catFuncEvt = $("input[name='catFuncEvt']:checked").val();
		//console.log(codmtvafast);
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/getbuscaCategoriaFunc',
			data:{catFuncEvt:catFuncEvt},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				$("#codCateFuncEvt").val(json.codigoempreg);
	
			}
		});
	});
});



/*----------------Atestado------------------------------*/
$(function(){
	$("#submitMultAtestado").on('click', function(){
	/*	,orgMedico,*/
		
		var nomeMedico = $('#nmMedico').val();
		var orgMedico = $('#orgMedico').val();
		var inscricaoMedico = $('#nrInsOrg').val();
		var ufMedico = $('#ufMedicoDoc').val();
		var codCid = $('#codCid').val();
		var descricaoCid = $('#descricaoCid').val();
		var diasAfastado = $('#diasAfast').val();
		
		//orgao
		//desccid
		
		if(nomeMedico != '' && diasAfastado != ''){
			var count = 1;
			while(document.getElementById("nomeMedico"+count) != null){

				count += 1;
			}

			var cols = "";
			var newRow = $("<tr>");	
			cols += "<td>"+nomeMedico+"</td><input type=hidden value='"+nomeMedico+"'name=nomeMedico"+count+" id='nomeMedico"+count+"'/>";

			cols += "<td>"+orgMedico+"</td><input type=hidden value='"+orgMedico+"' name=orgMedico"+count+" id='orgMedico"+count+"'/>";

			cols += "<td>"+inscricaoMedico+"</td><input type=hidden value='"+inscricaoMedico+"' name=inscricaoMedico"+count+" id='inscricaoMedico"+count+"'/>";

			cols += '<td>'+codCid+'</td><input type=hidden value='+codCid+' name=codCid'+count+' id=codCid'+count+'/>';

			cols += "<td>"+descricaoCid+"</td><input type=hidden value='"+descricaoCid+"' name=descricaoCid"+count+" id=descricaoCid"+count+"/>";

			cols += '<td>'+diasAfastado+'</td><input type=hidden value='+diasAfastado+' name=diasAfastado'+count+' id=diasAfastado'+count+'/>';

			cols += '<td>'+ufMedico+'</td><input type=hidden value='+ufMedico+' name=ufMedico'+count+' id=ufMedico'+count+'/>';

			//<input type=hidden name=ExcluirAtestadoEvt/>
			newRow.append(cols);
			$("#tabelaAtestadoEvt").append(newRow);

			var rowCount = $('table#tabelaAtestadoEvt tbody tr:last').index() + 1;
			$('#qtdItensAtestado').val(rowCount);
			
			$('#nmMedico').val('');
			$('#orgMedico').val('');
			$('#nrInsOrg').val('');
			$('#ufMedicoDoc').val('');
			$('#codCid').val('');
			$('#descricaoCid').val('');
			$('#diasAfast').val('');
		}
			
	});
});

	$("#tabelaAtestadoEvtBody").on('dblclick', 'tr',function(obj){
		let id = $(obj).attr('data-id');
		$(this).closest('tr').remove();
 		console.log('executou');		
		var rowCount = $('table#tabelaAtestadoEvt tbody tr:last').index() + 1;
		$('#qtdItensAtestado').val(rowCount);

	});




/*-------------------Busca Médico------------------------*/
$(function(){
	$("#buscaMedicoEvtAfastTemp").on('keyup', function(){
		var busca = $('#buscaMedicoEvtAfastTemp').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/buscaMedico',
			data:{busca:busca},
			success:function(json){
				console.log(json);
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
	$("#submitMedicoEvtAfastTemp").on('click', function(){
		
		var codMedico = $("input[name='codMedico']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/getMedico',
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
				$("#orgMedico").val(json[0].identprofissional);
				
	
			}
		});
	});
});

/*--------------------onusCessao--------------------------*/

$(function(){
	$("#onusCessaoEvtAfast").on('click', function(){
		if($("#onusCessaoEvtAfast").val() == 0){
			document.getElementById("cnpjOrgEntEvtAfast").readOnly = true;
			$("#cnpjOrgEntEvtAfast").val('');
		}else{
			document.getElementById("cnpjOrgEntEvtAfast").readOnly = false;
			document.getElementById("cnpjSindEvtAfast").readOnly = true;
			$("#onusRemuneracaoEvtAfast").val(0);
			$("#tpAcidTransEvtAfast").val(0);
		}
	});
});
/*----------------------onusRemuneracao----------------------------*/
$(function(){
	$("#onusRemuneracaoEvtAfast").on('click', function(){
		if($("#onusRemuneracaoEvtAfast").val() == 0){
			document.getElementById("cnpjSindEvtAfast").readOnly = true;
			$("#cnpjSindEvtAfast").val('');
		}else{
			document.getElementById("cnpjSindEvtAfast").readOnly = false;
			document.getElementById("cnpjOrgEntEvtAfast").readOnly = true;
			$("#onusCessaoEvtAfast").val(0);
			$("#tpAcidTransEvtAfast").val(0);
		}
	});
});

/*-----------------------Tipo Acidente Trasito-----------------------*/

$(function(){
	$("#tpAcidTransEvtAfast").on('click', function(){
		if($("#tpAcidTransEvtAfast").val() != 0){
			document.getElementById("cnpjSindEvtAfast").readOnly = true;
			$("#cnpjSindEvtAfast").val('');
			$("#cnpjOrgEntEvtAfast").val('');
			document.getElementById("cnpjOrgEntEvtAfast").readOnly = true;
			$("#onusCessaoEvtAfast").val(0);
			$("#onusRemuneracaoEvtAfast").val(0);
		}
	});
});


/*-----------------------Empresa-----------------------------------*/
/*-----------------------Empresa-------------------------------------*/

$(function(){
	$("#buscaEmpresaModalEvtAfast").on('keyup', function(){
		var busca = $('#buscaEmpresaModalEvtAfast').val();
		//console.log(busca);
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/buscaEmpresa',
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
	$("#submitEmpresaEvtAfast").on('click', function(){		
		var codEmpresa = $("input[name='codEmpresa']:checked").val();
//		console.log(codmtvafast);
		$.ajax({		
			type:'POST',
			url:BASE_URL+'/ajaxEvtAfastTemp/getEmpresa',
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
				$("#tipoMatriculaEmpresa").val(json[0].tipomatricula);
				$("#razsocialEvt").val(json[0].razaosocial);
				$("#matriculaEvt").val(json[0].nrmatricula);
				
				$("#nomeFunc").val('');
				$("#cpfFunc").val('');
				$("#matriculaFunc").val('');
				$("#nisFunc").val('');
				$("#codCateFunc").val('');
				    
				
				
			}
		});
	});
});



