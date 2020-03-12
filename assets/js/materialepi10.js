
$(document).ready(function() {
    
    var grid = $("#relmatepi_data").bootgrid({

    labels: {
        noResults: "Não existe Resultados",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} inscrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    caseSensitive: false,    
        formatters: {
            "commands": function(column, row) {
                return  "<button type=\"button\" class=\"btn btn-primary command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-print fa-lg\"></span> Visualizar</button>"; 
            }
        }
    }).on("loaded.rs.jquery.bootgrid", function() {
        grid.find(".command-edit").on("click", function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
            var url = BASE_URL+"/sstMaterialEpiView/getrelatorio/"+valor;
			window.open(url, "sstMaterialEpiView", "width=700,height=500");
        })
    });
});


$(document).ready(function(){
//------------------------Buscar Empresa------------------------------//

 $("#modalRelMatEmpresa").on('keyup',function(){
	var valmatemp = $("#buscaMatEmp").val();
    if(valmatemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxMaterialEpi/searchMatEmpresa',
            type: "POST",
            data: {valmatemp: valmatemp},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr"> <td id="codMatEmp">'+json[i].codempresa+'</td> <td id="descMatEmp">'+json[i].razaosocial+'</td><td id="nisMatEmp">'+json[i].nrmatricula+'</td></tr>';
                }
            $('#tabelamodalEmp').html(html);
            $('#tabelamodalEmp').show();
            
            }               
        })
    return false;
    } 
 });

$("input[name=buscaMatEmp]").keyup(function(){ //pega o css da tabela     
        var tabela = $(this).attr('alt');
        if( $(this).val() != ""){
            $("."+tabela+" tbody>tr").hide();
            $("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        } else{
            $("."+tabela+" tbody>tr").show();
        }
    }); 
    var val = "";
    $.extend($.expr[":"], {
        "contains-ci": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
    pegarvlores();
	function pegarvlores(){ 
		$("#tabelamodalEmp").on('click', 'tr', function (e) {
	    	e.preventDefault();
			$(this).toggleClass('ativo');
	    	$(this).siblings().removeClass('ativo');

	    	// var valcod = $(" #tiporisco_aso option:selected").text();
	    	var cmtemp = $(this).find('td[id=codMatEmp]').text();
	    	var dmtemp = $(this).find('td[id=descMatEmp]').text();
	    	var nismtemp = $(this).find('td[id=nisMatEmp]').text();
	    	jsonaso = {'codmtEmp':cmtemp, 'dmtEmp':dmtemp, 'nismtEmp':nismtemp};
	    	pegarvlaso(jsonaso);
		});
	}
   function pegarvlaso(jsonaso){ 	
		$("#enviaMatEmp").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsonaso != ''){	
				$("#matCodEmpresa").val(jsonaso.codmtEmp);
				$("#razaoMatEmpresa").val(jsonaso.dmtEmp);
				$("#cnpjMatEmpresa").val(jsonaso.nismtEmp);
			}
		$("#tabelamodalEmp tr").remove();
		});
	return false;
	}
	$("#enviaMatEmp").on('click', function(){
		$("#tabelamodalEmp tr").remove();
	});
});


//------------------------Buscar Funcionario------------------------------//
$("#modalRelMatFunc").on('blur',function(){

	var mtemp = $("#matCodEmpresa").val();
    if(mtemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxMaterialEpi/searchMatFuncionario',
            type: "POST",
            data: {mtemp: mtemp},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr"> <td id="codMatFunc">'+json[i].codfuncionario+'</td> <td id="descMatFunc">'+json[i].nomefuncionario+'</td><td id="nisMatFunc">'+json[i].cpf+'</td></tr>';
                }
            $('#tabelaModalFunc').html(html);
            $('#tabelaModalFunc').show();
            }               
        })
    }
    return false;  
 });

$("input[name=buscaMatFunc]").keyup(function(){ //pega o css da tabela     
        var tabela = $(this).attr('alt');
        if( $(this).val() != ""){
            $("."+tabela+" tbody>tr").hide();
            $("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        } else{
            $("."+tabela+" tbody>tr").show();
        }
    }); 
    var val = "";
    $.extend($.expr[":"], {
        "contains-ci": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
 pegarvlores();
	function pegarvlores(){ 
		$("#tabelaModalFunc").on('click', 'tr', function (e) {
	    	e.preventDefault();
			$(this).toggleClass('ativo');
	    	$(this).siblings().removeClass('ativo');

	    	// var valcod = $(" #tiporisco_aso option:selected").text();
	    	var cmtfunc = $(this).find('td[id=codMatFunc]').text();
	    	var dmtfunc = $(this).find('td[id=descMatFunc]').text();
	    	var nismtfunc = $(this).find('td[id=nisMatFunc]').text();
	    	jsonaso = {'codmtFunc':cmtfunc, 'dmtFunc':dmtfunc, 'nismtFunc':nismtfunc};
	    	pegarvlaso(jsonaso);
		});
	}
   function pegarvlaso(jsonaso){ 	
		$("#enviaMatFunc").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsonaso != ''){	
				$("#codMatFunc").val(jsonaso.codmtFunc);
				$("#nomeMatFunc").val(jsonaso.dmtFunc);
				$("#cpfMatEmpresa").val(jsonaso.nismtFunc);
			}else{
				alert("Digite Novamente");
			};

		$("#tabelaModalFunc tr").remove();
		});
	return false;
	}
	$("#enviaMatFunc").on('click', function(){
		$("#tabelaModalFunc tr").remove();
	});


$(document).ready(function() {
//------------------------Buscar Produtos Epi ------------------------------//
$("#produto_fabricante").on('keyup',function(e){
    e.preventDefault();		

	var valepi = $(this).val();
    var valempres = $("#matCodEmpresa").val();
 	$("#produto_fabricante").autocomplete({
	    source: function(request, response) {
	        	$.ajax({
		            url: BASE_URL+'/ajaxMaterialEpi/searchProdutoEpi',
		            type:'GET',
		            dataType: 'json',
		            data: { prodepi: valepi, valempres:valempres },
		            success: function(data) {
	               		response(data)	      
	             	},
	        	});
	    	},
	    	focus: function( event, ui ) {
	        	$("#produto_fabricante").val( ui.item.equipprotectindividual );
	        return false;
	    	},
	    	select: function( event, ui ) {
				$("#codigofuncepi").val( ui.item.codepi );
				$("#codigoca").val( ui.item.ca );
                function dateToEN(date){    
                    return date.split('-').reverse().join('/');
                };  
                var dat =  ui.item.datvencimentca;
                var dat =  dateToEN(dat);
                $("#datvencimeto").val( dat );
	        return false;
	    	}
    	})
    	.autocomplete( "instance" )._renderItem = function(ul, item) {
      		return $("<li>").append("<a><b> " + item.equipprotectindividual + "<br></a>").appendTo( ul );
        	var valorcidade = item.equipprotectindividual;
        	var valor = valorcidade.toUpperCase();
	    };	
	});
});
$(document).ready(function(){
	$("#btn_addepi").on('click', function(event){
		event.preventDefault();
			var codempresa  =  $("#matCodEmpresa").val();
			var descmat 	=  $("#buscar_matdescempresa").val();
			var codfunc   	=  $("#codMatFunc").val();
			var codcpf  	=  $("#busca_matcpf").val();
			var codepi  	=  $("#codigofuncepi").val();
			var descepi 	=  $("#produto_fabricante").val();
			var caepi   	=  $("#codigoca").val();
			var qtdepi  	=  $("#qtd_epi").val();
			if(qtdepi == ''){
				$('#qtd_epi').css({"background" : "#FF6347"}).focus();
				return false;
			}
			var tecnepi 	=  $("#tecnico_epi").val();
			html = '';
			for(var i = 0; i < codepi[i]; i++ ){
				html += '<tr style="background-color: #fff">'+'<td class="codempresa">'+codepi+'</td>'+
						'<td class="descepi">'+descepi+'</td>'+
						'<td class="caepi">'+caepi+'</td>'+
						'<td class="qtdepi">'+qtdepi+'</td>'+
						'<td class="tecnepi">'+tecnepi+'</td>'+
						'<td><button type="button" name="btn_relepi"  id="btn_relepi" class="btn btn-primary" onclick="valenviaepi('+codepi+','+codempresa+','+codfunc+','+qtdepi+')"> Gerar Relatorio</button></td>'+'</tr>';
			}			
			$("#matbody").append(html);
			$("#matbody").show();
			 limparCampos();
		})
		function limparCampos(){
			$("#codigofuncepi").val('');
			$("#produto_fabricante").val('');
			$("#codigoca").val('');
			$("#qtd_epi").val('');
			$("#tecnico_epi").val('');
			$("#datvencimeto").val('');
            //$("#matbody tr").remove();
		}
    })
        
	// ----------------------------------Buscar ---------------------------------//
	function valenviaepi(obj,obj2,obj3,obj4){
		$("#matbody tr").remove();
		openPopup(obj,obj2,obj3,obj4);
	};
	
	// --------------------------Buscar Produtos Epi ------------------------------//
	function openPopup(obj,obj2,obj3,obj4){
			var data = [obj,obj2,obj3,obj4];
			var url = BASE_URL+"/sstMaterialEpiView/relatoriosmat/"+data;
			window.open(url, "sstMaterialEpiView", "width=700,height=500");

		return false;
	};	


