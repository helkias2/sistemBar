
// $(document).ready(function() {

//     $('#emp_body').hide();
//     // -----------------------------  lista dos resultados ASO --------------------------//
//     var grid = $("#ppp_data").bootgrid({
//         labels: {
//             noResults: "Não existem resultados.",
//             search: "pesquisa",
//             infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} inscrições",
//             responsiveTable: 'table-responsive'+ 'data-row-id'
//         },    
//         caseSensitive: false,    
//         post: function(){
//             return{ id:"b0df282a-0d67-40e5-8558-c9e93b7befed" };
//         },
//         formatters: {
//             "commands": function(column, row) {
//                 console.log(row.statusppp);
//                 return  "<button type=\"button\" class=\"btn btn-primary w-100 command-atestado\"id=statusppp"+"\"row\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-print fa-lg  \"></span></button>"; 
//             }
//         }     
//     }).on("loaded.rs.jquery.bootgrid", function() {
//         grid.find(".command-atestado").on("click", function(e) {
//             e.preventDefault();
//             let valor = $(this).attr('data-row-id')
//             var url = BASE_URL+"/sstPPP/pppGet/"+valor;
//             window.open(url, "sstPPP", "width=820,height=500");
//         })
//     });
// });


$(function(){
    carregarDados();
    function carregarDados(){
      var datatable = $('#ppp_data').DataTable({
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
              "url": BASE_URL + "/ajaxPpp/listDataTablePPP",
              "type": 'POST',
              "data": function(d) {
                d.vlactionppp = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"idppp"}, 
        {data:"nomefuncionario"}, 
		{data:"cpffuncionario"},
		{data:"razaosocial"},
		{data:"datacadppp",
		 "render": function(data, type, row, meta) {
                 function dateToEN(date) {
                 return date.split('-').reverse().join('/');
                 };
                 return dateToEN(data);
            },
		},

               //{data:"statusppp"},
                 //"render": function (data, type, row, meta) { 
                   //function dateToEN(date){  
                    // return date.split('-').reverse().join('/');
                   //}; 
                  // return  dateToEN(data);
                 //},
             //},
            //   {data:"situacao",
            //     "render": function (data, type, row, meta) { 
            //        if( data === ''){
            //          return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'Demitido'+'</a>';
            //        } else{
            //          return '<a class="btn btn-info btn-sm">' +'ATIVO'+ '</a>';
            //        }
            //    }
            //   },
            { data: "idppp", 
            "render": function (data, type, row, meta) { 
                //console.log(row.statusppp);
                return '<button type="button" class="btn btn-primary btn-sm" id="botaoPPP" data-row-id="' + data + '" data-id="' + row.statusppp + '"><span class="fa fa-print fa-lg "> <span></button>';
            }
        },    
        { data: "idppp",
        "render": function (data, type, row, meta) { 
          return "<a class='btn btn-danger btn-sm' href='"+BASE_URL+"/sstPPP/delete/"+ data +"' onClick='return confirm('Deseja mesmo excluir');'><span class='fa fa-trash fa-lg'> <span></a>"; 
      }
  },

  ],

});

      $("#ppp_data").show();
  }
})

$(document).ready(function() {
    $("#ppp_data").on('click', '#botaoPPP', function(e) {
        e.preventDefault();
        let valor = $(this).attr('data-row-id')
        let status = $(this).attr('data-id')
        console.log(status);
        if(status == 'a'){
        var url = BASE_URL + "/sstPPP/pppGetAnt/" + valor;
        window.open(url, "sstPPP", "width=850,height=600");
        }else{
        var url = BASE_URL + "/sstPPP/pppGet/" + valor;
        window.open(url, "sstPPP", "width=850,height=600");    
        }
    })
})



//------------------------Buscar Empresa---------------------------//
$(document).ready(function(){
 $("#modalRelMatEmpresa").on('keyup',function(){
    var valmatemp = $("#buscaMatEmp").val();
    if(valmatemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxPpp/searchMatEmpresa',
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
                    html += '  <tr id="trtr"> <td id="codMatEmp">'+json[i].codempresa+'</td> <td id="descMatEmp">'
                    +json[i].razaosocial+'</td><td id="nisMatEmp">'+json[i].nrmatricula+'</td></tr>';
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
    }else{
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
            $("#RealPPPcodempresa").val(jsonaso.codmtEmp);
            $("#RealPPPrazaosocial").val(jsonaso.dmtEmp);
                //$("#cnpjMatEmpresa").val(jsonaso.nismtEmp);
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

    var mtemp = $("#RealPPPcodempresa").val();
    if(mtemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxPpp/searchMatFuncionario',
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
                    html += '  <tr id="trtr"> <td id="codMatFunc">'+json[i].codfuncionario+
                    '</td> <td id="descMatFunc">'+json[i].nomefuncionario+
                    '</td><td id="nisMatFunc">'+json[i].cpf+'</td></tr>';
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
    }else{
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
            $("#cpf_func").val(jsonaso.nismtFunc);
                //$("#cpf_func").val(jsonaso.cpf);
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


//------------------------Buscar Responsavél Ambiente---------------------------//
$(document).ready(function(){
 $("#modalRespAmb").on('keyup',function(){//CHAMO MEU MODAL QUANDO PRESSIONADO O BOTÃO
    var busca = $("#buscaRespAmb").val();//ARMAZENO NA VARIAVEL "BUSCA" O VALOR DO CAMPO INPUT "buscaRespAmb"
    if(busca != ''){//VERIFICO SE A VARIALVEL "BUSCA" VEIO DIFERENTE DE VAZIO
        $.ajax({
            url: BASE_URL+'/ajaxPpp/buscaRespAmb',//FAÇO UMA REQUISIÇÃO AJAX, NA MINHA ACTION "buscaRespAmb" 
            type: "POST",
            data: {busca: busca},//ARMAZENO EM DATA OS VALORES DA "BUSCA"
            cache: false,
            async: false,
            datatype: 'JSON',//O VALORES RETORNADOS PASSO PARA UM JSON
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {//MONTO MINHA ESTRUTURA HTML PERCORRENDO OS CAMPOS E MONTANDO MINHA TABELA COM OS VALORES RETORNADOS  
                    html += '<tr id="trtr"> <td id="codResponsavel">'+json[i].codresp+
                    '<td id="nome">'+json[i].nomeresponsavel+
                    '<td id="identificacao">'+json[i].identprofissional+
                    '<td id="Empresa">'+json[i].rzempresa+
                    '<td id="numero" style="display:none">'+json[i].numero+
                    '<td id="uf" style="display:none">'+json[i].uf+
                    '<td id="cpf" style="display:none">'+json[i].cpf+
                    '<td id="rg" style="display:none">'+json[i].rg+
                    '<td id="telefone" style="display:none">'+json[i].telefone+
                    '<td id="telcomercial" style="display:none">'+json[i].telcomercial+
                    '<td id="celular" style="display:none">'+json[i].celular+
                    '<td id="nit" style="display:none">'+json[i].nit+
                    '<td id="email" style="display:none">'+json[i].email+
                    '<td id="pd" style="display:none">'+json[i].pd+
                    '<td id="datainicio" style="display:none">'+json[i].datainicio+
                    '</tr>';
                }

                $('#tbodyRespAmb').html(html); 
            $('#tbodyRespAmb').show();//MOSTRO NO MODAL A MINHA TABELA JUNTAMENTE COM OS VALORES RETORNADO.
            
        }               
    })
    return false;
} 
});

$("input[name=enviaRespAmbiental]").keyup(function(){ //pega o css da tabela     
    var tabela = $(this).attr('alt');
    if( $(this).val() != ""){
        $("."+tabela+" tbody>tr").hide();
        $("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
    }else{
        $("."+tabela+" tbody>tr").show();
    }
}); 
var val = "";
$.extend($.expr[":"], {
    "contains-ci": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

pegarvalores();
function pegarvalores(){ 
        $("#tbodyRespAmb").on('click', 'tr', function (e) {//PEGO OS VALORES VINDOS DA tbodyRespAmb
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            ////////////////ARMAZENOS OS VALORES NAS VARIAVEIS///////////
            var codRespAmb    = $(this).find('td[id=codResponsavel]').text();
            var nomeResp      = $(this).find('td[id=nome]').text();
            var identificacao = $(this).find('td[id=identificacao]').text();
            var numero        = $(this).find('td[id=numero]').text();
            var uf            = $(this).find('td[id=uf]').text();
            var cpf           = $(this).find('td[id=cpf]').text();
            var rg            = $(this).find('td[id=rg]').text();
            var telefone      = $(this).find('td[id=telefone]').text();
            var telcomercial  = $(this).find('td[id=telcomercial]').text();
            var celular       = $(this).find('td[id=celular]').text();
            var nit           = $(this).find('td[id=nit]').text();
            var email         = $(this).find('td[id=email]').text();
            var pd            = $(this).find('td[id=pd]').text();
            var datainicio    = $(this).find('td[id=datainicio]').text();
            jsonppp = {'codRespAmb':codRespAmb, 'nomeResp':nomeResp, 'identificacao':identificacao, 'numero':numero, 'uf':uf, 'cpf':cpf, 'rg':rg, 'telefone':telefone, 'telcomercial':telcomercial, 'celular':celular, 'nit':nit, 'email':email, 'pd':pd, 'datainicio':datainicio};
            pegarvalorppp(jsonppp);
        });
    }

   function pegarvalorppp(jsonppp){//PEGOS OS VALORES ARMAZENADOS E OS APRESENTOS NA TELA "VIEW"
   $("#enviaRespAmbiental").on('click', function (e) {
    e.preventDefault();     
    if( jsonppp != ''){ 
        $("#codRespAmb").val(jsonppp.codRespAmb);
        $("#nome").val(jsonppp.nomeResp);
        $("#idprofissional").val(jsonppp.identificacao);
        $("#nr_responsavel").val(jsonppp.numero);
        $("#UF_responsavel").val(jsonppp.uf);
        $("#cpf").val(jsonppp.cpf);
        $("#rg").val(jsonppp.rg);
        $("#tel").val(jsonppp.telefone);
        $("#tel_comercial").val(jsonppp.telcomercial);
        $("#cel").val(jsonppp.celular);
        $("#nit_responsavel").val(jsonppp.nit);
        $("#email_responsavel").val(jsonppp.email);
        $("#p_d").val(jsonppp.pd);
        $("#datainicio").val(jsonppp.datainicio);
    }

    $("#tbodyRespAmb tr").remove();
});

   return false;
}
$("#enviaRespAmbiental").on('click', function(){
    $("#tbodyRespAmb tr").remove();
});
});


//------------------------Buscar Responsavél Biologico---------------------------//
$(document).ready(function(){
 $("#modalRespBio").on('keyup',function(){//CHAMO MEU MODAL QUANDO PRESSIONADO O BOTÃO
    var busca = $("#buscaRespBio").val();//ARMAZENO NA VARIAVEL "BUSCA" O VALOR DO CAMPO INPUT "buscaRespAmb"
    if(busca != ''){//VERIFICO SE A VARIALVEL "BUSCA" VEIO DIFERENTE DE VAZIO
        $.ajax({
            url: BASE_URL+'/ajaxPpp/buscaRespBio',//FAÇO UMA REQUISIÇÃO AJAX, NA MINHA ACTION "buscaRespAmb" 
            type: "POST",
            data: {busca: busca},//ARMAZENO EM DATA OS VALORES DA "BUSCA"
            cache: false,
            async: false,
            datatype: 'JSON',//O VALORES RETORNADOS PASSO PARA UM JSON
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {//MONTO MINHA ESTRUTURA HTML PERCORRENDO OS CAMPOS E MONTANDO MINHA TABELA COM OS VALORES RETORNADOS  
                    html += '  <tr id="trtr"> <td id="codResponsavel">'+json[i].codresp+
                    '</td> <td id="nome">'+json[i].nomeresponsavel+
                    '</td><td id="identificação">'+json[i].identprofissional+'</td></tr>';
                }
                $('#tbodyRespBio').html(html); 
            $('#tbodyRespBio').show();//MOSTRO NO MODAL A MINHA TABELA JUNTAMENTE COM OS VALORES RETORNADO.
            
        }               
    })
    return false;
} 
});

$("input[name=enviaRespBio]").keyup(function(){ //pega o css da tabela     
    var tabela = $(this).attr('alt');
    if( $(this).val() != ""){
        $("."+tabela+" tbody>tr").hide();
        $("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
    }else{
        $("."+tabela+" tbody>tr").show();
    }
}); 
var val = "";
$.extend($.expr[":"], {
    "contains-ci": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

pegarvalores();
function pegarvalores(){ 
        $("#tbodyRespBio").on('click', 'tr', function (e) {//PEGO OS VALORES VINDOS DA tbodyRespAmb
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            ////////////////////////////////ARMAZENOS OS VALORES NAS VARIAVEIS///////////////////////////////
            var codRespBio = $(this).find('td[id=codResponsavel]').text();
            var nomeRespBio = $(this).find('td[id=nome]').text();
            //var identProfissional = $(this).find('td[id=identificação]').text();
            jsonppp = {'codRespBio':codRespBio, 'nomeRespBio':nomeRespBio};
            pegarvalorppp(jsonppp);
        });
    }

   function pegarvalorppp(jsonppp){    //PEGOS OS VALORES ARMAZENADOS E OS APRESENTOS NA TELA "VIEW"
   $("#enviaRespBio").on('click', function (e) {
    e.preventDefault();     
    if( jsonppp != ''){ 
        $("#codrespoBio").val(jsonppp.codRespBio);
        $("#nomeRespBio").val(jsonppp.nomeRespBio);
    }

    $("#tbodyRespBio tr").remove();
});

   return false;
}
$("#enviaRespBio").on('click', function(){
    $("#tbodyRespBio tr").remove();
});
});