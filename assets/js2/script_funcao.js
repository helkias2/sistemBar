function rediricionar(){
	window.location.href = BASE_URL+'/sstFuncao';
}


$(function(){
	carregarDados();
	function carregarDados(){
		  var datatable = $('#funcao_data').DataTable({
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
			  "url": BASE_URL + "/ajaxFuncao/seachVisualizarFuncao",
			  "type": 'POST',
				"data": function(d) {
					d.vlaction = "action";   
				},
			  "dataSrc":""
		  },
		  "columns":[
			  {data:"codfuncao"}, 
			  {data:"nomeempresa"}, {data:"nomesetor"},{data:"codcbo"},{data:"cargocbo"},
	  
			  {data:"funcdatainicio",
				"render": function (data, type, row, meta) { 
				  function dateToEN(date){  
					return date.split('-').reverse().join('/');
				  }; 
				  return  dateToEN(data);
				},
			},
			//   {data:"situacao",
			// 	   "render": function (data, type, row, meta) { 
			// 		  if( data === ''){
			// 			return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'Demitido'+'</a>';
			// 		  } else{
			// 			return '<a class="btn btn-info btn-sm">' +'ATIVO'+ '</a>';
			// 		  }
			// 	  }
			//   },
			  { data: "codfuncao",
				  "render": function (data, type, row, meta) { 
						  return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstFuncao/funcaoEdit/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }
			  },    
			  { data: "codfuncao",
				  "render": function (data, type, row, meta) { 
						  return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstFuncao/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
			  },
		],
	  
	});
		
	  $("#funcao_data").show();
	}
})
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

$(document).ready(function(){
    //var count = 0; 
    $('#btnFuncao').on('click', function(e){
        e.preventDefault();
        let CodFcEmpresa    	= $("input[name=CodFcEmpresa]").val();
        let nomFcEmpresa    	= $("input[name=nomFcEmpresa]").val();
        let nicFcEmpresa    	= $("input[name=nicFcEmpresa]").val();
        let codFcSetor    		= $("input[name=codsetor]").val();
        let setorFcDesenvol   	= $("input[name=setor_desenvolvimento]").val();
        let dataFcInicioCbo    	= $("input[name=datainiciocbo]").val();
        let codigoFcCbo 		= $("input[name=codigo_cbo]").val();
        let nomeFcCbo           = $("input[name=nome_cbo]").val();
        //let dataFcFimCbo        = $("input[name=datafimcbo]").val();
		//let codgfip             = $("input[name=codgfip]:checked").val();
		let descatividade       = $("#descatividade").val();

        var html = ''; 
        if(CodFcEmpresa !='' && nomFcEmpresa != '' && nicFcEmpresa != '' && codFcSetor != '' && setorFcDesenvol != '' && dataFcInicioCbo != '' && codigoFcCbo != '' && nomeFcCbo != ''){
            var count = 1;
            while(document.getElementById("Fc_codSetor"+count) != null){
                count += 1;
            }
                var html =
                    "<tr>"+
                    "<td>"+codFcSetor+"</td>"+"<input type=hidden value ='"+codFcSetor+"' name=FccodSetor"+count+" id=Fc_codSetor"+count+">"+
                    "<td>"+setorFcDesenvol+"</td>"+"<input type=hidden value ='"+setorFcDesenvol+"' name=FcsetorDesenvol" +count+" id=Fc_setorDesenvol"+count+">"+
                    "<td>"+codigoFcCbo+"</td>"+"<input type=hidden value ='"+codigoFcCbo+"' name=FccodigoCbo" +count+" id=Fc_codigoCbo"+count+">"+                   
                    "<td>"+nomeFcCbo+"</td>"+"<input type=hidden value ='"+nomeFcCbo+"' name=FcnomeCbo" +count+" id=Fc_nomeCbo"+count+">"+
                    "<td>"+dataFcInicioCbo+"</td>"+"<input type=hidden value ='"+dataFcInicioCbo+"' name=FcdataInicioCbo" +count+" id=Fc_dataInicioCbo"+count+">"+
                    //"<td>"+dataFcFimCbo+"</td>"+"<input type=hidden value ='"+dataFcFimCbo+"' name=FcdataFimCbo" +count+" id=Fc_dataFimCbo"+count+">"+
					"<td>"+descatividade+"</td>"+"<input type=hidden value ='"+descatividade+"' name=descatividade" +count+" id=Fc_dataFimCbo"+count+">"+
					//"<td>"+codgfip+"</td>"+"<input type=hidden value ='"+codgfip+"' name=codgfip" +count+" id=codgfip"+count+">"+
                    "<td><a href=javascript:; onclick= '" + excluirProd(this) +"'>Excluir</a></td></tr>";

            $('#tablaFcFuncao').append(html);
              
            limparCampos();
        }else{
            alert('Nao de Certo');
        }
    })

    function limparCampos(){
        $("#codsetor").val('');
        $("#setordesenvolvido").val('');
        $("#datainicio_cbo").val('');
        $("#codcbo").val('');
        $("#cbonome").val('');
        $("#datafim_cbo").val('');
		$("#descatividade").val('');
		
    };

    $("#btnFuncaoLimpar").on('click', function(){
        $("#tablaFcFuncao tr").remove();
            let id = $(obj).attr('data-id');
            $(this).closest('td').remove();
    });

    function excluirProd(obj){
        $("#tablaFcFuncao").on('click', 'tr',function(obj){
            let id = $(obj).attr('data-id');
            $(this).closest('tr').remove();
        });
    }
});

