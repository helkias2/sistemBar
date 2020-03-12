$(document).ready(function() {
    // -----------------------------  lista dos resultados ASO --------------------------//
    var grid = $("#servicos_data1").bootgrid({
    labels: {
        noResults: "Não existe Resultados",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    caseSensitive: false,    
    post: function(){
            return{ id:"b0df282a-0d67-40e5-8558-c9e93b7befed" };
    },
    formatters: {
        "commands1": function(column, row) {
                return  "<button type=\"button\" style=\"width:70px;height:35px;\" class=\"btn btn-xs btn-success command-atestado\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-lg\"></span>Visualizar</button>"; 
        }
    }     
    }).on("loaded.rs.jquery.bootgrid", function() {
        grid.find(".command-atestado").on("click", function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
                var url = BASE_URL+"/sstServicos/setAtestadosView/"+valor;
                window.open(url, "sstServicos1", "width=820,height=500");
        })
    });
});

$(document).ready(function() {
    // -----------------------------  lista dos resultados ASO --------------------------//
    var grid = $("#servicos_data2").bootgrid({
    labels: {
        noResults: "Não existe Resultados",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    caseSensitive: false,    
    post: function(){
            return{ id:"b0df282a-0d67-40e5-8558-c9e93b7befed" };
    },
    formatters: {
        "commands1": function(column, row) {
                return  "<button type=\"button\" style=\"width:70px;height:35px;\" class=\"btn btn-xs btn-success command-gestamb\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-lg\"></span>Visualizar</button>"; 
        }
    }     
    }).on("loaded.rs.jquery.bootgrid", function() {
        grid.find(".command-gestamb").on("click", function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
                var url = BASE_URL+"/sstServicos/gestaoAmbientalView/"+valor;
                window.open(url, "sstServicos2", "width=850,height=500");
        })
    });
});

// ----------------------------- Empresa --------------------------//
// $(document).ready(function(){
// 	//------------validacao do campos---------------------------//
// 	$("#tipexambusca_aso").focus();
// 	$("#tipexambusca_aso").blur(function(){
// 		var valor = $(" #tipexambusca_aso option:selected").text();
// 		var valcod       =  $("select[name=tipexambusca_aso]").val();
	 
// 	if((valor != "" && valor != 'undefined') && (valcod !== '0' && valcod != "")) {
// 		$(this).css({"border" : "1px solid #32CD32", "padding": "2px"});
// 		$(this).css({"background" : "#FFF"});
// 		$("#descexam_aso").val(valor);
// 		} else {
// 			$(this).css({"background" : "#FF6347"}).focus();
// 		}
// 	});
// 	//------------validacao do campos---------------------------//
// 	$("#selecapto_aso").on('blur', function(){
// 		var selatpto    = $("#selecapto_aso option:selected").val();
// 		var  obj5 = '';
// 		if(selatpto != "" && selatpto != 'undefined' && selatpto !=='0') {
// 			$(this).css({"border" : "1px solid #32CD32", "padding": "2px"});
// 			$(this).css({"background" : "#FFF"});
// 			var  obj4 = selatpto; 
// 		} else {
// 			$(this).css({"background" : "#FF6347"}).focus();
// 		}
// 	});
// 	//------------validacao do campos---------------------------// 
// 	$("input[name=datavenc_aso]").on('blur', function(){
// 		var data    =  $(this).val();	
// 		var  obj4 = '';
// 		if(data != "" && data != 'undefined' && data.length > 8 ) {
// 			$(this).css({"border" : "1px solid #32CD32", "padding": "2px"});
// 			$(this).css({"background" : "#FFF"});
// 			var  obj4 = data; 
// 		} else {
// 			$(this).css({"background" : "#FF6347"}).focus();
// 		}
// 	})
// })

//-------------------------------------------------------------------------------------------------------------------------------//

$(document).ready(function(){
//------------------------Buscar Empresa ------------------------------//
 $("#modalatestempresa").on('keyup',function(){
    var buscaemp = $("#emptyemp").val();
    if(buscaemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxServicos/getEmpresa',
            type: "POST",
            data: {buscaemp : buscaemp },
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codsvEmp">'+ json[i].codempresa+
                    		'</td><td id="rzsvEmp">'+json[i].razaosocial+
                    		'</td><td id="nisvEmp">'+json[i].nrmatricula+
                    		'</td></tr>';
                }
            	$('#tabelamodalservico').html(html);
            	$('#tabelamodalservico').show();
            }               
        })
    return false;
    } 
 });

$("input[name=modalservicos]").keyup(function(){ //pega o css da tabela     
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
        $("#tabelamodalservico").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');
            var cdsvemp = $(this).find('td[id=codsvEmp]').text();
            var rzsvemp = $(this).find('td[id=rzsvEmp]').text();
            jsonaso = { 'codsvempresa':cdsvemp, 
            			'razaosvempresa':rzsvemp,};
        pegarvlaso(jsonaso);
        });
    }
   function pegarvlaso(jsonaso){    
        $("#enviaserve").on('click', function (e) {
            e.preventDefault();     
            $("#getcodsv").val(jsonaso.codsvempresa);
            $("#getrzsv").val(jsonaso.razaosvempresa);
        $("#tabelamodalservico tr").remove();
        });
    return false;
    }
    $("#enviaserve").on('click', function(){
    	$("emptyemp").val('');
        $("#tabelamodalservico tr").remove();
    });
    $("#fecheserve").on('click', function(){
        $("emptyemp").val('');
        $("#tabelamodalservico tr").remove();
    });
  });  

//--------------------------------------------------------------------------------------------//
$(document).ready(function(){
//------------------------Buscar Funcionario ------------------------------//
 $("#modalServeFunc").on('blur',function(){
 	var codempsv =$("input[name=codservicos]").val();
 	console.log(codempsv);
    if(codempsv != ''){
        $.ajax({
            url: BASE_URL+'/ajaxServicos/getFuncionariosv',
            type: "POST",
            data: {codfuncsv : codempsv},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codsrvFunc">'+ json[i].codfuncionario+
                    		'</td><td id="nmsrvFunc">'+json[i].nomefuncionario+
                    		'</td><td id="cpfsrvFunc">'+json[i].cpf+
                            '</td></tr>';
                }
            	$('#tabelaModalsvFunc').html(html);
            	$('#tabelaModalsvFunc').show();
            }             
        });
    return false;
    } 
 });
$("input[name=tablemodalserve]").keyup(function(){ //pega o css da tabela     
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
    function pegarvlores(){ //--- funcao pegar valores 
        $("#tabelaModalsvFunc").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            var cdsrvfunc 	= $(this).find('td[id=codsrvFunc]').text();
            var nmsrvfunc 	= $(this).find('td[id=nmsrvFunc]').text();            
            jsonaso = { 'codsvfunc':cdsrvfunc, 
            			'nomesvfunc':nmsrvfunc};
        pegarvlaso(jsonaso);
        });
    }
   function pegarvlaso(jsonaso){    
        $("#enviaservfunc").on('click', function (e) {
            e.preventDefault();   
            	function dateToEN(date){	
					return date.split('-').reverse().join('/');
				};  
                $("#getcodsrv").val(jsonaso.codsvfunc);
                $("#getnomesrvfunc").val(jsonaso.nomesvfunc);
                // var dat =  jsonaso.datanascfunc;
                // var dat	=  dateToEN(dat);
                // $("#funcdata").html(dat +' '+ 'Idade: '+jsonaso.datatualfunc);
        $("#tabelaModalsvFunc tr").remove();
        });
    return false;
    }
    $("#enviaservfunc").on('click', function(){
        $("#tabelaModalAsoFunc tr").remove();
    });
    $("#fecheservfunc").on('click', function(){
        $("#tabelaModalAsoFunc tr").remove();
    });
  });  
//------------- filtro das dados do formulario -------------------//
$(document).ready(function(){
    $("#btnordem").on('click' ,function(e){	
		e.preventDefault();
		var codempaso 	 	=  $("#getcodsv").val();
		var codfuncaso 	 	=  $("#getcodsrv").val();
        openPopupIns(codempaso,codfuncaso);
    })
    function openPopupIns(obj1,obj2){
        
        if(obj1 !='' && obj2 != ''){
        $.ajax({
    		url: BASE_URL +'/ajaxServicos/addDadosAtestado',
    		type: 'POST',
    		async: false,
    		data:{ obj1, obj2 :  obj1, obj2},
    		success: function(data){
    		}
    	},false);
        openPopupAso(obj1,obj2);
        }else{
            alert("Entre com os Dados");
        }
    return true;
    }
    function openPopupAso(obj1,obj2) {
    	var data = [obj1,obj2];
        if(data[0] !='' &&  data[1]!=''){
           window.confirm("Gerar Atestado!");
    	   var url = BASE_URL+"/sstServicos/setAtestados/"+data;
    	   window.open(url, "sstServicos1", "width=800,height=700");
        }else{
            alert("Entre com os Dados");
        }
         // $("#formatestado").submit();
         window.location.reload();
        return true;
    }
})
// ----------------------------------------------------------------------------------------------------//






//-----------------------------------------------------------------------------------------------------//
$(document).ready(function(){
//------------------------Buscar Empresa ------------------------------//
 $("#modalgestambempresa").on('keyup',function(){
    var buscaempamb = $("#emptygestamb").val();
    if(buscaempamb != ''){
        $.ajax({
            url: BASE_URL+'/ajaxServicos/getEmpresa',
            type: "POST",
            data: {buscaemp : buscaempamb },
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codgestAmb">'+ json[i].codempresa+
                            '</td><td id="rzgestAmb">'+json[i].razaosocial+
                            '</td><td id="nisgestAmb">'+json[i].nrmatricula+
                            '</td></tr>';
                }
                $('#tabelamodalgestamb').html(html);
                $('#tabelamodalgestamb').show();
            }               
        })
    return false;
    } 
 });

$("input[name=modalgestamb]").keyup(function(){ //pega o css da tabela     
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
        $("#tabelamodalgestamb").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');
            var cdgetamb = $(this).find('td[id=codgestAmb]').text();
            var rzgetamb = $(this).find('td[id=rzgestAmb]').text();
            jsonaso = { 'codgestambempresa':cdgetamb, 
                        'razaogestambempresa':rzgetamb, 
                    };
        pegarvlaso(jsonaso);
        });
    }
   function pegarvlaso(jsonaso){    
        $("#enviagestamb").on('click', function (e) {
            e.preventDefault();     

                $("#getgestamb").val(jsonaso.codgestambempresa);
                $("#getrzgestamb").val(jsonaso.razaogestambempresa);
        $("#tabelamodalgestamb tr").remove();
        });
    return false;
    }
    $("#enviagestamb").on('click', function(){
        $("emptyemp").val('');
        $("#tabelamodalgestamb tr").remove();
    });
    $("#fechegestamb").on('click', function(){
        $("emptyemp").val('');
        $("#tabelamodalgestamb tr").remove();
    });
  });  


$(document).ready(function(){
//------------------------------------------------------------------------------------//
//------------------Buscar Funcionario --------------------------------------------------//
 $("#modalGestAmbFunc").on('blur',function(){
    var codgestamb =$("input[name=codgestamb]").val();
    console.log(codgestamb);
    if(codgestamb != ''){
        $.ajax({
            url: BASE_URL+'/ajaxServicos/getFuncionariosv',
            type: "POST",
            data: {codfuncsv : codgestamb},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codsrvgestFunc">'+ json[i].codfuncionario+
                            '</td><td id="nmsrvgestFunc">'+json[i].nomefuncionario+
                            '</td><td id="cpfsrvgestFunc">'+json[i].cpf+
                            '</td></tr>';
                }
                $('#tabelaModalGestAmbFunc').html(html);
                $('#tabelaModalGestAmbFunc').show();
            }             
        });
    return false;
    } 
 });

$("input[name=tbmodalgestamb]").keyup(function(){ //pega o css da tabela     
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
    function pegarvlores(){ //--- funcao pegar valores 
        $("#tabelaModalGestAmbFunc").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            var codsvgestFunc   = $(this).find('td[id=codsrvgestFunc]').text();
            var nmsvgestfunc   = $(this).find('td[id=nmsrvgestFunc]').text();            
            jsonaso = { 'codsvambfunc':codsvgestFunc, 
                        'nomesvambfunc':nmsvgestfunc};
        pegarvlaso(jsonaso);
        });
    }
   function pegarvlaso(jsonaso){    
        $("#enviagestfunc").on('click', function (e) {
            e.preventDefault();   
                function dateToEN(date){    
                    return date.split('-').reverse().join('/');
                };  
                $("#getcodsrvgtamb").val(jsonaso.codsvambfunc);
                $("#idgetnomegtambfunc").val(jsonaso.nomesvambfunc);
                // var dat =  jsonaso.datanascfunc;
                // var dat  =  dateToEN(dat);
                // $("#funcdata").html(dat +' '+ 'Idade: '+jsonaso.datatualfunc);
        $("#tabelaModalGestAmbFunc tr").remove();
        });
    return false;
    }
    $("#enviagestfunc").on('click', function(){
        $("#tabelaModalGestAmbFunc tr").remove();
    });
    $("#fechegestfunc").on('click', function(){
        $("#tabelaModalGestAmbFunc tr").remove();
    });
  });  

//------------- filtro das dados do formulario -------------------//
$(document).ready(function(){
    $("#btngestamb").on('click' ,function(e){ 
        e.preventDefault();
        var cdempresagtamb       =  $("#getgestamb").val();
        var cdfuncionariogtamb      =  $("#getcodsrvgtamb").val();
        openPopupIns(cdempresagtamb,cdfuncionariogtamb);
})

function openPopupIns(obj1,obj2){
    if(obj1 !='' && obj2 != ''){
    $.ajax({
        url: BASE_URL +'/ajaxServicos/addDadosExameMedico',
        type: 'POST',
        async: false,
        data:{ obj1, obj2 :  obj1, obj2},
        success: function(data){
        }
    },false);
    openPopupAso(obj1,obj2);
    }else{
        alert("Entre com os Dados");
    }
return true;
}
function openPopupAso(obj1,obj2) {
    var data = [obj1,obj2];
        if(data[0] !='' &&  data[1]!=''){
            window.confirm("Gerar Atestado!");
            var url = BASE_URL+"/sstServicos/gestaoAmbiental/"+data;
            window.open(url, "sstServicos2", "width=800,height=700");
        }else{
            alert("Entre com os Dados");
        }
        window.location.reload();
    return true;
    }
})
