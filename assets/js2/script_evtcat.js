/*-----------------------BUSCACAT----------------------------*/
$(function(){
	$("#buscaCodCat").on('keyup', function(){
		
		var busca = $('#buscaCodCat').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscarCodCat',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalCat tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>DESCRIÇÃO</th>";
				newRow.append(cols);
				$("#tbmodalCat").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idacidtrab+' name=idacidtrab id=idacidtrab></td>';
					cols += '<td>'+json[i].codacidtrab+'</td>';
					cols += '<td>'+json[i].descacidtrab+'</td>';
					newRow.append(cols);
					$("#tbmodalCat").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GETCAT------------------------*/
$(function(){
	$("#submitEvtCat").on('click', function(){
		
		var idacidtrab = $("input[name='idacidtrab']:checked").val();
		//console.log(idacidtrab);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getCodCat',
			data:{idacidtrab:idacidtrab},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#codacidtrab").val(json[0].codacidtrab);
				$("#descacidtrab").val(json[0].descacidtrab);				
			}
		});
	});
});

/*-----------------------BUSCA SITUAÇÃO GERADORA DE ACIDENTE ----------------------------*/
$(function(){
	$("#buscaSituacaoGeradoraAcidente").on('keyup', function(){
		
		var busca = $('#buscaSituacaoGeradoraAcidente').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscarSitGeradora',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalSituacaoGeradoraAcidente tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>DESCRIÇÃO</th>";
				newRow.append(cols);
				$("#tbmodalSituacaoGeradoraAcidente").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idsittrab+' name=idsittrab id=idsittrab></td>';
					cols += '<td>'+json[i].codsittrab+'</td>';
					cols += '<td>'+json[i].descricaosittrab+'</td>';
					newRow.append(cols);
					$("#tbmodalSituacaoGeradoraAcidente").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GET SITUAÇÃO GERADORA DE ACIDENTE------------------------*/
$(function(){
	$("#submitSituacaoGeradoraAcidente").on('click', function(){
		
		var idsittrab = $("input[name='idsittrab']:checked").val();
		//console.log(idacidtrab);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getSitGeradora',
			data:{idsittrab:idsittrab},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#codsittrab").val(json[0].codsittrab);
				$("#descricaosittrab").val(json[0].descricaosittrab);				
			}
		});
	});
});

/*-----------------------BUSCA COD LOGRADOURO----------------------------*/
$(function(){
	$("#buscaCodLograd").on('keyup', function(){
		
		var busca = $('#buscaCodLograd').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscaLograd',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalLograd tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>DESCRIÇÃO</th>";
				newRow.append(cols);
				$("#tbmodalLograd").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idtplograd+' name=idtplograd id=idtplograd></td>';
					cols += '<td>'+json[i].codtplograd+'</td>';
					cols += '<td>'+json[i].desctplograd+'</td>';
					newRow.append(cols);
					$("#tbmodalLograd").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GET LOGRADOURO------------------------*/
$(function(){
	$("#submitCodLograd").on('click', function(){
		
		var idtplograd = $("input[name='idtplograd']:checked").val();
		//console.log(idacidtrab);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getCodLograd',
			data:{idtplograd:idtplograd},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#codtplograd").val(json[0].codtplograd);
				$("#desctplograd").val(json[0].desctplograd);				
			}
		});
	});
});

/*-----------------------BUSCA COD MUNICIPIO----------------------------*/
$(function(){
	$("#buscaCodMunicipio").on('keyup', function(){
		
		var busca = $('#buscaCodMunicipio').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscaMunicipio',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalCodMunicipio tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>MUNICIPIO</th>";
				cols += "<th>UF</th>";

				newRow.append(cols);
				$("#tbmodalCodMunicipio").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].id+' name=id id=id></td>';
					cols += '<td>'+json[i].codigo+'</td>';
					cols += '<td>'+json[i].nome+'</td>';
					cols += '<td>'+json[i].uf+'</td>';
					newRow.append(cols);
					$("#tbmodalCodMunicipio").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GET LOGRADOURO------------------------*/
$(function(){
	$("#submitCodMunicipio").on('click', function(){
		
		var id = $("input[name='id']:checked").val();
		//console.log(idacidtrab);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getMunicipio',
			data:{id:id},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#evtCat_codMunicipio").val(json[0].codigo);
				$("#codMunicipio").val(json[0].codigo);
				$("#evtCat_municipio").val(json[0].nome);
				$("#evtCat_ufMunicipio").val(json[0].uf);				
			}
		});
	});
});

/*-----------------------BUSCA COD PAÍS----------------------------*/
$(function(){
	$("#buscaCodPais").on('keyup', function(){
		
		var busca = $('#buscaCodPais').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscaPais',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalCodPais tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>PAÍS</th>";

				newRow.append(cols);
				$("#tbmodalCodPais").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idpais+' name=idpais id=idpais></td>';
					cols += '<td>'+json[i].codpais+'</td>';
					cols += '<td>'+json[i].nomepais+'</td>';
					newRow.append(cols);
					$("#tbmodalCodPais").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GET PAIS------------------------*/
$(function(){
	$("#submitCodPais").on('click', function(){
		
		var idpais = $("input[name='idpais']:checked").val();
		//console.log(idacidtrab);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getPais',
			data:{idpais:idpais},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#evtCat_codPais").val(json[0].codpais);
				$("#evtCat_nomePais").val(json[0].nomepais);				
			}
		});
	});
});


/*-----------------------BUSCA COD TABELA17----------------------------*/
$(function(){
	$("#buscaCodDescnatlesao").on('keyup', function(){
		
		var busca = $('#buscaCodDescnatlesao').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscaDescnatlesao',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalDescnatlesao tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>DESCRIÇÃO</th>";

				newRow.append(cols);
				$("#tbmodalDescnatlesao").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idnatlesao+' name=idnatlesao id=idnatlesao></td>';
					cols += '<td>'+json[i].codnatlesao+'</td>';
					cols += '<td>'+json[i].descnatlesao+'</td>';
					newRow.append(cols);
					$("#tbmodalDescnatlesao").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GET TABELA17------------------------*/
$(function(){
	$("#submitDescnatlesao").on('click', function(){
		
		var idnatlesao = $("input[name='idnatlesao']:checked").val();
		//console.log(idacidtrab);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getDescnatlesao',
			data:{idnatlesao:idnatlesao},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#evtCat_codDesclesao").val(json[0].codnatlesao);
				$("#evtCat_descLesaotabela").val(json[0].descnatlesao);				
			}
		});
	});
});


/*-----------------------BUSCA COD TABELA13----------------------------*/
$(function(){
	$("#buscaCodParteAtinginda").on('keyup', function(){
		
		var busca = $('#buscaCodParteAtinginda').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscaParteAtingida',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalTabela13 tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>DESCRIÇÃO</th>";

				newRow.append(cols);
				$("#tbmodalTabela13").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idcorpoatin+' name=idcorpoatin id=idcorpoatin></td>';
					cols += '<td>'+json[i].codcorpoatin+'</td>';
					cols += '<td>'+json[i].desccorpoatin+'</td>';
					newRow.append(cols);
					$("#tbmodalTabela13").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GET TABELA13------------------------*/
$(function(){
	$("#submitCodParteAtingida").on('click', function(){
		
		var idcorpoatin = $("input[name='idcorpoatin']:checked").val();
		//console.log(idacidtrab);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getParteAtingida',
			data:{idcorpoatin:idcorpoatin},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#evtCat_codParteAtingida").val(json[0].codcorpoatin);
				$("#evtCat_descParteAtingida").val(json[0].desccorpoatin);				
			}
		});
	});
});


/*----------------MULTI LESÃO------------------------------*/
$(function(){
	$("#submitMultLesao").on('click', function(){
		/*	,orgMedico,*/
		
		var codParteAtingida  = $('#evtCat_codParteAtingida').val();
		var descParteAtingida = $('#evtCat_descParteAtingida').val();
		var lateralidade        = $('#evtCat_lateralidade').val();
		//$("#tiporisco_aso option:selected").text('');		
		var seleclateralidade   = $('#evtCat_laterdade option:selected').text();
		var lateralidadedesc = lateralidade+''+seleclateralidade;
		//orgao
		//desccid
		
		if(codParteAtingida != '' && lateralidade != null){
			var count = 1;
			while(document.getElementById("codParteAtingida"+count) != null){

				count += 1;
			}

			var cols = "";
			var newRow = $("<tr>");	
			cols += "<td>"+codParteAtingida+"</td><input type=hidden value='"+codParteAtingida+"'name=codParteAtingida"+count+" id='codParteAtingida"+count+"'/>";

			cols += "<td>"+descParteAtingida+"</td><input type=hidden value='"+descParteAtingida+"' name=descParteAtingida"+count+" id='descParteAtingida"+count+"'/>";

			cols += "<td>"+lateralidadedesc+"</td><input type=hidden value='"+lateralidadedesc+"' name=lateralidade"+count+" id='lateralidade"+count+"'/>";

			//<input type=hidden name=ExcluirAtestadoEvt/>
			newRow.append(cols);
			$("#tabelaParteAtingidaEvt").append(newRow);

			var rowCount = $('table#tabelaParteAtingidaEvt tbody tr:last').index() + 1;
			$('#qtdParteAtingida').val(rowCount);
			
			$('#evtCat_codParteAtingida').val('');
			$('#evtCat_descParteAtingida').val('');
			$('#evtCat_lateralidade').val('');

		}else{
			
			alert("NENHUM CAMPO PODE ESTAR VAZIO, POR FAVOR VERIFIQUE E TENTE NOVAMENTE!");
			$("#evtCat_lateridade").focus();
		}

	});

});

$("#tabelaParteAtingidaEvtBody").on('dblclick', 'tr',function(obj){
	let id = $(obj).attr('data-id');
	$(this).closest('tr').remove();
 		//console.log('executou');		
 		var rowCount = $('table#tabelaParteAtingidaEvt tbody tr:last').index() + 1;
 		$('#qtdParteAtingida').val(rowCount);

 	});


/*-----------------------BUSCA COD TABELA 14 E 15----------------------------*/
$(function(){
	$("#buscaCodAgenteAcusador").on('keyup', function(){
		
		var busca = $('#buscaCodAgenteAcusador').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscaAgenteAcusador',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalAgenteAcusador tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>DESCRIÇÃO</th>";

				newRow.append(cols);
				$("#tbmodalAgenteAcusador").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	

					

					if (json[i].codcausacid != undefined && json[i].codcausacid != "") {

						cols += '<td><input type=radio value='+json[i].idcausacid+' name=idcausacid id=idcausacid></td>';	
						cols += '<td>'+json[i].codcausacid+'</td>';
						cols += '<td>'+json[i].desccausacid+'</td>';
						newRow.append(cols);
					}

					if (json[i].codagentcausadordoenca != undefined && json[i].codagentcausadordoenca != "") {
						cols += '<td><input type=radio value='+json[i].idagentcausadordoenca+' name=idagentcausadordoenca id=idagentcausadordoenca></td>';
						cols += '<td>'+json[i].codagentcausadordoenca+'</td>';
						cols += '<td>'+json[i].descagentcausadordoenca+'</td>';
						newRow.append(cols);
					}

					$("#tbmodalAgenteAcusador").append(newRow);
				}		
			}
		});
	});
});


/*-----------------------GET TABELA 14------------------------*/
$(function(){
	$("#submitCodAgenteAcusador").on('click', function(){
		var idcausacid = $("input[name='idcausacid']:checked").val();
		//console.log(idacidtrab);	
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getAgenteAcusador14',
			data:{idcausacid:idcausacid},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#evtCat_codAgenteCausador").val(json[0].codcausacid);
				$("#evtCat_descAgenteCausador").val(json[0].desccausacid);
			}
		});
	});
});


/*-----------------------GET TABELA 14------------------------*/
$(function(){
	$("#submitCodAgenteAcusador").on('click', function(){
		var idagentcausadordoenca = $("input[name='idagentcausadordoenca']:checked").val();
		//console.log(idagentcausadordoenca);
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getAgenteAcusador15',
			data:{idagentcausadordoenca:idagentcausadordoenca},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);				
				$("#evtCat_codAgenteCausador").val(json[0].codagentcausadordoenca);
				$("#evtCat_descAgenteCausador").val(json[0].descagentcausadordoenca);
			}
		});
	});
});

/*----------------MULTI AGENTE CAUSADOR------------------------------*/
$(function(){
	$("#submitAgenteCausador").on('click', function(){
		/*	,orgMedico,*/
		
		var codAgenteCausador  = $('#evtCat_codAgenteCausador').val();
		var descAgenteCausador = $('#evtCat_descAgenteCausador').val();	
		//orgao
		//desccid
		
		if(codAgenteCausador != '' && descAgenteCausador != null){
			var count = 1;
			while(document.getElementById("codAgenteCausador"+count) != null){

				count += 1;
			}

			var cols = "";
			var newRow = $("<tr>");	
			cols += "<td>"+codAgenteCausador+"</td><input type=hidden value='"+codAgenteCausador+"'name=codAgenteCausador"+count+" id='codAgenteCausador"+count+"'/>";

			cols += "<td>"+descAgenteCausador+"</td><input type=hidden value='"+descAgenteCausador+"' name=descAgenteCausador"+count+" id='descAgenteCausador"+count+"'/>";
			//<input type=hidden name=ExcluirAtestadoEvt/>
			newRow.append(cols);
			$("#tabelaAgenteCausadorEvt").append(newRow);

			var rowCount = $('table#tabelaAgenteCausadorEvt tbody tr:last').index() + 1;
			$('#qtdItensAgenteCausador').val(rowCount);
			
			$('#evtCat_codAgenteCausador').val('');
			$('#evtCat_descAgenteCausador').val('');

		}else{
			
			alert("NENHUM CAMPO PODE ESTAR VAZIO, POR FAVOR VERIFIQUE E TENTE NOVAMENTE!");
			$("#evtCat_codAgenteCausador").focus();
			$("#evtCat_descAgenteCausador").focus();
		}

	});

});

$("#tabelaAgenteCausadorEvtBody").on('dblclick', 'tr',function(obj){
	let id = $(obj).attr('data-id');
	$(this).closest('tr').remove();
 		//console.log('executou');		
 		var rowCount = $('table#tabelaAgenteCausadorEvt tbody tr:last').index() + 1;
 		$('#qtdItensAgenteCausador').val(rowCount);

 	});

/*-----------------------BUSCA AMBIENTE S-1060----------------------------*/
$(function(){
	$("#buscaCodAmb1060").on('keyup', function(){
		var busca = $('#buscaCodAmb1060').val();
		var codempresa = $('#idEmpresaEvt').val();
		//console.log(busca);	
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/buscarCodAmb1060',
			data:{busca, codempresa:busca, codempresa},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				$("#tbmodalAmbiente1060 tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>NOME</th>";
				cols += "<th>INSCRIÇÃO.</th>";
				newRow.append(cols);
				$("#tbmodalAmbiente1060").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idevttabambiente+' name=idevttabambiente id=idevttabambiente></td>';
					cols += '<td>'+json[i].codamb+'</td>';
					cols += '<td>'+json[i].nmamb+'</td>';
					cols += '<td>'+json[i].nminscricao+'</td>';
					newRow.append(cols);
					$("#tbmodalAmbiente1060").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GET TABAMBIENTE S-1060------------------------*/
$(function(){
	$("#submitAmbiente1060").on('click', function(){
		
		var idevttabambiente = $("input[name='idevttabambiente']:checked").val();
		//console.log(idamb);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtCat/getCodTabAmb1060',
			data:{idevttabambiente:idevttabambiente},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#codAmb").val(json[0].codamb);
				$("#nmAmb").val(json[0].nmamb);
				$("#nrInsc").val(json[0].mninscricao);	
			}
		});
	});
});