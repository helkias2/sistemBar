function rediricionarrisco(){
	window.location.href = BASE_URL+'/sstRisco';
}


$(function(){
		carregarDados();
	function carregarDados(){
		  var rows_selected = [];
		  var datatable = $('#risco_data').DataTable({
		  select: {
			  style: 'multi'
		  },
		 "aaSorting": [[0, "desc" ]],
		 "processing": true,
		 "language": {
				  "lengthMenu": "Exibição _MENU_ Registros por página",
				  "zeroRecords": "Nada encontrado - desculpe",
				  "info": " Mostrando página _PAGE_ ate _PAGES_",
				  "sLoadingRecords": "Carregando...",
				  "sProcessing": "Processando...",
				  "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
				  "infoFiltered": "(filtrado de _MAX_ total linhas)",
				  "search":         "Pesquisar:",
				  "paginate": {
				  "first":      "Primeiro",
				  "last":       "Último",
				  "next":       "Próximo",
				  "previous":   "Anterior" 
			  },
		  },
		 "ajax":{
			  "url": BASE_URL + "/ajaxRisco/seachVisualizarRisco",
			  "type": 'POST',
				"data": function(d) {
					d.vlaction = "action";   
				},
			  "dataSrc":""
		  },
		  "columns":[
			  {data:"codigo"}, 
			  {data:"razaoempresarisco"}, {data:"nomefuncionariorisco"}, {data:"nomefuncao"}, {data:"gruporisco"},{data:"descrisco"},
			  { data: "codigo",
				  "render": function (data, type, row, meta) { 
						  return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstRisco/riscoEdit/' + data +'">' + 'Editar' + '</a>'; }
			  },    
			  { data: "codigo",
				  "render": function (data, type, row, meta) { 
						  return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstRisco/delete/' + data +'">' + 'Delete' + '</a>'; }
			  },
		  ],
	  
		});
		
	  $("#risco_data").show();
	}
})
	

//------------------------Buscar Risco ------------------------------//

$(document).ready(function(){
	$("select[name=tipformrisco]").on('change',function(){
		var riscoselect = $(this).val();
		console.log(riscoselect)
		if(riscoselect != ''){
			$.ajax({
				url: BASE_URL +'/ajaxRisco/seachlistrisco',
				type: 'POST',
				datatype: 'json',
				async: false,
				data:{ riscoselect: riscoselect },
				success: function(data){
					json = data.replace(/(\r\n|\n|\r)/gm,"");
					var json = $.parseJSON(json);
					var html = '';
					for(var i = 0; i < json.length && json != ''; ++i) {
						html += '  <tr id="trtr"> <td id="catrisco">'+json[i].descgrupfatriscambtrab+
								'</td> <td id="codrisco">'+json[i].codfatriscambtrab+
								'</td> <td id="descrisco">'+json[i].descgpfatriscambtrab+
								'</td></tr>';
					}
				$('#bodymodalrisco').html(html);
				$('#bodymodalrisco').show();
				},
			});
		return false;
		}
	});

	$("input[name=buscaRiscModal]").keyup(function(){ //pega o css da tabela 

		var tabela = $(this).attr('alt');
		if( $(this).val() != ""){
			$("."+tabela+" tbody>tr").hide();
			$("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
		} else{
			$("."+tabela+" tbody>tr").show();
		}
	});
	var vl ='';
	$.extend($.expr[":"], {
		"contains-ci": function(elem, i, match, array) {
			return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});
	pegarvlores();
	function pegarvlores(){ 
	$(document).ready(function(){
		$("#bodymodalrisco").on('click', 'tr', function (e) {
	    	e.preventDefault();
			$(this).toggleClass('ativo');
	    	$(this).siblings().removeClass('ativo');
	    	var valcod = $("#tipformrisco option:selected").text();
	    	var valcodrisc = $(this).find('td[id=codrisco]').text();
	    	var valdesc = $(this).find('td[id=descrisco]').text();
	    	jsonrisco = {'drisco':valcod, 'crisco':valcodrisc, 'descrisco':valdesc};
	    	pegarvlaso(jsonrisco);
		});
	});
}

	//------------- pesquisa riscos -------------------//
	function pegarvlaso(jsonrisco){ 	
		$("#enviariscof").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsonrisco != ''){	
					//'<tr style="background-color: #fff">'+
					$("#CategRisc").val(jsonrisco.drisco);
					$("#CodRisc").val(jsonrisco.crisco);
					$("#DescRisc").val(jsonrisco.descrisco);
				}
				$("#bodymodalrisco tr").remove();

			// if( jsonaso != ''){	
			// 	var html = '';
			// 	var i = -1;
			// 	for( i in jsonaso){
			// 		html = '<tr style="background-color: #fff">'+
			// 		'<td class="drisco">'+jsonaso.drisco+'</td>'+
			// 		'<td class="crisco">'+jsonaso.crisco+'</td>'+
			// 		'<td class="descrisco">'+jsonaso.descrisco+'</td>'+
			// 		'</tr>';
			// 	}
			// 	var codasuponto = $("#codrisco").val();
			// 	var codasuponto = codasuponto+";"+jsonaso.crisco
			// 	codasupont = codasuponto.replace(/(\r\n|\n|\r)/gm,"");

			// 	//console.log(codasupont);
			// 	$("#codrisco").val(codasupont);

			// 	var categoria = $("#codcategorisco").val();
			// 	var categoria = categoria+"-"+jsonaso.drisco
			// 	catego = categoria.replace(/(\r\n|\n|\r)/gm,"");
			// 	//console.log(catego);
			// 	$("#codcategorisco").val(catego);


			// $("#bodymodalrisco").append(html);
			// $("#bodymodalrisco").show();
			// }
		//jsonaso = '';
		$("#tablemodalRisco tr").remove();
		});
	return false;
	}
	$("#enviariscof").on('click', function(){
	$("#bodymodalrisco tr").remove();
	});

	$("#fechariscof").on('click', function(){
	$("#bodymodalrisco tr").remove();
	});
});

//------------------------Buscar CBO  ------------------------------//
	$(document).ready(function(){
	$("#modalRelatorioCbo").on('keyup',function(){
	//$("#buscCbofamilia").on('change',function(){
		
		var   cboselect = $("#buscCbofamilia").val();
		var     cbodesc = $("#buscCboDesc").val();	
		if(cboselect != '' || cbodesc != ''){
			$.ajax({
				url: BASE_URL +'/ajax/seachcbo',
				type: 'POST',
				datatype: 'json',
				async: false,
				data:{ cboselect: cboselect, cbodesc: cbodesc},
				success: function(data){
					json = data.replace(/(\r\n|\n|\r)/gm,"");
					var json = $.parseJSON(json);
					var html = '';
					for( var i = 0; i < json.length && json != ''; ++i) {
						html += '  <tr id="trtr"> <td id="codigcbo">'+json[i].codcbo+'</td> <td id="codcbocup">'+json[i].ocupacao+'</td><td id="desccbo">'+json[i].nome+'</td></tr>';
					}
				$('#tabelamodalcbo').html(html);
				$('#tabelamodalcbo').show();
				},
			});
		return false;
	}
	});

	$("input[name=buscaCboModal]").keyup(function(){ //pega o css da tabela 

		var tabela = $(this).attr('alt');
		if( $(this).val() != ""){
			$("."+tabela+" tbody>tr").hide();
			$("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
		} else{
			$("."+tabela+" tbody>tr").show();
		}
	});
	var vl ='';
	$.extend($.expr[":"], {
		"contains-ci": function(elem, i, match, array) {
			return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});
	pegarvlores();
	function pegarvlores(){ 
	$(document).ready(function(){
		$("#tabelamodalcbo").on('click', 'tr', function (e) {
	    	e.preventDefault();
			$(this).toggleClass('ativo');
	    	$(this).siblings().removeClass('ativo');

	    	//var valcod = $(" #tiporisco option:selected").text();
	    	var valcboFa = $(this).find('td[id=codigcbo]').text();
	    	var valcboOc = $(this).find('td[id=codcbocup]').text();
	    	var valcboDes = $(this).find('td[id=desccbo]').text();
	    	jsonaso = {'fcbo':valcboFa, 'cdcbo':valcboOc, 'descbo':valcboDes};
	    	pegarvlaso(jsonaso);
		});
	});
	}

	// ------------- PEGAR VALORES CBO -------------------//
	function pegarvlaso(jsonaso){ 	
		$("#enviacbo").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsonaso != ''){	
					$("#CategCbo").val(jsonaso.fcbo);
					$("#DescCbo").val(jsonaso.descbo);
				}
				$("#tabelamodalcbo tr").remove();

		});
	// return false;
 	}
	$("#fecnaaso").on('click', function(){
	$("#tabelamodalcbo tr").remove();
	});

})

$(document).ready(function(){
	$("#DadosFuncionario").on('keyup', function(){
		let buscafuncionario = $("#buscaDado_funcionario").val();
		if(buscafuncionario != ''){
		$.ajax({
			url: BASE_URL+ "/ajaxRisco/listEmpresaDados",
			type: 'POST',
			datatype: 'json',
			async: false,
			data: {buscafuncionario:buscafuncionario},
			success: function(data){
				json = data.replace(/(\r\n|\n|\r)/gm,"");
					var json = $.parseJSON(json);
					var html = '';
					for( var i = 0; i < json.length && json != ''; ++i) {
						html += '  <tr id="trtr"> <td id="coddbempresa">'+json[i].codempresa+'</td> <td id="nomdbempresa">'+json[i].razaosocial+'</td><td id="cnpjdbempresa">'+json[i].nrmatricula+'</td></tr>';
					}
				$('#bodyDdFuncionario').html(html);
				$('#bodyDdFuncionario').show();
				},
				error: function (xhr, ajaxOptions, thrownError) {
			        alert(xhr.status);
			        alert(thrownError);
			    },

			})
		return false;
		}
	})
	$("input[name=tableDdFuncionario]").keyup(function(){ //pega o css da tabela 
		var tabela = $(this).attr('alt');
		if( $(this).val() != ""){
			$("."+tabela+" tbody>tr").hide();
			$("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
		} else{
			$("."+tabela+" tbody>tr").show();
		}
	});
	var vl ='';
	$.extend($.expr[":"], {
		"contains-ci": function(elem, i, match, array) {
			return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});
	pegarvlores();
	function pegarvlores(){ 
	$(document).ready(function(){
		$("#bodyDdFuncionario").on('click', 'tr', function (e) {
	    	e.preventDefault();
			$(this).toggleClass('ativo');
	    	$(this).siblings().removeClass('ativo');
	    	var valcodDbEmp = $(this).find('td[id=coddbempresa]').text();
	    	var valnomeDbEmp= $(this).find('td[id=nomdbempresa]').text();
	    	var valcnpjDbEmp = $(this).find('td[id=cnpjdbempresa]').text();
	    	jsondbEmpresa = {'codigoEmpresa':valcodDbEmp, 'nomedbEmpresa':valnomeDbEmp, 'cnpjEmpresa':valcnpjDbEmp};
	    	pegarvlaso(jsondbEmpresa);
		});
	});
}
	function pegarvlaso(jsondbEmpresa){ 	
		$("#enviadbfunc").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsondbEmpresa != ''){	
				$("#CodigoFcEmpresaid").val(jsondbEmpresa.codigoEmpresa);
				$("#nomeFcEmpresaid").val(jsondbEmpresa.nomedbEmpresa);
				$("#cnpjFcEmpresaid").val(jsondbEmpresa.cnpjEmpresa);
			}
			$("#bodyDdFuncionario tr").remove();
		});
	return false;
	}
	
	$("#enviadbfunc").on('click', function(){
		$("#bodyDdFuncionario tr").remove();
	});

	$("#fechedbfunc").on('click', function(){
		$("#bodyDdFuncionario tr").remove();
	});

})


$(document).ready(function(){
	$("#modalDadosEmpSetor").on('keyup', function(){
		let buscaEmpresa  = $("#CodigoFcEmpresaid").val();
		let buscasetoremp = $("#buscaDados_Setor").val();
		if(buscasetoremp != '' || buscaEmpresa != ''){
		$.ajax({
			url: BASE_URL+ "/ajaxRisco/buscaDadosFuncao",
			type: 'POST',
			datatype: 'json',
			async: false,
			data: {buscasetoremp:buscasetoremp, buscaEmpresa:buscaEmpresa},
			success: function(data){
				json = data.replace(/(\r\n|\n|\r)/gm,"");
					var json = $.parseJSON(json);
					var html = '';
					for( var i = 0; i < json.length && json != ''; ++i) {
						html += ' <tr id="trtr"> <td id="codsetorfunc">'+json[i].codfuncionario+
								'</td> <td id="nomesetorfunc">'+json[i].nomefuncionario+
								'</td><td id="cpfsetorfunc">'+json[i].cpf+
								'</td><td id="nomestfunc">'+json[i].nomesetor+
								'</td><td id="codcbofunc" style="display:none">'+json[i].codcbo+
								'</td><td id="codsetorfc" style="display:none">'+json[i].codsetor+
								'</td><td id="nomecbofuncao">'+json[i].cargocbo+
								'</td><td style="display:none"id="codfuncao">'+json[i].codfuncao+
								'</td></tr>';
					}
				$('#bodyDadosSetor').html(html);
				$('#bodyDadosSetor').show();
			}
		})
	return false;
	}
})

	$("input[name=tableDdFuncionario]").keyup(function(){ //pega o css da tabela 
		var tabela = $(this).attr('alt');
		if( $(this).val() != ""){
			$("."+tabela+" tbody>tr").hide();
			$("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
		} else{
			$("."+tabela+" tbody>tr").show();
		}
	});
	var vl ='';
	$.extend($.expr[":"], {
		"contains-ci": function(elem, i, match, array) {
			return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});
	pegarvlores();
	function pegarvlores(){ 
	$(document).ready(function(){
		$("#bodyDadosSetor").on('click', 'tr', function (e) {
	    	e.preventDefault();
			$(this).toggleClass('ativo');
	    	$(this).siblings().removeClass('ativo');

	    	//var valcod = $(" #tiporisco option:selected").text();
	    	var idFuncionario          = $(this).find('td[id=codsetorfunc]').text();
	    	var nomeStFuncionario      = $(this).find('td[id=nomesetorfunc]').text();
	    	var docStFuncionario       = $(this).find('td[id=cpfsetorfunc]').text();
	    	var codsetorf              = $(this).find('td[id=codsetorfc]').text();
	    	var codigStFuncionario     = $(this).find('td[id=nomestfunc]').text();
	    	var nomecboFuncionario     = $(this).find('td[id=codcbofunc]').text();
	    	var nomecboFuncao          = $(this).find('td[id=nomecbofuncao]').text();
			var codFuncaof              = $(this).find('td[id=codfuncao]').text();
	    	jsonsetorfuncao = {
	    			'idfuncionario':idFuncionario, 
	    			'nomefuncionario':nomeStFuncionario, 
	    			'docfuncionario':docStFuncionario, 
	    			'codigosetor':codsetorf, 
	    			'codsetorfuncionario':codigStFuncionario, 
	    			'codcbofuncionario':nomecboFuncionario, 
	    			'nomecbofuncionario':nomecboFuncao,
					'codigofunao':codFuncaof
	    		};
	    	pegarvlaso(jsonsetorfuncao);
		});
	});
	}

	// ------------- PEGAR VALORES CBO -------------------//
	function pegarvlaso(jsonsetorfuncao){ 	
		$("#enviaSetorEmp").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsonsetorfuncao != ''){	
					$("#codigoFuncionario_Risco").val(jsonsetorfuncao.idfuncionario);
					$("#nomeFuncionario_Risco").val(jsonsetorfuncao.nomefuncionario);
					$("#docFuncionaro_Risco").val(jsonsetorfuncao.docfuncionario);
					$("#codsetorid").val(jsonsetorfuncao.codigosetor);
					$("#nomeSetor_Risco").val(jsonsetorfuncao.codsetorfuncionario);
					$("#codcbo_Funcao").val(jsonsetorfuncao.codcbofuncionario);
					$("#nomecbo_Funcao").val(jsonsetorfuncao.nomecbofuncionario);
					
					$("#codfuncao").val(jsonsetorfuncao.codigofunao);
				}
				$("#bodyDadosSetor tr").remove();

		});
	// return false;
 	}
	$("#enviaSetorEmp").on('click', function(){
		$("#bodyDadosSetor tr").remove();
	});

	$("#fecheSetorEmp").on('click', function(){
		$("#bodyDadosSetor tr").remove();
	});

})


$(function(){
	$("#excluirTabelaMultFuncionario").on('click', function(){
		$("#tabelaMultFuncionario td").remove();
		var count = 1;
			while(document.getElementById("codfuncionario"+count) != null){
				$("#codfuncionario"+count).remove();
				$("#nomefuncionario"+count).remove();
				$("#cpf"+count).remove();
				$("#codsetor"+count).remove();
				$("#codsetor"+count).remove();
				$("#nomesetor"+count).remove();
				$("#codcbo"+count).remove();
				$("#funcao"+count).remove();
				$("#codfuncao"+count).remove();
				
				count += 1;
			}
		
	});
});


$(function(){
	$("#submitMultFunc").on('click', function(){
		
		var cpfFunc = $("input[name='idFuncionarioModal']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajax/getFuncionario',
			data:{cpfFunc:cpfFunc},
			success:function(json){
				console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				$("#cpfFunc").val(json[0].cpf);
				$("#nomeFunc").val(json[0].nomefuncionario);
				$("#nisFunc").val(json[0].pis);
				$("#codfuncionario").val(json[0].codfuncionario);
				$("#matriculaFunc").val(json[0].matriculaempregador);
				$("#nomeSetorFuncionario").val(json[0].nomesetor);
				
				$("#funcaoFuncionario").val(json[0].funcao);
				var codfuncionario = json[0].codfuncionario;
				
				var count = 1;
				while(document.getElementById("codfuncionario"+count) != null){
					 
					count += 1;
				}

     				var cols = "";
					var newRow = $("<tr>");	
					cols += '<td>'+json[0].codfuncionario+'</td><input type=hidden value='+json[0].codfuncionario+' name=codfuncionario'+count+' id=codfuncionario'+count+'><input type=hidden value='+json[0].codfuncao+' name=codfuncao'+count+' id=codfuncao'+count+'> ';

					cols += "<td>"+json[0].nomefuncionario+"</td><input type=hidden value='"+json[0].nomefuncionario+"' name=nomefuncionario"+count+" id=nomefuncionario"+count+">";
				
					cols += '<td>'+json[0].cpf+'</td><input type=hidden value='+json[0].cpf+' name=cpf'+count+' id=cpf'+count+'>';
					
					cols += '<td>'+json[0].codsetor+'</td><input type=hidden value='+json[0].codsetor+' name=codsetor'+count+' id=codsetor'+count+'>';
				
					cols += "<td>"+json[0].nomesetor+"</td><input type=hidden value='"+json[0].nomesetor+"' name=nomesetor"+count+" id=setor"+count+">";
				
					cols += '<td>'+json[0].codcbo+'</td><input type=hidden value='+json[0].codcbo+' name=codcbo'+count+' id=codcbo'+count+'>';
				
					cols += "<td>"+json[0].funcao+"</td><input type=hidden value='"+json[0].funcao+"' name=funcao"+count+" id=funcao"+count+">";
				
					newRow.append(cols);
					$("#tabelaMultFuncionario").append(newRow);
				
			
			}
		});
	});
});




$(function(){
	$("#submitMultRisco").on('click', function(){
		
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
				
				
					var count = 1;
					while(document.getElementById("codFatRisc"+count) != null){

						count += 1;
					}
				
					cols += "<td>"+json[0].descgrupfatriscambtrab+"</td><input type=hidden value='"+json[0].descgrupfatriscambtrab+"' name=categoriaRisco"+count+" id=categoriaRisco"+count+">";

					cols += '<td>'+json[0].codfatriscambtrab+'</td><input type=hidden value='+json[0].codfatriscambtrab+' name=codFatRisc'+count+' id=codFatRisc'+count+'>';

					cols += "<td>"+json[0].descgpfatriscambtrab+"</td><input type=hidden value='"+json[0].descgpfatriscambtrab+"'  name=descricaoRisco"+count+" id=descricaoRisco"+count+">";
					
					newRow.append(cols);
					$("#tabelaMultRisco").append(newRow);
			}
		});
	});
});

$(function(){
	$("#excluirTabelaMultRisco").on('click', function(){
		$("#tabelaMultRisco td").remove();
		var count = 1;
			while(document.getElementById("codFatRisc"+count) != null){
				$("#codFatRisc"+count).remove();
				$("#categoriaRisco"+count).remove();
				$("#descricaoRisco"+count).remove();
				count += 1;
			}
		
	});
});

