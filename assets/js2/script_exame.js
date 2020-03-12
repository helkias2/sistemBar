
$(function(){
  carregarDados();
function carregarDados(){
    var datatable = $('#exame_datatable').DataTable({
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
        "url": BASE_URL + "/ajaxExame/seachVisualizarExame",
        "type": 'POST',
          "data": function(d) {
              d.vlaction = "action";   
          },
        "dataSrc":""
    },
    "columns":[
        {data:"codexame"}, {data:"razaoempresa"}, {data:"nomefunc"}, {data:"nomeexame"}, 

        {data:"datvencimento",
          "render": function (data, type, row, meta) { 
            function dateToEN(date){  
              return date.split('-').reverse().join('/');
            }; 
            return  dateToEN(data);
          },
      },
        {data:"resultado",
             "render": function (data, type, row, meta) { 
                if( data === ''){
                  return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'Aguardando'+'</a>';
                } else{
                  return '<a class="btn btn-info btn-sm">' +'Exame OK'+ '</a>';
                }
            }
        },
        { data: "codexame",
            "render": function (data, type, row, meta) { 
                    return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstExame/exameEdit/' + data +'">' + 'Editar' + '</a>'; }
        },    
        { data: "codexame",
            "render": function (data, type, row, meta) { 
                    return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstExame/delete/' + data +'">' + 'Delete' + '</a>'; }
        },
    ],

    });
    // $('#funcionario tbody').on( 'click', 'button', function () {
    //     var data = table.row( $(this).parents('tr') ).data();
    //     alert( data[0] +"'s salary is: "+ data[ 8 ] );
    // });

$("#exame_data").show();
}
})

// $(function(){
// 	//$('#emp_body').hide();
// $("#exame_data").bootgrid({

//     cache: false,
//     labels: {
//         noResults: "Não existem resultados.",
//         search: "pesquisa",
//         infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} inscrições",
//         responsiveTable: 'table-responsive'+ 'data-row-id'
//     },    
//     caseSensitive: false,    
//     formatters: {
//         "commands": function(column, row) {
//             return "<button type=\"button\" class=\"btn btn-success w-100 command-search\" data-row-id=\"" + row.id + "\"><i class=\"fas fa-notes-medical fa-lg\"></i></button> ";
//         }
//     }
//     }).on("loaded.rs.jquery.bootgrid", function(){
        
//         $(".command-search").on("click", function(e) {
//             e.preventDefault();
//         let selecvisualizar = $(this).attr('data-row-id');
//     if(selecvisualizar != ''){
//         $.ajax({
//             url: BASE_URL+'/ajaxExame/seachVisualizarExame',
//             type: "POST",
//             data: {selecvisualizar: selecvisualizar},
//             cache: false,
//             async: false,
//             datatype: 'JSON',
//             success:function(data) {
//                 json = data.replace(/(\r\n|\n|\r)/gm,"");
//                 var json = $.parseJSON(json);
//                 pegarvlaso(json);

//             $("#modalVisualirar").modal();    
//             }               
//         })
//         function pegarvlaso(json){     
//          //----------- Empresa ------------// 
//          $("#codEmpresa").text(json.codempresa);
//          $("#razEmpresa").text(json.razaoempresa);
//          $("#dtaCadExame").text(json.datacad);
//         //---------- Funcionario ----------// 
//          $("#codFunc").html(json.codfuncionario);
//          $("#nmFunc").html(json.nomefunc);
//          $("#ncfFunc").html(json.cpffunc);
//          //---------- Parceiros ----------// 
//          $("#codParceiro").html(json.codparceiro); 
//          $("#nmParceiro").html(json.razaoparceiro);
//          $("#nisParceiro").html(json.cnpjparceiro);
//          //---------- Exame ----------// 
//          $("#codExamfunc").html(json.codexame);
//          $("#descExamFunc").html(json.nomeexame);
//          $("#datExameValidade").html(json.datvencimento);
//            //---------- TUSS ----------//
//         // $("#codExamTuss").html('Cd. Tuss: '+json.codtuss);
//        //  $("#descExamTuss").html(json.desctuss);
//          //---------- Procedimento ----------// 
//          $("#codProcd").html('Proced.: 00'+json.codproced); 
//          $("#nmProcd").html(json.descproced);
//          //---------- Procedimento e Interpretacoes ----------// 
//          $("#codInterp").html('Interpretação: 00'+json.interpretacao); 
//          $("#nmOrdem").html('Ordem: '+ json.ordem);
//          $("#nmProprio").html('Proprio: '+json.proprio);
           
//         }
//     return false;
//     }
//  });
//  $("#enviavisual").on('click', function(){
//     $("#tabelamodalvisual tr").remove();
//  });

// });



$(document).ready(function(){

//------------------------Buscar Funcionario ------------------------------//
 $("#modalFuncionario").on('keyup',function(){
    
    var valexamerzemp = $("#buscaFuncRz").val();
    var valexamefunc = $("#buscaFuncMd").val();
    if(valexamefunc != '' || valexamerzemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxExame/seachListFuncionario',
            type: "POST",
            data: {valexamerzemp : valexamerzemp  ,valexamefunc : valexamefunc },
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr"> <td id="codExEmp">'+json[i].codempresa+'</td> <td id="rzExEmp">'+json[i].razaosocial+'</td><td id="cdExFunc">'+json[i].codfuncionario+'</td><td id="cpfExFunc">'+json[i].cpf+'</td><td id="nmExFunc">'+json[i].nomefuncionario+'</td></tr>';
                }
            $('#tabelaMdFuncionario').html(html);
            $('#tabelaMdFuncionario').show();
            
            }               
        })
    return false;
    } 
 });

$("input[name=modalFunc]").keyup(function(){ //pega o css da tabela     
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
        $("#tabelaMdFuncionario").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            var cdexemp = $(this).find('td[id=codExEmp]').text();
            var rzextemp = $(this).find('td[id=rzExEmp]').text();
            var cdexfunc = $(this).find('td[id=cdExFunc]').text();
            var cpfexfunc = $(this).find('td[id=cpfExFunc]').text();
            var nmexfunc = $(this).find('td[id=nmExFunc]').text();
            jsonaso = {'cexEmp':cdexemp, 'rzexEmp':rzextemp, 'cdFunc':cdexfunc, 'cpfFunc':cpfexfunc, 'nmFunc':nmexfunc};
            pegarvlaso(jsonaso);
        });
    }
   function pegarvlaso(jsonaso){    
        $("#enviaFunc").on('click', function (e) {
            e.preventDefault();     
            if( jsonaso != ''){ 
                $("#docEmpFunc").val(jsonaso.cexEmp);
                $("#docEmpFunc").html(jsonaso.cexEmp);
                $("#razaoEmpFunc").val(jsonaso.rzexEmp);
                $("#razaoEmpFunc").html(jsonaso.rzexEmp);
                $("#codFuncionario").val(jsonaso.cdFunc);
                $("#cpfFuncionario").val(jsonaso.cpfFunc);
                $("#nomeFuncionario").val(jsonaso.nmFunc);
            }

        $("#tabelaMdFuncionario tr").remove();
        });
    return false;
    }
    $("#enviaFunc").on('click', function(){
        $("#tabelaMdFuncionario tr").remove();
    });

  });  

$(document).ready(function(){
//------------------------Buscar Tuss ------------------------------//
$("#modalTuss").on('keyup',function(){
    var selectuss = $("#buscaTussModal").val();
    
    if(selectuss != ''){
        $.ajax({
            url: BASE_URL+'/ajaxExame/seachListTuss',
            type: "POST",
            data: {selectuss: selectuss},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr"> <td id="codTuss">'+json[i].codtuss+'</td> <td id="portTuss">'+json[i].porteanestesico+'</td><td id="descTuss">'+json[i].desctuss+'</td></tr>';
                }
            $('#tabelamodaltuss').html(html);
            $('#tabelamodaltuss').show();
            
            }               
        })
    return false;
    }
 });

$("input[name=tablemodalTuss]").keyup(function(){ //pega o css da tabela     
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
     $("#tabelamodaltuss").on('click', 'tr', function (e) {
         e.preventDefault();
         $(this).toggleClass('ativo');
         $(this).siblings().removeClass('ativo');

         var cdtuss = $(this).find('td[id=codTuss]').text();
         var porttuss = $(this).find('td[id=portTuss]').text();
         var desctuss = $(this).find('td[id=descTuss]').text();
         jsonaso = {'codTussEx':cdtuss, 'portTussEx':porttuss, 'descTussEx':desctuss};
         pegarvlaso(jsonaso);
     });
 }
   function pegarvlaso(jsonaso){     
     $("#enviatuss").on('click', function (e) {
         e.preventDefault();     
         if( jsonaso != ''){ 
             $("#codTuss").val(jsonaso.codTussEx);
             //$("#nomeExame").val(jsonaso.portTussEx);
             $("#descTuss").val(jsonaso.descTussEx);
         }else{
             alert("Digite Novamente");
         };

     $("#tabelamodaltuss tr").remove();
     });
 return false;
 }
 $("#enviatuss").on('click', function(){
    $("#tabelamodaltuss tr").remove();
 });
});

$(document).ready(function(){
//------------------------Buscar Tabela 27 ------------------------------//
$("#modalProcediment").on('keyup',function(){
    var selectproced = $("#buscaProcedModal").val();
    if(selectproced != ''){
        $.ajax({
            url: BASE_URL+'/ajaxExame/seachListProcedimetos',
            type: "POST",
            data: {selectproced: selectproced},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr"> <td id="cdproc">'+json[i].codproced+'</td> <td id="descproc">'+json[i].descproced+'</td></tr>';
                }
            $('#tabelamodalProced').html(html);
            $('#tabelamodalProced').show();
            }               
        })
    return false;
    }
 });

$("input[name=modalProced]").keyup(function(){ //pega o css da tabela     
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
     $("#tabelamodalProced").on('click', 'tr', function (e) {
         e.preventDefault();
         $(this).toggleClass('ativo');
         $(this).siblings().removeClass('ativo');

         var cdProce = $(this).find('td[id=cdproc]').text();
         var descProce = $(this).find('td[id=descproc]').text();
         jsonaso = {'cdProc':cdProce, 'descProc':descProce};
         pegarvlaso(jsonaso);
     });
 }
function pegarvlaso(jsonaso){     
    $("#enviaproced").on('click', function (e) {
         e.preventDefault();     
        if( jsonaso != ''){ 
            $("#codTbExma").val(jsonaso.cdProc);
            $("#descProcedimento").val(jsonaso.descProc);
        }else{
        alert("Digite Novamente");
    };

    $("#tabelamodalProced tr").remove();
    });
return false;
}
  $("#enviaproced").on('click', function(){
    $("#buscaProcedModal").val('');
    $("#tabelamodalProced tr").remove();
 });
 $("#fechaproced").on('click', function(){
    $("#buscaProcedModal").val('');
    $("#tabelamodalProced tr").remove();
 });

});


//------------------------Buscar Parceiro -----------------------------------------//
$(document).ready(function(){

$("#modalParceiro").on('keyup',function(){
    var selectparc = $("#buscaParcModal").val();
    if(selectparc != ''){
        $.ajax({
            url: BASE_URL+'/ajaxExame/seachListParceiros',
            type: "POST",
            data: {selectparc: selectparc},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += ' <tr id="trtr"> <td id="cdparc">'+json[i].codparceiro+'</td> <td id="nmparc">'+json[i].nome+'</td><td id="nisparc">'+json[i].cnpj+'</td></tr>';
                }
            $('#tabelamodalparc').html(html);
            $('#tabelamodalparc').show();
            }               
        })
    return false;
    }
 });

$("input[name=modalParc]").keyup(function(){ //pega o css da tabela     
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
     $("#tabelamodalparc").on('click', 'tr', function (e) {
         e.preventDefault();
         $(this).toggleClass('ativo');
         $(this).siblings().removeClass('ativo');

         var cdParc = $(this).find('td[id=cdparc]').text();
         var nmParc = $(this).find('td[id=nmparc]').text();
         var nisParc = $(this).find('td[id=nisparc]').text();
         jsonaso = {'codParcero':cdParc, 'nomParceiro':nmParc, 'nisParceiro':nisParc};
         pegarvlaso(jsonaso);
     });
 }
function pegarvlaso(jsonaso){     
    $("#enviaparc").on('click',function (e) {
         e.preventDefault();     
        if( jsonaso != ''){ 
            $("#cod_parceiro").val(jsonaso.codParcero);
            $("#razao_parceiro").val(jsonaso.nomParceiro);
            $("#cnpj_parceiro").val(jsonaso.nisParceiro);
        }else{
        alert("Digite Novamente");
    };
    $("#tabelamodalparc tr").remove();
    });
return false;
}
 $("#enviaparc").on('click', function(){
    $("#tabelamodalparc tr").remove();
 });

});




//-----------------INSERIR EXAME----------------28/12/2018 //

$("#InseriExameTb").on('click',function(){
    var selectnameexame = $("#InsertExamePrev").val();
    if(selectnameexame != ''){
        $.ajax({
            url: BASE_URL+'/ajaxExame/insertExame',
            type: "POST",
            data: {selectnameexame: selectnameexame},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
            $("#InsertExamePrev").val('');
				alert('Exame Inserido!');
            }               
        })
    return false;
    }
 });



//------------------------Buscar Exames----------------------------//

$("#BuscaExamePrev").on('keyup',function(){
    var busca = $("#BuscaExamePrev").val();
    if(busca != ''){
        $.ajax({
            url: BASE_URL+'/ajaxExame/BuscaExameTb',
            type: "POST",
            data: {busca: busca},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += ' <tr id="trtr"> <td id="codexame">'+json[i].idinsertexame+'</td> <td id="nomeExame">'+json[i].insertnomeexame+'</tr>';
                }
            $('#listExamePrev').html(html);
            $('#listExamePrev').show();
            }               
        })
    return false;
    }
 });


$(function(){
    $("#buscaExamePrev").on('keyup', function(){
        //console.log('teste');
        var busca = $('#buscaExamePrev').val();
        $.ajax({
            type:'POST',
            url:BASE_URL+'/ajaxExame/buscaExameTb',
            data:{busca:busca},
            success:function(json){
                json = json.replace(/(\r\n|\n|\r)/gm,"");
                json = json.replace(/\t/,"");
                
                var json = JSON.parse(json);
                
                $("#listExamePrev tr").remove();
                
                var newRow = $("<tr>"); 
                var cols = "";
                cols += "<th></th>";
                //cols += "<th>Código</th>";
                cols += "<th>Nome do Exame</th>";
                newRow.append(cols);
                $("#listExamePrev").append(newRow);
            
                for(var i = 0; i < json.length; i++) {
                    var cols = "";
                    var newRow = $("<tr>"); 
                    cols += '<td><input type=radio value='+json[i].idinsertexame+' name=idinsertexame id=idinsertexame></td>';
                    cols += '<td>'+json[i].insertnomeexame+'</td>';
                    //cols += '<td>'+json[i].descricao+'</td>';
                    newRow.append(cols);
                    $("#listExamePrev").append(newRow);
                }
    
            }
        });
    });
});

$(function(){
    $("#submitExamePrev").on('click', function(){
        
        var idexame = $("input[name='idinsertexame']:checked").val();
        $.ajax({
        
            type:'POST',
            url:BASE_URL+'/ajaxExame/getExamePrev',
            data:{idexame:idexame},
            success:function(json){
                
                json = json.replace(/(\r\n|\n|\r)/gm,"");
                json = json.replace(/\t/,"");
                
                var json = JSON.parse(json);

                
                $("#idexamePrev").val(json[0].idinsertexame);
                $("#nomeExamePrev").val(json[0].insertnomeexame);
            }
        });
    });
});


