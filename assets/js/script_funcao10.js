function rediricionar(){
	window.location.href = BASE_URL+'/sstFuncao';
}

$(function(){

    $('#funcaodata').hide();

    $("#funcao_data").bootgrid({

        cache: false,
        labels: {
            noResults: "Não existe Resultados",
            search: "pesquisa",
            infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
            responsiveTable: 'table-responsive'+ 'data-row-id'
        },    
        caseSensitive: false,    
        })
        
    });

$(document).ready(function(){
	$("#ModalDadosEmpresa").on('keyup', function(){
		let buscaempresa = $("#buscaDado_Emp").val();
		if(buscaempresa != ''){
		$.ajax({
			url: BASE_URL+ "/ajaxFuncao/searchFuncaoEmpresa",
			type: 'POST',
			datatype: 'json',
			async: false,
			data: {buscaempresa:buscaempresa},
			success: function(data){
				json = data.replace(/(\r\n|\n|\r)/gm,"");
					var json = $.parseJSON(json);
					var html = '';
					for( var i = 0; i < json.length && json != ''; ++i) {
						html += '  <tr id="trtr"> <td id="coddbempresa">'+json[i].codempresa+'</td> <td id="nomdbempresa">'+json[i].razaosocial+'</td><td id="cnpjdbempresa">'+json[i].nrmatricula+'</td></tr>';
					}
				$('#bodyDdEmpresa').html(html);
				$('#bodyDdEmpresa').show();
				},
			})
		return false;
		}
	})
	$("input[name=tableDdEmpresa]").keyup(function(){ //pega o css da tabela 
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
		$("#bodyDdEmpresa").on('click', 'tr', function (e) {
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
		$("#enviadbemp").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsondbEmpresa != ''){	
				$("#CodFc_Empresa").val(jsondbEmpresa.codigoEmpresa);
				$("#nomFc_Empresa").val(jsondbEmpresa.nomedbEmpresa);
				$("#nicFc_Empresaid").val(jsondbEmpresa.cnpjEmpresa);
			}
			$("#bodyDdEmpresa tr").remove();
		});
	return false;
	}
	$("#enviadbemp").on('click', function(){
		$("#bodyDdEmpresa tr").remove();
	});
	$("#fechedbemp").on('click', function(){
		$("#bodyDdEmpresa tr").remove();
	});
})

/// ------- SETOR ---------//
$(document).ready(function(){
	$("#modalSetorFuncao").on('keyup', function(){

		var busca = $('#busca_SetorFuncao').val();
		var codempresa = $('#CodFc_Empresa').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxFuncao/buscaSetorFuncao',
			data:{busca:busca, codempresa:codempresa},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");				
				var json = JSON.parse(json);

				$("#bodySetorFuncao tr").remove();
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idsetor+' name=idsetor id=idsetor></td>';
					cols += '<td>'+json[i].codsetor+'</td>';
					cols += '<td>'+json[i].setordesenvolvido+'</td>';
					newRow.append(cols);
				$("#bodySetorFuncao").append(newRow);
				}
			}
		});
	});
});

$(document).ready(function(){
	$("#sendSetor").on('click', function(){
		
		var idsetor = $("input[name='idsetor']:checked").val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxFuncao/getSetorFuncao',
			data:{idsetor:idsetor},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);

				$("#codsetor").val(json[0].codsetor);
				$("#setordesenvolvido").val(json[0].setordesenvolvido);
				$("#desc_ghe").val(json[0].gpanalitcsetor);
				//$("#razaosocialsetor").val(json[0].razaosocial);
				//$("#localtrabalho").val(json[0].localtrabempresa);
			}
		});
	});
});


$(document).ready(function(){
	$("#modalCboDbFuncao").on('keyup', function(){
		let buscacbo = $("#buscaDado_CBO").val();
		console.log(buscacbo);
		if(buscacbo != ''){
		
		$.ajax({
			url: BASE_URL+ "/ajaxFuncao/setFuncaoCBOModal",
			type: 'POST',
			datatype: 'json',
			async: false,
			data: {buscacbo:buscacbo},
			success: function(data){
				console.log(data)
				json = data.replace(/(\r\n|\n|\r)/gm,"");
					var json = $.parseJSON(json);
					var html = '';
					for( var i = 0; i < json.length && json != ''; ++i) {
						html += '  <tr id="trtr"> <td id="coddbempresa">'+json[i].codcbo+'</td> <td id="nomdbempresa">'+json[i].cbonome+'</td></tr>';
					}
				$('#bodyDdFuncaoCBO').html(html);
				$('#bodyDdFuncaoCBO').show();
				},
			})
		return false;
		}
	})
	$("input[name=buscaDado_Emp]").keyup(function(){ //pega o css da tabela 
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
		$("#bodyDdFuncaoCBO").on('click', 'tr', function (e) {
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
		$("#enviadbCBO").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsondbEmpresa != ''){	
				$("#codcbo").val(jsondbEmpresa.codigoEmpresa);
				$("#cbonome").val(jsondbEmpresa.nomedbEmpresa);
			}
			$("#bodyDdFuncaoCBO tr").remove();
		});
	return false;
	}
	$("#enviadbCBO").on('click', function(){
		$("#bodyDdFuncaoCBO tr").remove();
	});
	$("#fechedbCBO").on('click', function(){
		$("#bodyDdFuncaoCBO tr").remove();
	});
})
