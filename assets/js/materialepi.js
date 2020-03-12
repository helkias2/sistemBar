$(function(){
	carregarDados();
	function carregarDados(){
		var datatable = $('#relmatepi_data').DataTable({
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
				"url": BASE_URL + "/ajaxEpi/listMaterialEpi",
				"type": 'POST',
				"data": function(d) {
					d.vlactionMatEpi = "action";   
				},
				"dataSrc":""
			},
			"columns":[
			{data:"codmtepi"}, 
			{data:"razaoempresa"}, 
			{data:"nomefuncionario"},
			{data:"nomematepi"},
			{data:"qtdmatepi"},
			{data:"dataemissao",
			"render": function (data, type, row, meta) { 
				function dateToEN(date){  
					return date.split('-').reverse().join('/');
				}; 
				return  dateToEN(data);
			}, 

		},
		{ data: "codmtepi", 
		"render": function (data, type, row, meta) { 
			return '<button type="button" class="btn btn-primary btn-sm" id="botaoMatepi" data-row-id="' + data + '"><span class="fa fa-print fa-lg "> <span></button>';
		}
	},    
	{ data: "idmatepi",
	"render": function (data, type, row, meta) { 
		return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstMaterialEpiView/deletematepi/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
	},

	],

});

		$("#relmatepi_data").show();
	}
})

$(document).ready(function() {
	$("#relmatepi_data").on('click', '#botaoMatepi', function(e) {
		e.preventDefault();
		let valor = $(this).attr('data-row-id')
		var url = BASE_URL + "/sstMaterialEpiView/getrelatorio/" + valor;
		window.open(url, "sstMaterialEpiView", "width=850,height=600");

	})
})

//------------------------Buscar Empresa------------------------------//
$(document).ready(function(){
 $("#modalRelMATEPIEmp").on('keyup',function(){
	var valmatemp = $("#bcMatEmp").val();
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
                    html += '  <tr id="trtr"> <td id="codMatEmp">'+json[i].codempresa+'</td> <td id="descMatEmp">'+json[i].razaosocial+'</td> <td id="nisMatEmp">'+json[i].nrmatricula+'</td></tr>';
                }
            $('#tbodyModalEmp').html(html);
            $('#tbodyModalEmp').show();
            }               
        })
    return false;
    } 
 });
$("input[name=modalMatEmp]").keyup(function(){ //pega o css da tabela     
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
		$("#tbodyModalEmp").on('click', 'tr', function (e) {
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
				$("#matCodEmpresa_MAT").val(jsonaso.codmtEmp);
				$("#razaoMatEmpresa_MAT").val(jsonaso.dmtEmp);
				$("#cnpjMatEmpresa_MAT").val(jsonaso.nismtEmp);
			}
		$("#tbodyModalEmp tr").remove();
		});
	return false;
	}
	$("#enviaMatEmp").on('click', function(){
		$("#tbodyModalEmp tr").remove();
	});
});


//------------------------Buscar Funcionario------------------------------//
$(document).ready(function(){
$("#ModalRelMATEPIFunc").on('keyup',function(){
	var mtemp = $("#matCodEmpresa_MAT").val();
	var codfunc = $("#bcMatFunc").val();
    if(mtemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxMaterialEpi/searchMatFuncionario',
            type: "POST",
            data: {mtemp: mtemp, codfunc:codfunc},
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
            $('#TbodyModalFunc').html(html);
            $('#TbodyModalFunc').show();
            }               
        })
    }
    return false;  
 });

$("input[name=ModalMTFunc]").keyup(function(){ //pega o css da tabela     
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
		$("#TbodyModalFunc").on('click', 'tr', function (e) {
	    	e.preventDefault();
			$(this).toggleClass('ativo');
	    	$(this).siblings().removeClass('ativo');

	    	// var valcod = $(" #tiporisco_aso option:selected").text();
	    	var cmtfunc = $(this).find('td[id=codMatFunc]').text();
	    	var dmtfunc = $(this).find('td[id=descMatFunc]').text();
	    	var nismtfunc = $(this).find('td[id=nisMatFunc]').text();
	    	jsonasof = {'codmtFunc':cmtfunc, 'dmtFunc':dmtfunc, 'nismtFunc':nismtfunc};
	    	pegarvlaso(jsonasof);
		});
	}
   function pegarvlaso(jsonasof){ 	
		$("#enviaMatFunc").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsonasof != ''){	
				$("#codFunc_MATEPI").val(jsonasof.codmtFunc);
				$("#nomeFunc_MATEPI").val(jsonasof.dmtFunc);
				$("#cpfFunc_MATEPI").val(jsonasof.nismtFunc);
			}else{
				alert("Digite Novamente");
			};

		$("#TbodyModalFunc tr").remove();
		});
	return false;
	}
	$("#enviaMatFunc").on('click', function(){
		$("#TbodyModalFunc tr").remove();
	});
});


// //------------------------Buscar Produtos Epi ------------------------------//
// $(document).ready(function() {
// $("#prodfabMATEPI").on('keyup',function(e){
//     e.preventDefault();		

// 	var valepi = $(this).val();
//     var valempres = $("#matCodEmpresa_MAT").val();
//  	$("#prodfabMATEPI").autocomplete({
// 	    source: function(request, response) {
// 	        	$.ajax({
// 		            url: BASE_URL+'/ajaxMaterialEpi/searchProdutoEpi',
// 		            type:'GET',
// 		            dataType: 'json',
// 		            data: { prodepi: valepi, valempres:valempres },
// 		            success: function(data) {
// 	               		response(data)	      
// 	             	},
// 	        	});
// 	    	},
// 	    	focus: function( event, ui ) {
// 	        	$("#prodfabMATEPI").val( ui.item.equipprotectindividual );
// 	        return false;
// 	    	},
// 	    	select: function( event, ui ) {
// 				$("#codigofunc_MATEPI").val( ui.item.codepi );
// 				$("#codigoca_MATEPI").val( ui.item.ca );
//                 function dateToEN(date){    
//                     return date.split('-').reverse().join('/');
//                 };  
//                 var dat =  ui.item.datvencimentca;
//                 var dat =  dateToEN(dat);
//                 $("#datvencimeto_MATEPI").val( dat );
// 	        return false;
// 	    	}
//     	})
//     	.autocomplete( "instance" )._renderItem = function(ul, item) {
//       		return $("<li>").append("<a><b> " + item.equipprotectindividual + "<br></a>").appendTo( ul );
//         	var valorcidade = item.equipprotectindividual;
//         	var valor = valorcidade.toUpperCase();
// 	    };	
// 	});
// });


//------------------------Buscar Tecnico------------------------------//
$(document).ready(function(){

	$("#ModalRelMATEPI").on('keyup',function(){
		var valEmp = $("#matCodEmpresa_MAT").val();
		var  valNometec = $("#TecMatEmp").val();
		console.log(valEmp);
	    if(valEmp != ''){
	        $.ajax({
	            url: BASE_URL+'/ajaxMaterialEpi/searchProdutoEpi',
	            type:'POST',
	            data:{valEmp:valEmp, valNometec:valNometec},
	            cache: false,
	            async: false,
	            datatype:'JSON',
	            success:function(data) {
	            	console.log(data);
	                json = data.replace(/(\r\n|\n|\r)/gm,"");
	                var json = $.parseJSON(json);
	                var html = '';
	                for( var i = 0; i < json.length && json != ''; ++i) {
	                    html += '<tr id="trtr"> <td id="codMatEpi">'+json[i].codepi+
	                    		'</td> <td id="descMatEquipEpi">'+json[i].equipprotectindividual+
	                    		'</td><td id="numMatCaEpi">'+json[i].ca+
	                    		'</td><td id="datMatTecnEpi">'+json[i].tecnico+
	                    		'</td><td id="datMatVencEpi">'+json[i].datvencimentca+
	                    		'</td></tr>';
	                }
	            $('#tbodyModalTec').html(html);
	            $('#tbodyModalTec').show();
	            }               
	        })
	    }
	 });
	$("input[name=TecMatEmp]").keyup(function(){ //Pega o css da tabela     
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
		$("#tbodyModalTec").on('click', 'tr', function (e) {
	    	e.preventDefault();
			$(this).toggleClass('ativo');
	    	$(this).siblings().removeClass('ativo');

	    	var codEPI = $(this).find('td[id=codMatEpi]').text();
	    	var descMATEPI = $(this).find('td[id=descMatEquipEpi]').text();
	    	var numMATEPI = $(this).find('td[id=numMatCaEpi]').text();
	    	var datTECNEPI = $(this).find('td[id=datMatTecnEpi]').text();
	    	var datVENCEPI = $(this).find('td[id=datMatVencEpi]').text();
	    	jsonasof = {'codMTEPI':codEPI, 'descMTEPI':descMATEPI, 'numMTEPI':numMATEPI, 'tecnicoMTEPI':datTECNEPI, 'datMTVENCEPI':datVENCEPI};
	    	pegarvlaso(jsonasof);
		});
	}
   function pegarvlaso(jsonasof){ 	
		$("#enviaTecnico").on('click', function (e) {
	    	e.preventDefault();	 	
			if( jsonasof != ''){
			var count = 1;
    	    while(document.getElementById("codigEPI"+count) != null){
                count += 1;
	        }
				html = '';
				//var itens = -1;
				for(itens in jsonasof){
					html = 
					"<tr>"+
					"<td>"+jsonasof.codMTEPI+"</td>"+"<input type=hidden value ='"+jsonasof.codMTEPI+"' name=codigEPI"+count+" id=codigEPI"+count+">"+
					"<td>"+jsonasof.descMTEPI+"</td>"+"<input type=hidden value ='"+jsonasof.descMTEPI+"' name=descrEPI"+count+" id=descrEPI"+count+">"+
					"<td>"+jsonasof.numMTEPI+"</td>"+"<input type=hidden value ='"+jsonasof.numMTEPI+"' name=numberEPI"+count+" id=numberEPI"+count+">"+
					"<td>"+"<input style=width:70px; type=number name=quantdEPI"+count+" id=quantdEPI"+count+" />"+//"</td>"+"<input type=hidden value ='"+($("#qtd_epi").val())+"' name=FccodSetor"+count+" id=Fc_codSetor"+count+">"+
					"<td>"+jsonasof.tecnicoMTEPI+"</td>"+"<input type=hidden value ='"+jsonasof.tecnicoMTEPI+"' name=tecnicEPI"+count+" id=tecnicEPI"+count+">"+
					"<td>"+jsonasof.datMTVENCEPI+"</td>"+"<input type=hidden value ='"+jsonasof.datMTVENCEPI+"' name=dataVencEPI"+count+" id=dataVencEPI"+count+">"
					"<td> <a href=javascript:; onclick= '" +excluirProdEPI(this) + "'>Excluir</a></td>"+
					"</tr>";
				}		
				$("#bodyMATEPI").append(html);
				$("#bodyMATEPI").show();
				jsonasof='';
			};
		$("#tbodyModalTec tr").remove();
		});
		return false;
	}

		$("#bodyAsoExem").on('click', 'tr',function(obj){
	   	    let id = $(obj).attr('data-id');
			$(this).closest('tr').remove();
		});
		$("#enviaTecnico").on('click', function(){
			$("#tbodyModalTec tr").remove();
		});
		$("#fechaTecnico").on('click', function(){
			$("#tbodyModalTec tr").remove();
		});
		function excluirProdEPI(obj){
		    $("#bodyMATEPI").on('dblclick', 'tr',function(obj){
	        	let id = $(obj).attr('data-id');
	        	$(this).closest('tr').remove();
	    	});
		}
	});
	
// $(function () {
//     $("#bodyMATEPI").dblclick(function () {
//         var conteudoOriginal = $(this).text();
         
//         $(this).addClass("celulaEmEdicao");
//         $(this).html("<input style='width:10px;' type='number' value='" + conteudoOriginal + "' />");
//         $(this).children().first().focus();
 
//         $(this).children().first().keypress(function (e) {
//             if (e.which == 13) {
//                 var novoConteudo = $(this).val();
//                 $(this).parent().text(novoConteudo);
//                 $(this).parent().removeClass("#qtdepi");
//             }
//         });
         
//     $(this).children().first().blur(function(){
//         $(this).parent().text(conteudoOriginal);
//         $(this).parent().removeClass("#qtdepi");
//     });
//     });
// });


// $(function(){
// 	$("#bodyMATEPI").on('click', function(e){
// 		e.preventDefault();
// 		alert("DEU CERTO!!!");
// 	});
// });
//------------------------Buscar Produtos Epi ------------------------------//
// $(function(){

// 	$("#btnaddEPI").on('click', function(){
// 		var codempresa  =  $("#matCodEmpresa_MAT").val();
// 		var descmat 	=  $("#razaoMatEmpresa_MAT").val();
// 		var codfunc   	=  $("#codFunc_MATEPI").val();
// 		var codnome  	=  $("#nomeFunc_MATEPI").val();
// 		var codepi  	=  $("#codigofunc_MATEPI").val();
// 		var descepi 	=  $("#prodfabMATEPI").val();
// 		var caepi   	=  $("#codigoca_MATEPI").val();
// 		var qtdepi  	=  $("#qtd_MATEPI").val();
// 		var nometecnico =  $("#tecnicoMATEPI").val();
// 		var tecnepi 	=  $("#datvencimeto_MATEPI").val();
		
// 		// jsonepi = {'codigoempEPI':codempresa, 
// 		// 		  'descempmatEPI':descmat, 
// 		// 		  'codigofuncEPI':codfunc, 
// 		// 		  'codigocpfEPI':codnome, 
// 		// 		  'codigoEPI':codepi, 
// 		// 		  'descEPI':descepi, 
// 		// 		  'caEPI':caepi, 
// 		// 		  'qtdEPI':qtdepi, 
// 		// 		  'nometecnicoEPI':nometecnico,
// 		// 		  'tecnicoEPI':tecnepi};
// 		if(codempresa !='' && descmat !='' && codfunc !='' && codnome !='' && codepi !='' && descepi!='' && caepi !='' && qtdepi!=''){
// 		//if(codempresa !='' && descmat !='' && codfunc != '' && codnome != '' codepi != '' && descepi != '' && caepi != '' && qtdepi != '' && nometecnico !='' && tecnepi !=''){
// 			//$('#qtd_epi').css({"background" : "#FF6347"}).focus();
// 			//return false;

// 			html = '';
// 			for(var i = 0; i <codempresa[i] ; i++){
// 				html += '<tr style="background-color: #fff">'+'<td class="codempresa">'+codepi+'</td>'+
// 						'<td class="descepi">'+descepi+'</td>'+
// 						'<td class="caepi">'+caepi+'</td>'+
// 						'<td class="qtdepi">'+qtdepi+'</td>'+
// 						'<td class="tecnepi">'+tecnepi+'</td>'+
// 						'<td><button type="button" name="btn_relepi"  id="btn_relepi" class="btn btn-primary" onclick="valenviaepi('+codepi+','+codempresa+','+codfunc+','+qtdepi+')"> Gerar Relatorio</button></td>'+
// 						'</tr>';
// 			}		
// 		$("#bodyMATEPI").append(html);
// 		$("#bodyMATEPI").show();

// 		limparCampos();
// 		}else{
// 				alert("Deu Errado!");
// 			}
	
// 		})
// 		function limparCampos(){
// 			$("#codigofuncepi").val('');
// 			$("#prodfabMATEPI").val('');
// 			$("#codigoca").val('');
// 			$("#qtd_epi").val('');
// 			$("#tecnico_epi").val('');
// 			$("#datvencimeto").val('');
//             //$("#matbody tr").remove();
// 		}
    //})
        
	//----------------------------------Buscar ---------------------------------//
	// function valenviaepi(obj,obj2,obj3,obj4){
	// 	$("#bodyMATEPI tr").remove();
	// 	openPopup(obj,obj2,obj3,obj4);
	// };
	
	// --------------------------Buscar Produtos Epi ------------------------------//
	// function openPopupbtn(){
	// 		//var data = [obj,obj2,obj3,obj4];
	// 		var url = BASE_URL+"/sstMaterialEpiView/relatoriosmat";
	// 		window.open(url, "sstMaterialEpiView", "width=700,height=500");

	// 	return false;
	// };	


