$(function() {
        carregarDados();

        function carregarDados() {
            var datatable = $('#relaso_data').DataTable({
                select: {
                    style: 'multi'
                },
                "aaSorting": [
                    [0, "desc"]
                ],
                "processing": true,
                "language": {
                    "lengthMenu": "Exibição _MENU_ Registros por página",
                    "zeroRecords": "Nada encontrado - desculpe",
                    "info": " Mostrando página _PAGE_ ate _PAGES_",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "infoFiltered": "(filtrado de _MAX_ total linhas)",
                    "search": "Pesquisar:",
                    "paginate": {
                        "first": "Primeiro",
                        "last": "Último",
                        "next": "Próximo",
                        "previous": "Anterior"
                    },
                },
                "ajax": {
                    "url": BASE_URL + "/ajaxAso/listAso",
                    "type": 'POST',
                    "data": function(d) {
                        d.vlactionAso = "actionAso";
                    },
                    "dataSrc": ""
                },
                "columns": [
                    { data: "codaso" },
                    { data: "nomfuncionario" },
                    { data: "razaosocial" },
                    { data: "tipexamedesc" },


                    {
                        data: "datemissao",
                        "render": function(data, type, row, meta) {
                            function dateToEN(date) {
                                return date.split('-').reverse().join('/');
                            };
                            return dateToEN(data);
                        },
                    },
                    {
                        data: "aptidao",
                        "render": function(data, type, row, meta) {

                            if (row.aptidao == '1') {
                                return '<a class="btn btn-success btn-sm" value="' + data + '">' + 'Apto' + '</a>';
                            } else if (row.aptidao == '3') {
                                return '<a class="btn btn-success btn-sm" value="' + data + '">' + 'Apto Trab. em Altura' + '</a>';
                            } else if (row.aptidao == '2') {
                                return '<a class="btn btn-warning btn-sm" value="' + data + '">' + 'Inapto' + '</a>';
                            } else if (row.aptidao == null) {
                                return '<a class="btn btn-warning btn-sm" value="' + data + '">' + 'Aguardando' + '</a>';
                            }
                        }
                    },
                    {
                        data: "codaso",

                        "render": function(data, type, row, meta) {
                            return '<button type="button" class="btn btn-primary btn-sm" id="botaoAso" data-row-id="' + data + '"><span class="fa fa-print fa-lg "> </span></button>';
                        }
                    },
                    {
                        data: "codaso",
                        "render": function(data, type, row, meta) {
                            return '<button type="button" class="btn btn-primary btn-sm" id="botaoFemo" data-row-id="' + data + '"><span class="fa fa-print fa-lg "> <span></button>';

                        }
                    },
                    {
                        data: "codaso",
                        "render": function(data, type, row, meta) {
                            return '<button type="button" data-toggle="modal" data-target="#modalAsoApto" class="btn btn-primary btn-sm" id="botaoModal" data-row-id="' + data + '"><span class="fa fa-clipboard fa-lg "></span></button>';
                            // return '<a class="btn btn-success btn-sm" href="' + BASE_URL + '/sstFuncao/delete/' + data + '"><span class="fas fa-clipboard-check fa-lg">' + 'Femo' + '</span></a>';
                        }
                    },
                    {
                        data: "codaso",
                        "render": function(data, type, row, meta) {
                            return '<a class="btn btn-danger btn-sm" href="' + BASE_URL + '/sstAsoView/deleterelatorio/' + data + '"><span class="fa fa-trash fa-lg "></span></a>';
                        }
                    },
                ],

            });
            $("#relaso_data").show();
        }
    })
    //chamada de popup aso
$(document).ready(function() {
        $("#relaso_data").on('click', '#botaoAso', function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
            var url = BASE_URL + "/sstAsoView/visualizaraso/" + valor;
            window.open(url, "sstAsoView1", "width=850,height=500");
        })
    })
    //chamada de popup femo
$(document).ready(function() {
        $("#relaso_data").on('click', '#botaoFemo', function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
            var url = BASE_URL + "/sstAsoView/relatoriofemo/" + valor;
            window.open(url, "sstAsoView2", "width=850,height=600");
        })
    })
    //chamada de modal
$(document).ready(function() {
    $("#relaso_data").on('click', '#botaoModal', function(e) {
        e.preventDefault();
        let codaso = $(this).attr('data-row-id');
        $("#modalAsoApto").modal('show');
        $('#btn_apto').click(function() {

            let selectapito = $("select[name=selecaptoaso]").val();
            if (codaso != '' && selectapito != '' && selectapito >= 0) {
                $.ajax({
                    url: BASE_URL + '/ajaxRelatorio/AsoRelatorioApito',
                    type: 'POST',
                    data: { codaso: codaso, selectapito: selectapito },
                    cache: false,
                    async: false,
                    datatype: 'JSON',
                    success: function(data) {
                        decisao = 1;
                        if (decisao != '') {
                            confirm("Você clicou no botão OK");
                            $("#modalAsoApto").modal('hide');
                            location.reload();
                        } else {
                            alert("Você clicou no botão CANCELAR");
                            $("#modalAsoApto").modal('hide');
                            return false;
                        }
                    }
                })
            } else {
                alert("Selecione um Valor");
            }
        })
    })
})
/*$(document).ready(function() {

    // -----------------------------  lista dos resultados ASO --------------------------//
    
    var grid = $("#relaso_data").bootgrid({
    labels: {
        noResults: "Não existem resultados.",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} inscrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    caseSensitive: false,    
    post: function(){
            return{ id:"b0df282a-0d67-40e5-8558-c9e93b7befed" };
    },
    formatters: {
        "commands1": function(column, row) {
                return  "<button type=\"button\" class=\"btn btn-primary w-100 command-viewaso\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-print fa-lg\"></span></button>"; 
        },
        "commands2": function(column, row) {
                return  "<button type=\"button\" class=\"btn btn-primary w-100 command-femo\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-print fa-lg\"></span></button>"; 
        },
        "commands3": function(column, row) {
                return  "<button type=\"button\" data-toggle=\"modal\" data-target=\"#modalAsoApto\" class=\"btn btn-success w-100 command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fas fa-clipboard-check fa-lg\"></span></button>"; 
        }

    }     
    }).on("loaded.rs.jquery.bootgrid", function() {
        grid.find(".command-viewaso").on("click", function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
                var url = BASE_URL+"/sstAsoView/visualizaraso/"+valor;
                window.open(url, "sstAsoView1", "width=850,height=500");
        }).end().find(".command-femo").on("click", function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
            //alert("Deseja mesmo excluir?");
            var url = BASE_URL+"/sstAsoView/relatoriofemo/"+valor;
            window.open(url, "sstAsoView2", "width=850,height=600"); 
        });
        $(document).find(".command-edit").on("click", function(e) {
            e.preventDefault();
            let codaso = $(this).attr('data-row-id');

      //  apidaofunc(codaso);
        //function apidaofunc(codaso){
           $("#modalAsoApto").modal('show');
           $('#btn_apto').click(function(){

                let selectapito = $("select[name=selecaptoaso]").val();
                if(codaso !='' && selectapito !='' && selectapito >= 0){
                    $.ajax({
                        url: BASE_URL + '/ajaxRelatorio/AsoRelatorioApito',
                        type:'POST',
                        data:{codaso:codaso,selectapito:selectapito},
                        cache: false,
                        async: false,
                        datatype:'JSON',
                        success: function(data){
                            decisao =1;
                            if (decisao!=''){
                                confirm ("Você clicou no botão OK");
                                $("#modalAsoApto").modal('hide');
                                }else{
                                    alert ("Você clicou no botão CANCELAR");
                                    $("#modalAsoApto").modal('hide');
                            return false;
                            }
                        }
                    })
                }else{
                alert("Selecione um Valor");
                }   
            })
        })
    });
}); */

// ----------------------------- Empresa --------------------------//
$(document).ready(function(){
	//------------validacao do campos---------------------------//
    $("#btnempresa").focus();
    $("input[name=descemp_aso]").blur(function(){
       //var valor = $(" #tipexambusca_aso option:selected").text();
        var valempresa       =  $(this).val();
     
    if(valempresa != "" && valempresa != 'undefined')  {
        $(this).css({"border" : "1px solid #32CD32", "padding": "2px"});
        $(this).css({"background" : "#FFF"});
        $("#buscadescemp_aso").val(valempresa);
        } else {
            $(this).css({"background" : "#FF6347"}).focus();
        }
    });

    //
    $("input[name=descfunc_aso]").blur(function(){
       //var valor = $(" #tipexambusca_aso option:selected").text();
        var valfuncionario      =  $(this).val();
     
    if(valfuncionario != "" && valfuncionario != 'undefined')  {
        $(this).css({"border" : "1px solid #32CD32", "padding": "2px"});
        $(this).css({"background" : "#FFF"});
        $("#buscadescfunc_aso").val(valfuncionario);
        } else {
            $(this).css({"background" : "#FF6347"}).focus();
        }
    });

	//$("#tipexambusca_aso").focus();
	$("#tipexambusca_aso").blur(function(){
		var valor = $(" #tipexambusca_aso option:selected").text();
		var valcod       =  $("select[name=tipexambusca_aso]").val();
	 
	if((valor != "" && valor != 'undefined') && (valcod !== '0' && valcod != "")) {
		$(this).css({"border" : "1px solid #32CD32", "padding": "2px"});
		$(this).css({"background" : "#FFF"});
		$("#descexam_aso").val(valor);
		} else {
			$(this).css({"background" : "#FF6347"}).focus();
		}
	});
	//------------validacao do campos---------------------------//
	$("#selecapto_aso").on('blur', function(){
		var selatpto    = $("#selecapto_aso option:selected").val();
		var  obj5 = '';
		if(selatpto != "" && selatpto != 'undefined' && selatpto !=='0') {
			$(this).css({"border" : "1px solid #32CD32", "padding": "2px"});
			$(this).css({"background" : "#FFF"});
			var  obj4 = selatpto; 
		} else {
			$(this).css({"background" : "#FF6347"}).focus();
		}
	});
	//------------validacao do campos---------------------------// 
	$("input[name=datavenc_aso]").on('blur', function(){
		var data    =  $(this).val();	
		var  obj4 = '';
		if(data != "" && data != 'undefined' && data.length > 8 ) {
			$(this).css({"border" : "1px solid #32CD32", "padding": "2px"});
			$(this).css({"background" : "#FFF"});
			var  obj4 = data; 
		} else {
			$(this).css({"background" : "#FF6347"}).focus();
		}
	})
})


//--------------------------------------------------------------------------------------------------------------------------------//
$(document).ready(function(){

//------------------------Buscar Empresa ------------------------------//
 $("#modalRelatAsoEmp").on('keyup',function(){
    var valasoemp = $("#buscaAsoModalEmp").val();
    if(valasoemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxRelatorio/seachmodalempexame',
            type: "POST",
            data: {valasoemp : valasoemp },
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codAsoEmp">'+ json[i].codempresa+
                    		'</td><td id="rzAsoEmp">'+json[i].razaosocial+
                    		'</td><td id="nisAsoEmp">'+json[i].nrmatricula+
                    		'</td><td id="cnaeAsoEmp" style="display:none">'+json[i].cnae+
                    		'</td><td id="cnaeDescAsoEmp" style="display:none">'+json[i].cnaedesc+
                    		'</td><td id="rsAsoEmp" style="display:none">'+json[i].idriscoemp+
                    		'</td><td id="endAsoEmp" style="display:none">'+json[i].endereco+
                    		'</td><td id="numAsoEmp" style="display:none">'+json[i].numero+
                    		'</td></tr>';
                }
            	$('#tabelamodalAsoEmpresa').html(html);
            	$('#tabelamodalAsoEmpresa').show();
            }               
        })
    return false;
    } 
 });

$("input[name=modalAsoEmpresa]").keyup(function(){ //pega o css da tabela     
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
        $("#tabelamodalAsoEmpresa").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');
            var cdasoemp = $(this).find('td[id=codAsoEmp]').text();
            var rzasoemp = $(this).find('td[id=rzAsoEmp]').text();
            var rsasoemp = $(this).find('td[id=rsAsoEmp]').text();
            var nisasomp = $(this).find('td[id=nisAsoEmp]').text();
            var cnaeasoemp = $(this).find('td[id=cnaeAsoEmp]').text();
            var cnaedescemp = $(this).find('td[id=cnaeDescAsoEmp]').text();
            var andemp = $(this).find('td[id=endAsoEmp]').text();
            var numemp = $(this).find('td[id=numAsoEmp]').text();
            jsonaso = { 'codigoempresa':cdasoemp, 
            			'razaoempresa':rzasoemp, 
            			'nisempresa':nisasomp, 
            			'riscoempresa':rsasoemp, 
            			'endempaso':andemp,
            			'cnaedescempaso':cnaedescemp,
            			'cnaeempresa':cnaeasoemp, 
            			'numempaso':numemp};
        pegarvlaso(jsonaso);
        });
    }
   function pegarvlaso(jsonaso){    
        $("#enviaAsoEmpresa").on('click', function (e) {
            e.preventDefault();     

                $("#codempbusca_aso").val(jsonaso.codigoempresa);
                $("#buscadescemp_aso").val(jsonaso.razaoempresa);
                $("#empnis").html(jsonaso.nisempresa);
                $("#emprisco").html('Risco: '+ jsonaso.riscoempresa);
                $("#emprazao").html(jsonaso.razaoempresa);
                $("#empend").text(jsonaso.endempaso);
                $("#empnum").text('Num.: '+jsonaso.numempaso);
                $("#empdescati").text(jsonaso.cnaedescempaso);
                $("#empati").text(jsonaso.cnaeempresa);
        $("#tabelamodalAsoEmpresa tr").remove();
        });
    return false;
    }
    $("#enviaAsoEmpresa").on('click', function(){
    	//$("buscaAsoModalEmp").val('');
        $("#tabelamodalAsoEmpresa tr").remove();
    });
});  


//-------------------------------------------------------------------------------------------------------------------------------//
$(document).ready(function(){
//------------------------Buscar Funcionario ------------------------------//
 $("#modalRelatAsoFunc").on('keyup',function(){
 	var codempaso = $("input[name=codemp_aso]").val();
	 var codfunc = $("#buscaAsoModalEmpFunc").val();
 	//var codempaso = $(this).val();
 	//console.log(codempaso);
    if(codempaso != '' && codfunc != ''){
        $.ajax({
            url: BASE_URL+'/ajaxRelatorio/seachmodalexamefunc',
            type: "POST",
            data: {relasofunc : codempaso, codfunc:codfunc},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codAsoFunc">'+ json[i].codfuncionario+
                    		'</td><td id="nmAsoFunc">'+json[i].nomefuncionario+
                    		'</td><td id="cpfAsoFunc">'+json[i].cpf+
                    		'</td><td id="rgAsoFunc" style="display:none">'+json[i].rg+
                    		'</td><td id="pisAsoFunc" style="display:none">'+json[i].pis+
                    		'</td><td id="sexoAsoFunc" style="display:none">'+json[i].sexo+
                    		'</td><td id="datAtualAsoFunc" style="display:none">'+json[i].dataAtual+
                    		'</td><td id="datNascFunc" style="display:none">'+json[i].datanascimento+
                    		'</td><td id="griscoAsoFunc" style="display:none">'+json[i].graurisco+
                            '</td><td id="codsetorAsoFunc" style="display:none">'+json[i].nomesetor+
                            '</td><td id="cdriscoAsoFunc" style="display:none">'+json[i].funcao+
                            '</td><td id="codcboAsoFunc" style="display:none">'+json[i].codcbo+
                            '</td><td id="desccboAsoFunc" style="display:none">'+json[i].funcao+
                            '</td></tr>';
                }
            $('#tabelaModalAsoFunc').html(html);
            $('#tabelaModalAsoFunc').show();
            }             
        });
    return false;
    } 
 });

$("input[name=tablemodafuncionario]").keyup(function(){ //pega o css da tabela     
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
        $("#tabelaModalAsoFunc").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            var cdasofunc 	   = $(this).find('td[id=codAsoFunc]').text();
            var nmasofunc 	   = $(this).find('td[id=nmAsoFunc]').text();
            var cpfasofunc     = $(this).find('td[id=cpfAsoFunc]').text();
            var rgasofunc 	   = $(this).find('td[id=rgAsoFunc]').text();
            var pisasofunc 	   = $(this).find('td[id=pisAsoFunc]').text();
            var sexoasofunc    = $(this).find('td[id=sexoAsoFunc]').text();
            var datatlfunc 	   = $(this).find('td[id=datAtualAsoFunc]').text();
            var datnuscfunc    = $(this).find('td[id=datNascFunc]').text();
            var rsasofunc 	   = $(this).find('td[id=griscoAsoFunc]').text();
           var setorasofunc   = $(this).find('td[id=codsetorAsoFunc]').text();
            var cboasofunc     = $(this).find('td[id=codcboAsoFunc]').text();
            var dsccboasofunc  = $(this).find('td[id=desccboAsoFunc]').text();
            var cdriscasofunc  = $(this).find('td[id=cdriscoAsoFunc]').text();
            jsonaso = { 'codigofunc':cdasofunc, 
            			'nomefunc':nmasofunc, 
            			'cpffunc':cpfasofunc, 
            			'rgfunc':rgasofunc, 
            			'pisfunc':pisasofunc,
            			'sexofunc':sexoasofunc,
            			'datatualfunc':datatlfunc, 
            			'datanascfunc':datnuscfunc,
            			'riscofunc':rsasofunc,
                        'stfunc':setorasofunc,
                        'cbofunc':cboasofunc,
                        'dcbofunc':dsccboasofunc,

                        'riscdfunc':cdriscasofunc
                    };
        pegarvlaso( jsonaso);
        });
    }
   function pegarvlaso(jsonaso){    
        $("#enviaAsoFunc").on('click', function (e) {
            e.preventDefault();   
            	function dateToEN(date){	
					return date.split('-').reverse().join('/');
				};  
                $("#buscacodfunc_aso").val(jsonaso.codigofunc);
                $("#buscadescfunc_aso").val(jsonaso.nomefunc);
                $("#funcnome").html(jsonaso.nomefunc);
                $("#funcsexo").html('Sex: '+ jsonaso.sexofunc);
                $("#funccpf").html(jsonaso.cpffunc +' RG: '+ jsonaso.rgfunc +' PIS: '+ jsonaso.pisfunc);
                var dat =  jsonaso.datanascfunc;
                var dat	=  dateToEN(dat);
                $("#funcdata").html(dat +' '+ 'Idade: '+jsonaso.datatualfunc);
                $("#funcrisc").text('Risc.: '+jsonaso.riscofunc);
                $("#empdescati").text(jsonaso.cnaedescempaso);
                $("#funcAtvdscbo").text(jsonaso.stfunc);
                $("#funcCBO").text(jsonaso.cbofunc + ' | ' + jsonaso.dcbofunc);
                $("#funcAtivcbo").text(jsonaso.cbofunc);
        $("#tabelaModalAsoFunc tr").remove();
        });
    return false;
    }
    $("#enviaAsoFunc").on('click', function(){
        $("#tabelaModalAsoFunc tr").remove();
    });
  });  
//-------------------------------------------------------------------------------------------------------------------------------//



//-------------------------------------------------------------------------------------------------------------------------------//
$(document).ready(function(){
//------------------------Buscar Medico ------------------------------//
 $("#modalRelatAsoMedico").on('keyup',function(){
    var codempaso =$("#buscaAsoModalMedico").val();
   // console.log(codempaso);
    if(codempaso != ''){
        $.ajax({
            url: BASE_URL+'/ajaxRelatorio/seachListMedicoExam',
            type: "POST",
            data: {relmedico : codempaso},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codMedico">'+ json[i].codresp+
                            '</td><td id="nomAsoMedico">'+json[i].nomeresponsavel+
                            '</td><td id="identAsoMedico">'+json[i].identprofissional+
                            '</td><td id="ufAsoMedico">'+json[i].uf+
                            '</td><td id="numAsoMedico">'+json[i].numero+
                            '</td><td id="tipAsoMedico">'+(json[i].tipomedico == 'ME'?'EXAMINADOR':'COODERNADOR') +
                            '</td></tr>';
                }
                $('#tabelaModalAsoMedico').html(html);
                $('#tabelaModalAsoMedico').show();
            }             
        })
    return false;
    } 
 });

$("input[name=buscaAsoModalASO]").keyup(function(){ //pega o css da tabela     
        var tabela = $(this).attr('alt');
        console.log(tabela);
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
        $("#tabelaModalAsoMedico").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            var cdasomd     = $(this).find('td[id=codMedico]').text();
            var nomasomd    = $(this).find('td[id=nomAsoMedico]').text();
            var identasomd  = $(this).find('td[id=identAsoMedico]').text();
            var ufasomd     = $(this).find('td[id=ufAsoMedico]').text();
            var numasomd    = $(this).find('td[id=numAsoMedico]').text();
            var tipasomd    = $(this).find('td[id=tipAsoMedico]').text();
            jsonasomd = { 
                    'codigomd':cdasomd, 
                    'nomemd':nomasomd, 
                    'identmd':identasomd, 
                    'ufmd':ufasomd,
                    'nummd':numasomd, 
                    'tipmd':tipasomd
                    };
        pegarvlaso(jsonasomd);
        });
    }
    function pegarvlaso(jsonasomd){    
        $("#enviaMedcio").on('click', function (e) {
            e.preventDefault();   
                function dateToEN(date){    
                    return date.split('-').reverse().join('/');
                };  
                $("#codmedicobusca_aso").val(jsonasomd.codigomd);
                $("#buscadescmedico_aso").val(jsonasomd.nomemd);
                $("#mdnome").html(jsonasomd.nomemd);
                $("#tipomd").html(jsonasomd.identmd +'/ '+ jsonasomd.nummd);
                $("#ufmed").html(jsonasomd.ufmd);
                $("#mdcod").html(jsonasomd.tipmd);
        $("#tabelaModalAsoMedico tr").remove();
        });
    return false;
    }
    $("#enviaMedcio").on('click', function(){
        //$("buscaAsoModalEmp").val('');
        $("#tabelaModalAsoMedico tr").remove();
    });
}); 
//-------------------------------------------------------------------------------------------------------------------------------// 


//---------------------------------------Exame Funcionario------------------------------------------//
//------------------------Buscar Exame ------------------------------//
 function dateToEN(date){	
	return date.split('-').reverse().join('/');
};
$(document).ready(function(){
	
 $("#modalAsoExameRel").blur(function(){
    var codempresa = $("input[name=codemp_aso]").val();
    var codfuncaso = $("input[name=codfunc_aso]").val();

    if(codempresa != '' || codempresa != ''){
        $.ajax({
            url: BASE_URL+'/ajaxRelatorio/seachListEmpExamaFunc',
            type: "POST",
            data: {codempresa : codempresa, codfuncaso : codfuncaso},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {

                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                array = [];
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codFuncExame">'+ json[i].codexame+
                            '</td><td id="nomAsoFuncExame">'+json[i].nomeexame+
                            '</td><td id="descAsoFuncExame">'+json[i].descproced+
                            '</td><td id="datcadAsoFuncExame">'+ dateToEN(json[i].datvencimento)+
                            '</td><td id="datvencAsoFuncExame">'+json[i].datacad+
                            '</td></tr>';

                var val = json[i].codexame;
                var valexame = val.replace(/[^\d]+/g,'');
                array.push(valexame);   
                }
            $('#bodyModalAsoExame').html(html);
            $('#bodyModalAsoExame').show();
            }    
        })
    return false;
    } 
 });
$("input[name=tablemodaExASO]").keyup(function(){ //pega o css da tabela     
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
     $("#bodyModalAsoExame").on('click', 'tr', function (e) {
         e.preventDefault();
         $(this).toggleClass('ativo');
         $(this).siblings().removeClass('ativo');
         var cdasofunc   = $(this).find('td[id=codFuncExame]').text();
		 var nmasofunc   = $(this).find('td[id=nomAsoFuncExame]').text();
		 var descasofunc   = $(this).find('td[id=descAsoFuncExame]').text();
         var dtVasofunc   = $(this).find('td[id=datcadAsoFuncExame]').text();
       
		 function dateToEN(date){	
			return date.split('-').reverse().join('/');
		};
		    var data =  descasofunc;
                var datASO	=  dateToEN(data);
        
		 
		 jsonexame = {'codigofunc':cdasofunc, 
                     'nomefunc':nmasofunc, 
                     'dtprocd':datASO,
					 'dtcad':dtVasofunc
                 };
     pegarvlaso(jsonexame);
     });
 }

function pegarvlaso(jsonexame){    
    $("#enviaExm").on('click', function (e) {
        e.preventDefault();     
        if( jsonexame != ''){ 
            var html = '';
            var i = -1;
            for( i in jsonexame){
                html = '<tr style="background-color: #fff">'+
                '<td class="cdexame" data-id="'+jsonexame.codigofunc+'">'+jsonexame.codigofunc+'</td>'+
                '<td class="nomfunc">'+jsonexame.nomefunc+'</td>'+
                '<td class="descex">'+jsonexame.dtprocd+'</td>'+
				'<td class="datcad">'+jsonexame.dtcad+'</td>'+
                '<td><a href="javascript:;" onclick="excluirProd(this)">Excluir</a></td>'+
                '</tr>';
            }
        $("#bodyAsoExem").append(html);
        $("#bodyAsoExem").show();
        }
    jsonexame = '';
    $("#tabelamodal tr").remove();
    });
return false;
}
$("#bodyAsoExem").on('click', 'tr',function(obj){
    let id = $(obj).attr('data-id');
    $(this).closest('tr').remove();
    });
     $("#enviaExm").on('click', function(){
         $("#bodyModalAsoExame tr").remove();
    });
    $("#fecheExm").on('click', function(){
         $("#bodyModalAsoExame tr").remove();
    });

});  
//-------------------------------------------------------------------------------------------------------------------------------//



////////-----------------------------Exame Funcionario----------------------------------/////////
//------------------------Buscar Exame ------------------------------//
$(document).ready(function(){
 $("#modalRelatorioAsoFunc").blur(function(){
    var codasoempresa = $("input[name=codemp_aso] ").val();
    var codasofunc = $("input[name=codfunc_aso]").val();
    console.log(codasoempresa + ' + ' + codasofunc);
    if(codasoempresa != '' || codasofunc != ''){
        $.ajax({
            url: BASE_URL+'/ajaxRelatorio/seachRiscosFuncionario',
            type: "POST",
            data: {codasoempresa : codasoempresa, codasofunc : codasofunc },
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                array = [];
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '<tr id="trtr"><td id="codFuncExame" style="display:none;">'+ json[i].codigo+
                            '</td><td id="nomAsoFuncExame">'+json[i].gruporisco+
                            '</td><td id="descAsoFuncExame">'+json[i].codrisco+
                            '</td><td id="datcadAsoFuncExame">'+json[i].descrisco+
                           // '</td><td id="datvencAsoFuncExame">'+json[i].datvencimento+
                            '</td></tr>';

                // var val = json[i].codexame;
                // var valexame = val.replace(/[^\d]+/g,'');
                // array.push(valexame);   
                }
            $('#tbModalAsoFunc').html(html);
            $('#tbModalAsoFunc').show();
            }    
        })
    return false;
    } 
 });
$("input[name=sebdAsoFunc]").keyup(function(){ //pega o css da tabela     
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
     $("#tbModalAsoFunc").on('click', 'tr', function (e) {
         e.preventDefault();
         $(this).toggleClass('ativo');
         $(this).siblings().removeClass('ativo');
		 
	
        // var cdasofunc   = $(this).find('td[id=codFuncExame]').text();
         var nmasofunc   = $(this).find('td[id=nomAsoFuncExame]').text();
         var cpfasofunc  = $(this).find('td[id=descAsoFuncExame]').text();
         var dcasofunc  = $(this).find('td[id=datcadAsoFuncExame]').text();
  

		 
		 jsonexame = {//'codigofunc':cdasofunc, 
                     'nomefunc':nmasofunc, 
                     'cpffunc':cpfasofunc,
                     'descfunc':dcasofunc
                 };
		 
		 
		 
     pegarvlaso(jsonexame);
     });
 }
function pegarvlaso(jsonexame){    
    $("#sebdAsoFunc").on('click', function (e) {
        e.preventDefault();     
        if( jsonexame != ''){ 
            var html = '';
            var i = -1;
            for( i in jsonexame){
                html = '<tr style="background-color: #fff">'+
                //'<td class="cdexame" data-id="'+jsonexame.codigofunc+'">'+jsonexame.codigofunc+'</td>'+
                '<td class="drisco">'+jsonexame.nomefunc+'</td>'+
                '<td class="crisco">'+jsonexame.cpffunc+'</td>'+
                '<td class="descrisco">'+jsonexame.descfunc+'</td>'+
                '<td><a href="javascript:;" onclick="excluirProdRisc(this)">Excluir</a></td>'+
                '</tr>';
            }
        $("#bodyasofuncionario").append(html);
        $("#bodyasofuncionario").show();
        }
    jsonexame = '';
    $("#tbModalAsoFunc tr").remove();
    });
return false;
}
$("#bodyasofuncionario").on('click', 'tr',function(obj){
    let id = $(obj).attr('data-id');
    $(this).closest('tr').remove();
    });
     $("#sebdAsoFunc").on('click', function(){
         $("#tbModalAsoFunc tr").remove();
    });
    $("#fecheExm").on('click', function(){
         $("#tbModalAsoFunc tr").remove();
    });

});  


//---------------------------------------------------------------------//
//------------- filtro das dados do formulario -------------------//
$(document).ready(function(){
	$("#btnEnviar_Aso").on('click' ,function(e){	

	//$("input[name=btn_aso]").on('click' ,function(e){	
		e.preventDefault();

		var valselectaso 	=  $("#tipexambusca_aso option:selected").text();
		var	selectaptaso 	=  $("#selecapto_aso option:selected").val();
		var valstatusaso 	=  $("#tipexambusca_aso").val();
		var codempaso 	 	=  $("#codempbusca_aso").val();
		var codfuncaso 	 	=  $("#buscacodfunc_aso").val();
		var nomfuncaso      =  $("#buscadescfunc_aso").val();
       
        var vlcdris     	=  $('#bodyasofuncionario').find('td.crisco');
        var array1 =[];
        for(var i =0; i< vlcdris.length; i++){
            var valcodrisco = vlcdris[i].textContent;
            array1.push(valcodrisco);  
        };
        var vol = $("#codasuponto").val(array1);
        //-----------------//
        var vlcdexame       =  $('#bodyAsoExem').find('td.cdexame');
         var array2 =[];
        for(var i =0; i< vlcdexame.length; i++){
            var valcodexam = vlcdexame[i].textContent;
            var valcodexam=valcodexam.replace(/[^\d]+/g,'');
            array2.push(valcodexam);  
        };
        var vl = $("#codasuexame").val(array2);

        //-----------------//
		function data(){
    		var data = new Date();
    		var dia = data.getDate();
    		if (dia.toString().length == 1) dia = "0"+dia;
    			var mes = data.getMonth()+1;
    		if (mes.toString().length == 1) mes = "0"+mes;
    			var ano = data.getFullYear();  
    	return dia+"/"+mes+"/"+ano;
		}
		html = '';
		for(var i = 0; i < codempaso[i]; i++ ){
			html += '<tr style="background-color: #fff">'+
					'<td class="codempresa_aso">'+codempaso+'</td>'+
                    '<td class="codfunc_aso">'+nomfuncaso+'</td>'+
					'<td class="codfunc" style="display:none">'+codfuncaso+'</td>'+
					'<td class="valcod_aso">'+array1+'</td>'+
					'<td class="catcod_aso">'+valselectaso+'</td>'+
					'<td class="data_aso">'+data()+'</td>'+
					'<td><input type="button" name="btn_relepi" id="btn_relepi" class="btn btn-primary" onclick="openPopupIns('+codempaso+','+codfuncaso+','+valstatusaso+')" value="Imprimir Relatório"/> </td>'+
                    '</tr>';
		}			
		$("#matbody").append(html);
		$("#matbody").show();
     
		limparCampos();
		$("#bodyaso tr").remove();
		
		});
 
  	function limparCampos(){
		$("select[name=tiporisco_aso]").val('');
		$("#tiporisco_aso option:selected").text('');		
	}	
return false;
})

function openPopupIns(obj1,obj2,obj3){
	//$("#formAso")[0].reset();
	$("#matbody tr").remove();

    var codasuexame     =  $("#codasuexame").val();
	var codrisco 		=  $("#codasuponto").val();
	var valselectaso 	=  $("#tipexambusca_aso option:selected").text();
	var dataperiodicid  =  $("#periodicidade_aso option:selected").val();
	var datavencimento  =  $("#datavenc_aso").val();
    var codmedico       =  $("#codmedicobusca_aso").val();
    var nomfuncaso      =  $("#buscadescfunc_aso").val(); 
    var obsaso          =  $("#obs_aso").val(); 
	
	//ADICIONO O CODIGO DO AMBIENTE///////////////////
    //ADICIONO SE ESTABELECIMENTO É PRÓPRIO OU NÃO///
    var codamb          =  $("#codAsoAmb").val();
    var estabprop       =  $("#estabAsoAmb").val();
	//////////////////////////////04/10/2019/////////////////////////////////
    var nomeestab       =  $("#nomeAsoAmb").val();
    /////////////////////////////////////////////////
	
	$.ajax({
		url: BASE_URL +'/ajaxRelatorio/AsoRelatorioIns',
		type: 'POST',
		async: false,
		data:{ obj1:obj1, obj2:obj2, obj3:obj3, dataperiodicid:dataperiodicid, valselectaso:valselectaso ,codmedico:codmedico, nomfuncaso:nomfuncaso, codrisco:codrisco, codasuexame:codasuexame, obsaso:obsaso, codamb:codamb, estabprop:estabprop, nomeestab:nomeestab},
		success: function(data){
		}
	},false);
openPopupAso(obj1,obj2);
return true;
}
function openPopupAso(obj1,obj2) {
    var data = [obj1,obj2];
    if(data[0] !='' &&  data[1]!=''){
       window.confirm("Gerar Atestado!");
	   var data = [obj1,obj2];
	   var url = BASE_URL+"/sstAsoView/infoasorelatorio/"+data;
	   window.open(url, "sstAsoView", "width=800,height=600");
        }else{
            alert("Entre com os Dados");
        }
        window.location.reload();
return true
}

/*------------------------Busca Ambiente da Empresa------------------------------------*/
$(function(){
    $("#buscaAsoAmb").on('keyup', function(){

        var codEmpresa = $('#codempbusca_aso').val();
        var busca = $('#buscaAsoAmb').val();
        
        $.ajax({
            type:'POST',
            url:BASE_URL+'/ajaxAso/buscaAsoAmbiente',
            data:{busca:busca, codEmpresa:codEmpresa},
            success:function(json){
                json = json.replace(/(\r\n|\n|\r)/gm,"");
                json = json.replace(/\t/,"");
                //console.log(msg);
                var json = JSON.parse(json);
        
                console.log(json);
                $("#tbAsoAmbiente tr").remove();
                
                var newRow = $("<tr>"); 
                var cols = "";
                cols += "<th></th>";
                cols += "<th>Codigo</th>";
                cols += "<th>Ambiente</th>";
                cols += "<th>Estabelecimento</th>";
                newRow.append(cols);
                $("#tbAsoAmbiente").append(newRow);
            
                for(var i = 0; i < json.length; i++) {
                    var cols = "";
                    var newRow = $("<tr>"); 
                    cols += '<td><input type=radio value='+json[i].idamb+' name=idAmb id=idAmb></td>';
                    cols += '<td>'+json[i].codamb+'</td>';
                    cols += '<td>'+json[i].nomeestab+'</td>';
                    ////04/10/2019/////////////////
                    if (json[i].estabprop == "S") {
                        cols += '<td>PRÓPRIO</td>';
                    }else{
                        cols += '<td>TERCEIRO</td>';
                    }
                    ///////////////////////////////
                    newRow.append(cols);
                    $("#tbAsoAmbiente").append(newRow);
                }
    
            }
        });
    });
});
/*------------------------subimeto Ambiente da Empresa------------------------------------*/
$(function(){
    $("#submitAsoAmb").on('click', function(){

        var idamb = $("input[name='idAmb']:checked").val();
        $.ajax({
        
            type:'POST',
            url:BASE_URL+'/ajaxAso/submitAsoAmbiente',
            data:{idamb:idamb},
            success:function(json){
                json = json.replace(/(\r\n|\n|\r)/gm,"");
                json = json.replace(/\t/,"");
                var json = JSON.parse(json);
                
                $("#codAsoAmb").val(json.codamb);
                 if(json.estabprop == 'S'){
                   ///04/10/2019//////////////////// 
                   $("#estabAsoAmb").val("PRÓPRIO");
               }else{
                   $("#estabAsoAmb").val("TERCEIRO");
                   /////////////////////////////////
               }
                $("#nomeAsoAmb").val(json.nomeestab);
            }
        });
    });
});

	
	